"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PhotographerStyleChips,
  TravelerAuthShell,
} from "@/components/features";
import type { PhotographerStyleOption } from "@/components/features";
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FileUploadCard,
  Input,
  RangeSlider,
  SocialAuthButton,
  StepProgress,
  TagInput,
  type SocialProvider,
} from "@/components/ui";
import {
  CalendarIcon,
  CameraIcon,
  HeartIcon,
  ImageIcon,
  PinIcon,
  SparkleIcon,
  StarIcon,
  UserIcon,
} from "@/components/ui/icons";
import styles from "./page.module.css";

/* ─────────────────────────────────────────────
   Constants / Static data
───────────────────────────────────────────── */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5034";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRIES = [
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "TH", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dialCode: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "SG", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
];

const COUNTRIES_BY_DIAL = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (< 1 year)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "professional", label: "Professional (3-5 years)" },
  { value: "expert", label: "Expert (5+ years)" },
];

const STYLE_OPTIONS: PhotographerStyleOption[] = [
  { id: "wedding", label: "Wedding", icon: <HeartIcon size={18} /> },
  { id: "graduation", label: "Graduation", icon: <StarIcon size={18} /> },
  { id: "event", label: "Event", icon: <CalendarIcon size={18} /> },
  { id: "portrait", label: "Portrait", icon: <UserIcon size={18} /> },
  { id: "fashion", label: "Fashion", icon: <SparkleIcon size={18} /> },
  { id: "street-art", label: "Street Art", icon: <ImageIcon size={18} /> },
  { id: "cafe-lifestyle", label: "Cafe/Life Style", icon: <PinIcon size={18} /> },
  { id: "others", label: "Others", icon: <CameraIcon size={18} /> },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */

function detectCountry(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const plusNorm = trimmed.startsWith("00") ? `+${trimmed.slice(2)}` : trimmed;
  const digits = trimmed.replace(/\D/g, "");
  return COUNTRIES_BY_DIAL.find((c) => {
    const dd = c.dialCode.replace(/\D/g, "");
    return plusNorm.startsWith(c.dialCode) || digits.startsWith(dd);
  });
}

function formatPhone(phone: string, dialCode: string) {
  const t = phone.trim();
  if (!t) return "";
  if (t.startsWith("+")) return t;
  if (t.startsWith("00")) return `+${t.slice(2)}`;
  const d = t.replace(/\D/g, "");
  const dd = dialCode.replace(/\D/g, "");
  if (d.startsWith(dd)) return `+${d}`;
  return `${dialCode} ${t}`;
}

/* ─────────────────────────────────────────────
   Validation
───────────────────────────────────────────── */

type Step1Errors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "password" | "confirmPassword" | "terms" | "emailTaken", string>>;
type Step2Errors = Partial<Record<"styles" | "location", string>>;
type Step3Errors = Partial<Record<"idCard" | "selfie", string>>;

function validateStep1(d: {
  firstName: string; lastName: string; email: string;
  phone: string; password: string; confirmPassword: string; acceptTerms: boolean;
}): Step1Errors {
  const e: Step1Errors = {};
  if (!d.firstName.trim()) e.firstName = "First name is required";
  if (!d.lastName.trim()) e.lastName = "Last name is required";
  if (!d.email.trim()) e.email = "Email address is required";
  else if (!EMAIL_RE.test(d.email)) e.email = "Enter a valid email address";
  if (!d.phone.trim()) e.phone = "Phone number is required";
  if (!d.password) e.password = "Password is required";
  else if (d.password.length < 8) e.password = "Use at least 8 characters";
  if (!d.confirmPassword) e.confirmPassword = "Please confirm your password";
  else if (d.confirmPassword !== d.password) e.confirmPassword = "Passwords do not match";
  if (!d.acceptTerms) e.terms = "Please agree to the terms before continuing";
  return e;
}

function validateStep2(d: { styles: string[]; location: string }): Step2Errors {
  const e: Step2Errors = {};
  if (d.styles.length === 0) e.styles = "Select at least one photography style";
  if (!d.location.trim()) e.location = "Location is required";
  return e;
}

function validateStep3(d: { idCard: File | null; selfie: File | null }): Step3Errors {
  const e: Step3Errors = {};
  if (!d.idCard) e.idCard = "Please upload your ID card";
  if (!d.selfie) e.selfie = "Please upload a selfie with your ID card";
  return e;
}

/* ─────────────────────────────────────────────
   Left-panel illustrations / copy per step
───────────────────────────────────────────── */

function Step1Copy() {
  return <p>Join Znap++ and connect with clients, get real jobs, and grow your career.</p>;
}

function Step2Copy() {
  return <p>Access thousands of clients and grow your portfolio with every shoot.</p>;
}

function Step3Copy() {
  return (
    <ul className={styles.safetyList}>
      <li>
        <span className={styles.safetyCheck} aria-hidden="true">✓</span>
        Secure process
      </li>
      <li>
        <span className={styles.safetyCheck} aria-hidden="true">✓</span>
        Trusted profile
      </li>
      <li>
        <span className={styles.safetyCheck} aria-hidden="true">✓</span>
        Better client confidence
      </li>
    </ul>
  );
}

/* ─────────────────────────────────────────────
   ID Card illustration (inline SVG preview)
───────────────────────────────────────────── */

const IdCardIllustration = () => (
  <svg viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 140, height: "auto" }}>
    <rect x="4" y="10" width="172" height="100" rx="10" fill="#EEF3FB" stroke="#B1C7E9" strokeWidth="2"/>
    {/* chip */}
    <rect x="16" y="32" width="28" height="20" rx="3" fill="#F29900" opacity="0.7"/>
    <line x1="22" y1="32" x2="22" y2="52" stroke="#E08800" strokeWidth="1"/>
    <line x1="28" y1="32" x2="28" y2="52" stroke="#E08800" strokeWidth="1"/>
    <line x1="34" y1="32" x2="34" y2="52" stroke="#E08800" strokeWidth="1"/>
    <line x1="16" y1="39" x2="44" y2="39" stroke="#E08800" strokeWidth="1"/>
    <line x1="16" y1="45" x2="44" y2="45" stroke="#E08800" strokeWidth="1"/>
    {/* photo area */}
    <rect x="16" y="58" width="32" height="38" rx="4" fill="#D8E3F4"/>
    <circle cx="32" cy="72" r="8" fill="#8AABDE"/>
    <ellipse cx="32" cy="88" rx="11" ry="6" fill="#8AABDE"/>
    {/* text lines */}
    <rect x="56" y="58" width="80" height="6" rx="3" fill="#B1C7E9"/>
    <rect x="56" y="70" width="60" height="5" rx="2.5" fill="#D8E3F4"/>
    <rect x="56" y="80" width="70" height="5" rx="2.5" fill="#D8E3F4"/>
    <rect x="56" y="90" width="50" height="5" rx="2.5" fill="#D8E3F4"/>
    {/* header bar */}
    <rect x="4" y="10" width="172" height="18" rx="10" fill="#255AB1"/>
    <rect x="4" y="20" width="172" height="8" fill="#255AB1"/>
    <rect x="14" y="14" width="30" height="6" rx="2" fill="white" opacity="0.5"/>
  </svg>
);

