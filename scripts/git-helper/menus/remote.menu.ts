import { BACK, showMenu } from "../utils/menu.utils";
import * as remote from "../commands/remote.commands";

export async function remoteMenu(): Promise<void> {
  const choice = await showMenu("Remote Management", [
    "Show Remotes",
    "Add Remote",
    "Remove Remote",
    "Update Remote",
    "Verify Remote",
    "Repository Not Found Fix",
    "Change Repository",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Show Remotes": remote.showRemotes,
    "Add Remote": remote.addRemote,
    "Remove Remote": remote.removeRemote,
    "Update Remote": remote.updateRemoteUrl,
    "Verify Remote": remote.verifyRemote,
    "Repository Not Found Fix": remote.repositoryNotFoundFix,
    "Change Repository": remote.changeRepository,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
