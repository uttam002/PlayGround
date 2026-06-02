import { BACK, showMenu } from "../utils/menu.utils";
import * as branch from "../commands/branch.commands";

export async function branchMenu(): Promise<void> {
  const choice = await showMenu("Branch Management", [
    "Current Branch",
    "List Branches",
    "Create Branch",
    "Rename Branch",
    "Delete Branch",
    "Force Delete Branch",
    "Switch Branch",
    "Merge Branch",
    "Branch Cleanup",
    "Track Remote Branch",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Current Branch": branch.showCurrentBranch,
    "List Branches": branch.listBranches,
    "Create Branch": branch.createBranch,
    "Rename Branch": branch.renameBranch,
    "Delete Branch": branch.deleteBranch,
    "Force Delete Branch": branch.forceDeleteBranch,
    "Switch Branch": branch.switchBranch,
    "Merge Branch": branch.mergeBranch,
    "Branch Cleanup": branch.branchCleanup,
    "Track Remote Branch": branch.trackRemoteBranch,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
