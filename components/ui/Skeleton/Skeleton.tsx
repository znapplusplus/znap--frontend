import type { CSSProperties } from "react";
import styles from "./Skeleton.module.css";

export type SkeletonProps = {
  /** Shape preset. */
  shape?: "rect" | "circle" | "text";
  /** Width — number (px), or any valid CSS length. Defaults to 100%. */
  width?: number | string;
  /** Height — number (px), or any valid CSS length. */
  height?: number | string;
  /** When shape="text", number of lines to render. */
  lines?: number;
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

function toCss(v?: number | string) {
  if (v == null) return undefined;
  return typeof v === "number" ? `${v}px` : v;
}

export function Skeleton({
  shape = "rect",
  width,
  height,
  lines = 1,
  className,
}: SkeletonProps) {
  if (shape === "text" && lines > 1) {
    return (
      <span className={cn(styles.stack, className)} aria-hidden="true">
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={cn(styles.root, styles.text)}
            style={{ width: i === lines - 1 ? "60%" : toCss(width) ?? "100%" }}
          />
        ))}
      </span>
    );
  }

  const style: CSSProperties = {
    width: toCss(width),
    height: toCss(height),
  };

  return (
    <span
      className={cn(
        styles.root,
        shape === "circle" && styles.circle,
        shape === "text" && styles.text,
        className,
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
