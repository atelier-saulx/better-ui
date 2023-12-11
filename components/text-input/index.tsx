import * as React from "react";
import { styled } from "inlines";

export type TextInputProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
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

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      formName,
      label,
      onBlur,
      variant = "regular",
    },
    ref
  ) => {
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
        <styled.input
          value={value}
          defaultValue={defaultValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
          }}
          onBlur={onBlur}
          ref={ref}
          name={formName}
          placeholder={placeholder}
          style={{
            fontSize: 14,
            lineHeight: "24px",
            width: "100%",
            padding: variant === "regular" ? "8px 12px" : "4px 8px",
            borderRadius: "var(--radius-small)",
            border: "1px solid var(--interactive-secondary)",
            color: "var(--content-primary)",
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
          }}
        />
      </Wrapper>
    );
  }
);
