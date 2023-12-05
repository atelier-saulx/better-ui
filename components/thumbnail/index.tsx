import * as React from "react";
import { hash } from "@saulx/hash";
import { styled } from "inlines";
import {
  MUTED_SEMANTIC_COLORS,
  SEMANTIC_COLORS,
  SemanticColor,
} from "../../utils/semantic-color";

export type ThumbnailProps = {
  src?: string;
  text?: string;
  color?: SemanticColor;
  size?: "large" | "regular" | "small" | "extra-small";
  shape?: "square" | "circle";
};

export function Thumbnail({
  src,
  text,
  size = "regular",
  shape = "square",
  color: colorProp = "auto",
}: ThumbnailProps) {
  const color = React.useMemo(() => {
    if (!text) return;

    if (colorProp === "auto" || colorProp === "auto-muted") {
      const colors =
        colorProp === "auto" ? SEMANTIC_COLORS : MUTED_SEMANTIC_COLORS;

      const index =
        Math.floor(Math.abs(Math.sin(hash(text))) * (colors.length - 1)) + 1;

      return colors[index];
    }

    return colorProp;
  }, [colorProp, text]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: `var(--semantic-color-${color})`,
        background: `var(--semantic-background-${color})`,
        overflow: "hidden",
        ...(shape === "square" && {
          borderRadius: "var(--radius-medium)",
        }),
        ...(shape === "circle" && {
          borderRadius: 9999,
        }),
        ...(size === "large" && {
          width: 48,
          height: 48,
        }),
        ...(size === "regular" && {
          width: 40,
          height: 40,
        }),
        ...(size === "small" && {
          width: 32,
          height: 32,
        }),
        ...(size === "extra-small" && {
          width: 24,
          height: 24,
        }),
      }}
    >
      {src && (
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={src}
        />
      )}
      {text && (
        <span
          style={{
            ...(size === "large" && {
              fontSize: "18px",
              fontWeight: 700,
            }),
            ...(size === "regular" && {
              fontSize: "16px",
              fontWeight: 600,
            }),
            ...(size === "small" && {
              fontSize: "12px",
              fontWeight: 600,
            }),
            ...(size === "extra-small" && {
              fontSize: "10px",
              fontWeight: 500,
            }),
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
}
