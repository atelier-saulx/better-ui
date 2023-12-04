import * as React from "react";
import { styled } from "inlines";
import { TextInput } from "../text-input";
import { SelectInput, SelectInputProps } from "../select-input";
import { Button } from "../button";

type FormValues = {
  [key: string]: string | FormValues;
};

export type FormProps = {
  defaultValues: FormValues;
  onChange: (values: FormValues) => void;
  fields: {
    [key: string]:
      | { label: string; type: "text"; description?: string }
      | {
          label: string;
          type: "select";
          options: SelectInputProps["options"];
          description?: string;
        };
  };
};

export function Form({ fields, defaultValues, onChange }: FormProps) {
  const values = React.useRef<FormValues>({});

  const getDefaultValue = React.useCallback(
    (key: string) => {
      const keyParts = key.split(".");
      let currentLevel = defaultValues;

      for (const [index, key] of keyParts.entries()) {
        if (index === keyParts.length - 1) {
          return currentLevel[key] as string;
        }

        currentLevel = currentLevel[key] as FormValues;
      }
    },
    [defaultValues]
  );

  const setValue = React.useCallback((key: string, value: string) => {
    const keyParts = key.split(".");
    let currentLevel = values.current;

    for (const [index, key] of keyParts.entries()) {
      if (index === keyParts.length - 1) {
        currentLevel[key] = value;
        return;
      }

      if (!currentLevel[key]) {
        currentLevel[key] = {};
      }

      currentLevel = currentLevel[key] as FormValues;
    }
  }, []);

  return (
    <styled.div style={{ "& > * + *": { marginTop: "32px" } }}>
      {Object.entries(fields).map(([key, field]) => {
        switch (field.type) {
          case "text":
            return (
              <FormField key={key} description={field.description}>
                <TextInput
                  label={field.label}
                  defaultValue={getDefaultValue(key)}
                  onChange={(value) => {
                    setValue(key, value);
                  }}
                />
              </FormField>
            );
          case "select":
            return (
              <FormField key={key} description={field.description}>
                <SelectInput
                  label={field.label}
                  defaultValue={getDefaultValue(key)}
                  onChange={(value) => {
                    setValue(key, value);
                  }}
                  options={field.options}
                />
              </FormField>
            );
        }
      })}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button variant="neutral">Cancel</Button>
        <div style={{ marginLeft: "auto" }}>
          <Button
            onClick={() => {
              onChange(values.current);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </styled.div>
  );
}

type FormFieldProps = { children: React.ReactNode; description?: string };

function FormField({ children, description }: FormFieldProps) {
  return (
    <styled.div style={{ "& > * + *": { marginTop: "8px" } }}>
      {children}
      {description && (
        <div
          style={{
            fontWeight: 400,
            fontSize: 14,
            lineHeight: "24px",
            color: "var(--content-secondary)",
          }}
        >
          {description}
        </div>
      )}
    </styled.div>
  );
}
