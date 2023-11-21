import * as React from "react";
import { Modal } from "./";
import { Button } from "../button";
import { TextInput } from "../text-input";
import { SelectInput } from "../select-input";
import { styled } from "inlines";

const meta = {
  title: "Foundation/Modal",
};
export default meta;

export const Default = () => {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title
              title="Add custom view"
              description="This is your organisation’s name within Based. For example, you can use the name of your company or department."
            />
            <Modal.Body>
              <styled.div
                style={{
                  "& > * + *": {
                    marginTop: "24px",
                  },
                }}
              >
                <TextInput label="Name" />
                <SelectInput
                  label="Language"
                  options={[
                    { label: "English", value: "english", prefix: "🇺🇸" },
                    { label: "Hungarian", value: "hungarian", prefix: "🇭🇺" },
                  ]}
                />
              </styled.div>
            </Modal.Body>
            <Modal.Actions>
              <Button type="secondary" onClick={close}>
                Cancel
              </Button>
              <Button>Save</Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  );
};
