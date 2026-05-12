"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FieldErrors = {
  email?: string;
  password?: string;
};

// ตรวจรูปแบบอีเมลแบบเบสิก
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Base URL ของ Backend — ใช้ NEXT_PUBLIC_API_URL จาก .env ถ้ามี ไม่งั้น fallback ไป localhost
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5034";

// Pure function — ไม่พึ่ง state ภายใน component
function validateLogin(data: { email: string; password: string }): FieldErrors {
  const next: FieldErrors = {};
  if (!data.email.trim()) next.email = "กรุณากรอกอีเมล";
  else if (!EMAIL_RE.test(data.email)) next.email = "รูปแบบอีเมลไม่ถูกต้อง";

  if (!data.password) next.password = "กรุณากรอกรหัสผ่าน";
  else if (data.password.length < 6) next.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
  return next;
}

export default function LoginPage() {
  const router = useRouter();

  // ----- Form state -----
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  // ----- UX state -----
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // ----- Live validation (derived state) -----
  const errors = useMemo<FieldErrors>(() => {
    if (!touched.email && !touched.password) return {};
    return validateLogin({ email, password });
  }, [email, password, touched]);

  // โหลดอีเมลที่จำไว้ (ถ้ามี) — localStorage เป็น external system
  useEffect(() => {
    const saved = localStorage.getItem("znap_remember_email");
    if (saved) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setEmail(saved);
      setRemember(true);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, []);

  // ----- Submit -----
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const v = validateLogin({ email, password });
    setTouched({ email: true, password: true });
    if (Object.keys(v).length > 0) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(data?.message ?? "เข้าสู่ระบบไม่สำเร็จ");
        return;
      }

      // จำอีเมลถ้าผู้ใช้ติ๊ก Remember me
      if (remember) localStorage.setItem("znap_remember_email", email);
      else localStorage.removeItem("znap_remember_email");

      localStorage.setItem("znap_token", data.token);
      localStorage.setItem("znap_user", JSON.stringify(data.user));

      setSubmitSuccess(`${data.message ?? "เข้าสู่ระบบสำเร็จ"} — กำลังพาท่านไปหน้าหลัก…`);
      setTimeout(() => router.push("/"), 900);
    } catch {
      setSubmitError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  // ----- Render -----
  const inputBase =
    "mt-1 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus-ring transition";
  const inputOk = "border-slate-300";
  const inputErr = "border-red-400 focus:ring-red-200 focus:border-red-500";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[color:var(--brand-50)] to-white p-4">
      <div className="w-full max-w-md">
        {/* Header card */}
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
          <h1 className="mt-4 text-2xl font-bold text-slate-900">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-sm text-slate-500">
            ยินดีต้อนรับกลับ — ไปจองช่างภาพคนต่อไปกันเลย
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
        >
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
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-err" : undefined}
              className={`${inputBase} ${errors.email && touched.email ? inputErr : inputOk}`}
            />
            {errors.email && touched.email && (
              <p id="email-err" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password + show/hide */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                รหัสผ่าน
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-[color:var(--brand-600)] hover:underline"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                disabled={isLoading}
                placeholder="อย่างน้อย 6 ตัวอักษร"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "pw-err" : undefined}
                className={`${inputBase} pr-12 ${errors.password && touched.password ? inputErr : inputOk}`}
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
            {errors.password && touched.password && (
              <p id="pw-err" className="mt-1 text-xs text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember me */}
          <label className="flex select-none items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              disabled={isLoading}
              className="h-4 w-4 rounded border-slate-300 text-[color:var(--brand-500)] focus:ring-[color:var(--brand-500)]"
            />
            จดจำอีเมลของฉันในเครื่องนี้
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
          {submitSuccess && (
            <div
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            >
              {submitSuccess}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-500)] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-600)] focus-ring disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {isLoading ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
          </button>

          <p className="pt-2 text-center text-sm text-slate-600">
            ยังไม่มีบัญชี?{" "}
            <Link href="/register" className="font-semibold text-[color:var(--brand-600)] hover:underline">
              สมัครสมาชิกที่นี่
            </Link>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Znap++ — เปลี่ยนทุกการท่องเที่ยวให้เป็นสตูดิโอส่วนตัว
        </p>
      </div>
    </div>
  );
}
