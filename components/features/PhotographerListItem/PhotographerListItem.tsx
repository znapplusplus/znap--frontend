import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { RatingStars } from "@/components/ui/RatingStars";
import styles from "./PhotographerListItem.module.css";

export type PhotographerListItemProps = {
  /** Display name. */
  name: string;
  /** Avatar image URL. */
  avatarUrl?: string;
  /** Average rating, 0–5. */
  rating: number;
  /** Number of reviews backing the rating. */
  ratingCount: number;
  /** Location label (city / region). */
  location: string;
  /** Renders as Next.js <Link> when set. */
  href?: string;
  /** Click handler when no `href`. */
  onClick?: () => void;
  /** Avatar size — defaults to `md`. Match `sm` for dense lists. */
  size?: "sm" | "md";
  /** Optional className. */
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function PhotographerListItem({
  name,
  avatarUrl,
  rating,
  ratingCount,
  location,
  href,
  onClick,
  size = "md",
  className,
}: PhotographerListItemProps) {
  const inner = (
    <>
      <Avatar src={avatarUrl} name={name} size={size === "sm" ? "md" : "lg"} variant="photographer" />
      <span className={styles.text}>
        <span className={styles.name}>{name}</span>
        <RatingStars rating={rating} count={ratingCount} size="sm" />
        <span className={styles.location}>{location}</span>
      </span>
    </>
  );

  const rootCls = cn(
    styles.root,
    size === "sm" && styles.sizeSm,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={rootCls}>
        {inner}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={rootCls} onClick={onClick}>
        {inner}
      </button>
    );
  }

  return <div className={rootCls}>{inner}</div>;
}
