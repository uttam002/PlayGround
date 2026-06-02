import { printHealthReport, runHealthChecks } from "../services/doctor.service";
import { pause } from "../utils/menu.utils";

/** Repository Doctor — full health report. */
export async function doctorMenu(): Promise<void> {
  const report = await runHealthChecks();
  printHealthReport(report);
  await pause();
}
