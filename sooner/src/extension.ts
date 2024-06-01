/* eslint-disable curly */
import * as vscode from "vscode";
import { fetchCodingTimeToday, sendPulseData } from "./api";
import { initializeStatusBar, updateStatusBarText } from "./status_bar";

let codingStartTime: number | null = null;
let totalCodingTime: number = 0;
let activityTimeout: NodeJS.Timeout | null = null;

let apiKey: string | undefined;

const debounceTime = 5 * 1000; // 5 seconds in milliseconds

const startTracking = () => {
  if (!apiKey) {
    return;
  }
  if (!codingStartTime) codingStartTime = Date.now();
};

const stopTracking = () => {
  if (codingStartTime) {
    const codingEndTime = Date.now();
    const codingDuration = codingEndTime - codingStartTime;
    totalCodingTime += codingDuration;
    codingStartTime = null;
  }
};

export async function activate(context: vscode.ExtensionContext) {
  apiKey = context.workspaceState.get("apiKey");

  initializeStatusBar(context, apiKey);

  if (apiKey) {
    const codingTimeToday = await fetchCodingTimeToday(apiKey);
    if (codingTimeToday) {
      totalCodingTime = codingTimeToday.time;
      updateStatusBarText(apiKey, totalCodingTime);
    }
  }

  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(
    async () => {
      startTracking();

      if (!apiKey) return;

      if (activityTimeout) clearTimeout(activityTimeout);

      activityTimeout = setTimeout(async () => {
        await sendPulseData({
          apiKey: apiKey!,
          codingStartTime: codingStartTime!,
        });
        stopTracking();
        updateStatusBarText(apiKey, totalCodingTime);
      }, debounceTime);
    }
  );

  const statusBarClick = vscode.commands.registerCommand(
    "sooner.clickStatusBar",
    () => {
      if (apiKey) {
        vscode.env.openExternal(
          vscode.Uri.parse(`https://example.com?key=${apiKey}`)
        );
      } else {
        vscode.window
          .showInputBox({ prompt: "Enter your API key" })
          .then((key: string | undefined) => {
            if (key) {
              apiKey = key;
              context.workspaceState.update("apiKey", key);
              vscode.window.showInformationMessage(
                "API key saved successfully."
              );
              updateStatusBarText(apiKey, totalCodingTime);
            }
          });
      }
    }
  );

  const clearApiKeyCommand = vscode.commands.registerCommand(
    "sooner.clearApiKey",
    () => {
      context.workspaceState.update("apiKey", undefined);
      apiKey = undefined;
      vscode.window.showInformationMessage("API key deleted successfully.");
      updateStatusBarText(apiKey, totalCodingTime);
    }
  );

  context.subscriptions.push(onDidChangeTextDocument);
  context.subscriptions.push(statusBarClick);
  context.subscriptions.push(clearApiKeyCommand);
}

export function deactivate() {
  stopTracking();
}
