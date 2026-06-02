export interface TranslatedError {
  title: string;
  explanation: string;
  suggestions: string[];
}

export const ERROR_PATTERNS: Array<{
  pattern: RegExp;
  translate: (match?: RegExpMatchArray) => TranslatedError;
}> = [
  {
    pattern: /pathspec .+ did not match/i,
    translate: () => ({
      title: "Branch or path not found",
      explanation: "The specified branch, tag, or file path does not exist in this repository.",
      suggestions: [
        "Verify the branch name (typo or wrong casing)",
        "Run Fetch to update remote branch list",
        "List branches to see available names",
        "Create the branch if it should exist locally",
      ],
    }),
  },
  {
    pattern: /not a git repository/i,
    translate: () => ({
      title: "Not a Git repository",
      explanation: "The current directory is not inside a Git repository.",
      suggestions: [
        "Run Initialize Repository in the target folder",
        "cd into your project root",
        "Clone the repository if you have not yet",
      ],
    }),
  },
  {
    pattern: /authentication failed|invalid username or password/i,
    translate: () => ({
      title: "Authentication failed",
      explanation: "Git could not authenticate with the remote (wrong credentials or expired token).",
      suggestions: [
        "Use GitHub Login (gh auth login)",
        "Verify SSH keys or personal access token",
        "Check credential manager for stale entries",
      ],
    }),
  },
  {
    pattern: /repository not found/i,
    translate: () => ({
      title: "Repository not found",
      explanation: "The remote URL points to a repo that does not exist or you lack access.",
      suggestions: [
        "Verify remote URL (git remote -v)",
        "Confirm you have access on GitHub",
        "Re-authenticate with GitHub",
        "Create the repository on GitHub if missing",
      ],
    }),
  },
  {
    pattern: /permission denied/i,
    translate: () => ({
      title: "Permission denied",
      explanation: "You do not have permission to read or write this resource.",
      suggestions: [
        "Confirm repository access on GitHub",
        "Use SSH or HTTPS with a valid token",
        "Ask the owner for write access",
      ],
    }),
  },
  {
    pattern: /non-fast-forward|rejected.*fetch first/i,
    translate: () => ({
      title: "Non fast-forward push rejected",
      explanation: "The remote has commits you do not have locally. A normal push would overwrite history.",
      suggestions: [
        "Pull or fetch and merge/rebase first",
        "Use Force With Lease only if you intend to overwrite remote",
        "Review git log on both local and remote",
      ],
    }),
  },
  {
    pattern: /merge conflict|CONFLICT/i,
    translate: () => ({
      title: "Merge conflict",
      explanation: "Git could not automatically merge changes in one or more files.",
      suggestions: [
        "Open conflicted files and resolve markers",
        "Use Merge Conflict Help in Troubleshooting",
        "Abort merge if you want to start over",
      ],
    }),
  },
  {
    pattern: /rebase in progress|rebase-merge/i,
    translate: () => ({
      title: "Rebase in progress",
      explanation: "A rebase was started but not finished.",
      suggestions: [
        "Resolve conflicts, then Continue Rebase",
        "Abort Rebase to return to pre-rebase state",
        "Use Rebase Help in the Rebase menu",
      ],
    }),
  },
  {
    pattern: /detached HEAD/i,
    translate: () => ({
      title: "Detached HEAD",
      explanation: "You are not on a branch; new commits may be hard to find later.",
      suggestions: [
        "Switch to a branch",
        "Use Fix Detached HEAD in Recovery",
        "Create a branch to keep your work",
      ],
    }),
  },
  {
    pattern: /remote .+ already exists/i,
    translate: () => ({
      title: "Remote already exists",
      explanation: "A remote with that name is already configured.",
      suggestions: [
        "Use a different remote name",
        "Update Remote URL instead of adding",
        "Remove the remote first if replacing",
      ],
    }),
  },
  {
    pattern: /no upstream branch|set-upstream/i,
    translate: () => ({
      title: "No upstream branch",
      explanation: "The current branch is not linked to a remote tracking branch.",
      suggestions: [
        "Use Upstream Setup in Sync Operations",
        "Push with -u origin <branch> once",
      ],
    }),
  },
  {
    pattern: /couldn't find remote ref|branch .+ not found/i,
    translate: () => ({
      title: "Branch not found on remote",
      explanation: "The remote does not have a branch with that name.",
      suggestions: [
        "Fetch latest from remote",
        "Push the branch if it only exists locally",
        "Check branch name spelling",
      ],
    }),
  },
];
