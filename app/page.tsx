"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui";
import styles from "./page.module.css";

type UserLite = { firstName?: string; role?: "traveler" | "photographer" | string } | null;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserLite>(null);
  const [mounted, setMounted] = useState(false);
  const navbarVariant = !mounted || !user
    ? "guest"
    : user.role === "photographer"
      ? "photographer"
      : "traveler";

  // อ่าน user จาก localStorage หลัง hydrate (external system → ปลอดภัย)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    try {
      const raw = localStorage.getItem("znap_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("znap_token");
    localStorage.removeItem("znap_user");
    setUser(null);
    router.refresh();
  };

  return (
    <div className={styles.page}>
      {/* ============== NAVBAR (เฉพาะหน้า Landing) ============== */}
      <Navbar
        variant={navbarVariant}
        user={user ? { name: user.firstName } : undefined}
        onSignOut={user ? handleLogout : undefined}
      />

      {/* ============== HERO ============== */}
      <main className={styles.hero}>
        {/* soft brand glow */}
        <div aria-hidden className={styles.glowLarge} />
        <div aria-hidden className={styles.glowSmall} />

        <section className={styles.heroContent}>
          {/* pill */}
          <span className={styles.pill}>
            <span className={styles.pillBadge} />
            On-demand Photography Ecosystem
          </span>

          {/* headline */}
          <h1 className={styles.heroTitle}>
            เปลี่ยนทุก<span className={styles.heroHighlight}>การท่องเที่ยว</span>
            <br className="break-large" /> ให้กลายเป็น <span className={styles.heroHighlight}>สตูดิโอส่วนตัว</span>
          </h1>

          {/* tagline */}
          <p className={styles.heroText}>
            จองช่างภาพ (หรือ Photography Buddy) แบบทันใจในจุดเช็คอินที่คุณยืนอยู่
            <br className="break-large" />
            สแกน QR — ใช้งานผ่านเว็บได้เลย ไม่ต้องโหลดแอป
          </p>

          {/* CTAs */}
          <div className={styles.ctaGroup}>
            <Link href="/register" className={`${styles.btnPrimary} focus-ring`}>
              เริ่มใช้งานฟรี
              <ArrowRight className="iconSmall" />
            </Link>
            <Link href="/login" className={`${styles.btnSecondary} focus-ring`}>
              เข้าสู่ระบบ
            </Link>
          </div>

          {/* trust strip */}
          <div className={styles.trustStrip}>
            <TrustItem icon="✦" text="Escrow ปลอดภัย" />
            <TrustItem icon="✦" text="Micro-Session 15–30 นาที" />
            <TrustItem icon="✦" text="ค่าธรรมเนียมแพลตฟอร์ม 20%" />
            <TrustItem icon="✦" text="Web-First / ไม่ต้องลงแอป" />
          </div>

          {/* mock illustration card */}
          <div className={styles.heroCardWrapper}>
            <div className={styles.heroCard}>
              <div className={styles.browserTop}>
                <span className={`${styles.browserDot} ${styles.browserDotRed}`} />
                <span className={`${styles.browserDot} ${styles.browserDotYellow}`} />
                <span className={`${styles.browserDot} ${styles.browserDotGreen}`} />
                <span className={styles.browserOrigin}>znapplus.app</span>
              </div>
              <div className={styles.demoGrid}>
                <DemoCard title="หา Buddy ในรัศมี 2 กม." body="พบช่างภาพออนไลน์ 12 คนใกล้คุณ" badge="LIVE" accent />
                <DemoCard title="แพ็คเกจ 15 นาที" body="เริ่มต้น ฿199 — รวมแต่งภาพพื้นฐาน" badge="HOT" />
                <DemoCard title="ชำระผ่าน Escrow" body="เงินถูกถือไว้จนกว่าคุณจะรับรูป" badge="SAFE" />
              </div>
            </div>
            <p className={styles.cardNote}>
              * ภาพประกอบจำลอง ระบบจริงอยู่ระหว่างการพัฒนา
            </p>
          </div>
        </section>
      </main>

      {/* ============== FOOTER ============== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.brandMark}>Z</span>
            <span>© {new Date().getFullYear()} Znap++ — Infrastructure for Digital Memories</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">เกี่ยวกับเรา</a>
            <a href="#">ติดต่อ</a>
            <a href="#">เงื่อนไข</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------- Sub-components -----------------

function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span className={styles.trustItem}>
      <span className={styles.trustIcon}>{icon}</span>
      {text}
    </span>
  );
}

function DemoCard({
  title,
  body,
  badge,
  accent,
}: {
  title: string;
  body: string;
  badge: string;
  accent?: boolean;
}) {
  return (
    <div className={`${styles.demoCard} ${accent ? styles.demoCardAccent : ""}`}>
      <span className={`${styles.demoBadge} ${accent ? styles.demoBadgeLight : ""}`}>{badge}</span>
      <div className={styles.demoTitle}>{title}</div>
      <div className={styles.demoText}>{body}</div>
    </div>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

