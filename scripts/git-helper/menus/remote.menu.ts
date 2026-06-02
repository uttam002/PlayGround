import inquirer from "inquirer";
import { addRemote, showRemotes } from "../commands/remote.commands";

export async function remoteMenu() {
  const { choice } = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "Remote Management",
    choices: ["Show Remotes", "Add Remote", "Back"]
  });

  if (choice === "Show Remotes") await showRemotes();
  if (choice === "Add Remote") await addRemote();
}