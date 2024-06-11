/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import { getCurrentBranch } from "./utils/branch";
import { sendPulse } from "./utils/pulse";
import * as os from "os";
import { request } from "./configs/axios";

export const sendPulseData = async ({
  apiKey,
  codingStartTime,
  filePath,
  language,
}: {
  apiKey: string;
  codingStartTime: number;
  filePath: string;
  language: string;
}) => {
  if (!apiKey || !codingStartTime) {
    return;
  }

  const codingEndTime = Date.now();
  const pulseTime = codingEndTime - codingStartTime;

  const payload = {
    path: filePath,
    time: pulseTime,
    branch: await getCurrentBranch(getProjectPath()!),
    project: vscode.workspace.name || null,
    language: language,
    os: os.type(),
    hostname: os.hostname(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    editor: "VS Code",
  };

  try {
    await sendPulse({ api_key: apiKey, payload });
  } catch (error) {
    console.error("Error sending pulse:", error);
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

export const fetchCodingTimeToday = async (apiKey: string) => {
  try {
    const response = await request.get("/codetime-today", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coding time today:", error);
    return null;
  }
};

export async function validateApiKey(key: string): Promise<boolean> {
  try {
    const response = await request.post("/activate-extension", {
      key,
    });

    return response.status === 200;
  } catch (error) {
    return false;
  }
}
