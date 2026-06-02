import { runOperation } from "../services/operation.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function mergeBranch(): Promise<void> {
  const branch = await inputText("Branch to merge into current:");
  await runOperation({
    title: "Merge Branch",
    getCommand: () => `git merge ${shellQuote(branch)}`,
    learnId: "git.merge",
  });
}

export async function fastForwardMerge(): Promise<void> {
  const branch = await inputText("Branch to merge (fast-forward only):");
  await runOperation({
    title: "Fast Forward Merge",
    getCommand: () => `git merge --ff-only ${shellQuote(branch)}`,
    learnId: "git.merge",
  });
}

export async function noFastForwardMerge(): Promise<void> {
  const branch = await inputText("Branch to merge (always create merge commit):");
  await runOperation({
    title: "No Fast Forward Merge",
    getCommand: () => `git merge --no-ff ${shellQuote(branch)}`,
    learnId: "git.merge",
  });
}

export async function abortMerge(): Promise<void> {
  await runOperation({
    title: "Abort Merge",
    getCommand: () => "git merge --abort",
    learnId: "git.merge",
  });
}

export async function mergeConflictHelp(): Promise<void> {
  console.log(colors.bold("\nMerge Conflict Help\n"));
  console.log("1. Run: git status — see conflicted files");
  console.log("2. Open each file; resolve <<<<<<< ======= >>>>>>> markers");
  console.log("3. git add <resolved-files>");
  console.log("4. git commit (or git merge --continue)\n");
  console.log("To cancel: git merge --abort\n");
  await pause();
}
