import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./QuickActionItem.module.css";

export type QuickActionItemProps = {
  /** Leading icon shown in a tinted circle. */
  icon: ReactNode;
  /** Primary line. */
  title: string;
  /** Secondary line below the title. */
  subtitle?: string;
  /** Renders as a Next.js <Link> when set. */
  href?: string;
  /** Click handler (used when no `href`). */
  onClick?: () => void;
  /** Hide the trailing chevron. */
  hideChevron?: boolean;
  /** Icon tint preset. */
  tone?: "primary" | "secondary" | "muted";
  /** Optional className. */
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuickActionItem({
  icon,
  title,
  subtitle,
  href,
  onClick,
  hideChevron = false,
  tone = "primary",
  className,
}: QuickActionItemProps) {
  const inner = (
    <>
      <span
        className={cn(
          styles.iconWrap,
          tone === "secondary" && styles.iconSecondary,
          tone === "muted" && styles.iconMuted,
        )}
      >
        {icon}
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </span>
      {!hideChevron ? (
        <span className={styles.chevron} aria-hidden="true">
          <Chevron />
        </span>
      ) : null}
    </>
  );

  const rootCls = cn(styles.root, className);

  if (href) {
    return (
      <Link href={href} className={rootCls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" className={rootCls} onClick={onClick}>
      {inner}
    </button>
  );
}
