"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const branch_1 = require("./utils/branch");
const pulse_1 = require("./utils/pulse");
const os = require("os");
const axios_1 = require("./configs/axios");
let codingStartTime = null;
let totalCodingTime = 0;
let activityTimeout = null;
let statusBar;
let apiKey;
let currentFilePath = null;
const debounceTime = 5 * 1000; // 5 seconds in milliseconds
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
    return activeEditor ? activeEditor.document.uri.fsPath : null;
};
const getProjectPath = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    return workspaceFolders && workspaceFolders.length > 0
        ? workspaceFolders[0].uri.fsPath
        : null;
};
const sendPulseData = async (path, duration) => {
    if (!apiKey) {
        return;
    }
    const payload = {
        path: path,
        time: duration,
        branch: await (0, branch_1.getCurrentBranch)(getProjectPath()),
        project: vscode.workspace.name || null,
        language: vscode.window.activeTextEditor?.document.languageId || null,
        os: os.type(),
        hostname: os.hostname(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        editor: "VS Code",
    };
    try {
        await (0, pulse_1.sendPulse)({ payload });
    }
    catch (error) {
        console.error("Error sending pulse:", error);
    }
};
const updateStatusBarText = () => {
    if (apiKey) {
        const hours = Math.floor(totalCodingTime / 3600000);
        const minutes = Math.floor((totalCodingTime % 3600000) / 60000);
        const seconds = Math.floor((totalCodingTime % 60000) / 1000);
        statusBar.text = `Coding time: ${hours}h ${minutes}m ${seconds}s`;
        statusBar.tooltip = "";
    }
    else {
        statusBar.text = "Activate Sooner";
        statusBar.tooltip = "Click to enter API key";
    }
};
const fetchCodingTime = async () => {
    if (!apiKey) {
        return;
    }
    try {
        const response = await (0, axios_1.default)("/codetime-today");
        const { time } = response.data;
        totalCodingTime = time;
        updateStatusBarText();
    }
    catch (error) {
        console.error("Error fetching coding time:", error);
    }
};
async function activate(context) {
    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    apiKey = context.workspaceState.get("apiKey");
    if (apiKey) {
        await fetchCodingTime();
    }
    updateStatusBarText();
    statusBar.show();
    context.subscriptions.push(statusBar);
    const onDidChangeTextDocument = vscode.workspace.onDidChangeTextDocument(async () => {
        const newFilePath = getFilePath();
        if (currentFilePath && currentFilePath !== newFilePath) {
            // If switching files, send the pulse for the previous file
            if (codingStartTime) {
                const codingEndTime = Date.now();
                const pulseTime = codingEndTime - codingStartTime;
                await sendPulseData(currentFilePath, pulseTime);
            }
            codingStartTime = Date.now(); // Reset the start time for the new file
        }
        currentFilePath = newFilePath; // Update the current file path
        startTracking();
        if (!apiKey) {
            return;
        }
        if (activityTimeout) {
            clearTimeout(activityTimeout);
        }
        activityTimeout = setTimeout(async () => {
            if (currentFilePath) {
                await sendPulseData(currentFilePath, Date.now() - codingStartTime);
                stopTracking(); // Reset tracking after sending pulse
                updateStatusBarText();
            }
        }, debounceTime);
    });
    const statusBarClick = vscode.commands.registerCommand("sooner.clickStatusBar", () => {
        if (apiKey) {
            vscode.env.openExternal(vscode.Uri.parse(`https://example.com?key=${apiKey}`));
        }
        else {
            // Prompt the user to enter their API key
            vscode.window
                .showInputBox({ prompt: "Enter your API key" })
                .then((key) => {
                if (key) {
                    // Store the API key in the workspace state
                    apiKey = key;
                    context.workspaceState.update("apiKey", key);
                    vscode.window.showInformationMessage("API key saved successfully.");
                    updateStatusBarText();
                }
            });
        }
    });
    const clearApiKeyCommand = vscode.commands.registerCommand("sooner.clearApiKey", () => {
        context.workspaceState.update("apiKey", undefined);
        apiKey = undefined;
        vscode.window.showInformationMessage("API key deleted successfully.");
        updateStatusBarText();
    });
    statusBar.command = "sooner.clickStatusBar";
    context.subscriptions.push(onDidChangeTextDocument);
    context.subscriptions.push(statusBarClick);
    context.subscriptions.push(clearApiKeyCommand);
}
exports.activate = activate;
function deactivate() {
    stopTracking();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map