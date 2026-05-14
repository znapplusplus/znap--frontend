"use client";

import { useId, useRef, useState } from "react";
import styles from "./TagInput.module.css";

export type TagInputProps = {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  maxTags?: number;
};

export function TagInput({
  label,
  value,
  onChange,
  placeholder = "Type and press Enter to add",
  helperText,
  errorText,
  disabled = false,
  maxTags,
}: TagInputProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (raw: string) => {
    const trimmed = raw.trim().replace(/,+$/, "").trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) {
      setInputValue("");
      return;
    }
    if (maxTags && value.length >= maxTags) return;
    onChange([...value, trimmed]);
    setInputValue("");
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag(inputValue);
      return;
    }
    if (event.key === "Backspace" && inputValue === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const hasError = Boolean(errorText);

  return (
    <div className={styles.root}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div
        className={`${styles.container} ${hasError ? styles.hasError : ""} ${disabled ? styles.disabled : ""}`}
        onClick={() => inputRef.current?.focus()}
        role="presentation"
      >
        {value.map((tag, index) => (
          <span key={`${tag}-${index}`} className={styles.tag}>
            <span className={styles.tagText}>{tag}</span>
            {!disabled ? (
              <button
                type="button"
                className={styles.tagRemove}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            ) : null}
          </span>
        ))}

        <input
          ref={inputRef}
          id={id}
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled || (Boolean(maxTags) && value.length >= (maxTags ?? 0))}
          aria-label={label}
        />
      </div>

      {errorText ? (
        <p className={`${styles.hint} ${styles.hintError}`}>{errorText}</p>
      ) : helperText ? (
        <p className={styles.hint}>{helperText}</p>
      ) : null}
    </div>
  );
}
