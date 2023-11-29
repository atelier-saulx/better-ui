import * as React from "react";
import { useInfiniteQuery } from "../utils/hooks/use-infinite-query";
import { Provider } from "@based/react";
import based from "@based/client";
import { Dropdown } from "../components/dropdown";
import { Table } from "../components/table";
import { IconButton } from "../components/icon-button";
import { Copy, Delete, MoreVertical } from "../components/icons";
import { Modal } from "../components/modal";
import { Button } from "../components/button";

const client = based({
  org: "saulx",
  project: "based-ui",
  env: "production",
});

const meta = {
  title: "Full examples/Page",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

const DefaultContent = () => {
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
                <IconButton type="secondary">
                  <MoreVertical />
                </IconButton>
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item icon={<Copy />}>Copy</Dropdown.Item>
                <Dropdown.Item
                  icon={<Delete />}
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
    </>
  );
};

export const Default = () => {
  return (
    <Provider client={client}>
      <DefaultContent />
    </Provider>
  );
};
