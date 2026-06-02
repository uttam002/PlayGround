import { BACK, showMenu } from "../utils/menu.utils";
import * as recovery from "../commands/recovery.commands";
import * as merge from "../commands/merge.commands";
import * as rebase from "../commands/rebase.commands";

export async function recoveryMenu(): Promise<void> {
  const choice = await showMenu("Recovery Operations", [
    "Undo Last Commit",
    "Undo Last Push",
    "Recover Deleted Branch",
    "Recover Lost Commit",
    "Recover Stash",
    "Restore Deleted File",
    "Restore Deleted Folder",
    "Fix Detached HEAD",
    "Abort Merge",
    "Abort Rebase",
    "Recover After Reset",
    "Recover After Force Push",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Undo Last Commit": recovery.undoLastCommit,
    "Undo Last Push": recovery.undoLastPushGuide,
    "Recover Deleted Branch": recovery.recoverDeletedBranch,
    "Recover Lost Commit": recovery.recoverLostCommit,
    "Recover Stash": recovery.recoverStash,
    "Restore Deleted File": recovery.restoreDeletedFile,
    "Restore Deleted Folder": recovery.restoreDeletedFolder,
    "Fix Detached HEAD": recovery.fixDetachedHead,
    "Abort Merge": merge.abortMerge,
    "Abort Rebase": rebase.abortRebase,
    "Recover After Reset": recovery.recoverAfterReset,
    "Recover After Force Push": recovery.recoverAfterForcePushGuide,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
