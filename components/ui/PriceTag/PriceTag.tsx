import styles from "./PriceTag.module.css";

export type PriceTagProps = {
  /** Numeric amount. */
  amount: number;
  /** Currency code (display only — formatting is local). Defaults to "THB". */
  currency?: "THB" | "USD" | "EUR" | "JPY" | string;
  /** Unit suffix (e.g. "/hr", "/session"). */
  unit?: string;
  /** Size preset. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Mute the entire tag (e.g. for "old price"). */
  muted?: boolean;
  /** Mark as old price — applies strikethrough + muted. */
  strikethrough?: boolean;
  /** Visually emphasize (primary brand color). */
  emphasis?: boolean;
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

const CURRENCY_SYMBOLS: Record<string, string> = {
  THB: "฿",
  USD: "$",
  EUR: "€",
  JPY: "¥",
};

export function PriceTag({
  amount,
  currency = "THB",
  unit,
  size = "md",
  muted = false,
  strikethrough = false,
  emphasis = false,
  className,
}: PriceTagProps) {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <span
      className={cn(
        styles.root,
        styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        muted && styles.muted,
        strikethrough && styles.strike,
        emphasis && styles.emphasis,
        className,
      )}
    >
      <span className={styles.symbol}>{symbol}</span>
      <span className={styles.amount}>{formatted}</span>
      {unit ? <span className={styles.unit}>{unit}</span> : null}
    </span>
  );
}
