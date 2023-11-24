import * as React from "react";

export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined
): T {
  const callbackRef = React.useRef(callback);

  callbackRef.current = callback;

  return React.useMemo(
    () => ((...args) => callbackRef.current?.(...args)) as T,
    []
  );
}
