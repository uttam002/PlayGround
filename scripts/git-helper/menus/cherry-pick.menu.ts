import { BACK, showMenu } from "../utils/menu.utils";
import * as cherry from "../commands/cherry-pick.commands";

export async function cherryPickMenu(): Promise<void> {
  const choice = await showMenu("Cherry Pick Operations", [
    "Single Commit",
    "Multiple Commits",
    "Cherry Pick Help",
    "Conflict Resolution",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Single Commit": cherry.cherryPickSingle,
    "Multiple Commits": cherry.cherryPickMultiple,
    "Cherry Pick Help": cherry.cherryPickHelp,
    "Conflict Resolution": cherry.cherryPickConflictHelp,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
