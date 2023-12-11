import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Text, textVariants } from "../text";
import { IconChevronDown, IconChevronTop } from "../icons";
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
  startOfDay,
  parse,
  setHours,
  setMinutes,
} from "date-fns";
import { useControllableState } from "../../utils/hooks/use-controllable-state";
import { TextInput } from "../text-input";

type DateInputValue = Date | { start: Date; end: Date };

export type DateInputProps = {
  range?: boolean;
  time?: boolean;
  value?: DateInputValue;
  defaultValue?: DateInputValue;
  onChange?: (value: DateInputValue) => void;
};

export function DateInput({
  range = false,
  time = false,
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange,
}: DateInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange,
  });
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);
  const [pendingRangePart, setPendingRangePart] = React.useState<Date | null>(
    null
  );
  const [pendingStartTime, setPendingStartTime] = React.useState("");
  const [pendingEndTime, setPendingEndTime] = React.useState("");

  // TODO sync pending start and end times with the value
  React.useEffect(() => {
    // setPendingStartTime(format(value));
  }, [value]);

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
    <Popover.Root open>
      {/* TODO write actual input looking trigger */}
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
                  <IconChevronDown />
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
                  <IconChevronTop />
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
                          border: "1px solid var(--interactive-primary-hover)",
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
                                background: "var(--interactive-primary-hover)",
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
            {time && (
              <>
                <div
                  style={{
                    borderTop: border(),
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: -16,
                    marginRight: -16,
                  }}
                >
                  <Text>{range ? "Start time" : "Time"}</Text>
                  <div style={{ width: 80 }}>
                    <TextInput
                      placeholder="11:00"
                      variant="small"
                      value={pendingStartTime}
                      onChange={setPendingStartTime}
                      onBlur={() => {
                        if (!value) return;
                        const result = parse(
                          pendingStartTime,
                          "HH:mm",
                          new Date()
                        );

                        if (isNaN(result.getTime())) {
                          return;
                        }

                        if ("start" in value) {
                          setValue({
                            ...value,
                            start: setHours(
                              setMinutes(value.start, result.getMinutes()),
                              result.getHours()
                            ),
                          });
                        } else {
                          setValue(
                            setHours(
                              setMinutes(value, result.getMinutes()),
                              result.getHours()
                            )
                          );
                        }
                      }}
                    />
                  </div>
                </div>
                {range && (
                  <div
                    style={{
                      padding: "0 16px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: -16,
                      marginRight: -16,
                    }}
                  >
                    <Text>End time</Text>
                    <div style={{ width: 80 }}>
                      <TextInput
                        placeholder="11:00"
                        variant="small"
                        value={pendingEndTime}
                        onChange={setPendingEndTime}
                        onBlur={() => {
                          if (!value || !("end" in value)) return;
                          const result = parse(
                            pendingEndTime,
                            "HH:mm",
                            new Date()
                          );

                          if (isNaN(result.getTime())) {
                            return;
                          }

                          setValue({
                            ...value,
                            end: setHours(
                              setMinutes(value.end, result.getMinutes()),
                              result.getHours()
                            ),
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {!range && (
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
                    color: color("content", "primary"),
                    ...textVariants.body,
                    "&:hover": {
                      background: color("background", "neutral"),
                    },
                  }}
                  onClick={() => {
                    setValue(startOfDay(new Date()));
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
                    color: color("content", "primary"),
                    ...textVariants.body,
                    "&:hover": {
                      background: color("background", "neutral"),
                    },
                  }}
                  onClick={() => {
                    if (!value) {
                      setValue(addDays(new Date(), +1));
                      return;
                    }

                    if (value && !("start" in value)) {
                      setValue(addDays(value, +1));
                    }
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
                  onClick={() => {
                    if (!value) {
                      setValue(addDays(new Date(), -1));
                      return;
                    }

                    if (value && !("start" in value)) {
                      setValue(addDays(value, -1));
                    }
                  }}
                >
                  Select previous date
                </styled.button>
              </div>
            )}
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
                  color: color("content", "primary"),
                  ...textVariants.body,
                  "&:hover": {
                    background: color("background", "neutral"),
                  },
                }}
                onClick={() => {
                  setCurrentMonth(new Date());
                  setValue(undefined);
                  setHoveredDate(null);
                  setPendingRangePart(null);
                }}
              >
                Clear
              </styled.button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
