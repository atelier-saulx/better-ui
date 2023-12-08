import * as React from "react";
import { styled } from "inlines";
import { useControllableState } from "../../utils/hooks/use-controllable-state";
import { SmallArrowheadDown, SmallArrowheadTop } from "../icons";
import { color } from "../../utils/vars";

export type NumberInputProps = {
  placeholder?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  formName?: string;
  label?: string;
  step?: number;
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

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      placeholder,
      value: valueProp,
      defaultValue: defaultValueProp,
      onChange,
      formName,
      label,
      step = 1,
    },
    ref
  ) => {
    const [value, setValue] = useControllableState<number>({
      prop: valueProp,
      defaultProp: defaultValueProp,
      onChange,
    });

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
        <div style={{ position: "relative" }}>
          <styled.input
            type="number"
            value={value ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const numberValue = parseFloat(e.target.value);
              if (isNaN(numberValue)) {
                setValue(undefined);
                return;
              }

              setValue(numberValue);
            }}
            ref={ref}
            name={formName}
            placeholder={placeholder}
            step={step}
            style={{
              fontSize: 14,
              lineHeight: "24px",
              width: "100%",
              padding: "8px 40px 8px 12px",
              borderRadius: "var(--radius-small)",
              border: "1px solid var(--interactive-secondary)",
              color: "var(--content-primary)",
              outline: "none",
              appearance: "none",
              "&::placeholder": { color: "var(--content-secondary)" },
              "&:hover": {
                border: "1px solid var(--interactive-secondary-hover)",
              },
              "&:focus": {
                border: "1px solid var(--interactive-primary)",
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
              },
              "&::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: "0",
              },
              "&::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: "0",
              },
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 12,
              top: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              userSelect: "none",
            }}
          >
            <styled.div
              style={{
                display: "flex",
                "&:hover": {
                  background: color("background", "neutral"),
                  borderRadius: "var(--radius-tiny)",
                },
              }}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (typeof value !== "number") return;

                setValue(value + step);
              }}
            >
              <SmallArrowheadTop />
            </styled.div>
            <styled.div
              style={{
                display: "flex",
                "&:hover": {
                  background: color("background", "neutral"),
                  borderRadius: "var(--radius-tiny)",
                },
              }}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (typeof value !== "number") return;

                setValue(value - step);
              }}
            >
              <SmallArrowheadDown />
            </styled.div>
          </div>
        </div>
      </Wrapper>
    );
  }
);
