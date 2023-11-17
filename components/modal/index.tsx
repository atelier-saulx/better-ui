import * as React from "react";
import { styled } from "inlines";
import * as ModalBase from "@radix-ui/react-dialog";

type UseModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContext = React.createContext<UseModalProps>({
  open: false,
  setOpen: () => {},
});

export const useModal = () => {
  return React.useContext(ModalContext);
};

export type ModalRootProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Root({ children, defaultOpen = false }: ModalRootProps) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      <ModalBase.Root open={open} onOpenChange={setOpen}>
        {children}
      </ModalBase.Root>
    </ModalContext.Provider>
  );
}

export type ModalTriggerProps = { children: React.ReactNode };

export function Trigger({ children }: ModalTriggerProps) {
  return (
    <ModalBase.Trigger asChild>
      <div>{children}</div>
    </ModalBase.Trigger>
  );
}

export type ModalOverlayProps = {
  children:
    | (({ close }: { close: () => void }) => React.ReactNode)
    | React.ReactNode;
};

export const Overlay = React.forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ children }, ref) => {
    const { setOpen } = useModal();

    return (
      <ModalBase.Portal>
        <ModalBase.Overlay
          style={{
            inset: 0,
            position: "fixed",
            background: "var(--background-dimmer)",
          }}
        />
        <ModalBase.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault();
          }}
          ref={ref}
          style={{
            width: 552,
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            background: "var(--background-screen)",
            maxHeight: "85svh",
            borderRadius: "var(--radius-small)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "var(--shadow-elevation)",
            outline: "none",
          }}
        >
          {typeof children === "function"
            ? children({
                close: () => {
                  setOpen(false);
                },
              })
            : children}
        </ModalBase.Content>
      </ModalBase.Portal>
    );
  }
);

export type ModalTitleProps = { title: string; description?: string };

export function Title({ title, description }: ModalTitleProps) {
  return (
    <div
      style={{
        padding: "24px 32px",
        borderBottom: "1px solid var(--interactive-secondary)",
      }}
    >
      <div
        style={{
          color: "var(--content-primary)",
          fontSize: 18,
          lineHeight: "32px",
          fontWeight: 700,
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            marginTop: 16,
            color: "var(--content-secondary)",
            fontSize: 14,
            lineHeight: "24px",
            fontWeight: 500,
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export type ModalBodyProps = { children: React.ReactNode };

export function Body({ children }: ModalBodyProps) {
  return (
    <div style={{ padding: "24px 32px", flex: 1, overflowY: "auto" }}>
      {children}
    </div>
  );
}

export type ModalActionsProps = { children: React.ReactNode };

export function Actions({ children }: ModalActionsProps) {
  return (
    <styled.div
      style={{
        padding: "24px 32px",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        borderTop: "1px solid var(--interactive-secondary)",
        "& > * + *": {
          marginLeft: "24px",
        },
      }}
    >
      {children}
    </styled.div>
  );
}

export const Modal = {
  Root,
  Trigger,
  Overlay,
  Title,
  Body,
  Actions,
};
