import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeProps = {
  children: ReactNode;
  /** Visual style. */
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral";
  /** Size preset. */
  size?: "sm" | "md" | "lg";
  /** Optional icon shown before the label. */
  icon?: ReactNode;
  /** Optional className. */
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Badge({
  children,
  variant = "default",
  size = "md",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        styles.root,
        styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
        styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        className,
      )}
    >
      {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
      <span className={styles.label}>{children}</span>
    </span>
  );
}
