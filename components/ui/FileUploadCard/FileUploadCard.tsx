"use client";

import { useId, useRef } from "react";
import styles from "./FileUploadCard.module.css";

export type FileUploadCardProps = {
  label: string;
  description?: string;
  accept?: string;
  maxSizeLabel?: string;
  file?: File | null;
  previewUrl?: string | null;
  onChange: (file: File | null) => void;
  illustration?: React.ReactNode;
  disabled?: boolean;
};

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M9 3H15L17 5H21C21.5523 5 22 5.44772 22 6V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V6C2 5.44772 2.44772 5 3 5H7L9 3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export function FileUploadCard({
  label,
  description,
  accept = "image/jpeg,image/png",
  maxSizeLabel = "JPG, PNG (Max 10 MB)",
  file,
  previewUrl,
  onChange,
  illustration,
  disabled = false,
}: FileUploadCardProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    onChange(selected);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`${styles.card} ${disabled ? styles.disabled : ""}`}>
      <div className={styles.preview}>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt={`${label} preview`} className={styles.previewImage} />
        ) : illustration ? (
          <div className={styles.illustration}>{illustration}</div>
        ) : (
          <div className={styles.placeholder}>
            <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={styles.placeholderIcon}>
              <rect width="64" height="64" rx="12" fill="var(--color-background)" />
              <rect x="8" y="16" width="48" height="36" rx="6" stroke="var(--color-border-strong)" strokeWidth="2" fill="none"/>
              <circle cx="32" cy="32" r="10" stroke="var(--color-border-strong)" strokeWidth="2" fill="none"/>
              <circle cx="32" cy="32" r="5" fill="var(--color-border)"/>
              <rect x="20" y="18" width="10" height="5" rx="2" fill="var(--color-border)"/>
            </svg>
          </div>
        )}
      </div>

      <div className={styles.action}>
        <label htmlFor={id} className={styles.uploadLabel}>
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            className={styles.hiddenInput}
            onChange={handleChange}
            disabled={disabled}
            aria-label={label}
          />
          <button
            type="button"
            className={styles.cameraButton}
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            aria-label={`Upload ${label}`}
          >
            <CameraIcon />
          </button>
        </label>

        <div className={styles.meta}>
          <span className={styles.metaLabel}>{file ? file.name : label}</span>
          <span className={styles.metaHint}>{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : maxSizeLabel}</span>
        </div>

        {file ? (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            disabled={disabled}
            aria-label="Remove file"
          >
            ×
          </button>
        ) : null}
      </div>

      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}
