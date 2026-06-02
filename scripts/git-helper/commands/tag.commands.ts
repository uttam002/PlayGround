import { runOperation } from "../services/operation.service";
import { inputText } from "../utils/prompt.utils";
import { shellQuote } from "../utils/validation.utils";

export async function createTag(): Promise<void> {
  const name = await inputText("Tag name (e.g. v1.0.0):");
  await runOperation({
    title: "Create Tag",
    getCommand: () => `git tag ${shellQuote(name)}`,
    learnId: "git.tag",
  });
}

export async function createAnnotatedTag(): Promise<void> {
  const name = await inputText("Tag name:");
  const message = await inputText("Tag message:");
  await runOperation({
    title: "Annotated Tag",
    getCommand: () => `git tag -a ${shellQuote(name)} -m ${shellQuote(message)}`,
    learnId: "git.tag",
  });
}

export async function deleteTag(): Promise<void> {
  const name = await inputText("Tag to delete:");
  await runOperation({
    title: "Delete Tag",
    getCommand: () => `git tag -d ${shellQuote(name)}`,
    learnId: "git.tag",
    dangerous: true,
  });
}

export async function pushTag(): Promise<void> {
  const name = await inputText("Tag to push (or 'all'):", "all");
  const cmd = name === "all" ? "git push --tags" : `git push origin ${shellQuote(name)}`;
  await runOperation({ title: "Push Tag", getCommand: () => cmd, learnId: "git.tag" });
}

export async function releaseTagGuide(): Promise<void> {
  const name = await inputText("Release tag name:", "v1.0.0");
  const message = await inputText("Release notes summary:");
  await runOperation({
    title: "Release Tag",
    getCommand: () => `git tag -a ${shellQuote(name)} -m ${shellQuote(message)} && git push origin ${shellQuote(name)}`,
    learnId: "git.tag",
  });
}
