import * as React from "react";
import { useToast, ToastProvider } from ".";
import { Button } from "../Button";
import { Stack } from "../Stack";
import { IconInfoFill } from "../Icons";

const meta = {
  title: "Atoms/Toast",
};
export default meta;

const DefaultContent = () => {
  const toast = useToast();

  return (
    <Stack direction="column" gap={8}>
      <Button
        variant="neutral"
        onClick={() => {
          toast("Toast Text");
        }}
      >
        Simple toast
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast({
            prefix: <IconInfoFill />,
            text: "Toast text",
            suffix: <Button variant="neutral-link">Action</Button>,
          });
        }}
      >
        Prefix and suffix
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast("I'm an informative toast", "informative");
        }}
      >
        Informative
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast("Warning text", "warning");
        }}
      >
        Warning
      </Button>
      <Button
        variant="neutral"
        onClick={() => {
          toast("An error toast", "error");
        }}
      >
        Error
      </Button>
    </Stack>
  );
};

export const Default = () => {
  return (
    <ToastProvider>
      <DefaultContent />
    </ToastProvider>
  );
};
