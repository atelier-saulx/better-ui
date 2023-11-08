import * as React from "react";
import { styled } from "inlines";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "error";
  size?: "large" | "medium" | "small";
  buttonType?: "button" | "submit";
  onClick?: () => void;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = "primary",
      size = "medium",
      buttonType = "button",
    },
    ref
  ) => {
    return (
      <styled.button
        ref={ref}
        type={buttonType}
        style={{
          borderRadius: "var(--radius-small)",
          fontWeight: 600,
          cursor: "pointer",
          ...(size === "large" && {
            padding: "10px 16px",
            fontSize: 16,
            lineHeight: "28px",
          }),
          ...(size === "medium" && {
            padding: "6px 16px",
            fontSize: 16,
            lineHeight: "28px",
          }),
          ...(size === "small" && {
            padding: "4px 12px",
            fontSize: 14,
            lineHeight: "24px",
          }),
          ...(type === "primary" && {
            color: "var(--content-inverted)",
            background: "var(--interactive-primary)",
            border: "1px solid var(--interactive-primary)",
            "&:hover": {
              background: "var(--interactive-primary-hover)",
              border: "1px solid var(--interactive-primary-hover)",
            },
          }),
          ...(type === "secondary" && {
            color: "var(--content-primary)",
            background: "transparent",
            border: "1px solid var(--interactive-secondary)",
            "&:hover": {
              background: "var(--background-neutral)",
              border: "1px solid var(--interactive-secondary-hover)",
            },
          }),
          ...(type === "error" && {
            color: "var(--content-inverted)",
            background: "var(--sentiment-negative)",
            border: "1px solid var(--sentiment-negative)",
            "&:hover": {
              background: "var(--sentiment-negative-hover)",
              border: "1px solid var(--sentiment-negative-hover)",
            },
          }),
        }}
        onClick={onClick}
      >
        {children}
      </styled.button>
    );
  }
);
