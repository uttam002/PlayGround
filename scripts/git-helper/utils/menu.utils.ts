import inquirer from "inquirer";

export const BACK = "← Back";
export const EXIT = "Exit";

export type MenuChoice = string;

export async function showMenu(
  message: string,
  choices: MenuChoice[],
): Promise<string> {
  const { choice } = await inquirer.prompt<{ choice: string }>([
    {
      type: "list",
      name: "choice",
      message,
      choices,
      pageSize: 15,
    },
  ]);
  return choice;
}

export async function pause(message = "Press Enter to continue..."): Promise<void> {
  await inquirer.prompt([{ type: "input", name: "_", message }]);
}
