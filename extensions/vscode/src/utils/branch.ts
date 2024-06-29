import simpleGit from "simple-git";

const git = simpleGit();

export const getCurrentBranch = async (
  path: string
): Promise<string | null> => {
  if (path) {
    try {
      const branchSummary = await git.cwd(path).branch();
      return branchSummary.current;
    } catch (error) {
      return null;
    }
  }
  return null;
};
