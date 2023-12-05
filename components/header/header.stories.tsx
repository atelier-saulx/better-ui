import * as React from "react";
import { ThemeProvider } from "../../utils/hooks/use-theme";
import { Header } from "./";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default = () => {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
};
