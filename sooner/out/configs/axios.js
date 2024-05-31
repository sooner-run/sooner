"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const vscode = require("vscode");
const apiKey = vscode.workspace.getConfiguration().get("apiKey");
const request = axios_1.default.create({
    baseURL: "http://localhost:1716/v1",
    headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${apiKey}`,
    },
});
exports.default = request;
//# sourceMappingURL=axios.js.map