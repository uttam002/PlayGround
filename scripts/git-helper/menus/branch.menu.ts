import inquirer from "inquirer";
import { createBranch, switchBranch } from "../commands/branch.commands";

export async function branchMenu() {
  const { choice } = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "Branch Management",
    choices: ["Create Branch", "Switch Branch", "Back"]
  });

  if (choice === "Create Branch") await createBranch();
  if (choice === "Switch Branch") await switchBranch();
}