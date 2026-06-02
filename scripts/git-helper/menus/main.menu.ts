import inquirer from "inquirer";
import { branchMenu } from "./branch.menu";
import { remoteMenu } from "./remote.menu";

export async function mainMenu() {
  while (true) {
    const { choice } = await inquirer.prompt({
      type: "list",
      name: "choice",
      message: "Git Command Assistant",
      choices: ["Branch Management", "Remote Management", "Exit"]
    });

    if (choice === "Branch Management") await branchMenu();
    if (choice === "Remote Management") await remoteMenu();
    if (choice === "Exit") process.exit(0);
  }
}