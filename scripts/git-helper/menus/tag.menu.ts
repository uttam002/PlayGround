import { BACK, showMenu } from "../utils/menu.utils";
import * as tag from "../commands/tag.commands";

export async function tagMenu(): Promise<void> {
  const choice = await showMenu("Tag Management", [
    "Create Tag",
    "Annotated Tag",
    "Delete Tag",
    "Push Tag",
    "Release Tag",
    BACK,
  ]);

  const handlers: Record<string, () => Promise<void>> = {
    "Create Tag": tag.createTag,
    "Annotated Tag": tag.createAnnotatedTag,
    "Delete Tag": tag.deleteTag,
    "Push Tag": tag.pushTag,
    "Release Tag": tag.releaseTagGuide,
  };

  const handler = handlers[choice];
  if (handler) await handler();
}