const SelfieIllustration = () => (
  <svg viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 140, height: "auto" }}>
    {/* Phone */}
    <rect x="55" y="8" width="70" height="114" rx="12" fill="#1E3A5F"/>
    <rect x="60" y="14" width="60" height="102" rx="8" fill="#2A4F7A"/>
    {/* Screen content – face silhouette */}
    <rect x="62" y="16" width="56" height="98" rx="7" fill="#3B8BEB" opacity="0.25"/>
    <circle cx="90" cy="50" r="16" fill="#3B8BEB" opacity="0.5"/>
    <ellipse cx="90" cy="84" rx="20" ry="12" fill="#3B8BEB" opacity="0.4"/>
    {/* ID card held up */}
    <rect x="18" y="70" width="52" height="34" rx="6" fill="#F8FAFC" stroke="#B1C7E9" strokeWidth="1.5"/>
    <rect x="22" y="74" width="14" height="14" rx="3" fill="#8AABDE" opacity="0.6"/>
    <rect x="40" y="74" width="24" height="4" rx="2" fill="#D8E3F4"/>
    <rect x="40" y="81" width="18" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="40" y="87" width="20" height="3" rx="1.5" fill="#E2E8F0"/>
    {/* Notch */}
    <rect x="78" y="10" width="24" height="6" rx="3" fill="#152840"/>
    {/* Check mark overlay -->  */}
    <circle cx="148" cy="26" r="14" fill="#49D01F"/>
    <path d="M141 26 l5 5 9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Main page component
