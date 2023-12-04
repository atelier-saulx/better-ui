import * as React from "react";
import { styled } from "inlines";
import { IconButton } from "../icon-button";
import { ViewLayoutLeft } from "../icons";
import { Tooltip } from "../tooltip";

const SidebarContext = React.createContext({ open: true });

// TODO auto collapse on small screens?

export type SidebarProps = {
  children: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <styled.aside
      style={{
        position: "relative",
        width: open ? 248 : 65,
        height: "100%",
        borderRight: "1px solid var(--interactive-secondary)",
        padding: "16px 12px",
        "& > * + *": { marginTop: "8px" },
      }}
    >
      <SidebarContext.Provider value={{ open }}>
        {children}
      </SidebarContext.Provider>
      <div style={{ position: "absolute", bottom: 16, right: 12 }}>
        <Tooltip
          content={open ? "Collapse sidebar" : "Expand sidebar"}
          side={open ? "top" : "right"}
        >
          <IconButton
            type="secondary"
            onClick={() => {
              setOpen((p) => !p);
            }}
          >
            <ViewLayoutLeft />
          </IconButton>
        </Tooltip>
      </div>
    </styled.aside>
  );
}

export type SidebarItemProps = {
  icon?: React.ReactNode;
  children: string;
  onClick?: () => void;
  active?: boolean;
};

export function SidebarItem({
  children,
  icon,
  onClick,
  active,
}: SidebarItemProps) {
  const { open } = React.useContext(SidebarContext);

  if (open) {
    return (
      <styled.div
        style={{
          height: "40px",
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          borderRadius: "var(--radius-small)",
          cursor: "pointer",
          color: "var(--content-primary)",
          "&:hover": {
            background: "var(--background-neutral)",
          },
          "& > * + *": { marginLeft: "10px" },
          ...(active && {
            background: "var(--background-neutral)",
          }),
        }}
        onClick={onClick}
      >
        {icon}
        <span
          style={{
            color: "var(--content-primary)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {children}
        </span>
      </styled.div>
    );
  }

  return (
    <styled.div
      style={{
        display: "flex",
        ...(active && {
          background: "var(--background-neutral)",
          borderRadius: "var(--radius-small)",
          "&:hover": {
            background: "none",
          },
        }),
      }}
    >
      <Tooltip content={children} side="right">
        <IconButton onClick={onClick} type="secondary">
          {icon}
        </IconButton>
      </Tooltip>
    </styled.div>
  );
}
