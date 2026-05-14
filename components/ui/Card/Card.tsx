import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardProps = {
  children: ReactNode;
  /** Visual style. */
  variant?: "default" | "outline" | "elevated" | "ghost";
  /** Padding preset. */
  padding?: "none" | "sm" | "md" | "lg";
  /** When true, applies hover transform + shadow. */
  interactive?: boolean;
  /** Render as an element other than `<div>`. */
  as?: "div" | "section" | "article" | "li";
  /** Extra className. */
  className?: string;
} & HTMLAttributes<HTMLElement>;

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function Card({
  children,
  variant = "default",
  padding = "md",
  interactive = false,
  as: Tag = "div",
  className,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        styles.root,
        styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
        styles[`padding${padding.charAt(0).toUpperCase()}${padding.slice(1)}`],
        interactive && styles.interactive,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
