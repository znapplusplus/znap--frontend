import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

export type SectionHeaderProps = {
  /** Section title. */
  title: ReactNode;
  /** Optional description shown below the title. */
  description?: ReactNode;
  /** Optional trailing action — typically a "view all" link. */
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  /** Visual style. */
  variant?: "default" | "kicker";
  /** When `kicker`, this becomes uppercase + small. Default uses heading size. */
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function SectionHeader({
  title,
  description,
  action,
  variant = "default",
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(styles.root, className)}>
      <div className={styles.titleBlock}>
        {variant === "kicker" ? (
          <span className={styles.kicker}>{title}</span>
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>

      {action ? (
        action.href ? (
          <Link href={action.href} className={styles.action}>
            {action.label}
          </Link>
        ) : (
          <button type="button" className={styles.action} onClick={action.onClick}>
            {action.label}
          </button>
        )
      ) : null}
    </header>
  );
}
