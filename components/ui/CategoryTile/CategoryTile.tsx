import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./CategoryTile.module.css";

export type CategoryTileProps = {
  /** Category name shown on the bottom-left. */
  label: string;
  /** Background image URL. */
  imageSrc: string;
  /** Alt text for the image. Defaults to label. */
  imageAlt?: string;
  /** Optional icon shown in a circular badge on the top-left. */
  icon?: ReactNode;
  /** Aspect ratio of the tile. */
  aspect?: "square" | "landscape" | "portrait";
  /** Renders as a Next.js <Link> when href is set. */
  href?: string;
  /** Click handler (used when no `href`). */
  onClick?: () => void;
  /** Optional className. */
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function CategoryTile({
  label,
  imageSrc,
  imageAlt,
  icon,
  aspect = "landscape",
  href,
  onClick,
  className,
}: CategoryTileProps) {
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={imageAlt ?? label} className={styles.image} />
      <span className={styles.overlay} aria-hidden="true" />
      {icon ? (
        <span className={styles.iconBadge} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className={styles.label}>{label}</span>
    </>
  );

  const aspectCls =
    aspect === "square"
      ? styles.aspectSquare
      : aspect === "portrait"
        ? styles.aspectPortrait
        : styles.aspectLandscape;

  const rootCls = cn(styles.root, aspectCls, className);

  if (href) {
    return (
      <Link href={href} className={rootCls} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={rootCls} onClick={onClick} aria-label={label}>
      {content}
    </button>
  );
}
