import * as React from "react";
import { styled } from "inlines";

// TODO rename type to variant same as button also add native event haldners etc similar to button

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
          padding: 0,
          fontWeight: 600,
          cursor: "pointer",
          ...(size === "medium" && {
            height: "40px",
            width: "40px",
          }),
          ...(size === "small" && {
            height: "32px",
            width: "32px",
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
