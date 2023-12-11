import * as React from "react";
import { hash } from "@saulx/hash";
import { styled } from "inlines";
import { IconCheckLarge, IconCopy } from "../Icons";
import {
  MUTED_SEMANTIC_COLORS,
  SEMANTIC_COLORS,
  SemanticColor,
} from "../../utils/colors";

export type BadgeProps = {
  children: string | number;
  color?: SemanticColor;
  size?: "regular" | "small";
  copyValue?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export function Badge({
  children,
  copyValue,
  color: colorProp = "informative",
  size = "regular",
  prefix,
  suffix,
}: BadgeProps) {
  const [showCheck, setShowCheck] = React.useState(false);

  const color = React.useMemo(() => {
    if (colorProp === "auto" || colorProp === "auto-muted") {
      const colors =
        colorProp === "auto" ? SEMANTIC_COLORS : MUTED_SEMANTIC_COLORS;

      const index =
        Math.floor(Math.abs(Math.sin(hash(children))) * (colors.length - 1)) +
        1;

      return colors[index];
    }

    return colorProp;
  }, [colorProp, children]);

  return (
    <styled.div
      onClick={() => {
        if (!copyValue) return;

        navigator.clipboard.writeText(copyValue);
        setShowCheck(true);
      }}
      style={{
        position: "relative",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        padding: "0 8px",
        borderRadius: "var(--radius-large)",
        fontWeight: 500,
        color: `var(--semantic-color-${color})`,
        background: `var(--semantic-background-${color})`,
        ...(size === "regular" && {
          fontSize: "14px",
          lineHeight: "24px",
        }),
        ...(size === "small" && {
          fontSize: "12px",
          lineHeight: "20px",
        }),
        ...(copyValue && {
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
      {prefix && prefix}
      {children}
      {suffix && suffix}
      {copyValue && (
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
            color: `var(--semantic-color-${color})`,
            background: `var(--semantic-background-${color})`,
            borderTopRightRadius: "var(--radius-large)",
            borderBottomRightRadius: "var(--radius-large)",
            padding: "0 8px 0 0",
          }}
        >
          {showCheck ? (
            <IconCheckLarge
              height={size === "regular" ? 16 : 12}
              width={size === "regular" ? 16 : 12}
            />
          ) : (
            <IconCopy
              height={size === "regular" ? 16 : 12}
              width={size === "regular" ? 16 : 12}
            />
          )}
        </span>
      )}
    </styled.div>
  );
}
