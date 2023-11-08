import * as React from "react";
import { styled } from "inlines";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "tertiary" | "error";
  onClick?: () => void;
};

export function Button({ children, onClick, type = "primary" }: ButtonProps) {
  return (
    <styled.button
      type="button"
      style={{
        color: "var(--interactive-primary)",
        background: "var(--interactive-accent)",
        border: 0,
        borderRadius: 4,
        padding: "6px 12px",
        "&:hover": {
          padding: "24px 24px",
        },
      }}
      onClick={onClick}
    >
      {children}({type})
    </styled.button>
  );
}
