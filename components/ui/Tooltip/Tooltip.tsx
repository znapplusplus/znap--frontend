import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

export type TooltipProps = {
  /** The trigger element. */
  children: ReactNode;
  /** Tooltip content. */
  label: ReactNode;
  /** Side relative to the trigger. */
  side?: "top" | "bottom" | "left" | "right";
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Tooltip({ children, label, side = "top" }: TooltipProps) {
  return (
    <span className={styles.root}>
      <span className={styles.trigger}>{children}</span>
      <span
        role="tooltip"
        className={cn(
          styles.bubble,
          styles[`side${side.charAt(0).toUpperCase()}${side.slice(1)}`],
        )}
      >
        {label}
      </span>
    </span>
  );
}
