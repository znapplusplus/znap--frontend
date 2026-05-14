"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

/**
 * OAuth Callback Page
 * ปลายทางที่ Backend redirect กลับมาหลัง OAuth flow สำเร็จ
 *   ?token=eyJ...
 *   &user=base64-json
 *   &return_to=/dashboard
 * หรือเมื่อ error:
 *   ?error=session_expired
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("กำลังเข้าสู่ระบบ…");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const error    = params.get("error");
    const token    = params.get("token");
    const userB64  = params.get("user");
    const returnTo = params.get("return_to") || "/";

    // กรณี error
    if (error) {
      setStatus("error");
      setMessage(prettyError(error));
      return;
    }

    // กรณีสำเร็จ — ต้องมีทั้ง token + user
    if (!token || !userB64) {
      setStatus("error");
      setMessage("ลิงก์ callback ไม่สมบูรณ์ (token หรือข้อมูล user หายไป)");
      return;
    }

    try {
      // user param เป็น base64-encoded JSON
      const userJson = atob(decodeURIComponent(userB64));
      const user = JSON.parse(userJson);

      localStorage.setItem("znap_token", token);
      localStorage.setItem("znap_user", JSON.stringify(user));

      setStatus("success");
      setMessage(`ยินดีต้อนรับ ${user.firstName ?? user.email}`);

      // หน่วงสั้น ๆ ให้คนเห็นข้อความ
      setTimeout(() => {
        router.replace(returnTo);
      }, 800);
    } catch (e) {
      setStatus("error");
      setMessage("ไม่สามารถอ่านข้อมูลผู้ใช้ได้: " + (e instanceof Error ? e.message : String(e)));
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [params, router]);

  return (
    <div className={styles.shell}>
      <div className={styles.card}>
        {status === "loading" && (
          <>
            <div className={styles.spinner} />
            <h1 className={styles.title}>{message}</h1>
            <p className={styles.subtitle}>กรุณารอสักครู่</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className={styles.iconSuccess}>✓</div>
            <h1 className={styles.title}>เข้าสู่ระบบสำเร็จ</h1>
            <p className={styles.subtitle}>{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className={styles.iconError}>✕</div>
            <h1 className={styles.title}>เข้าสู่ระบบไม่สำเร็จ</h1>
            <p className={styles.subtitle}>{message}</p>
            <div className={styles.actions}>
              <Link href="/login" className={styles.btnPrimary}>
                กลับไปหน้าเข้าสู่ระบบ
              </Link>
              <Link href="/" className={styles.btnSecondary}>
                ไปหน้าหลัก
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// แปลง error code เป็นข้อความที่อ่านง่าย
function prettyError(code: string): string {
  const map: Record<string, string> = {
    access_denied:          "คุณยกเลิกการอนุญาตที่ผู้ให้บริการ",
    session_expired:        "เซสชันหมดอายุ กรุณาลองเข้าสู่ระบบใหม่",
    bad_session:            "ข้อมูล session ผิดพลาด กรุณาลองใหม่",
    state_mismatch:         "ตรวจสอบความปลอดภัยไม่ผ่าน กรุณาลองใหม่",
    missing_code:           "ไม่ได้รับรหัสยืนยันจากผู้ให้บริการ",
    token_exchange_failed:  "ไม่สามารถแลกรหัสกับผู้ให้บริการได้",
    user_info_failed:       "ไม่สามารถดึงข้อมูลผู้ใช้ได้",
    unsupported_provider:   "ผู้ให้บริการนี้ยังไม่รองรับ",
    bad_callback:           "ลิงก์ callback ผิดรูปแบบ"
  };
  return map[code] ?? `เกิดข้อผิดพลาด: ${code}`;
}
