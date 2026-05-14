"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Switch.module.css";

export type SwitchProps = {
  label?: ReactNode;
  description?: ReactNode;
  size?: "sm" | "md";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">;

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, size = "md", id, className, ...rest }, ref) => {
    const auto = useId();
    const inputId = id ?? auto;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          styles.root,
          size === "sm" && styles.sizeSm,
          rest.disabled && styles.disabled,
          className,
        )}
      >
        {(label || description) && (
          <span className={styles.text}>
            {label ? <span className={styles.label}>{label}</span> : null}
            {description ? <span className={styles.description}>{description}</span> : null}
          </span>
        )}
        <span className={styles.trackWrap}>
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            role="switch"
            className={styles.input}
            {...rest}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
        </span>
      </label>
    );
  },
);

Switch.displayName = "Switch";
