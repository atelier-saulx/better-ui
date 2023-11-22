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
      | { label: string; type: "text" }
      | { label: string; type: "select"; options: SelectInputProps["options"] };
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
    <div>
      {Object.entries(fields).map(([key, field]) => {
        console.log(getDefaultValue(key));
        switch (field.type) {
          case "text":
            return (
              <TextInput
                key={key}
                label={field.label}
                defaultValue={getDefaultValue(key)}
                onChange={(value) => {
                  setValue(key, value);
                }}
              />
            );
          case "select":
            return (
              <SelectInput
                key={key}
                label={field.label}
                defaultValue={getDefaultValue(key)}
                onChange={(value) => {
                  setValue(key, value);
                }}
                options={field.options}
              />
            );
        }
      })}
      <Button
        onClick={() => {
          onChange(values.current);
        }}
      >
        Submit
      </Button>
    </div>
  );
}
