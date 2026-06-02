const wrap =
  (open: string, close: string) =>
  (text: string): string =>
    `${open}${text}${close}`;

export const colors = {
  reset: (t: string) => t,
  bold: wrap("\x1b[1m", "\x1b[22m"),
  dim: wrap("\x1b[2m", "\x1b[22m"),
  success: wrap("\x1b[32m", "\x1b[0m"),
  warning: wrap("\x1b[33m", "\x1b[0m"),
  error: wrap("\x1b[31m", "\x1b[0m"),
  info: wrap("\x1b[36m", "\x1b[0m"),
  muted: wrap("\x1b[90m", "\x1b[0m"),
  highlight: wrap("\x1b[35m", "\x1b[0m"),
};

export function iconOk(text: string): string {
  return colors.success(`✓ ${text}`);
}

export function iconWarn(text: string): string {
  return colors.warning(`⚠ ${text}`);
}

export function iconErr(text: string): string {
  return colors.error(`✗ ${text}`);
}

export function iconInfo(text: string): string {
  return colors.info(`→ ${text}`);
}
