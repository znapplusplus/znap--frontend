import type { ReactNode } from "react";
import styles from "./Divider.module.css";

export type DividerProps = {
  /** Orientation. */
  orientation?: "horizontal" | "vertical";
  /** Optional label centered in the divider. */
  label?: ReactNode;
  /** Visual style. */
  variant?: "solid" | "dashed";
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Divider({
  orientation = "horizontal",
  label,
  variant = "solid",
  className,
}: DividerProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        className={cn(styles.labelled, variant === "dashed" && styles.dashed, className)}
        role="separator"
      >
        <span className={styles.labelText}>{label}</span>
      </div>
    );
  }

  return (
    <hr
      className={cn(
        orientation === "vertical" ? styles.vertical : styles.horizontal,
        variant === "dashed" && styles.dashed,
        className,
      )}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
