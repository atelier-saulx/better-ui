import * as React from "react";
import { styled } from "inlines";
import { Eye, LogOut, Menu, Settings } from "../icons";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { Thumbnail } from "../thumbnail";
import { useIsMobile } from "../../utils/hooks/use-is-mobile";
import { IconButton } from "../icon-button";
import { useTheme } from "../../utils/hooks/use-theme";
import { BasedLogoWithText, BasedLogoWithoutText } from "../icons/logo";

export function Header() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <header
        style={{
          height: 64,
          borderBottom: "1px solid var(--interactive-secondary)",
          background: "var(--background-screen)",
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          ...(isMobile &&
            mobileMenuOpen && {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 20,
            }),
        }}
      >
        {isMobile ? <BasedLogoWithoutText /> : <BasedLogoWithText />}
        {isMobile ? (
          <styled.div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              type="secondary"
              size="small"
              onClick={() => {
                setMobileMenuOpen((p) => !p);
              }}
            >
              <Menu />
            </IconButton>
          </styled.div>
        ) : (
          <>
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
              <Button size="small" variant="neutral">
                Documentation
              </Button>
              <Dropdown.Root>
                <Dropdown.Trigger>
                  <div style={{ cursor: "pointer" }}>
                    <Thumbnail text="MD" shape="circle" size="small" />
                  </div>
                </Dropdown.Trigger>
                <Dropdown.Items>
                  <Dropdown.Item icon={<Settings />}>Settings</Dropdown.Item>
                  <Dropdown.Item
                    icon={<Eye />}
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }}
                  >
                    Switch to {theme === "dark" ? "light" : "dark"} mode
                  </Dropdown.Item>
                  <Dropdown.Item icon={<LogOut />}>Logout</Dropdown.Item>
                </Dropdown.Items>
              </Dropdown.Root>
            </styled.div>
          </>
        )}
      </header>
      {isMobile && mobileMenuOpen && (
        <styled.div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--background-screen)",
            zIndex: 20,
            padding: "12px0",
          }}
        >
          <styled.div
            style={{
              display: "flex",
              alignItems: "center",
              height: 48,
              "& > * + *": { marginLeft: "10px" },
              padding: "0 24px",
              borderBottom: "1px solid var(--interactive-secondary)",
            }}
          >
            <Settings />
            <div
              style={{
                color: "var(--content-primary)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Settings
            </div>
          </styled.div>
          <styled.div
            style={{
              display: "flex",
              alignItems: "center",
              height: 48,
              "& > * + *": { marginLeft: "10px" },
              padding: "0 24px",
              borderBottom: "1px solid var(--interactive-secondary)",
            }}
          >
            <Eye />
            <div
              style={{
                color: "var(--content-primary)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Switch to dark mode
            </div>
          </styled.div>
          <styled.div
            style={{
              display: "flex",
              alignItems: "center",
              height: 48,
              "& > * + *": { marginLeft: "10px" },
              padding: "0 24px",
            }}
          >
            <LogOut />
            <div
              style={{
                color: "var(--content-primary)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Logout
            </div>
          </styled.div>
        </styled.div>
      )}
    </>
  );
}
