import * as React from "react";

export type IconProps = {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
};

export function ChevronDownSmall({
  style,
  width = 20,
  height = 20,
}: IconProps) {
  return (
    <svg
      style={style}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.23967 8.20041C6.5432 7.91856 7.01775 7.93613 7.2996 8.23967L10 11.1478L12.7004 8.23967C12.9823 7.93613 13.4568 7.91856 13.7603 8.20041C14.0639 8.48226 14.0815 8.95681 13.7996 9.26034L10.5496 12.7603C10.4077 12.9132 10.2086 13 10 13C9.79145 13 9.59232 12.9132 9.45041 12.7603L6.20041 9.26034C5.91856 8.95681 5.93613 8.48226 6.23967 8.20041Z"
      />
    </svg>
  );
}

export function CheckSmall({ style, width = 20, height = 20 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.7713 5.71076C16.0691 5.99865 16.0771 6.47345 15.7892 6.77127L8.53924 14.2713C8.39611 14.4193 8.1984 14.502 7.99248 14.5C7.78655 14.4979 7.59054 14.4112 7.45041 14.2603L4.20041 10.7603C3.91856 10.4568 3.93613 9.98226 4.23966 9.7004C4.5432 9.41855 5.01775 9.43613 5.2996 9.73966L8.01095 12.6596L14.7108 5.72873C14.9987 5.43092 15.4735 5.42287 15.7713 5.71076Z"
      />
    </svg>
  );
}
