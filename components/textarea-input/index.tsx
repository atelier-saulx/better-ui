import * as React from "react";
import { styled } from "inlines";

export type TextAreaInputProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  formName?: string;
  label?: string;
  variant?: "regular" | "small";
};

const Wrapper = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => {
  if (label) {
    return (
      <styled.label
        style={
          label
            ? {
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }
            : undefined
        }
      >
        {children}
      </styled.label>
    );
  }
  return children;
};

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      formName,
      label,
      variant = "regular",
    },
    ref
  ) => {
    const rerender = React.useState({})[1];
    const valueRef = React.useRef(value ?? defaultValue ?? "");

    return (
      <Wrapper label={label}>
        {label && (
          <styled.span
            style={{
              marginBottom: 8,
              fontSize: 14,
              lineHeight: "24px",
              fontWeight: 500,
            }}
          >
            {label}
          </styled.span>
        )}
        <styled.div
          data-value={valueRef.current}
          style={{
            position: "relative",
            display: "grid",
            width: "100%",
            "&::after": {
              width: "100%",
              content: `attr(data-value) " "`,
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              visibility: "hidden",
              gridArea: "1 / 1 / 2 / 2",
              border: "1px solid transparent",
              fontSize: "14px",
              lineHeight: "24px",
              padding: variant === "regular" ? "8px 12px" : "3px 10px",
            },
          }}
        >
          <styled.textarea
            value={value}
            defaultValue={defaultValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange?.(e.target.value);
              valueRef.current = e.target.value;
              rerender({});
            }}
            ref={ref}
            name={formName}
            rows={variant === "regular" ? 3 : 2}
            placeholder={placeholder}
            style={{
              fontSize: 14,
              lineHeight: "24px",
              width: "100%",
              padding: variant === "regular" ? "8px 12px" : "3px 10px",
              borderRadius:
                variant === "regular"
                  ? "var(--radius-small)"
                  : "var(--radius-tiny)",
              border: "1px solid var(--interactive-secondary)",
              color: "var(--content-primary)",
              gridArea: "1 / 1 / 2 / 2",
              outline: "none",
              "&::placeholder": { color: "var(--content-secondary)" },
              "&:hover": {
                border: "1px solid var(--interactive-secondary-hover)",
              },
              "&:focus": {
                border: "1px solid var(--interactive-primary)",
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
              },
              resize: "none",
              overflow: "hidden",
            }}
          />
        </styled.div>
      </Wrapper>
    );
  }
);
