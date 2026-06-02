import { BACK, showMenu } from "../utils/menu.utils";
import * as sync from "../commands/sync.commands";

export async function syncMenu(): Promise<void> {
  const choice = await showMenu("Sync Operations", [
    "Fetch",
    "Pull",
    "Push",
    "Force Push",
    "Force With Lease",
    "Upstream Setup",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    Fetch: sync.fetchRemote,
    Pull: sync.pullChanges,
    Push: sync.pushChanges,
    "Force Push": sync.forcePush,
    "Force With Lease": sync.forcePushWithLease,
    "Upstream Setup": sync.setupUpstream,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
