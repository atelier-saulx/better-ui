type Color = {
  content: "primary" | "inverted" | "secondary";
  background: "neutral" | "muted" | "dimmer" | "screen";
  interactive: "primary" | "primary-hover" | "secondary" | "secondary-hover";
};

export const color = <T extends keyof Color>(
  group: T,
  color: Color[T]
): string => {
  return `var(--${group}-${color})`;
};

export const border = (
  color: "default" | "muted" | "focus" = "default",
  size: number = 1
): string => {
  return `${size}px solid var(--border-${color})`;
};
