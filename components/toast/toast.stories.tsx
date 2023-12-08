import * as React from "react";
import { useToast, ToastProvider } from "./";
import { Button } from "../button";

const meta = {
  title: "Components/Toast",
};
export default meta;

const DefaultContent = () => {
  const toast = useToast();

  return (
    <>
      <Button
        onClick={() => {
          toast("Toast Text");
        }}
      >
        Simple toast
      </Button>
      <Button
        onClick={() => {
          toast(() => (
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div>Toast text</div>
              <div>
                <Button variant="neutral-link">Action</Button>
              </div>
            </div>
          ));
        }}
      >
        Custom JSX
      </Button>
    </>
  );
};

export const Default = () => {
  return (
    <ToastProvider>
      <DefaultContent />
    </ToastProvider>
  );
};
