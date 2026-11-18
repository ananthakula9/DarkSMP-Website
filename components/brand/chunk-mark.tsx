import type { SVGProps } from "react";

export function ChunkMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="2" y="2" width="9" height="9" fill="currentColor" />
      <rect x="13" y="2" width="9" height="9" fill="currentColor" />
      <rect x="2" y="13" width="9" height="9" fill="currentColor" />
      <rect
        x="13.75"
        y="13.75"
        width="7.5"
        height="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
