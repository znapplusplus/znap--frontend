import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Navbar.module.css";

export type NavbarVariant = "guest" | "traveler" | "photographer";

export type NavbarUser = {
  name?: string;
  avatarUrl?: string;
};

export type NavbarProps = {
  variant?: NavbarVariant;
  user?: NavbarUser;
  searchValue?: string;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSignOut?: () => void;
};

const cn = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export function Navbar({
  variant = "guest",
  user,
  searchValue,
  searchPlaceholder = "hint for searching...",
  onSearchChange,
  onSignOut,
}: NavbarProps) {
  const isGuest = variant === "guest";
  const isTraveler = variant === "traveler";
  const displayName = user?.name ?? (isTraveler ? "Jodaney" : "Sofarey");

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Znap++ home">
          ZNAP++
        </Link>

        <nav className={styles.nav} aria-label={`${variant} navigation`}>
          {isGuest ? (
            <>
              <Link href="/explore" className={styles.navLink}>
                Explore <ChevronDownIcon />
              </Link>
              <Link href="/#how-it-works" className={styles.navLink}>
                How it works
              </Link>
            </>
          ) : isTraveler ? (
            <>
              <Link href="/my-booking" className={styles.navLink}>
                My Booking
              </Link>
              <Link href="/find-photographer" className={styles.navLink}>
                Find Photographer
              </Link>
              <Link href="/favorites" className={styles.navLink}>
                Favorites
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className={styles.navLink}>
                Dashboard
              </Link>
              <Link href="/requests" className={styles.navLink}>
                Requests
              </Link>
              <Link href="/portfolio" className={styles.navLink}>
                Portfolio
              </Link>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          {isGuest ? (
            <>
              <Button href="/photographer/login" variant="unstyled" className={styles.creatorButton}>
                Join as a Creator
              </Button>
              <span className={styles.divider} />
              <Link href="/help" className={styles.helpLink}>
                Help?
              </Link>
              <Button href="/register" variant="unstyled" className={styles.signInButton}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {isTraveler ? (
                <>
                  <label className={styles.search} aria-label="Search">
                    <input
                      value={searchValue}
                      onChange={(event) => onSearchChange?.(event.target.value)}
                      placeholder={searchPlaceholder}
                    />
                    <SearchIcon />
                  </label>
                  <span className={styles.divider} />
                </>
              ) : null}

              <IconLink href="/wallet" label="Wallet">
                <WalletIcon />
              </IconLink>
              <IconLink href="/messages" label="Messages">
                <SendIcon />
              </IconLink>
              <IconLink href="/notifications" label="Notifications">
                <BellIcon />
              </IconLink>

              <Button
                type="button"
                variant="unstyled"
                className={styles.profile}
                onClick={onSignOut}
                aria-label={onSignOut ? "Open profile menu or sign out" : "Open profile menu"}
              >
                <span className={styles.greeting}>
                  <span>Hello!</span>
                  <strong>{displayName}</strong>
                </span>
                <span
                  className={cn(
                    styles.avatar,
                    variant === "photographer" && styles.avatarPhotographer,
                    !user?.avatarUrl && styles.avatarFallback,
                  )}
                >
                  {user?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatarUrl} alt="" />
                  ) : (
                    displayName.slice(0, 1).toUpperCase()
                  )}
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Button href={href} variant="unstyled" className={styles.iconLink} aria-label={label}>
      {children}
    </Button>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m12.4 12.4 3.1 3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 6.4h11.8a1.7 1.7 0 0 1 1.7 1.7v6.2a1.7 1.7 0 0 1-1.7 1.7H4.7A1.7 1.7 0 0 1 3 14.3V5.7A1.7 1.7 0 0 1 4.7 4h9" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.6 11h3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M16.7 3.6 3.5 9.2c-.7.3-.6 1.3.2 1.4l5 .8 3.6 4.1c.5.6 1.4.3 1.6-.5l3.7-10.5c.2-.6-.4-1.1-.9-.9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m8.8 11.3 3.4-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.2 8.7a4.8 4.8 0 0 1 9.6 0v2.5l1.1 2.2H4.1l1.1-2.2V8.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.2 15.4a2 2 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
