import * as vscode from "vscode";

let statusBar: vscode.StatusBarItem;

export const initializeStatusBar = (context: vscode.ExtensionContext) => {
  statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  updateStatusBarText(0);
  statusBar.show();
  context.subscriptions.push(statusBar);

  statusBar.command = "sooner.clickStatusBar";
};

export const updateStatusBarText = (totalCodingTime: number) => {
  const configuration = vscode.workspace.getConfiguration();
  const apiKey = configuration.get<string>("sooner.apiKey");

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
