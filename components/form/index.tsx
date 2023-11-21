import * as React from "react";
import { styled } from "inlines";
import { TextInput } from "../text-input";
import { SelectInput } from "../select-input";
import { Button } from "../button";

export type FormProps = {
  fields: {
    [key: string]: { label: string; type: "text" | "select" };
  };
};

type FormValues = {
  [key: string]: string | FormValues;
};

export function Form({ fields }: FormProps) {
  const values = React.useRef<FormValues>({});

  const setValue = React.useCallback((key: string, value: string) => {
    const keyParts = key.split(".");
    let currentLevel = values.current;

    for (let i = 0; i < keyParts.length; i++) {
      const key = keyParts[i];

      if (i === keyParts.length - 1) {
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
        switch (field.type) {
          case "text":
            return (
              <TextInput
                key={key}
                label={field.label}
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
                onChange={(value) => {
                  setValue(key, value);
                }}
              />
            );
        }
      })}
      <Button
        onClick={() => {
          console.log(values.current);
        }}
      >
        Submit
      </Button>
    </div>
  );
}
