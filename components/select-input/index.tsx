import * as React from "react";
import * as SelectBase from "@radix-ui/react-select";
import { styled } from "inlines";
import { IconCheckSmall, IconChevronDownSmall } from "../icons";

export type SelectInputProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  formName?: string;
  label?: string;
  options?: (
    | { value: string; label?: string; prefix?: React.ReactNode }
    | string
  )[];
};

export const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  (
    { placeholder, value, defaultValue, onChange, formName, label, options },
    ref
  ) => {
    const Wrapper = label ? styled.label : styled.div;

    return (
      <SelectBase.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectBase.Trigger asChild>
          <Wrapper
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              "&[data-placeholder] > div": {
                color: "var(--content-secondary) !important",
              },
              '&[data-state="open"] > div': {
                border: "1px solid var(--interactive-primary) !important",
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent) !important",
              },
            }}
          >
            {label && (
              <span
                style={{
                  marginBottom: 8,
                  fontSize: 14,
                  lineHeight: "24px",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            )}
            <styled.div
              ref={ref}
              style={{
                position: "relative",
                fontSize: 14,
                lineHeight: "24px",
                padding: "8px 40px 8px 12px",
                borderRadius: "var(--radius-small)",
                border: "1px solid var(--interactive-secondary)",
                color: "var(--content-primary)",
                "&:before": {
                  content: '""',
                  display: "inline-block",
                },
                "&:hover": {
                  border: "1px solid var(--interactive-secondary-hover)",
                },
              }}
            >
              <SelectBase.Value placeholder={placeholder} />
              <IconChevronDownSmall
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  color: "var(--content-primary)",
                }}
              />
            </styled.div>
          </Wrapper>
        </SelectBase.Trigger>
        <SelectBase.Portal>
          <SelectBase.Content
            position="popper"
            style={{
              background: "var(--background-screen)",
              overflow: "hidden",
              width: "var(--radix-select-trigger-width)",
              maxHeight: "var(--radix-select-content-available-height)",
              borderRadius: "var(--radius-small)",
              border: "1px solid var(--interactive-secondary)",
              boxShadow: "var(--shadow-elevation)",
            }}
            sideOffset={8}
          >
            <SelectBase.Viewport style={{ padding: 8 }}>
              {options?.map((option) => {
                const {
                  value,
                  label = null,
                  prefix = null,
                } = typeof option === "string" ? { value: option } : option;

                return (
                  <SelectBase.Item key={value} value={value} asChild>
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
                      <SelectBase.ItemIndicator>
                        <IconCheckSmall
                          style={{
                            position: "absolute",
                            top: 6,
                            left: 12,
                            color: "var(--content-primary)",
                          }}
                        />
                      </SelectBase.ItemIndicator>
                      <SelectBase.ItemText>
                        {prefix && (
                          <div
                            style={{ display: "inline-block", marginRight: 8 }}
                          >
                            {prefix}
                          </div>
                        )}
                        {label ?? value}
                      </SelectBase.ItemText>
                    </styled.div>
                  </SelectBase.Item>
                );
              })}
            </SelectBase.Viewport>
          </SelectBase.Content>
        </SelectBase.Portal>
      </SelectBase.Root>
    );
  }
);
