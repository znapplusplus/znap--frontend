"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  label?: ReactNode;
  description?: ReactNode;
  errorText?: string;
  size?: "sm" | "md";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type">;

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, errorText, size = "md", id, className, ...rest }, ref) => {
    const auto = useId();
    const inputId = id ?? auto;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          styles.root,
          size === "sm" && styles.sizeSm,
          errorText && styles.hasError,
          rest.disabled && styles.disabled,
          className,
        )}
      >
        <span className={styles.boxWrap}>
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            className={styles.input}
            aria-invalid={Boolean(errorText)}
            {...rest}
          />
          <span className={styles.box} aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M2 6.2 4.7 9 10 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        {(label || description) && (
          <span className={styles.text}>
            {label ? <span className={styles.label}>{label}</span> : null}
            {description ? <span className={styles.description}>{description}</span> : null}
            {errorText ? <span className={styles.error}>{errorText}</span> : null}
          </span>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
