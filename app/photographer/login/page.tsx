"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TravelerAuthShell } from "@/components/features";
import {
  Alert,
  Button,
  Checkbox,
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

export default function PhotographerLoginPage() {
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
    const saved = localStorage.getItem("znap_photographer_remember_email");
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

      if (remember) localStorage.setItem("znap_photographer_remember_email", email);
      else localStorage.removeItem("znap_photographer_remember_email");

      localStorage.setItem("znap_token", data.token);
      localStorage.setItem(
        "znap_user",
        JSON.stringify({
          ...(data.user ?? {}),
          email,
          role: "photographer",
          firstName: data.user?.firstName ?? "Creator",
        }),
      );
      router.push("/");
    } catch {
      setSubmitError("Could not connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = (provider: SocialProvider) => {
    if (provider === "apple") {
      setSubmitError("Apple Sign-In coming soon — currently in setup.");
      return;
    }
    // TODO: wire to backend OAuth flow when ready
    setSubmitError(`${provider} sign-in coming soon.`);
  };

  return (
    <TravelerAuthShell
      tone="photographer"
      title={<>Stay in control of your work</>}
      subtitle="Log in to manage jobs and keep your workflow moving."
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

        <div className={styles.formMeta}>
          <Checkbox
            label="Remember me"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            disabled={isLoading}
            size="sm"
          />
          <Link href="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>

        {submitError ? (
          <Alert variant="error" onClose={() => setSubmitError(null)}>
            {submitError}
          </Alert>
        ) : null}

        <Button type="submit" variant="accent" disabled={isLoading} fullWidth size="lg">
          {isLoading ? "Logging in…" : "Login"}
        </Button>

        <p className={styles.switchText}>
          Don&apos;t have an account? <Link href="/photographer/register">Sign up</Link>
        </p>

        <Divider label="or" />

        <div className={styles.socialStack}>
          <SocialAuthButton provider="google" mode="login" onClick={() => handleSocial("google")} disabled={isLoading} />
          <SocialAuthButton provider="apple" mode="login" onClick={() => handleSocial("apple")} disabled={isLoading} />
          <SocialAuthButton provider="facebook" mode="login" onClick={() => handleSocial("facebook")} disabled={isLoading} />
          <SocialAuthButton provider="x" mode="login" onClick={() => handleSocial("x")} disabled={isLoading} />
        </div>

        <p className={styles.switchText}>
          Looking for a traveler account?{" "}
          <Link href="/login">Log in as traveler</Link>
        </p>
      </form>
    </TravelerAuthShell>
  );
}
