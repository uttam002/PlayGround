import { colors } from "../utils/colors";
import { confirm } from "../utils/prompt.utils";
import { isDangerousCommand } from "../constants/dangerous-commands";

export async function confirmDangerous(
  command: string,
  extraWarning?: string,
): Promise<boolean> {
  console.log("");
  console.log(colors.error(colors.bold("WARNING")));
  console.log(colors.warning("This command may permanently remove or overwrite data.\n"));
  if (extraWarning) console.log(colors.muted(extraWarning + "\n"));
  console.log(colors.dim("Command:"));
  console.log(colors.highlight(`  ${command}\n`));
  const ok = await confirm("Continue?", false);
  if (!ok) console.log(colors.muted("Cancelled — no changes made."));
  return ok;
}

export async function guardDangerous(command: string, extraWarning?: string): Promise<boolean> {
  if (!isDangerousCommand(command)) return true;
  return confirmDangerous(command, extraWarning);
}
