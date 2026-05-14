"use client";

import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Dialog.module.css";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  hideClose?: boolean;
  preventBackdropClose?: boolean;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  hideClose = false,
  preventBackdropClose = false,
}: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        if (!preventBackdropClose) onClose();
      }}
      role="presentation"
    >
      <div
        className={cn(styles.dialog, styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`])}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || !hideClose) && (
          <header className={styles.header}>
            {title ? <h2 id="dialog-title" className={styles.title}>{title}</h2> : <span />}
            {!hideClose ? (
              <Button
                type="button"
                variant="unstyled"
                onClick={onClose}
                className={styles.closeBtn}
                aria-label="Close"
              >
                ×
              </Button>
            ) : null}
          </header>
        )}
        {description ? <p className={styles.description}>{description}</p> : null}
        {children ? <div className={styles.body}>{children}</div> : null}
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </div>
    </div>
  );
}
