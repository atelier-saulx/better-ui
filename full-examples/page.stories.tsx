import * as React from "react";
import { useInfiniteQuery } from "../utils/hooks/use-infinite-query";
import { Provider } from "@based/react";
import based from "@based/client";
import { Dropdown } from "../components/dropdown";
import { Table } from "../components/table";
import { IconButton } from "../components/icon-button";
import {
  BasedLogoWithText,
  Boxes,
  ChartBar,
  Copy,
  Delete,
  Edit,
  Eye,
  Logout,
  MoreVertical,
  Settings,
  Users,
} from "../components/icons";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { Avatar } from "../components/avatar";
import { styled } from "inlines";
import { Form } from "../components/form";

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

const UserContent = () => {
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
      <Table
        columns={[
          { key: "id", header: "ID", renderAs: "badge" },
          { key: "name", header: "Name", renderAs: "text" },
          { key: "cycle", header: "Cycle", renderAs: "text" },
          { key: "createdAt", header: "Created", renderAs: "date" },
        ]}
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

const Content = () => {
  return (
    <div style={{ padding: "32px", width: "100%", maxWidth: 480 }}>
      <Form
        defaultValues={{
          name: "name",
          select: "hu",
          nested_stuff: {
            something: "asd",
            somethingElse: "usa",
          },
        }}
        fields={{
          name: { label: "Name", type: "text" },
          select: {
            label: "Country",
            type: "select",
            options: [
              { label: "Hungary", value: "hu", prefix: "🇭🇺" },
              { label: "USA", value: "usa", prefix: "🇺🇸" },
            ],
            description: "This is a description",
          },
          "nested_stuff.something": {
            label: "Nested name",
            type: "text",
            description: "This is a description too",
          },
          "nested_stuff.somethingElse": {
            label: "Nester country",
            type: "select",
            options: [
              { label: "Hungary", value: "hu", prefix: "🇭🇺" },
              { label: "USA", value: "usa", prefix: "🇺🇸" },
            ],
          },
        }}
        onChange={(values) => {
          console.log(values);
        }}
      />
    </div>
  );
};

const DefaultContent = () => {
  const [page, setPage] = React.useState("content");

  return (
    <div style={{ height: "100vh" }}>
      <header
        style={{
          height: 64,
          borderBottom: "1px solid var(--interactive-secondary)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <BasedLogoWithText />
        <styled.div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            "& > * + *": {
              marginLeft: "24px",
            },
          }}
        >
          <Button size="small" type="secondary">
            Documentation
          </Button>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <div style={{ cursor: "pointer" }}>
                <Avatar placeholder="MD" shape="circle" size="small" />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<Settings />}>Settings</Dropdown.Item>
              <Dropdown.Item icon={<Eye />}>Switch to dark mode</Dropdown.Item>
              <Dropdown.Item icon={<Logout />}>Logout</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        </styled.div>
      </header>
      <div style={{ display: "flex", height: "calc(100% - 64px)" }}>
        <styled.aside
          style={{
            width: 248,
            height: "100%",
            borderRight: "1px solid var(--interactive-secondary)",
            padding: "16px 12px",
            "& > * + *": { marginTop: "8px" },
          }}
        >
          <styled.div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              borderRadius: "var(--radius-small)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                background: "var(--background-neutral)",
              },
              "& > * + *": { marginLeft: "10px" },
              ...(page === "overview" && {
                background: "var(--background-neutral)",
              }),
            }}
            onClick={() => {
              setPage("overview");
            }}
          >
            <Boxes />
            <div>Overview</div>
          </styled.div>
          <styled.div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              borderRadius: "var(--radius-small)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                background: "var(--background-neutral)",
              },
              "& > * + *": { marginLeft: "10px" },
              ...(page === "content" && {
                background: "var(--background-neutral)",
              }),
            }}
            onClick={() => {
              setPage("content");
            }}
          >
            <Edit />
            <div>Content</div>
          </styled.div>
          <styled.div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              borderRadius: "var(--radius-small)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                background: "var(--background-neutral)",
              },
              "& > * + *": { marginLeft: "10px" },
              ...(page === "users" && {
                background: "var(--background-neutral)",
              }),
            }}
            onClick={() => {
              setPage("users");
            }}
          >
            <Users />
            <div>Users</div>
          </styled.div>
          <styled.div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              borderRadius: "var(--radius-small)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                background: "var(--background-neutral)",
              },
              "& > * + *": { marginLeft: "10px" },
              ...(page === "statistics" && {
                background: "var(--background-neutral)",
              }),
            }}
            onClick={() => {
              setPage("statistics");
            }}
          >
            <ChartBar />
            <div>Statistics</div>
          </styled.div>
        </styled.aside>
        <div style={{ flex: "1", marginTop: -1 }}>
          {page === "content" && <Content />}
          {page === "users" && <UserContent />}
        </div>
      </div>
    </div>
  );
};

export const Default = () => {
  return (
    <Provider client={client}>
      <DefaultContent />
    </Provider>
  );
};
