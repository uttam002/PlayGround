import { BACK, showMenu } from "../utils/menu.utils";
import * as merge from "../commands/merge.commands";

export async function mergeMenu(): Promise<void> {
  const choice = await showMenu("Merge Operations", [
    "Merge Branch",
    "Fast Forward Merge",
    "No Fast Forward Merge",
    "Abort Merge",
    "Conflict Help",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Merge Branch": merge.mergeBranch,
    "Fast Forward Merge": merge.fastForwardMerge,
    "No Fast Forward Merge": merge.noFastForwardMerge,
    "Abort Merge": merge.abortMerge,
    "Conflict Help": merge.mergeConflictHelp,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
