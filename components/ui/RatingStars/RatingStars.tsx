import styles from "./RatingStars.module.css";

export type RatingStarsProps = {
  /** 0–5 rating. Fractional allowed. */
  rating: number;
  /** Total review count. Renders as "(N)". */
  count?: number;
  /** Size preset. */
  size?: "sm" | "md" | "lg";
  /** When false, show only the star icon without the numeric value. */
  showValue?: boolean;
  /** Show all 5 stars instead of a single icon. */
  showAllStars?: boolean;
  /** Optional className. */
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 2.5l2.92 6.32 6.58.73-4.9 4.6 1.34 6.85L12 17.6l-5.94 3.4 1.34-6.85-4.9-4.6 6.58-.73L12 2.5z" strokeLinejoin="round" />
    </svg>
  );
}

export function RatingStars({
  rating,
  count,
  size = "md",
  showValue = true,
  showAllStars = false,
  className,
}: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const display = Number.isInteger(clamped) ? clamped.toFixed(1) : clamped.toFixed(1);

  return (
    <span
      className={cn(
        styles.root,
        styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        className,
      )}
      aria-label={`${display} out of 5${count ? `, ${count} reviews` : ""}`}
    >
      {showAllStars ? (
        <span className={styles.stars}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={styles.star}>
              <StarIcon filled={i < Math.round(clamped)} />
            </span>
          ))}
        </span>
      ) : (
        <span className={styles.star}>
          <StarIcon filled />
        </span>
      )}
      {showValue ? <span className={styles.value}>{display}</span> : null}
      {typeof count === "number" ? (
        <span className={styles.count}>({count})</span>
      ) : null}
    </span>
  );
}
