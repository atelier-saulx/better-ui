import * as React from "react";
import { hash } from "@saulx/hash";
import { styled } from "inlines";

export type AvatarProps = {
  src?: string;
  placeholder?: string;
  size?: "large" | "regular" | "small";
  shape?: "square" | "circle";
};

export function Avatar({
  src,
  placeholder,
  size = "regular",
  shape = "square",
}: AvatarProps) {
  const color = React.useMemo(() => {
    if (!placeholder) return;

    const colors = ["neutral", "informative", "positive", "warning", "error"];

    const index =
      Math.floor(Math.abs(Math.sin(hash(placeholder))) * (colors.length - 1)) +
      1;

    return colors[index];
  }, [placeholder]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: `var(--semantic-color-muted-${color})`,
        background: `var(--semantic-background-muted-${color})`,
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
          width: 34,
          height: 34,
        }),
      }}
    >
      {src && (
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={src}
        />
      )}
      {placeholder && (
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
          }}
        >
          {placeholder}
        </span>
      )}
    </div>
  );
}
