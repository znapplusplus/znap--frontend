"use client";

import type { ReactNode } from "react";
import styles from "./Tabs.module.css";

export type TabItem = {
  id: string;
  label: ReactNode;
  /** Optional count chip shown after the label. */
  count?: number;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Visual style. */
  variant?: "underline" | "pill";
  /** Stretch tabs evenly. */
  fullWidth?: boolean;
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Tabs({
  items,
  value,
  onChange,
  variant = "underline",
  fullWidth = false,
  className,
}: TabsProps) {
  return (
    <div
      role="tablist"
      className={cn(
        styles.root,
        variant === "pill" && styles.pill,
        fullWidth && styles.fullWidth,
        className,
      )}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            className={cn(styles.tab, active && styles.active)}
            onClick={() => onChange(item.id)}
          >
            <span>{item.label}</span>
            {typeof item.count === "number" ? (
              <span className={styles.count}>{item.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
