import styles from "./Spinner.module.css";

export type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  /** Color of the spinner. Defaults to primary. */
  tone?: "primary" | "muted" | "inverse";
  /** Accessible label. */
  label?: string;
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Spinner({
  size = "md",
  tone = "primary",
  label = "Loading…",
  className,
}: SpinnerProps) {
  return (
    <span
      className={cn(
        styles.root,
        styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        tone === "muted" && styles.toneMuted,
        tone === "inverse" && styles.toneInverse,
        className,
      )}
      role="status"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".2" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}
