import { BACK, showMenu } from "../utils/menu.utils";
import * as repo from "../commands/repo.commands";

export async function repoMenu(): Promise<void> {
  const choice = await showMenu("Repository Management", [
    "Initialize Repository",
    "Clone Repository",
    "Show Repository Information",
    "Repository Status",
    "Repository Health",
    "Repository Statistics",
    "Archive Repository",
    BACK,
  ]);

  switch (choice) {
    case "Initialize Repository":
      await repo.initRepository();
      break;
    case "Clone Repository":
      await repo.cloneRepository();
      break;
    case "Show Repository Information":
      await repo.showRepositoryInfo();
      break;
    case "Repository Status":
      await repo.repositoryStatus();
      break;
    case "Repository Health":
      await repo.repositoryHealth();
      break;
    case "Repository Statistics":
      await repo.repositoryStatistics();
      break;
    case "Archive Repository":
      await repo.archiveRepository();
      break;
  }
}
