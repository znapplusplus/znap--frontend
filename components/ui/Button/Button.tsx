import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "icon" | "unstyled";
type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type LinkButtonProps = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
    disabled?: boolean;
  };

type NativeButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const isUnstyled = variant === "unstyled";
  const buttonClassName = isUnstyled
    ? className
    : cn(
        styles.root,
        styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`],
        styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
        fullWidth && styles.fullWidth,
        className,
      );

  if ("href" in props && typeof props.href === "string") {
    const { href, disabled, onClick, ...linkProps } = props as LinkButtonProps;
    return (
      <Link
        href={href}
        className={buttonClassName}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : linkProps.tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as NativeButtonProps;
  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}
