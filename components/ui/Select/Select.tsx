"use client";

import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  label?: ReactNode;
  helperText?: ReactNode;
  errorText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">;

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorText,
      options,
      placeholder,
      fullWidth = false,
      size = "md",
      id,
      className,
      ...rest
    },
    ref,
  ) => {
    const auto = useId();
    const selectId = id ?? auto;

    return (
      <div className={cn(styles.root, fullWidth && styles.fullWidth, className)}>
        {label ? (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        ) : null}
        <div className={styles.selectWrap}>
          <select
            id={selectId}
            ref={ref}
            className={cn(
              styles.select,
              styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
              errorText && styles.hasError,
            )}
            aria-invalid={Boolean(errorText)}
            {...rest}
          >
            {placeholder ? (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            ) : null}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {errorText ? (
          <p className={styles.error}>{errorText}</p>
        ) : helperText ? (
          <p className={styles.helper}>{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Select.displayName = "Select";
