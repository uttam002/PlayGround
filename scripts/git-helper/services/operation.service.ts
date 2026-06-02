import { showLearn } from "./learn.service";
import { guardDangerous } from "./safety.service";
import { run } from "./shell.service";
import { colors, iconInfo } from "../utils/colors";
import { selectFromList } from "../utils/prompt.utils";
import { pause } from "../utils/menu.utils";

export type OperationAction = "Execute" | "Show Command" | "Learn What This Does";

const ACTIONS: OperationAction[] = ["Execute", "Show Command", "Learn What This Does"];

export interface OperationOptions {
  title: string;
  /** Static command string or builder after prompts */
  getCommand: () => string | Promise<string>;
  learnId: string;
  /** Run the operation (default: shell run of getCommand) */
  execute?: () => Promise<void>;
  dangerous?: boolean;
  warningMessage?: string;
}

export async function runOperation(options: OperationOptions): Promise<void> {
  const action = await selectFromList<OperationAction>(
    options.title,
    ACTIONS,
  );

  if (action === "Learn What This Does") {
    showLearn(options.learnId);
    await pause();
    return;
  }

  const command = await options.getCommand();

  if (action === "Show Command") {
    console.log("");
    console.log(colors.dim("Command:"));
    console.log(colors.highlight(command));
    console.log("");
    await pause();
    return;
  }

  if (options.dangerous || command.includes("--hard") || command.includes("--force")) {
    const allowed = await guardDangerous(command, options.warningMessage);
    if (!allowed) {
      await pause();
      return;
    }
  }

  if (options.execute) {
    await options.execute();
  } else {
    console.log(iconInfo("Running..."));
    const result = await run(command);
    if (result.ok) {
      console.log(colors.success(result.stdout || "Done."));
    }
  }
  await pause();
}

/** Wrap a handler that already collected parameters into an operation menu. */
export async function offerOperationMenu(
  title: string,
  command: string,
  learnId: string,
  execute?: () => Promise<void>,
  dangerous?: boolean,
): Promise<void> {
  await runOperation({
    title,
    getCommand: () => command,
    learnId,
    execute,
    dangerous,
  });
}
