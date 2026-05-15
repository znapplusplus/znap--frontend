"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StylePreferencePicker, TravelerAuthShell, type StyleOption } from "@/components/features";
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  Input,
  SocialAuthButton,
  StepProgress,
  type SocialProvider,
} from "@/components/ui";
import { ArrowLeftIcon, PlusIcon } from "@/components/ui/icons";
import styles from "./page.module.css";

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  styles?: string;
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

const styleOptions: StyleOption[] = [
  { id: "in-trend", label: "In-trend", imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80" },
  { id: "travel", label: "Travel", imageUrl: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=500&q=80" },
  { id: "portrait", label: "Portrait", imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80" },
  { id: "street-art", label: "Street Art", imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80" },
  { id: "graduation", label: "Graduation", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=500&q=80" },
  { id: "wedding", label: "Wedding", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=500&q=80" },
  { id: "fashion", label: "Fashion", imageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80" },
  { id: "food", label: "Food", imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=500&q=80" },
  { id: "couple", label: "Couple", imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=500&q=80" },
  { id: "nature", label: "Nature", imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80" },
  { id: "beach", label: "Beach", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80" },
  { id: "film", label: "Film", imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80" },
];

function validateAccount(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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
  if (!data.confirmPassword) next.confirmPassword = "Confirm your password";
  else if (data.confirmPassword !== data.password) next.confirmPassword = "Passwords do not match";
  if (!data.acceptTerms) next.terms = "Please agree to the terms before continuing";
  return next;
}

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [customStyle, setCustomStyle] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedCountry = countries.find((country) => country.code === countryCode) ?? countries[0];

  const errors = useMemo(
    () =>
      touched
        ? validateAccount({ firstName, lastName, email, phone, password, confirmPassword, acceptTerms })
        : {},
    [acceptTerms, confirmPassword, email, firstName, lastName, password, phone, touched],
  );

  const handleNext = () => {
    setTouched(true);
    const nextErrors = validateAccount({ firstName, lastName, email, phone, password, confirmPassword, acceptTerms });
    if (Object.keys(nextErrors).length === 0) {
      setSubmitError(null);
      setStep(2);
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    const detectedCountry = detectCountryFromPhone(value);
    if (detectedCountry && detectedCountry.code !== countryCode) {
      setCountryCode(detectedCountry.code);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (selectedStyles.length < 3) {
      setSubmitError("Select at least 3 styles so we can match you better.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          firstName,
          middleName,
          lastName,
          countryCode,
          phone: formatPhoneForPayload(phone, selectedCountry.dialCode),
          role: "traveler",
          preferredStyles: selectedStyles,
          customStyle,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSubmitError(data?.message ?? "Could not create your account. Please try again.");
        return;
      }

      router.push("/login");
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
      title={step === 1 ? <>Find your perfect photographer</> : <>What are you into?</>}
      subtitle={
        step === 1
          ? "Create your account and connect with photographers who match your style."
          : "Tell us your style so we can match you with the right photographers."
      }
      illustrationSrc="/illustrations/thai.svg"
      illustrationAlt="Thai travel illustration"
    >
      {step === 1 ? (
        <div className={styles.panel}>
          <div className={styles.progressRow}>
            <StepProgress currentStep={1} totalSteps={2} />
          </div>
          <header className={styles.header}>
            <h2 className={styles.title}>Sign up now</h2>
            <p className={styles.description}>It only takes a minute to get started.</p>
          </header>

          <div className={styles.formGrid}>
            <Input
              label="First name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              errorText={errors.firstName}
              fullWidth
            />
            <Input
              label="Middle name"
              labelHint="(optional)"
              value={middleName}
              onChange={(event) => setMiddleName(event.target.value)}
              fullWidth
            />
          </div>
          <Input
            label="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            errorText={errors.lastName}
            fullWidth
          />
          <Input
            label="Email address"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            errorText={errors.email}
            autoComplete="email"
            fullWidth
          />
          <Input
            label="Phone number"
            type="tel"
            value={phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            errorText={errors.phone}
            autoComplete="tel"
            fullWidth
            leftAddon={
              <label className={styles.countryPrefix}>
                <span className={styles.flag} aria-label={selectedCountry.name}>
                  {selectedCountry.flag}
                </span>
                <select
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  aria-label="Country code"
                >
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
            placeholder="enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            errorText={errors.password}
            helperText={
              errors.password
                ? undefined
                : "Use 8 or more characters with a mix of letters, numbers & symbols"
            }
            autoComplete="new-password"
            fullWidth
          />
          <Input
            label="Confirm password"
            type="password"
            placeholder="re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            errorText={errors.confirmPassword}
            autoComplete="new-password"
            fullWidth
          />

          <Checkbox
            checked={acceptTerms}
            onChange={(event) => setAcceptTerms(event.target.checked)}
            label={
              <span className={styles.termsText}>
                By creating an account, I agree to our{" "}
                <Link href="/terms">Terms of use</Link> and{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            }
            errorText={errors.terms}
          />

          {submitError ? (
            <Alert variant="error" onClose={() => setSubmitError(null)}>
              {submitError}
            </Alert>
          ) : null}

          <Button type="button" onClick={handleNext} fullWidth size="lg" disabled={isLoading}>
            Sign up
          </Button>

          <p className={styles.switchText}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>

          <Divider label="or" />

          <div className={styles.socialStack}>
            <SocialAuthButton provider="google"   onClick={() => handleSocial("google")}   disabled={isLoading} />
            <SocialAuthButton provider="apple"    onClick={() => handleSocial("apple")}    disabled={isLoading} />
            <SocialAuthButton provider="facebook" onClick={() => handleSocial("facebook")} disabled={isLoading} />
            <SocialAuthButton provider="x"        onClick={() => handleSocial("x")}        disabled={isLoading} />
          </div>
        </div>
      ) : (
        <div className={styles.panel}>
          <p className={styles.switchText}>Step 2 — coming soon</p>
        </div>
      )}
    </TravelerAuthShell>
  );
}
            