import { BACK, showMenu } from "../utils/menu.utils";
import * as stash from "../commands/stash.commands";

export async function stashMenu(): Promise<void> {
  const choice = await showMenu("Stash Operations", [
    "Create Stash",
    "Named Stash",
    "Apply Stash",
    "Pop Stash",
    "Delete Stash",
    "Recover Stash",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Create Stash": stash.createStash,
    "Named Stash": stash.createNamedStash,
    "Apply Stash": stash.applyStash,
    "Pop Stash": stash.popStash,
    "Delete Stash": stash.deleteStash,
    "Recover Stash": stash.listAndRecoverStash,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
