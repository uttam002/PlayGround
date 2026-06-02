import inquirer from "inquirer";

export async function inputText(
  message: string,
  defaultValue?: string,
): Promise<string> {
  const { value } = await inquirer.prompt<{ value: string }>([
    { type: "input", name: "value", message, default: defaultValue },
  ]);
  return value.trim();
}

export async function confirm(message: string, defaultValue = false): Promise<boolean> {
  const { value } = await inquirer.prompt<{ value: boolean }>([
    { type: "confirm", name: "value", message, default: defaultValue },
  ]);
  return value;
}

export async function selectFromList<T extends string>(
  message: string,
  choices: T[],
): Promise<T> {
  const { value } = await inquirer.prompt<{ value: T }>([
    { type: "list", name: "value", message, choices },
  ]);
  return value;
}
