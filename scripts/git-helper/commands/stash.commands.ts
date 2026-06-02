import { runOperation } from "../services/operation.service";
import { run } from "../services/shell.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function createStash(): Promise<void> {
  await runOperation({
    title: "Create Stash",
    getCommand: () => "git stash push",
    learnId: "git.stash",
  });
}

export async function createNamedStash(): Promise<void> {
  const name = await inputText("Stash description:");
  await runOperation({
    title: "Named Stash",
    getCommand: () => `git stash push -m ${shellQuote(name)}`,
    learnId: "git.stash",
  });
}

export async function applyStash(): Promise<void> {
  const index = await inputText("Stash index (e.g. 0, or leave empty for latest):", "0");
  const cmd = index ? `git stash apply stash@{${index}}` : "git stash apply";
  await runOperation({ title: "Apply Stash", getCommand: () => cmd, learnId: "git.stash" });
}

export async function popStash(): Promise<void> {
  await runOperation({
    title: "Pop Stash",
    getCommand: () => "git stash pop",
    learnId: "git.stash",
  });
}

export async function deleteStash(): Promise<void> {
  const index = await inputText("Stash index to drop:", "0");
  await runOperation({
    title: "Delete Stash",
    getCommand: () => `git stash drop stash@{${index}}`,
    learnId: "git.stash",
    dangerous: true,
  });
}

export async function listAndRecoverStash(): Promise<void> {
  const r = await run("git stash list");
  console.log(r.stdout || "No stashes.");
  console.log(colors.info("\nRecover: git stash apply stash@{n}  |  git fsck --unreachable for lost stashes\n"));
  await pause();
}
