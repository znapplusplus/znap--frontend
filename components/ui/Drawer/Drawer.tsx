"use client";

import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Drawer.module.css";

export type DrawerProps = {
  open: boolean;
  onClose: () => void;
  /** Slide-in side. */
  side?: "left" | "right" | "top" | "bottom";
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  hideClose?: boolean;
  /** Width (left/right) or height (top/bottom) override. */
  size?: "sm" | "md" | "lg";
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Drawer({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
  hideClose = false,
  size = "md",
}: DrawerProps) {
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
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <aside
        className={cn(
          styles.panel,
          styles[`side${side.charAt(0).toUpperCase()}${side.slice(1)}`],
          styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || !hideClose) && (
          <header className={styles.header}>
            {title ? <h2 id="drawer-title" className={styles.title}>{title}</h2> : <span />}
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
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </aside>
    </div>
  );
}
