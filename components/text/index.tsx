import * as React from "react";

export type TextProps = {
  children: React.ReactNode;
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4";
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: React.CSSProperties;
  align?: "left" | "center" | "right";
  size?: 10 | 12 | 14 | 16 | 18 | 24 | 32 | 40 | 48;
  lineHeight?: 16 | 20 | 24 | 28 | 32 | 36 | 44 | 56 | 64;
  color?: "primary" | "secondary" | "inverted";
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "p",
      weight = 400,
      align = "left",
      size = 16,
      lineHeight = 28,
      color = "primary",
      style,
      children,
    },
    ref
  ) => {
    return React.createElement(as, {
      children,
      ref,
      style: {
        margin: 0,
        padding: 0,
        fontWeight: weight,
        textAlign: align,
        fontSize: size,
        lineHeight: `${lineHeight}px`,
        color: `var(--content-${color})`,
        fontFamily: "inherit",
        ...style,
      },
    });
  }
);
