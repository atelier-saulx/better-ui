import * as React from "react";
import { Table } from "./";
import { IconButton } from "../icon-button";
import { faker } from "@faker-js/faker";
import { MoreVertical } from "../icons";
import { Modal } from "../modal";
import { Button } from "../button";

const meta = {
  title: "Components/Table",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

const data = new Array(50).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  avatar: faker.image.avatar(),
  number: faker.number.int(10),
  name: faker.person.fullName(),
}));

export const Default = () => {
  return (
    <div style={{ height: "100svh" }}>
      <Table
        data={data}
        rowAction={(row) => (
          <Modal.Root>
            <Modal.Trigger>
              <IconButton type="secondary">
                <MoreVertical />
              </IconButton>
            </Modal.Trigger>
            <Modal.Overlay>
              {({ close }) => (
                <>
                  <Modal.Title
                    title={`Deleting item #${row.id}`}
                    description="Are you sure? This action cannot be undone."
                  />
                  <Modal.Actions>
                    <Button onClick={close} type="secondary">
                      Cancel
                    </Button>
                    <Button onClick={close} type="error">
                      Delete
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </Modal.Overlay>
          </Modal.Root>
        )}
      />
    </div>
  );
};

// TODO add an example with the ported over useInifniteQuery + real data from based
