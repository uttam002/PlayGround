import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import * as git from "../services/git.service";
import { inputText, confirm } from "../utils/prompt.utils";
import { isValidBranchName, shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

async function promptBranch(message: string): Promise<string> {
  const branches = await git.listBranches();
  const name = await inputText(message + (branches.length ? ` [${branches.join(", ")}]` : ""));
  if (!isValidBranchName(name)) throw new Error("Invalid branch name");
  return name;
}

export async function showCurrentBranch(): Promise<void> {
  const branch = await git.getCurrentBranch();
  console.log(colors.info(`\nCurrent branch: ${branch ?? "unknown"}\n`));
  await pause();
}

export async function listBranches(): Promise<void> {
  await runOperation({
    title: "List Branches",
    getCommand: () => "git branch -avv",
    learnId: "git.branch.create",
  });
}

export async function createBranch(): Promise<void> {
  const name = await promptBranch("New branch name:");
  const cmd = `git switch -c ${shellQuote(name)}`;
  await runOperation({ title: "Create Branch", getCommand: () => cmd, learnId: "git.branch.create" });
}

export async function renameBranch(): Promise<void> {
  const oldName = await promptBranch("Branch to rename:");
  const newName = await promptBranch("New name:");
  const cmd = `git branch -m ${shellQuote(oldName)} ${shellQuote(newName)}`;
  await runOperation({ title: "Rename Branch", getCommand: () => cmd, learnId: "git.branch.create" });
}

export async function deleteBranch(): Promise<void> {
  const name = await promptBranch("Branch to delete:");
  const cmd = `git branch -d ${shellQuote(name)}`;
  await runOperation({ title: "Delete Branch", getCommand: () => cmd, learnId: "git.branch.delete" });
}

export async function forceDeleteBranch(): Promise<void> {
  const name = await promptBranch("Branch to force delete:");
  const cmd = `git branch -D ${shellQuote(name)}`;
  await runOperation({
    title: "Force Delete Branch",
    getCommand: () => cmd,
    learnId: "git.branch.delete",
    dangerous: true,
  });
}

export async function switchBranch(): Promise<void> {
  const name = await promptBranch("Switch to branch:");
  const cmd = `git switch ${shellQuote(name)}`;
  await runOperation({ title: "Switch Branch", getCommand: () => cmd, learnId: "git.branch.create" });
}

export async function mergeBranch(): Promise<void> {
  const name = await promptBranch("Merge branch into current:");
  const cmd = `git merge ${shellQuote(name)}`;
  await runOperation({ title: "Merge Branch", getCommand: () => cmd, learnId: "git.merge" });
}

export async function branchCleanup(): Promise<void> {
  const merged = await confirm("Delete local branches already merged into current?", false);
  const cmd = merged
    ? "git branch --merged | findstr /v \"\\*\\|main\\|master\" && for /f %i in ('git branch --merged ^| findstr /v \"\\\\*\\\\|main\\\\|master\"') do git branch -d %i"
    : "git branch --merged";
  console.log(colors.warning("\nBranch cleanup lists merged branches. Review before deleting.\n"));
  if (!merged) {
    await runOperation({ title: "Branch Cleanup (preview)", getCommand: () => "git branch --merged", learnId: "git.branch.delete" });
    return;
  }
  await runOperation({
    title: "Branch Cleanup",
    getCommand: () => "git fetch --prune && git branch -vv",
    learnId: "git.branch.delete",
    execute: async () => {
      await run("git fetch --prune");
      const r = await run("git branch --merged");
      console.log(r.stdout || "No merged branches.");
      console.log(colors.muted("Delete branches individually via Delete Branch for safety."));
    },
  });
}

export async function trackRemoteBranch(): Promise<void> {
  const remote = await inputText("Remote name:", "origin");
  const branch = await promptBranch("Remote branch to track:");
  const cmd = `git switch --track ${shellQuote(remote)}/${shellQuote(branch)}`;
  await runOperation({ title: "Track Remote Branch", getCommand: () => cmd, learnId: "git.branch.create" });
}
