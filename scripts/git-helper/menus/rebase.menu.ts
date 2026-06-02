import { BACK, showMenu } from "../utils/menu.utils";
import * as rebase from "../commands/rebase.commands";

export async function rebaseMenu(): Promise<void> {
  const choice = await showMenu("Rebase Operations", [
    "Start Rebase",
    "Interactive Rebase",
    "Continue Rebase",
    "Abort Rebase",
    "Skip Rebase Step",
    "Rebase Help",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Start Rebase": rebase.startRebase,
    "Interactive Rebase": rebase.interactiveRebase,
    "Continue Rebase": rebase.continueRebase,
    "Abort Rebase": rebase.abortRebase,
    "Skip Rebase Step": rebase.skipRebaseStep,
    "Rebase Help": rebase.rebaseHelp,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
