import { Preview } from "@storybook/react";

import "../styles/reset.css";
import "../styles/variables.css";
import "../styles/fonts.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
};

export default preview;
