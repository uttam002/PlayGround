import { runOperation } from "../services/operation.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";
import { colors } from "../utils/colors";
import { pause } from "../utils/menu.utils";

export async function startRebase(): Promise<void> {
  const onto = await inputText("Rebase onto branch:", "main");
  await runOperation({
    title: "Start Rebase",
    getCommand: () => `git rebase ${shellQuote(onto)}`,
    learnId: "git.rebase",
  });
}

export async function interactiveRebase(): Promise<void> {
  const n = await inputText("Commits to edit (e.g. 3 for HEAD~3):", "3");
  await runOperation({
    title: "Interactive Rebase",
    getCommand: () => `git rebase -i HEAD~${n}`,
    learnId: "git.rebase",
  });
}

export async function continueRebase(): Promise<void> {
  await runOperation({
    title: "Continue Rebase",
    getCommand: () => "git rebase --continue",
    learnId: "git.rebase",
  });
}

export async function abortRebase(): Promise<void> {
  await runOperation({
    title: "Abort Rebase",
    getCommand: () => "git rebase --abort",
    learnId: "git.rebase",
  });
}

export async function skipRebaseStep(): Promise<void> {
  await runOperation({
    title: "Skip Rebase Step",
    getCommand: () => "git rebase --skip",
    learnId: "git.rebase",
  });
}

export async function rebaseHelp(): Promise<void> {
  console.log(colors.bold("\nRebase Help\n"));
  console.log("• Start: replay your commits on top of another branch");
  console.log("• Conflicts: fix files → git add → git rebase --continue");
  console.log("• Abort: git rebase --abort restores pre-rebase state");
  console.log("• Interactive (-i): squash, reorder, or edit commits\n");
  await pause();
}
