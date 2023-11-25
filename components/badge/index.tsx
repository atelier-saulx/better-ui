import * as React from "react";
import { hash } from "@saulx/hash";
import { styled } from "inlines";
import "./badge-colors.css";
import { CheckLarge, Copy } from "../icons";

export type BadgeProps = {
  children: string | number;
  color?: "auto" | "neutral" | "informative" | "positive" | "warning" | "error";
  style?: "regular" | "muted";
  size?: "regular" | "small";
  copyable?: boolean;
};

export function Badge({
  children,
  color: colorProp = "neutral",
  copyable = false,
  style = "regular",
  size = "regular",
}: BadgeProps) {
  const [showCheck, setShowCheck] = React.useState(false);

  const color = React.useMemo(() => {
    if (colorProp === "auto") {
      const colors = ["neutral", "informative", "positive", "warning", "error"];

      const index =
        Math.floor(Math.abs(Math.sin(hash(children))) * (colors.length - 1)) +
        1;

      return colors[index];
    }

    return colorProp;
  }, [colorProp]);

  return (
    <styled.div
      onClick={() => {
        if (!copyable) return;

        navigator.clipboard.writeText(`${children}`);
        setShowCheck(true);
      }}
      style={{
        position: "relative",
        display: "inline-block",
        padding: "0 8px",
        borderRadius: "var(--radius-large)",
        fontWeight: 500,
        color: `var(--badge-color-${style}-${color})`,
        background: `var(--badge-background-${style}-${color})`,
        ...(size === "regular" && {
          fontSize: "14px",
          lineHeight: "24px",
        }),
        ...(size === "small" && {
          fontSize: "12px",
          lineHeight: "20px",
        }),
        ...(copyable && {
          cursor: "copy",
          "&:hover": {
            borderTopRightRadius: "0 !important",
            borderBottomRightRadius: "0 !important",
          },
          "&:hover > .badge-copyable": {
            display: "flex !important",
          },
        }),
      }}
      onMouseLeave={() => {
        setShowCheck(false);
      }}
    >
      {children}
      {copyable && (
        <span
          className="badge-copyable"
          style={{
            display: "none",
            justifyContent: "center",
            alignItems: "center",
            ...(size === "regular" && {
              height: "24px",
            }),
            ...(size === "small" && {
              height: "20px",
            }),
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translateX(100%)",
            color: `var(--badge-color-${style}-${color})`,
            background: `var(--badge-background-${style}-${color})`,
            borderTopRightRadius: "var(--radius-large)",
            borderBottomRightRadius: "var(--radius-large)",
            padding: "0 8px 0 0",
          }}
        >
          {showCheck ? (
            <CheckLarge
              height={size === "regular" ? 16 : 12}
              width={size === "regular" ? 16 : 12}
            />
          ) : (
            <Copy
              height={size === "regular" ? 16 : 12}
              width={size === "regular" ? 16 : 12}
            />
          )}
        </span>
      )}
    </styled.div>
  );
}
