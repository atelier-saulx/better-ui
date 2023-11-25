import * as React from "react";
import { styled } from "inlines";
import * as DropdownBase from "@radix-ui/react-dropdown-menu";

export type DropdownRootProps = { children: React.ReactNode };

export function Root({ children }: DropdownRootProps) {
  return <DropdownBase.Root>{children}</DropdownBase.Root>;
}

export type DropdownTriggerProps = { children: React.ReactNode };

export function Trigger({ children }: DropdownTriggerProps) {
  return (
    <DropdownBase.Trigger asChild>
      <div>{children}</div>
    </DropdownBase.Trigger>
  );
}

export type DropdownItemsProps = { children: React.ReactNode };

export function Items({ children }: DropdownItemsProps) {
  return (
    <DropdownBase.Portal>
      <DropdownBase.Content
        sideOffset={8}
        asChild
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <styled.div
          style={{
            width: 258,
            background: "var(--background-screen)",
            overflowY: "auto",
            maxHeight:
              "calc(var(--radix-dropdown-menu-content-available-height) - 8px)",
            borderRadius: "var(--radius-small)",
            border: "1px solid var(--interactive-secondary)",
            boxShadow: "var(--shadow-elevation)",
            padding: 8,
          }}
        >
          {children}
        </styled.div>
      </DropdownBase.Content>
    </DropdownBase.Portal>
  );
}

export type DropdownItemProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function Item({ icon, children, onClick, disabled }: DropdownItemProps) {
  return (
    <DropdownBase.Item asChild disabled={disabled} onSelect={onClick}>
      <styled.div
        style={{
          padding: "4px 12px 4px 42px",
          borderRadius: "var(--radius-small)",
          fontSize: 14,
          lineHeight: "24px",
          position: "relative",
          outline: "none",
          userSelect: "none",
          "&[data-highlighted]": {
            background: "var(--background-neutral)",
          },
        }}
      >
        {icon && (
          <div style={{ position: "absolute", top: 6, left: 12 }}>{icon}</div>
        )}
        <div>{children}</div>
      </styled.div>
    </DropdownBase.Item>
  );
}

export const Dropdown = {
  Root,
  Trigger,
  Items,
  Item,
};