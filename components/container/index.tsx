import * as React from "react";
import { styled } from "inlines";
import { ChevronDown } from "../icons";

export type ContainerProps = {
  children?: React.ReactNode;
  title: string;
  description?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  expandable?: boolean;
};

export function Container({
  children,
  title,
  description,
  prefix,
  suffix,
  expandable = true,
}: ContainerProps) {
  const [expanded, setExpanded] = React.useState(false);
  const headerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 8,
        border: "1px solid var(--interactive-secondary)",
      }}
    >
      <styled.div
        ref={headerRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 16,
          cursor: "pointer",
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          borderBottomRightRadius: expanded ? 0 : 8,
          borderBottomLeftRadius: expanded ? 0 : 8,
          "&:hover": {
            background: "var(--background-neutral)",
          },
        }}
        onClick={(e: any) => {
          if (headerRef.current && headerRef.current.contains(e.target)) {
            setExpanded((p) => !p);
          }
        }}
      >
        {expandable && (
          <ChevronDown style={{ rotate: expanded ? "0deg" : "-90deg" }} />
        )}
        {prefix && <div>{prefix}</div>}
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "var(--content-primary)",
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 14,
                color: "var(--content-secondary)",
              }}
            >
              {description}
            </div>
          )}
        </div>
        {suffix && <div style={{ marginLeft: "auto" }}>{suffix}</div>}
      </styled.div>
      {(!expandable || expanded) && (
        <div
          style={{
            padding: 16,
            borderTop: "1px solid var(--interactive-secondary)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
