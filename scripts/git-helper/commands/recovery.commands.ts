import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import * as git from "../services/git.service";
import { inputText, confirm } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function undoLastCommit(): Promise<void> {
  const keepChanges = await confirm("Keep changes in working tree (soft reset)?", true);
  const cmd = keepChanges ? "git reset --soft HEAD~1" : "git reset --hard HEAD~1";
  await runOperation({
    title: "Undo Last Commit",
    getCommand: () => cmd,
    learnId: keepChanges ? "git.commit.amend" : "git.reset.hard",
    dangerous: !keepChanges,
  });
}

export async function undoLastPushGuide(): Promise<void> {
  console.log(colors.warning("\nUndoing a push requires force push and team coordination.\n"));
  console.log("Typical flow: git reset locally → fix → git push --force-with-lease\n");
  await pause();
}

export async function recoverDeletedBranch(): Promise<void> {
  const log = await git.getReflog(30);
  console.log(colors.bold("\nRecent reflog (find branch tip commit):\n"));
  console.log(log || "(empty)");
  const hash = await inputText("Commit hash to recreate branch from:");
  const name = await inputText("New branch name:");
  const cmd = `git branch ${shellQuote(name)} ${shellQuote(hash)}`;
  await runOperation({
    title: "Recover Deleted Branch",
    getCommand: () => cmd,
    learnId: "git.reflog",
  });
}

export async function recoverLostCommit(): Promise<void> {
  const log = await git.getReflog(30);
  console.log(log);
  const hash = await inputText("Commit hash to checkout or cherry-pick:");
  const action = await inputText("Action: checkout | cherry-pick", "cherry-pick");
  const cmd =
    action.startsWith("c")
      ? `git cherry-pick ${shellQuote(hash)}`
      : `git checkout ${shellQuote(hash)}`;
  await runOperation({ title: "Recover Lost Commit", getCommand: () => cmd, learnId: "git.reflog" });
}

export async function recoverStash(): Promise<void> {
  await run("git fsck --no-reflogs | findstr commit", { allowFailure: true });
  await runOperation({
    title: "List Stashes",
    getCommand: () => "git stash list",
    learnId: "git.stash",
  });
}

export async function restoreDeletedFile(): Promise<void> {
  const file = await inputText("File path:");
  const cmd = `git checkout HEAD -- ${shellQuote(file)}`;
  await runOperation({ title: "Restore Deleted File", getCommand: () => cmd, learnId: "git.status" });
}

export async function restoreDeletedFolder(): Promise<void> {
  const folder = await inputText("Folder path:");
  const cmd = `git checkout HEAD -- ${shellQuote(folder)}`;
  await runOperation({ title: "Restore Deleted Folder", getCommand: () => cmd, learnId: "git.status" });
}

export async function fixDetachedHead(): Promise<void> {
  const branch = await inputText("Branch to attach to (or new branch name):");
  const create = await confirm("Create new branch from current HEAD?", false);
  const cmd = create ? `git switch -c ${shellQuote(branch)}` : `git switch ${shellQuote(branch)}`;
  await runOperation({ title: "Fix Detached HEAD", getCommand: () => cmd, learnId: "git.branch.create" });
}

export async function recoverAfterReset(): Promise<void> {
  const log = await git.getReflog(20);
  console.log(colors.bold("\nReflog — find state before reset:\n"));
  console.log(log);
  const hash = await inputText("Reset target (commit hash):");
  const cmd = `git reset --hard ${shellQuote(hash)}`;
  await runOperation({
    title: "Recover After Reset",
    getCommand: () => cmd,
    learnId: "git.reflog",
    dangerous: true,
  });
}

export async function recoverAfterForcePushGuide(): Promise<void> {
  console.log(colors.bold("\nRecover After Force Push\n"));
  console.log("1. git reflog on affected machines");
  console.log("2. Find last good commit");
  console.log("3. git reset --hard <hash> and force-with-lease push if needed");
  console.log("4. Teammates may need to reset to new remote\n");
  await pause();
}
