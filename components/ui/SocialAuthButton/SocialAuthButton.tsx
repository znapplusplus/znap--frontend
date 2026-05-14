import type { ButtonHTMLAttributes } from "react";
import styles from "./SocialAuthButton.module.css";

export type SocialProvider = "google" | "apple" | "facebook" | "x";

export type SocialAuthMode = "login" | "signup" | "continue";

export type SocialAuthButtonProps = {
  provider: SocialProvider;
  /** Defaults to "login". Used to generate the default label. */
  mode?: SocialAuthMode;
  /** Override the generated label. */
  label?: string;
  /** Stretch to container width. Defaults to true. */
  fullWidth?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const PROVIDER_NAME: Record<SocialProvider, string> = {
  google: "Google",
  apple: "Apple",
  facebook: "Facebook",
  x: "X",
};

const MODE_PREFIX: Record<SocialAuthMode, string> = {
  login: "Login with",
  signup: "Sign up with",
  continue: "Continue with",
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

export function SocialAuthButton({
  provider,
  mode = "login",
  label,
  fullWidth = true,
  className,
  type,
  ...rest
}: SocialAuthButtonProps) {
  const finalLabel = label ?? `${MODE_PREFIX[mode]} ${PROVIDER_NAME[provider]}`;

  return (
    <button
      type={type ?? "button"}
      className={cn(styles.root, fullWidth && styles.fullWidth, className)}
      {...rest}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <ProviderIcon provider={provider} />
      </span>
      <span className={styles.label}>{finalLabel}</span>
    </button>
  );
}

/* ============================================================
 * Brand icons — each uses its real brand colors (not currentColor)
 * ============================================================ */

function ProviderIcon({ provider }: { provider: SocialProvider }) {
  switch (provider) {
    case "google":
      return <GoogleBrandIcon />;
    case "apple":
      return <AppleBrandIcon />;
    case "facebook":
      return <FacebookBrandIcon />;
    case "x":
      return <XBrandIcon />;
  }
}

export function GoogleBrandIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20.5H24v7h11.3a12 12 0 1 1-3.3-13l5-5a20 20 0 1 0 5.9 11.5 19 19 0 0 0 .7-1Z" />
      <path fill="#FF3D00" d="m6.3 14.7 5.7 4.2A12 12 0 0 1 24 12c3 0 5.8 1.1 8 3l5-5A20 20 0 0 0 6.3 14.7Z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3A12 12 0 0 1 12.7 28l-5.7 4.4A20 20 0 0 0 24 44Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20.5H24v7h11.3a12 12 0 0 1-4.1 5.5l6.3 5.3c-.4.4 6.7-4.9 6.7-14.3 0-1.2-.1-2.5-.6-3Z" />
    </svg>
  );
}

export function AppleBrandIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="#000">
      <path d="M16.4 12.7c0-2.4 2-3.6 2-3.6a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.9.9-3.6.9-.7 0-1.9-.8-3.2-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.8 3-.8s1.8.8 3 .8c1.3 0 2.1-1.1 2.9-2.3a10 10 0 0 0 1.3-2.7 4 4 0 0 1-2.4-3.6ZM14.3 5.6a4 4 0 0 0 1-3 4.3 4.3 0 0 0-2.8 1.5 3.9 3.9 0 0 0-1 2.9 3.6 3.6 0 0 0 2.8-1.4Z" />
    </svg>
  );
}

export function FacebookBrandIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="#1877F2"
        d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.4v7A10 10 0 0 0 22 12Z"
      />
      <path
        fill="#fff"
        d="M15.9 14.9 16.4 12h-2.8v-1.9c0-.8.4-1.6 1.6-1.6h1.3V5.9s-1.1-.2-2.2-.2c-2.3 0-3.8 1.4-3.8 3.9V12H7.9v2.9h2.5v7a10 10 0 0 0 3.1 0v-7h2.4Z"
      />
    </svg>
  );
}

export function XBrandIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="#000">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
