"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import styles from "./page.module.css";

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

  if (!mounted || !user) {
    return <div className={styles.loading}>กำลังตรวจสอบสิทธิ์…</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Back link */}
        <div className={styles.backWrap}>
          <Button href="/" variant="unstyled" className={styles.backLink}>
            ← กลับหน้าหลัก
          </Button>
        </div>

        {/* Header */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconCircle}>
              <CameraIcon />
            </div>
            <div>
              <h1 className={styles.headerTitle}>Join as a Creator</h1>
              <p className={styles.headerText}>
                เพิ่มสถานะ &quot;ช่างภาพ&quot; ให้บัญชีของคุณ —
                รับงานถ่ายภาพให้นักท่องเที่ยวคนอื่นและสร้างรายได้ระหว่างเดินทาง
              </p>
            </div>
          </div>

          <ul className={styles.perkList}>
            <Perk text="ตั้งราคาและช่วงเวลาเองได้" />
            <Perk text="ระบบ Escrow ปลอดภัย จ่ายตรงเวลา" />
            <Perk text="โปรไฟล์/พอร์ตเชื่อมกับลูกค้าจริง" />
            <Perk text="ค่าธรรมเนียมแพลตฟอร์ม 20%" />
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className={styles.formCard}>
          <div className={styles.userPill}>
            สมัครในนามของ:{" "}
            <span className={styles.userPillName}>
              {user.firstName} ({user.email})
            </span>
          </div>

          {/* Bio */}
          <div className={styles.formGroup}>
            <label htmlFor="bio" className={styles.label}>
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
              className={`${styles.textarea} ${errors.bio && touched.bio ? styles.inputError : ""}`}
            />
            {errors.bio && touched.bio && (
              <p className={styles.errorText}>{errors.bio}</p>
            )}
            <p className={styles.inputHint}>{bio.trim().length}/500 ตัวอักษร</p>
          </div>

          {/* Base price */}
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              ราคาเริ่มต้น (บาท / ชั่วโมง)
            </label>
            <div className={styles.inputGroup}>
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
                className={`${styles.input} ${
                  errors.basePricePerHr && touched.basePricePerHr ? styles.inputError : ""
                }`}
              />
              <span className={styles.suffix}>฿ / ชม.</span>
            </div>
            {errors.basePricePerHr && touched.basePricePerHr && (
              <p className={styles.errorText}>{errors.basePricePerHr}</p>
            )}
            <p className={styles.inputHint}>
              แนะนำช่วง ฿199 – ฿1,500 สำหรับ Micro-Session 15–30 นาที
            </p>
          </div>

          {/* Terms */}
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={isLoading}
              className={styles.checkbox}
            />
            <span>
              ฉันยอมรับ
              <a href="#" className={styles.termsLink}>
                {" "}ข้อกำหนดของช่างภาพ{" "}
              </a>
              และยินยอมให้แสดงข้อมูลโปรไฟล์ต่อสาธารณะ
            </span>
          </label>

          {/* Alerts */}
          {submitError && (
            <div role="alert" className={styles.alertError}>
              {submitError}
            </div>
          )}
          {isSuccess && (
            <div role="status" className={styles.alertSuccess}>
              สมัครสำเร็จ! บัญชีของคุณได้รับสถานะช่างภาพแล้ว — กำลังพาท่านไปแดชบอร์ด…
            </div>
          )}

          {/* Buttons */}
          <div className={styles.actionButtons}>
            <Button
              type="submit"
              variant="unstyled"
              disabled={isLoading}
              className={styles.buttonPrimary}
            >
              {isLoading && (
                <svg className={styles.spinner} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {isLoading ? "กำลังสมัคร…" : "สมัครเป็นช่างภาพ"}
            </Button>
            <Button href="/" variant="unstyled" className={styles.buttonSecondary}>
              ยังไม่ตอนนี้
            </Button>
          </div>
        </form>

        <p className={styles.noteText}>
          * ขณะนี้ระบบหลังบ้านยังอยู่ระหว่างพัฒนา การสมัครจะถูกบันทึกฝั่งเครื่องชั่วคราว
        </p>
      </div>
    </div>
  );
}

// ---------------- Sub-components ----------------
function Perk({ text }: { text: string }) {
  return (
    <li className={styles.perkItem}>
      <span className={styles.perkDot} />
      {text}
    </li>
  );
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
