import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

export type EmptyStateProps = {
  /** Optional illustration or icon. */
  icon?: ReactNode;
  /** Main heading. */
  title: ReactNode;
  /** Supporting copy. */
  description?: ReactNode;
  /** Primary action button area. */
  action?: ReactNode;
  /** Visual style. */
  variant?: "default" | "compact";
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        styles.root,
        variant === "compact" && styles.compact,
        className,
      )}
    >
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
