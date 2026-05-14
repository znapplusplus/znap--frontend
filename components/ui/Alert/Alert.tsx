import type { ReactNode } from "react";
import styles from "./Alert.module.css";

export type AlertProps = {
  variant?: "info" | "success" | "warning" | "error";
  title?: ReactNode;
  children?: ReactNode;
  /** Optional close handler (renders a × button when set). */
  onClose?: () => void;
  /** Custom leading icon. Defaults to a variant icon. */
  icon?: ReactNode;
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

function DefaultIcon({ variant }: { variant: NonNullable<AlertProps["variant"]> }) {
  if (variant === "success") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="m6.5 10.2 2.3 2.3 4.7-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2 2 17h16L10 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 8v4M10 14v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === "error") {
    return (
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 6v5M10 13v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 9v5M10 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Alert({
  variant = "info",
  title,
  children,
  onClose,
  icon,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        styles.root,
        styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
        className,
      )}
    >
      <span className={styles.icon}>{icon ?? <DefaultIcon variant={variant} />}</span>
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <p className={styles.message}>{children}</p> : null}
      </div>
      {onClose ? (
        <button type="button" onClick={onClose} className={styles.close} aria-label="Dismiss">
          ×
        </button>
      ) : null}
    </div>
  );
}
