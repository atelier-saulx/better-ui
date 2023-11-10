import { Preview } from "@storybook/react";

import "../styles/reset.css";
import "../styles/variables.css";
import "../styles/fonts.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "centered",
  },
};

export default preview;