───────────────────────────────────────────── */

type Step = 1 | 2 | 3;

export default function PhotographerRegisterPage() {
  const router = useRouter();

  /* Step 1 state */
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("TH");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);

  /* Step 2 state */
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("intermediate");
  const [location, setLocation] = useState("Bangkok, Thailand");
  const [travelDistance, setTravelDistance] = useState(15);
  const [equipment, setEquipment] = useState<string[]>([]);

  /* Step 3 state */
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  /* UI state */
  const [step, setStep] = useState<Step>(1);
  const [touched1, setTouched1] = useState(false);
  const [touched2, setTouched2] = useState(false);
  const [touched3, setTouched3] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailTakenError, setEmailTakenError] = useState<string | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  /* Async email check — ใช้ได้ทั้ง onBlur และเรียกตอนกด Sign up */
  const checkEmailAvailability = async (emailToCheck: string): Promise<string | null> => {
    if (!EMAIL_RE.test(emailToCheck)) return null;
    try {
      const res = await fetch(`${API_URL}/api/auth/check-email?email=${encodeURIComponent(emailToCheck.trim().toLowerCase())}`);
      if (!res.ok) return null;
      const data = await res.json().catch(() => ({}));
      return data?.taken ? "อีเมลนี้มีบัญชีอยู่แล้ว" : null;
    } catch {
      return null; // server ไม่พร้อม — จะเช็คซ้ำตอน submit จริง
    }
  };

  const handleEmailBlur = async () => {
    if (!EMAIL_RE.test(email)) return;
    setIsCheckingEmail(true);
    setEmailTakenError(null);
    const err = await checkEmailAvailability(email);
    setEmailTakenError(err);
    setIsCheckingEmail(false);
  };

  /* Derived errors */
  const errors1 = useMemo(() => {
    if (!touched1) return {} as Step1Errors;
    const errs = validateStep1({ firstName, lastName, email, phone, password, confirmPassword, acceptTerms });
    if (emailTakenError) errs.emailTaken = emailTakenError;
    return errs;
  }, [touched1, firstName, lastName, email, phone, password, confirmPassword, acceptTerms, emailTakenError]);
  const errors2 = useMemo(
    () => (touched2 ? validateStep2({ styles: selectedStyles, location }) : {}),
    [touched2, selectedStyles, location],
  );
  const errors3 = useMemo(
    () => (touched3 ? validateStep3({ idCard: idCardFile, selfie: selfieFile }) : {}),
    [touched3, idCardFile, selfieFile],
  );

  /* Phone helpers */
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    const detected = detectCountry(value);
    if (detected && detected.code !== countryCode) setCountryCode(detected.code);
  };

  /* File helpers */
  const handleIdCard = useCallback((file: File | null) => {
    setIdCardFile(file);
    setIdCardPreview(file ? URL.createObjectURL(file) : null);
  }, []);

  const handleSelfie = useCallback((file: File | null) => {
    setSelfieFile(file);
    setSelfiePreview(file ? URL.createObjectURL(file) : null);
  }, []);

  const handleSocial = (provider: SocialProvider) => {
    if (provider === "apple") {
      setSubmitError("Apple Sign-In coming soon — currently in setup.");
      return;
    }
    // TODO: wire to backend OAuth flow when ready
    setSubmitError(`${provider} sign-up coming soon.`);
  };

  /* ── Step navigation (ไม่ยิง API จนกว่าจะถึง step สุดท้าย) ── */
  const goToStep2 = async () => {
    setTouched1(true);
    const errs = validateStep1({ firstName, lastName, email, phone, password, confirmPassword, acceptTerms });

    // เช็คอีเมลซ้ำเสมอ ไม่ว่าจะ blur มาก่อนหรือเปล่า
    if (EMAIL_RE.test(email)) {
      setIsCheckingEmail(true);
      const takenErr = await checkEmailAvailability(email);
      setEmailTakenError(takenErr);
      setIsCheckingEmail(false);
      if (takenErr) errs.emailTaken = takenErr;
    }

    if (Object.keys(errs).length === 0) {
      setSubmitError(null);
      setStep(2);
    }
  };

  const goToStep3 = () => {
    setTouched2(true);
    const errs = validateStep2({ styles: selectedStyles, location });
    if (Object.keys(errs).length === 0) {
      setSubmitError(null);
      setStep(3);
    }
  };

  /* ── Step 3: register + อัปโหลดรูปยืนยันตัวตน ── */
  const handleSubmitVerification = async () => {
    setTouched3(true);
    const errs = validateStep3({ idCard: idCardFile, selfie: selfieFile });
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    setSubmitError(null);
    try {
      // 1️⃣  สมัครสมาชิก
      const regRes = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          firstName,
          middleName,
          lastName,
          phone: formatPhone(phone, selectedCountry.dialCode),
          role: "photographer",
          photographerStyles: selectedStyles,
          experienceLevel,
          location,
          maxTravelDistanceKm: travelDistance,
          equipment,
        }),
      });
      const regData = await regRes.json().catch(() => ({}));
      if (!regRes.ok) {
        setSubmitError(regData?.message ?? "Could not create your creator account.");
        return;
      }

      // เก็บ token ถ้ามี (ใช้ upload ขั้นต่อไป)
      const token: string | null = regData?.token ?? null;
      if (token) {
        localStorage.setItem("znap_token", token);
        localStorage.setItem(
          "znap_user",
          JSON.stringify({ ...(regData.user ?? {}), email, role: "photographer" }),
        );
      }

      // 2️⃣  อัปโหลดรูปยืนยันตัวตน (ถ้ามี endpoint)
      if (idCardFile || selfieFile) {
        const form = new FormData();
        if (idCardFile) form.append("idCard", idCardFile);
        if (selfieFile) form.append("selfie", selfieFile);

        const verifyRes = await fetch(`${API_URL}/api/photographer/identity-verification`, {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: form,
        }).catch(() => null); // ถ้า endpoint ยังไม่มีก็ไม่ block

        if (verifyRes && !verifyRes.ok) {
          const vData = await verifyRes.json().catch(() => ({}));
          // แจ้งเตือนแต่ไม่หยุด — user register สำเร็จแล้ว
          console.warn("Identity verification upload failed:", vData?.message);
        }
      }

      router.push("/photographer/login");
    } catch {
      setSubmitError("Could not connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Shared shell props per step ── */
  const shellTitle =
    step === 1 ? <>Start your photography journey</> :
    step === 2 ? <>Additional Information</> :
    <>Your safety matters</>;

  const shellSubtitle =
    step === 1 ? <Step1Copy /> :
    step === 2 ? <Step2Copy /> :
    <>We verify every photographer to build a safe and trusted community for everyone.<Step3Copy /></>;

  /* ─────────────────── RENDER ─────────────────── */
  return (
    <TravelerAuthShell
      tone="photographer"
      title={shellTitle}
      subtitle={shellSubtitle}
      illustrationSrc="/illustrations/thai.svg"
      illustrationAlt="Thai travel illustration"
    >

      {/* ═══════════════ STEP 1 — Account info ═══════════════ */}
      {step === 1 && (
        <div className={styles.panel}>
          <div className={styles.progressRow}>
            <StepProgress currentStep={1} totalSteps={3} />
          </div>
          <h2 className={styles.title}>Sign up now</h2>

          <div className={styles.formGrid}>
            <Input
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              errorText={errors1.firstName}
            />
            <Input
              label="Middle name"
              labelHint="(optional)"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>
          <Input
            label="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            errorText={errors1.lastName}
          />
          <Input
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailTakenError(null); }}
            onBlur={handleEmailBlur}
            errorText={emailTakenError ?? (touched1 ? errors1.email : undefined)}
            rightIcon={isCheckingEmail ? (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="16" height="16" style={{ animation: "spin 1s linear infinite" }}>
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="30" strokeDashoffset="10" strokeLinecap="round"/>
              </svg>
            ) : undefined}
          />
          <Input
            label="Phone number"
            type="tel"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            errorText={errors1.phone}
            leftAddon={
              <label className={styles.countryPrefix}>
                <span className={styles.flag} aria-label={selectedCountry.name}>
                  {selectedCountry.flag}
                </span>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  aria-label="Country code"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} {c.dialCode}
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
            onChange={(e) => setPassword(e.target.value)}
            errorText={errors1.password}
            helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            errorText={errors1.confirmPassword}
          />

          <Checkbox
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            label={
              <span>
                By creating an account, I agree to our{" "}
                <Link href="/terms">Terms of use</Link> and{" "}
                <Link href="/privacy">Privacy Policy</Link>.
              </span>
            }
            errorText={errors1.terms}
          />

          {submitError ? (
            <Alert variant="error" onClose={() => setSubmitError(null)}>
              {submitError}
            </Alert>
          ) : null}

          <Button type="button" variant="accent" onClick={goToStep2} fullWidth size="lg">
            Sign up
          </Button>
          <p className={styles.switchText}>
            Already have an account?{" "}
            <Link href="/photographer/login">Log in</Link>
          </p>

          <Divider label="or" />

          <div className={styles.socialStack}>
            <SocialAuthButton provider="google" mode="signup" onClick={() => handleSocial("google")} />
            <SocialAuthButton provider="apple" mode="signup" onClick={() => handleSocial("apple")} />
            <SocialAuthButton provider="facebook" mode="signup" onClick={() => handleSocial("facebook")} />
            <SocialAuthButton provider="x" mode="signup" onClick={() => handleSocial("x")} />
          </div>

          <p className={styles.switchText}>
            Want to book photographers instead?{" "}
            <Link href="/register">Sign up as traveler</Link>
          </p>
        </div>
      )}

      {/* ═══════════════ STEP 2 — Photographer info ═══════════════ */}
      {step === 2 && (
        <div className={styles.panel}>
          <div className={styles.stepHeader}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => setStep(1)}
              aria-label="Go back to step 1"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="16" height="16">
                <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <StepProgress currentStep={2} totalSteps={3} />
          </div>

          <h2 className={styles.title}>Additional Information</h2>

          {/* Photographer Style */}
          <div className={styles.fieldGroup}>
            <div className={styles.fieldLabel}>
              1. Photographer Style
              <span className={styles.fieldHint}>(Select all that apply)</span>
            </div>
            <PhotographerStyleChips
              options={STYLE_OPTIONS}
              selected={selectedStyles}
              onChange={setSelectedStyles}
            />
            {errors2.styles ? <div className={styles.errorText}>{errors2.styles}</div> : null}
          </div>

          {/* Experience Level */}
          <div className={styles.fieldGroup}>
            <label htmlFor="experienceLevel" className={styles.fieldLabel}>
              2. Experience Level
            </label>
            <select
              id="experienceLevel"
              className={styles.selectInput}
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className={styles.fieldGroup}>
            <Input
              label="3. Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              errorText={errors2.location}
              leftIcon={
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="16" height="16">
                  <path d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M10 2a7 7 0 0 1 7 7c0 4.4-7 11-7 11S3 13.4 3 9a7 7 0 0 1 7-7Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              }
            />
          </div>

          {/* Max Travel Distance */}
          <div className={styles.fieldGroup}>
            <RangeSlider
              label="4. Max Travel Distance"
              value={travelDistance}
              min={5}
              max={40}
              step={1}
              unit="Km"
              onChange={setTravelDistance}
            />
          </div>

          {/* Equipment */}
          <div className={styles.fieldGroup}>
            <TagInput
              label="5. Equipment"
              value={equipment}
              onChange={setEquipment}
              placeholder="Add the main equipment you use (Camera, Lens, Accessory, Others)"
              helperText="Add the main equipment you use (etc. Camera, Lens, Accessory, Others)"
            />
          </div>

          {submitError ? <div role="alert" className={styles.errorText}>{submitError}</div> : null}

          <Button
            type="button"
            variant="unstyled"
            className={styles.primaryButton}
            onClick={goToStep3}
          >
            Sign up
          </Button>
        </div>
      )}

      {/* ═══════════════ STEP 3 — Identity verification ═══════════════ */}
      {step === 3 && (
        <div className={styles.panel}>
          <div className={styles.stepHeader}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => setStep(2)}
              aria-label="Go back to step 2"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="16" height="16">
                <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <StepProgress currentStep={3} totalSteps={3} />
          </div>

          <h2 className={styles.title}>Identify Verification</h2>
          <p className={styles.description}>
            To keep our community safe and trustworthy, please verify your identity.
          </p>

          <div className={styles.verifySection}>
            <div className={styles.verifyLabel}>
              1. ID card
              <span className={styles.fieldHint}>Upload a clear photo of your ID card (front side only).</span>
            </div>
            <FileUploadCard
              label="Upload Front Side"
              maxSizeLabel="JPG, PNG (Max 10 MB)"
              accept="image/jpeg,image/png"
              file={idCardFile}
              previewUrl={idCardPreview}
              onChange={handleIdCard}
              illustration={<IdCardIllustration />}
            />
            {errors3.idCard ? <div className={styles.errorText}>{errors3.idCard}</div> : null}
          </div>

          <div className={styles.verifySection}>
            <div className={styles.verifyLabel}>
              2. Selfie with ID Card
              <span className={styles.fieldHint}>Take a photo of yourself holding your ID card clearly.</span>
            </div>
            <FileUploadCard
              label="Take a Selfie with ID"
              maxSizeLabel="JPG, PNG (Max 10 MB)"
              accept="image/jpeg,image/png"
              file={selfieFile}
              previewUrl={selfiePreview}
              onChange={handleSelfie}
              illustration={<SelfieIllustration />}
            />
            {errors3.selfie ? <div className={styles.errorText}>{errors3.selfie}</div> : null}
          </div>

          {submitError ? <div role="alert" className={styles.errorText}>{submitError}</div> : null}

          <Button
            type="button"
            variant="unstyled"
            className={styles.primaryButton}
            onClick={handleSubmitVerification}
            disabled={isLoading}
          >
            {isLoading ? "Submitting…" : (
              <>
                Submit for verification
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="16" height="16" style={{ marginLeft: 6 }}>
                  <path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm3.2 4.3-4 4-1.9-1.9a.75.75 0 0 0-1.05 1.06l2.4 2.4a.75.75 0 0 0 1.06 0l4.54-4.54a.75.75 0 0 0-1.06-1.06Z" fill="currentColor"/>
                </svg>
              </>
            )}
          </Button>

          <p className={styles.skipText}>
            <button
              type="button"
              className={styles.skipButton}
              onClick={() => router.push("/photographer/login")}
            >
              Skip for now — I&apos;ll verify later
            </button>
          </p>
        </div>
      )}
    </TravelerAuthShell>
  );
}
