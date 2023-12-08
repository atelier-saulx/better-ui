import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Text, textVariants } from "../text";
import { ChevronDown, ChevronTop } from "../icons";
import { styled } from "inlines";
import { border, color } from "../../utils/vars";
import {
  addMonths,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  compareAsc,
  endOfWeek,
  isToday,
  isSameDay,
  isWithinInterval,
  min,
  max,
  isSameMonth,
  isMonday,
  isSunday,
} from "date-fns";

export type DateInputProps = {
  range?: boolean;
};

export function DateInput({ range = false }: DateInputProps) {
  const [value, setValue] = React.useState<
    Date | { start: Date; end: Date } | null
  >(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);
  const [pendingRangePart, setPendingRangePart] = React.useState<Date | null>(
    null
  );

  const getDays = React.useCallback(() => {
    const days = [];
    let curr = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });

    while (compareAsc(curr, end) < 1) {
      days.push(curr);
      curr = addDays(curr, 1);
    }

    return days;
  }, [currentMonth]);

  return (
    <>
      <pre>{JSON.stringify({ value }, null, 2)}</pre>
      <Popover.Root open>
        <Popover.Trigger>open</Popover.Trigger>
        <Popover.Portal>
          <Popover.Content>
            <div
              style={{
                padding: "16px 16px 0px",
                background: color("background", "screen"),
                border: "1px solid var(--interactive-secondary)",
                boxShadow: "var(--shadow-elevation)",
                borderRadius: "var(--radius-small)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text variant="bodyStrong">
                  {format(currentMonth, "MMMM yyyy")}
                </Text>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <styled.button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                      margin: 0,
                      border: "none",
                      background: "transparent",
                      width: 24,
                      height: 24,
                      borderRadius: "var(--radius-tiny)",
                      "&:hover": {
                        background: color("background", "neutral"),
                      },
                      ...textVariants.body,
                    }}
                    onClick={() => {
                      setCurrentMonth(addMonths(currentMonth, -1));
                    }}
                  >
                    <ChevronDown />
                  </styled.button>
                  <styled.button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                      margin: 0,
                      border: "none",
                      background: "transparent",
                      width: 24,
                      height: 24,
                      borderRadius: "var(--radius-tiny)",
                      "&:hover": {
                        background: color("background", "neutral"),
                      },
                      ...textVariants.body,
                    }}
                    onClick={() => {
                      setCurrentMonth(addMonths(currentMonth, 1));
                    }}
                  >
                    <ChevronTop />
                  </styled.button>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 28px)",
                  gridAutoRows: "28px",
                  padding: "16px 0",
                  gap: 10,
                }}
              >
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      ...textVariants.body,
                    }}
                  >
                    {day}
                  </div>
                ))}
                {getDays().map((day) => (
                  <styled.button
                    key={day.toISOString()}
                    style={{
                      position: "relative",
                      padding: 0,
                      margin: 0,
                      border: "1px solid transparent",
                      background: "transparent",
                      borderTopLeftRadius: "var(--radius-tiny)",
                      borderBottomLeftRadius: "var(--radius-tiny)",
                      borderTopRightRadius: "var(--radius-tiny)",
                      borderBottomRightRadius: "var(--radius-tiny)",
                      ...textVariants.bodyBold,
                      ...((!range || (range && !pendingRangePart)) && {
                        "&:hover": {
                          background: color("background", "neutral"),
                        },
                      }),
                      color: isSameMonth(currentMonth, day)
                        ? color("content", "primary")
                        : color("content", "secondary"),
                      ...(isToday(day) && {
                        border: "1px solid var(--interactive-primary)",
                      }),
                      ...(value &&
                        ("start" in value
                          ? !pendingRangePart &&
                            (isSameDay(day, value.start) ||
                              isSameDay(day, value.end))
                          : isSameDay(day, value)) && {
                          background: "var(--interactive-primary)",
                          color: "var(--content-inverted)",
                          "&:hover": {
                            background: "var(--interactive-primary-hover)",
                            border:
                              "1px solid var(--interactive-primary-hover)",
                          },
                        }),
                      ...(pendingRangePart &&
                        hoveredDate &&
                        isWithinInterval(day, {
                          start: min([pendingRangePart, hoveredDate]),
                          end: max([pendingRangePart, hoveredDate]),
                        }) && {
                          background: isSameDay(pendingRangePart, day)
                            ? "var(--interactive-primary)"
                            : "color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
                          ...(isSameDay(pendingRangePart, day) && {
                            color: "var(--content-inverted)",
                          }),
                          borderTopLeftRadius:
                            isSameDay(
                              min([pendingRangePart, hoveredDate]),
                              day
                            ) || isMonday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          borderBottomLeftRadius:
                            isSameDay(
                              min([pendingRangePart, hoveredDate]),
                              day
                            ) || isMonday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          borderTopRightRadius:
                            isSameDay(
                              max([pendingRangePart, hoveredDate]),
                              day
                            ) || isSunday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          borderBottomRightRadius:
                            isSameDay(
                              max([pendingRangePart, hoveredDate]),
                              day
                            ) || isSunday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          ...(!isMonday(day) &&
                            !isSameDay(
                              min([pendingRangePart, hoveredDate]),
                              day
                            ) && {
                              "&:before": {
                                pointerEvents: "none",
                                position: "absolute",
                                left: "-11px",
                                top: "0",
                                bottom: "0",
                                content: "''",
                                display: "block",
                                background:
                                  "color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
                                width: "10px",
                                height: "calc(100% + 2px)",
                                marginTop: "-1px",
                              },
                            }),
                        }),
                      ...(!pendingRangePart &&
                        value &&
                        "start" in value &&
                        isWithinInterval(day, {
                          start: min([value.start, value.end]),
                          end: max([value.start, value.end]),
                        }) && {
                          ...(isSameDay(value.start, day) ||
                          isSameDay(value.end, day)
                            ? {
                                background: "var(--interactive-primary)",
                                color: "var(--content-inverted)",
                                "&:hover": {
                                  background:
                                    "var(--interactive-primary-hover)",
                                },
                              }
                            : {
                                background:
                                  "color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
                                "&:hover": {
                                  background:
                                    "color-mix(in srgb, var(--interactive-primary) 40%, transparent)",
                                },
                              }),
                          borderTopLeftRadius:
                            isSameDay(min([value.start, value.end]), day) ||
                            isMonday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          borderBottomLeftRadius:
                            isSameDay(min([value.start, value.end]), day) ||
                            isMonday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          borderTopRightRadius:
                            isSameDay(max([value.start, value.end]), day) ||
                            isSunday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          borderBottomRightRadius:
                            isSameDay(max([value.start, value.end]), day) ||
                            isSunday(day)
                              ? "var(--radius-tiny)"
                              : "0px",
                          ...(!isMonday(day) &&
                            !isSameDay(min([value.start, value.end]), day) && {
                              "&:before": {
                                pointerEvents: "none",
                                position: "absolute",
                                left: "-11px",
                                top: "0",
                                bottom: "0",
                                content: "''",
                                display: "block",
                                background:
                                  "color-mix(in srgb, var(--interactive-primary) 20%, transparent)",
                                width: "10px",
                                height: "calc(100% + 2px)",
                                marginTop: "-1px",
                              },
                            }),
                        }),
                    }}
                    onClick={() => {
                      if (range) {
                        if (pendingRangePart) {
                          setValue({
                            start: min([pendingRangePart, day]),
                            end: max([pendingRangePart, day]),
                          });
                          setPendingRangePart(null);
                          return;
                        }
                        setPendingRangePart(day);
                        return;
                      }

                      setValue(day);
                    }}
                    onMouseEnter={() => {
                      if (!range) return;

                      setHoveredDate(day);
                    }}
                  >
                    {format(day, "d")}
                  </styled.button>
                ))}
              </div>
              <div
                style={{
                  borderTop: border(),
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px 0",
                  marginLeft: -16,
                  marginRight: -16,
                }}
              >
                <styled.button
                  style={{
                    margin: 0,
                    border: "none",
                    background: "transparent",
                    padding: "4px 16px",
                    textAlign: "left",
                    ...textVariants.body,
                    "&:hover": {
                      background: color("background", "neutral"),
                    },
                  }}
                >
                  Today
                </styled.button>
                <styled.button
                  style={{
                    margin: 0,
                    border: "none",
                    background: "transparent",
                    padding: "4px 16px",
                    textAlign: "left",
                    ...textVariants.body,
                    "&:hover": {
                      background: color("background", "neutral"),
                    },
                  }}
                >
                  Select next date
                </styled.button>

                <styled.button
                  style={{
                    margin: 0,
                    border: "none",
                    background: "transparent",
                    padding: "4px 16px",
                    textAlign: "left",
                    ...textVariants.body,
                    "&:hover": {
                      background: color("background", "neutral"),
                    },
                  }}
                >
                  Select previous date
                </styled.button>
              </div>
              <div
                style={{
                  borderTop: border(),
                  padding: "8px 0",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: -16,
                  marginRight: -16,
                }}
              >
                <styled.button
                  style={{
                    margin: 0,
                    border: "none",
                    background: "transparent",
                    padding: "4px 16px",
                    textAlign: "left",
                    ...textVariants.body,
                    "&:hover": {
                      background: color("background", "neutral"),
                    },
                  }}
                >
                  Clear
                </styled.button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}
