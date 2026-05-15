"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TravelerAuthShell } from "@/components/features";
import {
  Button,
  Divider,
  Input,
  SocialAuthButton,
  type SocialProvider,
} from "@/components/ui";
import styles from "./page.module.css";

type FieldErrors = {
  email?: string;
  password?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5034";

function validateLogin(data: { email: string; password: string }): FieldErrors {
  const next: FieldErrors = {};
  if (!data.email.trim()) next.email = "Email address is required";
  else if (!EMAIL_RE.test(data.email)) next.email = "Enter a valid email address";
  if (!data.password) next.password = "Password is required";
  else if (data.password.length < 8) next.password = "Use 8 or more characters";
  return next;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const errors = useMemo(
    () => (touched ? validateLogin({ email, password }) : {}),
    [email, password, touched],
  );

  useEffect(() => {
    const saved = localStorage.getItem("znap_remember_email");
    if (saved) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setEmail(saved);
      setRemember(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError(null);

    const nextErrors = validateLogin({ email, password });
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSubmitError(data?.message ?? "Could not log in. Please check your details.");
        return;
      }

      if (remember) localStorage.setItem("znap_remember_email", email);
      else localStorage.removeItem("znap_remember_email");

      localStorage.setItem("znap_token", data.token);
      localStorage.setItem("znap_user", JSON.stringify(data.user));
      router.push("/");
    } catch {
      setSubmitError("Could not connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = (provider: SocialProvider) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5034";
    const role = "traveler";
    const returnTo = "/";
    window.location.href =
      `${API_URL}/api/auth/oauth/${provider}/start` +
      `?role=${role}&return_to=${encodeURIComponent(returnTo)}`;
  };

  return (
    <TravelerAuthShell
      title={<>Find your perfect photographer</>}
      subtitle="Sign in to explore and book photographers that match your style."
      illustrationSrc="/illustrations/thai.svg"
      illustrationAlt="Thai travel illustration"
    >
      <form onSubmit={handleLogin} noValidate className={styles.panel}>
        <header className={styles.header}>
          <h1 className={styles.title}>Ready to znap++</h1>
          <p className={styles.description}>Please enter your details to sign in.</p>
        </header>

        <Input
          label="Email address"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          errorText={errors.email}
          disabled={isLoading}
          autoComplete="email"
          fullWidth
        />

        <Input
          label="Password"
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          errorText={errors.password}
          helperText={
            errors.password
              ? undefined
              : "Use 8 or more characters with a mix of letters, numbers & symbols"
          }
          disabled={isLoading}
          autoComplete="current-password"
          fullWidth
        />

        <div className={styles.rememberRow}>
          <label className={styles.rememberLabel}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isLoading}
            />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        {submitError && (
          <div className={styles.alertError} role="alert">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>

        <Divider label="or" />

        <div className={styles.socialStack}>
          <SocialAuthButton provider="google"   mode="login" onClick={() => handleSocial("google")}   disabled={isLoading} />
          <SocialAuthButton provider="apple"    mode="login" onClick={() => handleSocial("apple")}    disabled={isLoading} />
          <SocialAuthButton provider="facebook" mode="login" onClick={() => handleSocial("facebook")} disabled={isLoading} />
          <SocialAuthButton provider="x"        mode="login" onClick={() => handleSocial("x")}        disabled={isLoading} />
        </div>

        <p className={styles.footerText}>
          New to ZNAP++?{" "}
          <Link href="/register" className={styles.footerLink}>
            Create an account
          </Link>
        </p>
      </form>
    </TravelerAuthShell>
  );
}