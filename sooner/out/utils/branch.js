"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentBranch = void 0;
const simple_git_1 = require("simple-git");
const git = (0, simple_git_1.default)();
const getCurrentBranch = async (path) => {
    if (path) {
        try {
            const branchSummary = await git.cwd(path).branch();
            return branchSummary.current;
        }
        catch (error) {
            return null;
        }
    }
    return null;
};
exports.getCurrentBranch = getCurrentBranch;
//# sourceMappingURL=branch.js.map