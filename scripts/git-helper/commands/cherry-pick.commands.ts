import { runOperation } from "../services/operation.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function cherryPickSingle(): Promise<void> {
  const hash = await inputText("Commit hash:");
  await runOperation({
    title: "Cherry Pick Single Commit",
    getCommand: () => `git cherry-pick ${shellQuote(hash)}`,
    learnId: "git.cherry-pick",
  });
}

export async function cherryPickMultiple(): Promise<void> {
  const range = await inputText("Commit range (e.g. abc1234..def5678):");
  await runOperation({
    title: "Cherry Pick Multiple",
    getCommand: () => `git cherry-pick ${range}`,
    learnId: "git.cherry-pick",
  });
}

export async function cherryPickHelp(): Promise<void> {
  console.log(colors.bold("\nCherry Pick Help\n"));
  console.log("Applies changes from specific commit(s) onto current branch.");
  console.log("On conflict: resolve → git add → git cherry-pick --continue");
  console.log("Abort: git cherry-pick --abort\n");
  await pause();
}

export async function cherryPickConflictHelp(): Promise<void> {
  console.log(colors.bold("\nCherry Pick Conflict Resolution\n"));
  console.log("1. Fix conflicted files");
  console.log("2. git add <files>");
  console.log("3. git cherry-pick --continue\n");
  await pause();
}
