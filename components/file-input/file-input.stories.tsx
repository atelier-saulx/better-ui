import * as React from "react";
import { FileInput } from "./";
import { useUploadFile } from "../../utils/hooks/use-upload-file";
import { Provider } from "@based/react";
import based from "@based/client";

const client = based({
  org: "saulx",
  project: "based-ui",
  env: "production",
});

const meta = {
  title: "Atoms/FileInput",
};
export default meta;

export const Default = () => {
  return (
    <FileInput
      onChange={(file) => {
        console.log("file", file);
      }}
    />
  );
};

const RealUploadContent = () => {
  const { handleFileInputChange, status, progress } = useUploadFile();

  return (
    <FileInput
      label="Avatar"
      status={status}
      progress={progress}
      onChange={handleFileInputChange((file) => {
        console.log("uploaded file", file);
      })}
    />
  );
};

export const RealUpload = () => {
  return (
    <Provider client={client}>
      <RealUploadContent />
    </Provider>
  );
};