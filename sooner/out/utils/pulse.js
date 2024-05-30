"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPulse = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("axios");
const sendPulse = async ({ api_key, payload }) => {
    if (api_key) {
        console.log(payload);
        try {
            const { data } = await axios_1.default.post("http://localhost:1716/pulse", payload, {
                headers: {
                    Authorization: `Bearer ${api_key}`,
                },
            });
            console.log(data);
        }
        catch (error) {
            console.error("Error sending pulse:", error);
        }
    }
};
exports.sendPulse = sendPulse;
//# sourceMappingURL=pulse.js.map