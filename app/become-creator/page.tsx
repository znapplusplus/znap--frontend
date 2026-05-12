"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";

type StoredUser = {
  id?: string;
  email?: string;
  role?: "traveler" | "photographer" | string;
  firstName?: string;
};

type FieldErrors = {
  bio?: string;
  basePricePerHr?: string;
};

function validateCreator(data: { bio: string; basePricePerHr: string }): FieldErrors {
  const e: FieldErrors = {};
  if (!data.bio.trim()) e.bio = "กรุณาแนะนำตัวเองสั้น ๆ";
  else if (data.bio.trim().length < 20)
    e.bio = "ควรอธิบายสไตล์/ประสบการณ์อย่างน้อย 20 ตัวอักษร";

  const price = Number(data.basePricePerHr);
  if (!data.basePricePerHr) e.basePricePerHr = "กรุณากำหนดราคาเริ่มต้น";
  else if (Number.isNaN(price)) e.basePricePerHr = "ต้องเป็นตัวเลข";
  else if (price < 100) e.basePricePerHr = "ราคาเริ่มต้นไม่ควรต่ำกว่า 100 บาท/ชม.";
  else if (price > 10000) e.basePricePerHr = "ราคาเริ่มต้นไม่ควรเกิน 10,000 บาท/ชม.";
  return e;
}

