import * as React from "react";
import { Sidebar, SidebarItem } from "./";
import type { Meta } from "@storybook/react";
import { IconViewBoxes, IconChartBar, IconEdit, IconUsers } from "../icons";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = () => {
  const [active, setActive] = React.useState("overview");

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Sidebar>
        <SidebarItem
          active={active === "overview"}
          onClick={() => setActive("overview")}
          icon={<IconViewBoxes />}
        >
          Overview
        </SidebarItem>
        <SidebarItem
          active={active === "content"}
          onClick={() => setActive("content")}
          icon={<IconEdit />}
        >
          Content
        </SidebarItem>
        <SidebarItem
          active={active === "users"}
          onClick={() => setActive("users")}
          icon={<IconUsers />}
        >
          Users
        </SidebarItem>
        <SidebarItem
          active={active === "stats"}
          onClick={() => setActive("stats")}
          icon={<IconChartBar />}
        >
          Statistics
        </SidebarItem>
      </Sidebar>
    </div>
  );
};
