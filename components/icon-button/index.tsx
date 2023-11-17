import * as React from "react";
import { styled } from "inlines";

export type IconButtonProps = {
  children: React.ReactNode;
  type?: "primary" | "secondary";
  size?: "medium" | "small";
  onClick?: () => void;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, onClick, type = "primary", size = "medium" }, ref) => {
    return (
      <styled.button
        ref={ref}
        type="button"
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "var(--radius-small)",
          fontWeight: 600,
          cursor: "pointer",
          ...(size === "medium" && {
            height: "42px",
            width: "42px",
          }),
          ...(size === "small" && {
            height: "34px",
            width: "34px",
          }),
          ...(type === "primary" && {
            color: "var(--content-primary)",
            background: "transparent",
            border: "1px solid var(--interactive-secondary)",
            "&:hover": {
              background: "var(--background-neutral)",
              border: "1px solid var(--interactive-secondary-hover)",
            },
          }),
          ...(type === "secondary" && {
            color: "var(--content-primary)",
            background: "transparent",
            border: "none",
            "&:hover": {
              background: "var(--background-neutral)",
              border: "none",
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
