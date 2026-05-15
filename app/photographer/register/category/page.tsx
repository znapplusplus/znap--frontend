"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PhotographerStyleChips,
  TravelerAuthShell,
  type PhotographerStyleOption,
} from "@/components/features";
import { Button } from "@/components/ui";
import styles from "./page.module.css";

/**
 * Photographer onboarding — สำหรับช่างภาพที่สมัครผ่าน SSO
 * Backend redirect มาที่นี่หลัง OAuth สำเร็จ
 */

const PHOTOGRAPHER_STYLES: PhotographerStyleOption[] = [
  { id: "portrait",   label: "Portrait",            icon: "👤" },
  { id: "landscape",  label: "Landscape",           icon: "🏞️" },
  { id: "couple",     label: "Couple / Wedding",    icon: "💑" },
  { id: "family",     label: "Family",              icon: "👨‍👩‍👧" },
  { id: "fashion",    label: "Fashion",             icon: "👗" },
  { id: "street",     label: "Street / Lifestyle",  icon: "🚶" },
  { id: "food",       label: "Food",                icon: "🍜" },
  { id: "product",    label: "Product",             icon: "📦" },
  { id: "event",      label: "Event",               icon: "🎉" },
];

export default function PhotographerCategoryPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const token = localStorage.getItem("znap_token");
    if (!token) {
      router.replace("/photographer/login");
      return;
    }
    try {
      const u = JSON.parse(localStorage.getItem("znap_user") ?? "{}");
      setUserName(u.firstName ?? u.email ?? "ช่างภาพ");
    } catch {
      router.replace("/photographer/login");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [router]);

  const handleFinish = async () => {
    setSaving(true);
    // TODO: ยิง API จริงเมื่อ Backend มี POST /api/photographers
    try {
      localStorage.setItem("znap_photographer_styles", JSON.stringify(selected));
      await new Promise((r) => setTimeout(r, 400));
      router.push("/");
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => router.push("/");

  return (
    <TravelerAuthShell
      title={<>What&apos;s your style?</>}
      subtitle={`สวัสดี ${userName}! เลือกประเภทงานที่คุณเชี่ยวชาญเพื่อให้ลูกค้าหาคุณเจอ`}
      illustrationSrc="/illustrations/thai.svg"
      illustrationAlt="Photographer illustration"
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h1 className={styles.title}>เลือกประเภทงานถ่ายภาพของคุณ</h1>
          <p className={styles.description}>
            เลือกได้หลายอย่าง — ระบบจะใช้ข้อมูลนี้แนะนำคุณให้ลูกค้าที่ตรงสไตล์
          </p>
        </header>

        <PhotographerStyleChips
          options={PHOTOGRAPHER_STYLES}
          selected={selected}
          onChange={setSelected}
          columns={3}
        />

        <p className={styles.helper}>
          เลือกแล้ว <strong>{selected.length}</strong> ประเภท
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
