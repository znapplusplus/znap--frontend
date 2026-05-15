"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StylePreferencePicker, TravelerAuthShell, type StyleOption } from "@/components/features";
import { Button } from "@/components/ui";
import styles from "./page.module.css";

/**
 * Onboarding step 2 — สำหรับ user ที่สมัครผ่าน SSO
 * Backend redirect มาที่นี่หลัง OAuth สำเร็จ (?token=...&user=...)
 * AuthCallback page จะ save token แล้วส่งมาที่นี่ผ่าน return_to
 */

const TRAVELER_STYLES: StyleOption[] = [
  { id: "portrait",  label: "Portrait",        imageUrl: "/illustrations/style-portrait.svg" },
  { id: "landscape", label: "Landscape",       imageUrl: "/illustrations/style-landscape.svg" },
  { id: "couple",    label: "Couple",          imageUrl: "/illustrations/style-couple.svg" },
  { id: "family",    label: "Family",          imageUrl: "/illustrations/style-family.svg" },
  { id: "cafe",      label: "Cafe / Lifestyle",imageUrl: "/illustrations/style-cafe.svg" },
  { id: "street",    label: "Street",          imageUrl: "/illustrations/style-street.svg" },
];

export default function TravelerCategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const token = localStorage.getItem("znap_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    try {
      const u = JSON.parse(localStorage.getItem("znap_user") ?? "{}");
      setUserName(u.firstName ?? u.email ?? "นักท่องเที่ยว");
    } catch {
      router.replace("/login");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [router]);

  const handleFinish = async () => {
    setSaving(true);
    // TODO: ยิง API จริงเมื่อ Backend มี POST /api/users/me/preferences
    // ตอนนี้ save ลง localStorage ก่อน
    try {
      localStorage.setItem("znap_traveler_styles", JSON.stringify(selected));
      await new Promise((r) => setTimeout(r, 400));
      router.push("/");
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => router.push("/");

  return (
    <TravelerAuthShell
      title={<>What are you into?</>}
      subtitle={`สวัสดี ${userName}! เลือกสไตล์ที่ชอบเพื่อช่วยเราจับคู่ช่างภาพให้ตรงใจ`}
      illustrationSrc="/illustrations/thai.svg"
      illustrationAlt="Thai travel illustration"
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h1 className={styles.title}>เลือกสไตล์ที่คุณสนใจ</h1>
          <p className={styles.description}>
            เลือกได้หลายอย่าง (อย่างน้อย 1 อย่าง) — ข้ามได้ภายหลังก็มาแก้ในโปรไฟล์
          </p>
        </header>

        <StylePreferencePicker
          options={TRAVELER_STYLES}
          selected={selected}
          onChange={setSelected}
        />

        <p className={styles.helper}>
          เลือกแล้ว <strong>{selected.length}</strong> อย่าง
        </p>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleFinish}
            disabled={saving || selected.length === 0}
          >
            {saving ? "กำลังบันทึก…" : "เสร็จสิ้น"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            fullWidth
            onClick={handleSkip}
            disabled={saving}
          >
            ข้ามไปก่อน
          </Button>
        </div>
      </div>
    </TravelerAuthShell>
  );
}
