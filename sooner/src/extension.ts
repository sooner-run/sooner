/* eslint-disable curly */
import * as vscode from "vscode";
import { fetchCodingTimeToday, sendPulseData, validateApiKey } from "./api";
import { initializeStatusBar, updateStatusBarText } from "./status_bar";

let codingStartTime: number | null = null;
let totalCodingTime: number = 0;
const activityTimeouts: Map<
  string,
  { timeout: NodeJS.Timeout; path: string; language: string }
> = new Map();

let apiKey: string | undefined;

const debounceTime = 120 * 1000;

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

  initializeStatusBar(context);

  if (apiKey) {
    const codingTimeToday = await fetchCodingTimeToday(apiKey);
    if (codingTimeToday) {
      totalCodingTime = codingTimeToday.time;
      updateStatusBarText(totalCodingTime);
    }
  }

  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(
    async (event) => {
      const documentUri = event.document.uri.toString();
      const filePath = event.document.uri.fsPath;
      const language = event.document.languageId;

      startTracking();

      if (!apiKey) return;

      if (activityTimeouts.has(documentUri)) {
        clearTimeout(activityTimeouts.get(documentUri)!.timeout);
      }

      activityTimeouts.set(documentUri, {
        timeout: setTimeout(async () => {
          await sendPulseData({
            apiKey: apiKey!,
            codingStartTime: codingStartTime!,
            filePath: filePath,
            language: language,
          });
          stopTracking();
          activityTimeouts.delete(documentUri);
        }, debounceTime),
        path: filePath,
        language: language,
      });
    }
  );

  const statusBarClick = vscode.commands.registerCommand(
    "sooner.clickStatusBar",
    () => {
      if (apiKey) {
        vscode.env.openExternal(
          vscode.Uri.parse(`https://www.sooner.run/dashboard`)
        );
      } else {
        vscode.window
          .showInputBox({ prompt: "Enter your API key" })
          .then((key: string | undefined) => {
            if (key) {
              vscode.window.withProgress(
                {
                  location: vscode.ProgressLocation.Notification,
                  title: "Activating Sooner",
                  cancellable: false,
                },
                async (progress) => {
                  progress.report({ message: "Please wait..." });
                  // eslint-disable-next-line @typescript-eslint/naming-convention
                  const { isValid, codetime_today } = await validateApiKey(key);
                  if (isValid) {
                    apiKey = key;
                    context.workspaceState.update("apiKey", key);
                    updateStatusBarText(codetime_today);
                    vscode.window.showInformationMessage(
                      "Extension activated successfully."
                    );
                  } else {
                    vscode.window.showErrorMessage(
                      "Invalid API key. Please try again."
                    );
                  }
                }
              );
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
      updateStatusBarText(totalCodingTime);
    }
  );

  context.subscriptions.push(onDidChangeTextDocument);
  context.subscriptions.push(statusBarClick);
  context.subscriptions.push(clearApiKeyCommand);
}

export function deactivate() {
  stopTracking();
}
