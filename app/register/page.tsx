"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Role = "traveler" | "photographer";
type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5034";

// Pure validator
function validateRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}): FieldErrors {
  const e: FieldErrors = {};
  if (!data.firstName.trim()) e.firstName = "กรุณากรอกชื่อจริง";
  if (!data.lastName.trim()) e.lastName = "กรุณากรอกนามสกุล";

  if (!data.email.trim()) e.email = "กรุณากรอกอีเมล";
  else if (!EMAIL_RE.test(data.email)) e.email = "รูปแบบอีเมลไม่ถูกต้อง";

  if (!data.password) e.password = "กรุณากรอกรหัสผ่าน";
  else if (data.password.length < 8) e.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
  else if (!/[A-Za-z]/.test(data.password) || !/\d/.test(data.password))
    e.password = "ต้องประกอบด้วยตัวอักษรและตัวเลข";

  if (!data.confirmPassword) e.confirmPassword = "กรุณายืนยันรหัสผ่าน";
  else if (data.confirmPassword !== data.password) e.confirmPassword = "รหัสผ่านไม่ตรงกัน";
  return e;
}

// คำนวณคะแนนความแข็งแรงรหัสผ่าน 0-4
function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  // จำกัด 0-4
  score = Math.min(score, 4);

  const map = [
    { label: "อ่อนมาก", color: "bg-red-400" },
    { label: "อ่อน", color: "bg-orange-400" },
    { label: "ปานกลาง", color: "bg-yellow-400" },
    { label: "ดี", color: "bg-lime-500" },
    { label: "แข็งแรง", color: "bg-emerald-500" },
  ];
  return { score, ...map[score] };
}

export default function RegisterPage() {
  const router = useRouter();

  // Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("traveler");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // UX
  const [touched, setTouched] = useState<Record<keyof FieldErrors, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  // ----- Live validation (derived state) -----
  const errors = useMemo<FieldErrors>(() => {
    if (!Object.values(touched).some(Boolean)) return {};
    return validateRegister({ firstName, lastName, email, password, confirmPassword });
  }, [firstName, lastName, email, password, confirmPassword, touched]);

  // ----- Submit -----
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSuccess(false);

    const v = validateRegister({ firstName, lastName, email, password, confirmPassword });
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (Object.keys(v).length > 0) return;

    if (!acceptTerms) {
      setSubmitError("กรุณายอมรับข้อกำหนดและเงื่อนไขก่อนสมัครสมาชิก");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName, role }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(data?.message ?? "สมัครสมาชิกไม่สำเร็จ");
        return;
      }

      setIsSuccess(true);
      // หน่วงสั้น ๆ แล้วพาไป login
      setTimeout(() => router.push("/login"), 1500);
    } catch {
      setSubmitError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  // Class helpers
  const inputBase =
    "mt-1 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus-ring transition";
  const inputOk = "border-slate-300";
  const inputErr = "border-red-400 focus:ring-red-200 focus:border-red-500";
  const cls = (key: keyof FieldErrors) =>
    `${inputBase} ${errors[key] && touched[key] ? inputErr : inputOk}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[color:var(--brand-50)] to-white p-4 py-10">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[color:var(--brand-600)]"
          >
            <span className="inline-block h-8 w-8 rounded-md bg-[color:var(--brand-500)] text-white grid place-items-center text-sm">
              Z
            </span>
            Znap<span className="text-[color:var(--brand-400)]">++</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">สมัครสมาชิก</h1>
          <p className="mt-1 text-sm text-slate-500">เริ่มต้นสร้างความทรงจำดิจิทัลของคุณ</p>
        </div>

        <form
          onSubmit={handleRegister}
          noValidate
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
        >
          {/* Role picker (cards) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              ฉันต้องการสมัครเป็น
            </label>
            <div className="grid grid-cols-2 gap-3">
              <RoleCard
                active={role === "traveler"}
                onClick={() => setRole("traveler")}
                title="นักท่องเที่ยว"
                subtitle="หาช่างภาพ"
                emoji="🧳"
              />
              <RoleCard
                active={role === "photographer"}
                onClick={() => setRole("photographer")}
                title="ช่างภาพ"
                subtitle="รับงานถ่ายรูป"
                emoji="📷"
              />
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
                ชื่อจริง
              </label>
              <input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
                disabled={isLoading}
                placeholder="สมชาย"
                className={cls("firstName")}
              />
              {errors.firstName && touched.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
                นามสกุล
              </label>
              <input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
                disabled={isLoading}
                placeholder="ใจดี"
                className={cls("lastName")}
              />
              {errors.lastName && touched.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              disabled={isLoading}
              placeholder="you@example.com"
              className={cls("email")}
            />
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              รหัสผ่าน
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                disabled={isLoading}
                placeholder="อย่างน้อย 8 ตัว มีตัวอักษรและตัวเลข"
                className={`${cls("password")} pr-14`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                className="absolute inset-y-0 right-2 my-1 px-2 text-xs font-medium text-slate-500 hover:text-[color:var(--brand-600)]"
              >
                {showPassword ? "ซ่อน" : "แสดง"}
              </button>
            </div>

            {/* strength bar */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded ${
                        i < strength.score ? strength.color : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  ความปลอดภัย:{" "}
                  <span className="font-medium text-slate-700">{strength.label}</span>
                </p>
              </div>
            )}

            {errors.password && touched.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
              ยืนยันรหัสผ่าน
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
                disabled={isLoading}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                className={`${cls("confirmPassword")} pr-14`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
                className="absolute inset-y-0 right-2 my-1 px-2 text-xs font-medium text-slate-500 hover:text-[color:var(--brand-600)]"
              >
                {showConfirm ? "ซ่อน" : "แสดง"}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={isLoading}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[color:var(--brand-500)] focus:ring-[color:var(--brand-500)]"
            />
            <span>
              ฉันยอมรับ
              <a href="#" className="mx-1 text-[color:var(--brand-600)] hover:underline">
                ข้อกำหนดการใช้งาน
              </a>
              และ
              <a href="#" className="mx-1 text-[color:var(--brand-600)] hover:underline">
                นโยบายความเป็นส่วนตัว
              </a>
            </span>
          </label>

          {/* Alerts */}
          {submitError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {submitError}
            </div>
          )}
          {isSuccess && (
            <div
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            >
              สมัครสมาชิกสำเร็จ! กำลังพาท่านไปหน้าเข้าสู่ระบบ…
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-500)] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-600)] focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {isLoading ? "กำลังสมัครสมาชิก…" : "สมัครสมาชิก"}
          </button>

          <p className="pt-2 text-center text-sm text-slate-600">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/login" className="font-semibold text-[color:var(--brand-600)] hover:underline">
              เข้าสู่ระบบที่นี่
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// ---------- Sub-component: Role card ----------
function RoleCard({
  active,
  onClick,
  title,
  subtitle,
  emoji,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
  emoji: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border p-3 text-left transition focus-ring ${
        active
          ? "border-[color:var(--brand-500)] bg-[color:var(--brand-50)] ring-2 ring-[color:var(--brand-500)]/30"
          : "border-slate-200 hover:border-slate-300 bg-white"
      }`}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 font-semibold text-slate-900">{title}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </button>
  );
}
