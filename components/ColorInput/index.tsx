import * as React from "react";
import { useControllableState } from "../../utils/hooks/useControllableState";
import * as Popover from "@radix-ui/react-popover";
import { styled } from "inlines";
import { border } from "../../utils/colors";

export type ColorInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => {};
  label?: string;
  variant?: "regular" | "small";
  error?: boolean;
};

export function ColorInput({
  label,
  variant = "regular",
  error,
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange,
}: ColorInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange,
  });
  const [hue, setHue] = React.useState(0);
  const [alpha, setAlpha] = React.useState(1);
  const [position, setPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [mouseDown, setMouseDown] = React.useState(false);
  const positionDivRef = React.useRef<HTMLDivElement | null>(null);
  const Wrapper = label ? styled.label : styled.div;

  function handleMouseMove(event: MouseEvent) {
    if (!positionDivRef.current) return;

    const { clientX, clientY } = event;
    const { left, width, top, height } =
      positionDivRef.current.getBoundingClientRect();
    setPosition({
      x: Math.min(1, Math.max(0, (clientX - left) / width)),
      y: Math.min(1, Math.max(0, (clientY - top) / height)),
    });
  }

  function handleMouseUp() {
    setMouseDown(false);
  }

  React.useEffect(() => {
    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [mouseDown]);

  React.useEffect(() => {
    if (!position) return;

    const rgb = hslToRGB(hue, 100, 50)
      .map((v) => (v + (255 - v) * (1 - position.x)) * (1 - position.y))
      .map((v) => Math.round(v));

    setValue(`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`);
  }, [position, hue, alpha]);

  React.useEffect(() => {
    if (value && hue === 0 && alpha === 1) {
      const [red, green, blue, alpha] = value
        .match(/(\d+(\.\d+)?)/g)!
        .map((v) => parseFloat(v));
      const [h, s, l] = rgbToHSL(red, green, blue);

      setHue(h);
      setAlpha(alpha);
    }
  }, [value]);

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Wrapper
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            '&[data-state="open"] > div': {
              border: "1px solid var(--interactive-primary) !important",
              boxShadow:
                "0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent) !important",
            },
            ...(error && {
              '&[data-state="open"] > div': {
                border: "1px solid var(--sentiment-negative)",
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--sentiment-negative) 20%, transparent)",
              },
            }),
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
          <styled.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              lineHeight: "24px",
              fontWeight: 500,
              width: "100%",
              minHeight: variant === "regular" ? 42 : 32,
              padding: variant === "regular" ? "8px 12px" : "3px 10px",
              borderRadius:
                variant === "regular"
                  ? "var(--radius-small)"
                  : "var(--radius-tiny)",
              border: "1px solid var(--interactive-secondary)",
              "&:hover": {
                border: "1px solid var(--interactive-secondary-hover)",
              },
              "&:focus": {
                border: "1px solid var(--interactive-primary)",
                boxShadow:
                  "0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
              },
              ...(error && {
                border: "1px solid var(--sentiment-negative)",
                "&:hover": {
                  border: "1px solid var(--sentiment-negative)",
                },
                "&:focus": {
                  border: "1px solid var(--sentiment-negative)",
                  boxShadow:
                    "0 0 0 2px color-mix(in srgb, var(--sentiment-negative) 20%, transparent)",
                },
              }),
            }}
          >
            {value && (
              <div
                style={{
                  height: variant === "regular" ? 24 : 20,
                  width: variant === "regular" ? 24 : 20,
                  borderRadius: "var(--radius-tiny)",
                  background:
                    'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=") left center',
                  backgroundPosition: "0 -1px",
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                height: variant === "regular" ? 24 : 20,
                width: variant === "regular" ? 24 : 20,
                borderRadius: "var(--radius-tiny)",
                background: value,
                border: `1px solid rgba(4,41,68,.13)`,
              }}
            />
            <div>{value}</div>
          </styled.div>
        </Wrapper>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          style={{
            background: "var(--background-screen)",
            maxHeight:
              "calc(var(--radix-popover-content-available-height) - 8px)",
            width: 500,
            maxWidth:
              "calc(var(--radix-popover-content-available-width) - 8px)",
            padding: 8,
            border: border(),
            borderRadius: "var(--radius-small)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              position: "relative",
              height: 200,
              borderRadius: "var(--radius-tiny)",
            }}
            ref={positionDivRef}
            onMouseDown={() => {
              setMouseDown(true);
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "var(--radius-tiny)",
                background: `hsl(${hue}, 100%, 50%)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "var(--radius-tiny)",
                background:
                  "linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "var(--radius-tiny)",
                background:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
              }}
            />
            {position && (
              <div
                style={{
                  position: "absolute",
                  left: `${position.x * 100}%`,
                  top: `${position.y * 100}%`,
                  transform: `translate3d(-50%,-50%,0)`,
                  width: 8,
                  height: 8,
                  border: "2px solid var(--background-screen)",
                  boxShadow:
                    "0px 0px 2px var(--content-primary), inset 0px 0px 2px var(--content-primary)",
                  borderRadius: 9999,
                }}
              />
            )}
          </div>
          <div
            style={{
              position: "relative",
              height: 24,
              width: "100%",
              borderRadius: "var(--radius-tiny)",
              background:
                "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
            }}
          >
            <input
              type="range"
              style={{ width: "100%", height: "100%", opacity: 0 }}
              value={hue}
              max="360"
              onChange={(e) => {
                setHue(parseInt(e.target.value));
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 10,
                top: 2,
                left: `max(2px, calc(${(hue / 360) * 100}% - 2px))`,
                transform: `translate3d(-${(hue / 360) * 100}%,0,0)`,
                height: 20,
                backgroundColor: "var(--background-screen)",
                boxShadow: "0px 0px 1px rgba(0,0,0,0.4)",
                borderRadius: 2,
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            style={{
              height: 24,
              width: "100%",
              borderRadius: "var(--radius-tiny)",
              background:
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=") left center',
              backgroundPosition: "0 -8px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "var(--radius-tiny)",
                background: `linear-gradient(to right, transparent, hsl(${hue}, 100%, 50%) 100%)`,
              }}
            >
              <input
                type="range"
                style={{ width: "100%", height: "100%", opacity: 0 }}
                value={alpha}
                step="0.01"
                max="1"
                onChange={(e) => {
                  setAlpha(parseFloat(e.target.value));
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 10,
                  top: 2,
                  left: `max(2px, calc(${alpha * 100}% - 2px))`,
                  transform: `translate3d(-${alpha * 100}%,0,0)`,
                  height: 20,
                  backgroundColor: "var(--background-screen)",
                  boxShadow: "0px 0px 1px rgba(0,0,0,0.4)",
                  borderRadius: 2,
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const hslToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};

const rgbToHSL = (r: number, g: number, b: number): number[] => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }

    h! /= 6;
  }

  return [h! * 360, s * 100, l * 100];
};
