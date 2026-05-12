"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TravelerAuthShell } from "@/components/auth";
import { Button, Input } from "@/components/ui";
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
  else if (data.password.length < 6) next.password = "Use at least 6 characters";
  return next;
}

export default function PhotographerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const errors = useMemo(
    () => (touched ? validateLogin({ email, password }) : {}),
    [email, password, touched],
  );

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

  return (
    <TravelerAuthShell
      tone="photographer"
      title={<>Stay in control of your work</>}
      subtitle="Log in to manage jobs and keep your workflow moving"
    >
      <form onSubmit={handleLogin} noValidate className={styles.panel}>
        <h1 className={styles.title}>Ready to znap++</h1>
        <p className={styles.description}>Please enter your details to sign in.</p>

        <Input
          label="Email address"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          errorText={errors.email}
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          errorText={errors.password}
          helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
          disabled={isLoading}
        />

        {submitError ? <div role="alert" className={styles.errorText}>{submitError}</div> : null}

        <Button type="submit" variant="unstyled" className={styles.primaryButton} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <p className={styles.switchText}>
          Don&apos;t have an account? <Link href="/photographer/register">Sign up</Link>
        </p>
      </form>
    </TravelerAuthShell>
  );
}
