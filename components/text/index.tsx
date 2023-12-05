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
  variant?:
    | "strong25"
    | "strong50"
    | "strong75"
    | "strong100"
    | "strong200"
    | "strong300"
    | "strong400"
    | "strong500"
    | "strong600"
    | "medium25"
    | "medium50"
    | "medium75"
    | "medium100"
    | "medium200"
    | "medium300"
    | "medium400"
    | "medium500"
    | "medium600"
    | "normal25"
    | "normal50"
    | "normal75"
    | "normal100"
    | "normal200"
    | "normal300"
    | "normal400"
    | "normal500"
    | "normal600";
};

const VARIANTS: {
  [key in NonNullable<TextProps["variant"]>]: {
    size: TextProps["size"];
    lineHeight: TextProps["lineHeight"];
    weight: TextProps["weight"];
  };
} = {
  strong25: {
    size: 10,
    lineHeight: 16,
    weight: 600,
  },
  strong50: {
    size: 12,
    lineHeight: 20,
    weight: 600,
  },
  strong75: {
    size: 14,
    lineHeight: 24,
    weight: 600,
  },
  strong100: {
    size: 16,
    lineHeight: 28,
    weight: 600,
  },
  strong200: {
    size: 18,
    lineHeight: 32,
    weight: 600,
  },
  strong300: {
    size: 24,
    lineHeight: 36,
    weight: 600,
  },
  strong400: {
    size: 32,
    lineHeight: 44,
    weight: 600,
  },
  strong500: {
    size: 40,
    lineHeight: 56,
    weight: 600,
  },
  strong600: {
    size: 48,
    lineHeight: 64,
    weight: 600,
  },
  medium25: {
    size: 10,
    lineHeight: 16,
    weight: 500,
  },
  medium50: {
    size: 12,
    lineHeight: 20,
    weight: 500,
  },
  medium75: {
    size: 14,
    lineHeight: 24,
    weight: 500,
  },
  medium100: {
    size: 16,
    lineHeight: 28,
    weight: 500,
  },
  medium200: {
    size: 18,
    lineHeight: 32,
    weight: 500,
  },
  medium300: {
    size: 24,
    lineHeight: 36,
    weight: 500,
  },
  medium400: {
    size: 32,
    lineHeight: 44,
    weight: 500,
  },
  medium500: {
    size: 40,
    lineHeight: 56,
    weight: 500,
  },
  medium600: {
    size: 48,
    lineHeight: 64,
    weight: 500,
  },
  normal25: {
    size: 10,
    lineHeight: 16,
    weight: 400,
  },
  normal50: {
    size: 12,
    lineHeight: 20,
    weight: 400,
  },
  normal75: {
    size: 14,
    lineHeight: 24,
    weight: 400,
  },
  normal100: {
    size: 16,
    lineHeight: 28,
    weight: 400,
  },
  normal200: {
    size: 18,
    lineHeight: 32,
    weight: 400,
  },
  normal300: {
    size: 24,
    lineHeight: 36,
    weight: 400,
  },
  normal400: {
    size: 32,
    lineHeight: 44,
    weight: 400,
  },
  normal500: {
    size: 40,
    lineHeight: 56,
    weight: 400,
  },
  normal600: {
    size: 48,
    lineHeight: 64,
    weight: 400,
  },
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "p",
      align = "left",
      variant = "normal400",
      color = "primary",
      weight,
      size,
      lineHeight,
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
        fontWeight: weight ?? VARIANTS[variant].weight,
        fontSize: size ?? VARIANTS[variant].size,
        lineHeight: `${lineHeight ?? VARIANTS[variant].lineHeight}px`,
        textAlign: align,
        color: `var(--content-${color})`,
        fontFamily: "inherit",
        ...style,
      },
    });
  }
);
