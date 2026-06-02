import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import { inputText, confirm } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function createCommit(): Promise<void> {
  const message = await inputText("Commit message:");
  const stageAll = await confirm("Stage all modified files (git add -A)?", true);
  await runOperation({
    title: "Create Commit",
    getCommand: () =>
      stageAll
        ? `git add -A && git commit -m ${shellQuote(message)}`
        : `git commit -m ${shellQuote(message)}`,
    learnId: "git.commit",
    execute: async () => {
      if (stageAll) await run("git add -A");
      await run(`git commit -m ${shellQuote(message)}`);
    },
  });
}

export async function amendCommit(): Promise<void> {
  const editMsg = await confirm("Change commit message?", false);
  let cmd = "git commit --amend";
  if (editMsg) {
    const message = await inputText("New message:");
    cmd = `git commit --amend -m ${shellQuote(message)}`;
  } else {
    cmd = "git commit --amend --no-edit";
  }
  await runOperation({
    title: "Amend Commit",
    getCommand: () => cmd,
    learnId: "git.commit.amend",
    warningMessage: "Only amend commits that have NOT been pushed.",
  });
}

export async function editCommitMessage(): Promise<void> {
  const message = await inputText("New message for last commit:");
  const cmd = `git commit --amend -m ${shellQuote(message)}`;
  await runOperation({ title: "Edit Commit Message", getCommand: () => cmd, learnId: "git.commit.amend" });
}

export async function viewCommitLog(): Promise<void> {
  await runOperation({
    title: "View Commit Log",
    getCommand: () => "git log --oneline --graph -20",
    learnId: "git.commit",
  });
}

export async function searchCommit(): Promise<void> {
  const term = await inputText("Search term (message or author):");
  const cmd = `git log --oneline --grep=${shellQuote(term)} -i`;
  await runOperation({ title: "Search Commits", getCommand: () => cmd, learnId: "git.commit" });
}

export async function squashCommitsGuide(): Promise<void> {
  const n = await inputText("How many recent commits to squash (e.g. 3):", "3");
  const cmd = `git rebase -i HEAD~${n}`;
  console.log(colors.info("\nInteractive rebase opens your editor. Mark commits as 'squash' or 's'.\n"));
  await runOperation({ title: "Squash Commits", getCommand: () => cmd, learnId: "git.rebase" });
}

export async function splitCommitGuide(): Promise<void> {
  console.log(colors.info("\nTo split a commit: git rebase -i, mark commit 'edit', then git reset HEAD~1 and commit in parts.\n"));
  const cmd = "git rebase -i HEAD~1";
  await runOperation({ title: "Split Commit", getCommand: () => cmd, learnId: "git.rebase" });
}
