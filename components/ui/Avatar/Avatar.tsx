import type { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

export type AvatarProps = {
  /** Image source. If omitted/failed, falls back to initials. */
  src?: string;
  /** Display name used for initials fallback and alt text. */
  name?: string;
  /** Alt text override. Defaults to `name`. */
  alt?: string;
  /** Size preset. */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Role-based border ring. */
  variant?: "default" | "traveler" | "photographer";
  /** Show a small status dot. */
  status?: "online" | "offline" | null;
  /** Extra className passed to the wrapper. */
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

function initialsOf(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 1).toUpperCase();
  return (parts[0]!.slice(0, 1) + parts[parts.length - 1]!.slice(0, 1)).toUpperCase();
}

export function Avatar({
  src,
  name,
  alt,
  size = "md",
  variant = "default",
  status = null,
  className,
}: AvatarProps) {
  return (
    <span
      className={cn(
        styles.root,
        styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        variant === "traveler" && styles.variantTraveler,
        variant === "photographer" && styles.variantPhotographer,
        className,
      )}
      aria-label={alt ?? name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? name ?? ""} className={styles.image} />
      ) : (
        <span className={styles.initials} aria-hidden="true">
          {initialsOf(name)}
        </span>
      )}
      {status ? (
        <span
          className={cn(
            styles.status,
            status === "online" ? styles.statusOnline : styles.statusOffline,
          )}
          aria-label={status}
        />
      ) : null}
    </span>
  );
}
