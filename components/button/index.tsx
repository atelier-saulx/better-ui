import * as React from "react";
import { styled } from "inlines";

export type ButtonProps = {
  children: React.ReactNode;
  type?: "primary" | "secondary" | "error";
  size?: "large" | "medium" | "small";
  buttonType?: "button" | "submit";
  onClick?: () => void | Promise<void>;
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
    const [loading, setLoading] = React.useState(false);
    const [shaking, setShaking] = React.useState(false);

    const handleClick = React.useCallback(async () => {
      if (!onClick) return;

      const loadingDelayTimeout = setTimeout(() => {
        setLoading(true);
      }, 100);

      try {
        await onClick();
      } catch {
        setShaking(true);
      }

      setLoading(false);
      clearTimeout(loadingDelayTimeout);
    }, [onClick]);

    return (
      <styled.button
        ref={ref}
        type={buttonType}
        style={{
          position: "relative",
          borderRadius: "var(--radius-small)",
          fontWeight: 600,
          cursor: "pointer",
          display: "inline-flex",
          justifyItems: "center",
          alignItems: "center",
          ...(shaking && {
            animation: "200ms shake ease-in-out",
          }),
          ...(size === "large" && {
            padding: "9px 16px",
            fontSize: 16,
            lineHeight: "28px",
          }),
          ...(size === "medium" && {
            padding: "5px 16px",
            fontSize: 16,
            lineHeight: "28px",
          }),
          ...(size === "small" && {
            padding: "3px 12px",
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
        onClick={handleClick}
        onAnimationEnd={() => {
          setShaking(false);
        }}
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              style={{
                animation: "750ms spin linear infinite",
              }}
              fill="none"
            >
              <path
                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        <span style={{ opacity: loading ? 0 : 100 }}>{children}</span>
      </styled.button>
    );
  }
);
