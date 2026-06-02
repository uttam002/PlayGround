import { run } from "../services/shell.service";
import * as git from "../services/git.service";
import { translateGitError } from "../services/error-translator.service";
import { runOperation } from "../services/operation.service";
import { inputText, confirm } from "../utils/prompt.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

interface TroubleshootIssue {
  id: string;
  title: string;
  cause: string;
  impact: string;
  fixes: string[];
  autoRepair?: () => Promise<void>;
}

const ISSUES: TroubleshootIssue[] = [
  {
    id: "repo-not-found",
    title: "Repository Not Found",
    cause: "Remote URL is wrong, repo was deleted, or you lack access.",
    impact: "Cannot push, pull, or clone.",
    fixes: ["Verify URL with Show Remotes", "Re-authenticate GitHub", "Create repo on GitHub"],
    autoRepair: async () => {
      console.log(await git.getRemoteVerbose());
    },
  },
  {
    id: "auth-failed",
    title: "Authentication Failed",
    cause: "Invalid credentials, expired token, or SSH key not configured.",
    impact: "All remote operations fail.",
    fixes: ["gh auth login", "Update credential manager", "Use SSH remote URL"],
  },
  {
    id: "detached-head",
    title: "Detached HEAD",
    cause: "Checked out a commit or tag instead of a branch.",
    impact: "New commits may not belong to any branch.",
    fixes: ["git switch <branch>", "Create branch from current HEAD"],
    autoRepair: async () => {
      const branch = await inputText("Branch name to switch or create:");
      const create = await confirm("Create new branch?", false);
      const cmd = create ? `git switch -c ${branch}` : `git switch ${branch}`;
      await run(cmd);
    },
  },
  {
    id: "merge-conflict",
    title: "Merge Conflict",
    cause: "Same lines changed on both branches.",
    impact: "Merge paused until conflicts resolved.",
    fixes: ["Resolve files", "git add", "git commit or merge --continue"],
  },
  {
    id: "rebase-conflict",
    title: "Rebase Conflict",
    cause: "Conflicting changes while replaying commits.",
    impact: "Rebase paused mid-way.",
    fixes: ["Resolve", "git add", "git rebase --continue", "or git rebase --abort"],
  },
  {
    id: "upstream-missing",
    title: "Upstream Missing",
    cause: "Branch has no tracking remote branch.",
    impact: "git push/pull may not know default remote branch.",
    fixes: ["git push -u origin <branch>"],
    autoRepair: async () => {
      const branch = (await git.getCurrentBranch()) ?? await inputText("Branch:");
      await run(`git push -u origin ${branch}`);
    },
  },
  {
    id: "remote-missing",
    title: "Remote Missing",
    cause: "No remote configured (common after git init).",
    impact: "Cannot sync with GitHub.",
    fixes: ["git remote add origin <url>"],
    autoRepair: async () => {
      const url = await inputText("Remote URL:");
      await run(`git remote add origin ${url}`);
    },
  },
  {
    id: "remote-exists",
    title: "Remote Already Exists",
    cause: "Adding a remote with a name already in use.",
    impact: "git remote add fails.",
    fixes: ["Use git remote set-url", "Remove remote first"],
  },
  {
    id: "permission-denied",
    title: "Permission Denied",
    cause: "No write access or SSH key not authorized.",
    impact: "Push and sometimes fetch fail.",
    fixes: ["Check repo permissions", "Re-auth", "Verify SSH agent"],
  },
  {
    id: "branch-not-found",
    title: "Branch Not Found",
    cause: "Branch name typo or branch only exists on remote.",
    impact: "Checkout, merge, or push fail.",
    fixes: ["git fetch", "git branch -a", "Create or track branch"],
    autoRepair: async () => {
      await run("git fetch --all --prune");
      await run("git branch -a");
    },
  },
  {
    id: "non-ff",
    title: "Non Fast Forward Error",
    cause: "Remote has commits you lack; push would discard them.",
    impact: "Push rejected.",
    fixes: ["git pull --rebase", "Then push", "Avoid force push on shared branches"],
    autoRepair: async () => {
      const useRebase = await confirm("Pull with rebase?", true);
      await run(useRebase ? "git pull --rebase" : "git pull");
    },
  },
];

export async function runTroubleshootIssue(issueId: string): Promise<void> {
  const issue = ISSUES.find((i) => i.id === issueId);
  if (!issue) return;

  console.log(colors.bold(`\n${issue.title}\n`));
  console.log(colors.info("Cause:"), issue.cause);
  console.log(colors.warning("Impact:"), issue.impact);
  console.log(colors.success("\nFixes:"));
  issue.fixes.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));

  if (issue.autoRepair) {
    const runFix = await confirm("\nAttempt automatic repair?", false);
    if (runFix) {
      await issue.autoRepair();
      console.log(colors.success("Repair attempted."));
    }
  }
  await pause();
}

export async function diagnoseLastError(): Promise<void> {
  const sample = await inputText("Paste Git error message (or Enter to skip):");
  if (sample.trim()) {
    const t = translateGitError(sample);
    console.log(colors.bold(t.title));
    console.log(t.explanation);
    t.suggestions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  }
  await pause();
}

export function getTroubleshootIssues(): TroubleshootIssue[] {
  return ISSUES;
}

export async function runFetchPrune(): Promise<void> {
  await runOperation({
    title: "Fetch and Prune",
    getCommand: () => "git fetch --all --prune",
    learnId: "git.fetch",
  });
}
