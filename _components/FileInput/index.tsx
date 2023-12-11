import * as React from "react";
import { styled } from "inlines";
import {
  IconAttachment,
  IconDelete,
  IconDownload,
  IconMoreHorizontal,
  IconOpenInNew,
  IconUpload,
} from "../Icons";
import { Dropdown } from "../Dropdown";
import { BasedSchemaContentMediaType } from "@based/schema";
import { useHover } from "../../utils/hooks/useHover";
import { Text } from "../Text";
import { Stack } from "../Stack";
import { color, border } from "../../utils/colors";

import { FileDrop } from "react-file-drop";

type Status = "initial" | "uploading" | "success" | "error";
type Variant = "regular" | "small";

// Global file upload hook to based to see upload progress
export type FileInputProps = {
  onChange?: (file?: File) => void;
  // FIXME: do we rly want label and formname>?
  formName?: string;
  label?: string;
  // FIXME: should this not update with a listener? - dont waant to add the status...
  status?: Status;
  progress?: number;
  mimeType?: BasedSchemaContentMediaType;
  value?: {
    name?: string;
    mimeType?: BasedSchemaContentMediaType;
    src?: string;
  };
  variant?: Variant;
};

export function FileInput({
  onChange,
  label,
  status: statusProp,
  progress: progressProp,
  mimeType,
  value,
  variant = "regular",
}: FileInputProps) {
  // Allow paste of url as well...

  // controlled
  const [file, setFile] = React.useState<File | null>();

  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [internalStatus, setInternalStatus] = React.useState<Status>("initial");
  const [internalProgress, setInternalProgress] = React.useState(0);
  const status = statusProp ?? internalStatus;
  const progress = progressProp ?? internalProgress;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // can be a bit nicer
  React.useEffect(() => {
    if (value?.src) {
      fetch(value?.src)
        .then((r) => r.blob())
        .then((blob) => {
          const end = value.src?.split("/") ?? [];
          const n: string = end[end.length - 1] ?? "";
          const extension = (n.split(".")[1] ?? "").toLowerCase();
          setInternalStatus("success");
          const mime =
            value.mimeType ??
            (extension === "jpg" ||
              extension === "jpeg" ||
              extension === "png" ||
              extension === "gif")
              ? `image/${extension}`
              : "";
          const file = new File([blob], value.name ?? n, {
            type: mime,
          });

          setFile(file);
        });
    }
  }, [value?.src]);

  React.useEffect(() => {
    if (file) {
      if (file.type.startsWith("image/") && file.size) {
        const objectURL = URL.createObjectURL(file);
        setFilePreview(objectURL);
      }
    } else {
      setFilePreview(null);
    }
  }, [file]);

  const { listeners, hover } = useHover();
  const [dragOver, setDragOver] = React.useState(false);

  return (
    <styled.label
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingLeft: variant === "small" && dragOver ? 4 : null,
        backgroundColor:
          dragOver && variant !== "small"
            ? color("background", "neutral")
            : null,
      }}
      {...listeners}
    >
      <FileDrop
        onDrop={(files) => {
          console.log("hello", files);
          if (files) {
            setFile(files[0]);
            setInternalStatus("success");
          }
          setDragOver(false);
        }}
        onDragOver={(e) => {
          setDragOver(true);
        }}
        onDragLeave={() => {
          setDragOver(false);
        }}
      >
        {label && (
          <styled.span
            style={{
              marginBottom: 8,
              fontSize: 14,
              lineHeight: "24px",
              fontWeight: 500,
            }}
          >
            {label}
          </styled.span>
        )}
        {
          <Status
            variant={variant}
            status={status}
            progress={progress}
            filePreview={filePreview}
            file={file}
            hover={hover}
            setInternalStatus={setInternalStatus}
            setFile={setFile}
            setFilePreview={setFilePreview}
            setInternalProgress={setInternalProgress}
            onChange={onChange}
            inputRef={inputRef}
          />
        }
        <styled.input
          ref={inputRef}
          type="file"
          accept={mimeType}
          onChange={(e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;
            try {
              setInternalStatus("uploading");
              setFile(file);
              setInternalProgress(100);
              setInternalStatus("success");
              onChange?.(file);
            } catch {
              setInternalStatus("error");
              setFile(null);
              setInternalProgress(0);
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }
          }}
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
          }}
        />
      </FileDrop>
    </styled.label>
  );
}

