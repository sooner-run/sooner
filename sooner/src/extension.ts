import * as vscode from "vscode";
import { getCurrentBranch } from "./utils/branch";
import { sendPulse } from "./utils/pulse";
import * as os from "os";

let codingStartTime: number | null = null;
let totalCodingTime: number = 0;
let activityTimeout: NodeJS.Timeout | null = null;

let statusBar: vscode.StatusBarItem;
let apiKey: string | undefined;

const debounceTime = 5 * 1000; // 5 seconds in milliseconds

export async function activate(context: vscode.ExtensionContext) {
  statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );

  apiKey = context.workspaceState.get("apiKey");

  const updateStatusBarText = () => {
    if (apiKey) {
      const hours = Math.floor(totalCodingTime / 3600000);
      const minutes = Math.floor((totalCodingTime % 3600000) / 60000);
      const seconds = Math.floor((totalCodingTime % 60000) / 1000);

      statusBar.text = `Coding time: ${hours}h ${minutes}m ${seconds}s`;
      statusBar.tooltip = "";
    } else {
      statusBar.text = "Activate Sooner";
      statusBar.tooltip = "Click to enter API key";
    }
  };

  updateStatusBarText();
  statusBar.show();
  context.subscriptions.push(statusBar);

  const startTracking = () => {
    if (!apiKey) {
      return;
    }
    if (!codingStartTime) {
      codingStartTime = Date.now();
    }
  };

  const stopTracking = () => {
    if (codingStartTime) {
      const codingEndTime = Date.now();
      const codingDuration = codingEndTime - codingStartTime;
      totalCodingTime += codingDuration;
      codingStartTime = null;
    }
  };

  const getFilePath = () => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      return activeEditor.document.uri.fsPath;
    }
    return null;
  };

  const getProjectPath = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      return workspaceFolders[0].uri.fsPath;
    }
    return null;
  };

  const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(
    async () => {
      startTracking();

      if (!apiKey) {
        return;
      }

      if (activityTimeout) {
        clearTimeout(activityTimeout);
      }

      activityTimeout = setTimeout(async () => {
        stopTracking();
        updateStatusBarText();

        const payload = {
          path: getFilePath(),
          time: totalCodingTime,
          branch: await getCurrentBranch(getProjectPath()!),
          project: vscode.workspace.name || null,
          language: vscode.window.activeTextEditor?.document.languageId || null,
          os: os.type(),
          hostname: os.hostname(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        // eslint-disable-next-line @typescript-eslint/naming-convention
        sendPulse({ api_key: apiKey!, payload });
      }, debounceTime);
    }
  );

  const startTrackingCommand = vscode.commands.registerCommand(
    "sooner.startTracking",
    () => {
      vscode.window.showInformationMessage("Started tracking coding time.");
      updateStatusBarText();
    }
  );

  const stopTrackingCommand = vscode.commands.registerCommand(
    "sooner.stopTracking",
    () => {
      stopTracking();
      vscode.window.showInformationMessage(
        `Total coding time: ${(totalCodingTime / 1000).toFixed(0)} seconds.`
      );
      updateStatusBarText();
    }
  );

  const statusBarClick = vscode.commands.registerCommand(
    "sooner.clickStatusBar",
    () => {
      if (apiKey) {
        // Open an external link using the stored API key
        vscode.env.openExternal(
          vscode.Uri.parse(`https://example.com?key=${apiKey}`)
        );
      } else {
        // Prompt the user to enter their API key
        vscode.window
          .showInputBox({ prompt: "Enter your API key" })
          .then((key: string | undefined) => {
            if (key) {
              // Store the API key in the workspace state
              apiKey = key;
              context.workspaceState.update("apiKey", key);
              vscode.window.showInformationMessage(
                "API key saved successfully."
              );
              updateStatusBarText();
            }
          });
      }
    }
  );

  const clearApiKeyCommand = vscode.commands.registerCommand(
    "sooner.clearApiKey",
    () => {
      // Clear the API key from the workspace state
      context.workspaceState.update("apiKey", undefined);
      apiKey = undefined;
      vscode.window.showInformationMessage("API key deleted successfully.");
      updateStatusBarText();
    }
  );

  statusBar.command = "sooner.clickStatusBar";

  context.subscriptions.push(startTrackingCommand);
  context.subscriptions.push(stopTrackingCommand);
  context.subscriptions.push(onDidChangeTextDocument);
  context.subscriptions.push(statusBarClick);
  context.subscriptions.push(clearApiKeyCommand);
}

export function deactivate() {
  if (codingStartTime) {
    const codingEndTime = Date.now();
    const codingDuration = codingEndTime - codingStartTime;
    totalCodingTime += codingDuration;
  }
}
