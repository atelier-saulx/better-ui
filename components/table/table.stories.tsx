import * as React from "react";
import { Table } from "./";
import { faker } from "@faker-js/faker";
import { IconCopy, IconDelete, IconMoreVertical } from "../icons";
import { Modal } from "../modal";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { useInfiniteQuery } from "../../utils/hooks/useInfiniteQuery";
import { Provider } from "@based/react";
import based from "@based/client";

const client = based({
  org: "saulx",
  project: "based-ui",
  env: "production",
});

const meta = {
  title: "Components/Table",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

const data = new Array(10).fill(null).map(() => ({
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
      <Table data={data} />
    </div>
  );
};

const InfiniteQueryContent = () => {
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const { data, fetchMore, setVisibleElements } = useInfiniteQuery({
    accessFn: (data) => data.files,
    queryFn: (offset) => ({
      $id: "root",
      files: {
        $all: true,
        $list: {
          $sort: { $field: "updatedAt", $order: "desc" },
          $offset: offset,
          $limit: 25,
          $find: {
            $traverse: "children",
            $filter: {
              $operator: "=",
              $field: "type",
              $value: "todo",
            },
          },
        },
      },
    }),
  });

  return (
    <>
      <div style={{ height: "100svh" }}>
        <Table
          data={data}
          onScrollToBottom={fetchMore}
          onVisibleElementsChange={setVisibleElements}
          rowAction={(row) => (
            <Dropdown.Root>
              <Dropdown.Trigger>
                <Button shape="square" variant="neutral-transparent">
                  <IconMoreVertical />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item icon={<IconCopy />}>Copy</Dropdown.Item>
                <Dropdown.Item
                  icon={<IconDelete />}
                  onClick={() => {
                    setItemToDelete(row.id);
                  }}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Root>
          )}
        />
      </div>
      {itemToDelete && (
        <Modal.Root
          open
          onOpenChange={() => {
            setItemToDelete(null);
          }}
        >
          <Modal.Overlay>
            {({ close }) => (
              <>
                <Modal.Title
                  title={`Deleting item #${itemToDelete}`}
                  description="Are you sure? This action cannot be undone."
                />
                <Modal.Actions>
                  <Button onClick={close} variant="neutral">
                    Cancel
                  </Button>
                  <Button onClick={close} variant="error">
                    Delete
                  </Button>
                </Modal.Actions>
              </>
            )}
          </Modal.Overlay>
        </Modal.Root>
      )}
    </>
  );
};

export const InfiniteQuery = () => {
  return (
    <Provider client={client}>
      <InfiniteQueryContent />
    </Provider>
  );
};
