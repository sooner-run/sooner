import axios from "axios";
import * as vscode from "vscode";

const apiKey = vscode.workspace.getConfiguration().get<string>("apiKey");

const request = axios.create({
  baseURL: "http://localhost:1716/v1",
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization: `Bearer ${apiKey}`,
  },
});

export default request;
