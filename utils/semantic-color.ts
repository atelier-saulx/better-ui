export type SemanticColor =
  | "auto"
  | "neutral"
  | "informative"
  | "positive"
  | "warning"
  | "error"
  | "auto-muted"
  | "neutral-muted"
  | "informative-muted"
  | "positive-muted"
  | "warning-muted"
  | "error-muted";

export const SEMANTIC_COLORS = [
  "neutral",
  "informative",
  "positive",
  "warning",
  "error",
];

export const MUTED_SEMANTIC_COLORS = [
  "neutral-muted",
  "informative-muted",
  "positive-muted",
  "warning-muted",
  "error-muted",
];
