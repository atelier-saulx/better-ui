import * as React from "react";
import { Modal } from "./";
import { Button } from "../button";
import { TextInput } from "../text-input";
import { styled } from "inlines";

const meta = {
  title: "Component/Modal",
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
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
                <TextInput label="Enter data" />
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