export default function BecomeCreatorPage() {
  const router = useRouter();

  const [user, setUser] = useState<StoredUser | null>(null);
  const [mounted, setMounted] = useState(false);

  const [bio, setBio] = useState("");
  const [basePricePerHr, setBasePricePerHr] = useState("");
  const [agree, setAgree] = useState(false);

  const [touched, setTouched] = useState<{ bio: boolean; basePricePerHr: boolean }>({
    bio: false,
    basePricePerHr: false,
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ตรวจสิทธิ์ + role
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    const token = localStorage.getItem("znap_token");
    const raw = localStorage.getItem("znap_user");

    if (!token || !raw) {
      router.replace("/login");
      return;
    }

    try {
      const u = JSON.parse(raw) as StoredUser;
      setUser(u);
      if (u.role === "photographer") {
        // เป็นช่างภาพอยู่แล้ว → เด้งกลับหน้าหลัก
        router.replace("/dashboard");
      }
    } catch {
      router.replace("/login");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [router]);

  const errors = useMemo<FieldErrors>(() => {
    if (!touched.bio && !touched.basePricePerHr) return {};
    return validateCreator({ bio, basePricePerHr });
  }, [bio, basePricePerHr, touched]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSuccess(false);

    const v = validateCreator({ bio, basePricePerHr });
    setTouched({ bio: true, basePricePerHr: true });
    if (Object.keys(v).length > 0) return;
    if (!agree) {
      setSubmitError("กรุณายอมรับเงื่อนไขของช่างภาพก่อนสมัคร");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: เปลี่ยนไปยิง API จริงเมื่อ Backend มี endpoint POST /api/photographers
      // ตอนนี้ mock ฝั่ง client ก่อน — อัปเดต role ใน localStorage เพื่อให้ flow ทดสอบได้
      await new Promise((r) => setTimeout(r, 900));

      const updated: StoredUser = { ...(user ?? {}), role: "photographer" };
      localStorage.setItem("znap_user", JSON.stringify(updated));
      setUser(updated);
      setIsSuccess(true);

      setTimeout(() => router.push("/dashboard"), 1200);
    } catch {
      setSubmitError("เกิดข้อผิดพลาดในการสมัคร กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  // กันกะพริบระหว่างเช็คสิทธิ์
  if (!mounted || !user) {
    return (
      <div className="grid min-h-screen place-items-center text-slate-500">
        กำลังตรวจสอบสิทธิ์…
      </div>
    );
  }

  const inputBase =
    "mt-1 block w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus-ring transition";
  const inputOk = "border-slate-300";
  const inputErr = "border-red-400 focus:ring-red-200 focus:border-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[color:var(--brand-50)] to-white py-10 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Back link */}
        <div className="mb-4">
          <Button
            href="/"
            variant="unstyled"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[color:var(--brand-600)]"
          >
            ← กลับหน้าหลัก
          </Button>
        </div>

        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--brand-500)] text-white">
              <CameraIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">Join as a Creator</h1>
              <p className="mt-1 text-sm text-slate-500">
                เพิ่มสถานะ &quot;ช่างภาพ&quot; ให้บัญชีของคุณ
                — รับงานถ่ายภาพให้นักท่องเที่ยวคนอื่นและสร้างรายได้ระหว่างเดินทาง
              </p>
            </div>
          </div>

          {/* Perks */}
          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-2">
            <Perk text="ตั้งราคาและช่วงเวลาเองได้" />
            <Perk text="ระบบ Escrow ปลอดภัย จ่ายตรงเวลา" />
            <Perk text="โปรไฟล์/พอร์ตเชื่อมกับลูกค้าจริง" />
            <Perk text="ค่าธรรมเนียมแพลตฟอร์ม 20%" />
          </ul>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
        >
          <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            สมัครในนามของ:{" "}
            <span className="font-semibold text-slate-700">
              {user.firstName} ({user.email})
            </span>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-slate-700">
              แนะนำตัว / สไตล์การถ่าย
            </label>
            <textarea
              id="bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, bio: true }))}
              disabled={isLoading}
              placeholder="เช่น ถ่ายคู่กล้องฟิล์ม Mirrorless, สไตล์ Cinematic, รับงาน Portrait/Cafe/Landmark…"
              className={`${inputBase} resize-y ${errors.bio && touched.bio ? inputErr : inputOk}`}
            />
            {errors.bio && touched.bio && (
              <p className="mt-1 text-xs text-red-600">{errors.bio}</p>
            )}
            <p className="mt-1 text-xs text-slate-400">{bio.trim().length}/500 ตัวอักษร</p>
          </div>

          {/* Base price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700">
              ราคาเริ่มต้น (บาท / ชั่วโมง)
            </label>
            <div className="relative mt-1">
              <input
                id="price"
                type="number"
                inputMode="numeric"
                min={100}
                max={10000}
                step={50}
                value={basePricePerHr}
                onChange={(e) => setBasePricePerHr(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, basePricePerHr: true }))}
                disabled={isLoading}
                placeholder="500"
                className={`${inputBase} pr-14 ${
                  errors.basePricePerHr && touched.basePricePerHr ? inputErr : inputOk
                }`}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-slate-400">
                ฿ / ชม.
              </span>
            </div>
            {errors.basePricePerHr && touched.basePricePerHr && (
              <p className="mt-1 text-xs text-red-600">{errors.basePricePerHr}</p>
            )}
            <p className="mt-1 text-xs text-slate-400">
              แนะนำช่วง ฿199 – ฿1,500 สำหรับ Micro-Session 15–30 นาที
            </p>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={isLoading}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[color:var(--brand-500)] focus:ring-[color:var(--brand-500)]"
            />
            <span>
              ฉันยอมรับ
              <a href="#" className="mx-1 text-[color:var(--brand-600)] hover:underline">
                ข้อกำหนดของช่างภาพ
              </a>
              และยินยอมให้แสดงข้อมูลโปรไฟล์ต่อสาธารณะ
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
              สมัครสำเร็จ! บัญชีของคุณได้รับสถานะช่างภาพแล้ว — กำลังพาท่านไปแดชบอร์ด…
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="submit"
              variant="unstyled"
              disabled={isLoading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[color:var(--brand-500)] px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-600)] focus-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {isLoading ? "กำลังสมัคร…" : "สมัครเป็นช่างภาพ"}
            </Button>
            <Button
              href="/"
              variant="unstyled"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-slate-400"
            >
              ยังไม่ตอนนี้
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-400">
          * ขณะนี้ระบบหลังบ้านยังอยู่ระหว่างพัฒนา การสมัครจะถูกบันทึกฝั่งเครื่องชั่วคราว
        </p>
      </div>
    </div>
  );
}

// ---------------- Sub-components ----------------
function Perk({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[color:var(--brand-500)]" />
      {text}
    </li>
  );
}

function CameraIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8a2 2 0 0 1 2-2h2.5l1.2-1.6A2 2 0 0 1 11.3 4h1.4a2 2 0 0 1 1.6.8L15.5 6H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
