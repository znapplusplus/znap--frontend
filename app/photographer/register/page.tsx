"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StepProgress, TravelerAuthShell } from "@/components/auth";
import { Button, Input } from "@/components/ui";
import styles from "./page.module.css";

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  terms?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5034";

const countries = [
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "TH", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dialCode: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "SG", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
];

const countriesByDialCode = [...countries].sort((a, b) => b.dialCode.length - a.dialCode.length);

function detectCountryFromPhone(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  const plusNormalized = trimmed.startsWith("00") ? `+${trimmed.slice(2)}` : trimmed;
  const digitsOnly = trimmed.replace(/\D/g, "");
  return countriesByDialCode.find((country) => {
    const dialDigits = country.dialCode.replace(/\D/g, "");
    return plusNormalized.startsWith(country.dialCode) || digitsOnly.startsWith(dialDigits);
  });
}

function formatPhoneForPayload(phone: string, dialCode: string) {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return trimmed;
  if (trimmed.startsWith("00")) return `+${trimmed.slice(2)}`;

  const digitsOnly = trimmed.replace(/\D/g, "");
  const dialDigits = dialCode.replace(/\D/g, "");
  if (digitsOnly.startsWith(dialDigits)) return `+${digitsOnly}`;

  return `${dialCode} ${trimmed}`;
}

function validateAccount(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
}): FieldErrors {
  const next: FieldErrors = {};
  if (!data.firstName.trim()) next.firstName = "First name is required";
  if (!data.lastName.trim()) next.lastName = "Last name is required";
  if (!data.email.trim()) next.email = "Email address is required";
  else if (!EMAIL_RE.test(data.email)) next.email = "Enter a valid email address";
  if (!data.phone.trim()) next.phone = "Phone number is required";
  if (!data.password) next.password = "Password is required";
  else if (data.password.length < 8) next.password = "Use at least 8 characters";
  if (!data.acceptTerms) next.terms = "Please agree to the terms before continuing";
  return next;
}

export default function PhotographerRegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCountry = countries.find((country) => country.code === countryCode) ?? countries[0];

  const errors = useMemo(
    () => (touched ? validateAccount({ firstName, lastName, email, phone, password, acceptTerms }) : {}),
    [acceptTerms, email, firstName, lastName, password, phone, touched],
  );

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    const detectedCountry = detectCountryFromPhone(value);
    if (detectedCountry && detectedCountry.code !== countryCode) {
      setCountryCode(detectedCountry.code);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError(null);

    const nextErrors = validateAccount({ firstName, lastName, email, phone, password, acceptTerms });
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          middleName,
          lastName,
          phone: formatPhoneForPayload(phone, selectedCountry.dialCode),
          role: "photographer",
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(data?.message ?? "Could not create your creator account.");
        return;
      }

      router.push("/photographer/login");
    } catch {
      setSubmitError("Could not connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TravelerAuthShell
      tone="photographer"
      title={<>Start your photography journey</>}
      subtitle="Join Znap++ and connect with clients, get real jobs, and grow your career."
    >
      <form onSubmit={handleSubmit} noValidate className={styles.panel}>
        <div className={styles.progressRow}>
          <StepProgress currentStep={1} totalSteps={3} />
        </div>
        <h1 className={styles.title}>Sign up now</h1>

        <div className={styles.formGrid}>
          <Input label="First name" value={firstName} onChange={(event) => setFirstName(event.target.value)} errorText={errors.firstName} />
          <Input label="Middle name" labelHint="(optional)" value={middleName} onChange={(event) => setMiddleName(event.target.value)} />
        </div>
        <Input label="Last name" value={lastName} onChange={(event) => setLastName(event.target.value)} errorText={errors.lastName} />
        <Input label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} errorText={errors.email} />
        <Input
          label="Phone number"
          type="tel"
          value={phone}
          onChange={(event) => handlePhoneChange(event.target.value)}
          errorText={errors.phone}
          leftAddon={
            <label className={styles.countryPrefix}>
              <span className={styles.flag} aria-label={selectedCountry.name}>
                {selectedCountry.flag}
              </span>
              <select value={countryCode} onChange={(event) => setCountryCode(event.target.value)} aria-label="Country code">
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} {country.dialCode}
                  </option>
                ))}
              </select>
            </label>
          }
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          errorText={errors.password}
          helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
        />

        <label className={styles.termsRow}>
          <input type="checkbox" checked={acceptTerms} onChange={(event) => setAcceptTerms(event.target.checked)} />
          <span>
            By creating an account, I agree to our <Link href="/terms">Terms of use</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>
          </span>
        </label>

        {errors.terms ? <div className={styles.errorText}>{errors.terms}</div> : null}
        {submitError ? <div role="alert" className={styles.errorText}>{submitError}</div> : null}

        <Button type="submit" variant="unstyled" className={styles.primaryButton} disabled={isLoading}>
          {isLoading ? "Creating account..." : "Sign up"}
        </Button>
        <p className={styles.switchText}>
          Already have an account? <Link href="/photographer/login">Log in</Link>
        </p>
      </form>
    </TravelerAuthShell>
  );
}