// ------------- STATUS -------------------
// TODO: refactor a bit better
function StyledStatus({
  variant,
  status,
  children,
}: {
  variant: Variant;
  status: Status;
  children: React.ReactNode;
}) {
  return (
    <styled.div
      style={
        variant === "small"
          ? {}
          : {
              padding: "8px 12px",
              borderRadius: "var(--radius-small)",
              ...(status === "initial" && {
                cursor: "pointer",
                border: "1px dashed var(--interactive-secondary)",
                "&:hover": {
                  border: "1px dashed var(--interactive-secondary-hover)",
                },
              }),
              ...(status === "uploading" && {
                border: "1px solid var(--interactive-secondary)",
              }),
              ...(status === "success" && {
                border: "1px solid var(--interactive-secondary)",
              }),
              ...(status === "error" && {
                cursor: "pointer",
                border: "1px dashed var(--sentiment-negative)",
                "&:hover": {
                  border: "1px dashed var(--sentiment-negative-hover)",
                },
              }),
            }
      }
    >
      {children}
    </styled.div>
  );
}

function Status({
  variant,
  status,
  progress,
  filePreview,
  file,
  hover,
  setInternalStatus,
  setFile,
  setFilePreview,
  setInternalProgress,
  onChange,
  inputRef,
}: {
  variant: Variant;
  status: Status;
  progress: number;
  filePreview: string | null;
  file: File | null | undefined;
  hover: boolean;
  // tmp
  setInternalStatus: React.Dispatch<React.SetStateAction<Status>>;
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
  setFilePreview: React.Dispatch<React.SetStateAction<string | null>>;
  setInternalProgress: React.Dispatch<React.SetStateAction<number>>;
  onChange: ((file?: File) => void) | undefined;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}) {
  return (
    <StyledStatus variant={variant} status={status}>
      {status === "initial" && (
        <Stack gap={12} justify="start">
          <IconUpload />
          <Text>Upload file</Text>
        </Stack>
      )}
      {status === "uploading" && <UploadingStatus progress={progress} />}
      {status === "success" && (
        <Stack gap={12} justify={variant === "small" ? "start" : "between"}>
          <Stack
            gap={12}
            justify={"start"}
            style={{
              flexGrow: variant === "small" ? null : 1,
              width: "auto",
            }}
          >
            {filePreview ? (
              <img
                src={filePreview}
                style={{
                  height: variant === "small" ? 32 : 48,
                  width: variant === "small" ? 32 : 48,
                  borderRadius: "var(--radius-small)",
                  objectFit: "cover",
                }}
              />
            ) : (
              <IconAttachment />
            )}
            <Text
              style={{ maxWidth: variant === "small" ? 200 : undefined }}
              singleLine
            >
              {file?.name}
            </Text>
          </Stack>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <styled.div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: hover ? 1 : variant === "small" ? 0 : 0.5,
                  outline: "none",
                  background: "transparent",
                  padding: "2px",
                  borderRadius: 4,
                  transition: "opacity 0.1s",
                  cursor: "pointer",
                  color: "var(--content-primary)",
                  "&:hover": {
                    background: "var(--background-neutral)",
                  },
                }}
              >
                <IconMoreHorizontal />
              </styled.div>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item
                icon={<IconOpenInNew />}
                onClick={() => {
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
              >
                <Text>Open in new tab</Text>
              </Dropdown.Item>
              <Dropdown.Item
                icon={<IconDownload />}
                onClick={() => {
                  if (!file) return;
                  const url = URL.createObjectURL(file);
                  const link = document.createElement("a");
                  link.download = file.name;
                  link.href = url;
                  link.click();
                }}
              >
                <Text>Download</Text>
              </Dropdown.Item>
              <Dropdown.Item
                icon={<IconDelete />}
                onClick={() => {
                  setInternalStatus("initial");
                  setFile(null);
                  setInternalProgress(0);
                  onChange?.();
                  if (inputRef.current) {
                    inputRef.current.value = "";
                  }
                }}
              >
                <Text>Delete</Text>
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        </Stack>
      )}
      {status === "error" && (
        <styled.div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconUpload />
          <Text style={{ marginLeft: "8px" }}>An error has occured</Text>
        </styled.div>
      )}
    </StyledStatus>
  );
}

function UploadingStatus({ progress }: { progress: number }) {
  return (
    <styled.div
      style={{
        display: "flex",
        alignItems: "center",
        "& > * + *": { marginLeft: "8px" },
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ transform: "rotate(270deg)" }}
      >
        <circle
          cx="10"
          cy="10"
          r="7"
          stroke="var(--interactive-secondary)"
          strokeWidth="2"
        />
        <circle
          cx="10"
          cy="10"
          r="7"
          stroke="var(--interactive-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - (5 + progress * 0.95)}
        />
      </svg>
      <div style={{ fontSize: "14px", lineHeight: "24px", fontWeight: 500 }}>
        Uploading...
      </div>
    </styled.div>
  );
}
