"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPulse = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const axios_1 = require("../configs/axios");
const sendPulse = async ({ payload }) => {
    try {
        await axios_1.default.post("/pulses", payload);
    }
    catch (error) {
        console.error("Error sending pulse:", error);
    }
};
exports.sendPulse = sendPulse;
//# sourceMappingURL=pulse.js.map