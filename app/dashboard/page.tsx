"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import styles from "./page.module.css";

type Role = "traveler" | "photographer";
type ZnapUser = {
  id?: string;
  email?: string;
  role?: Role | string;
  firstName?: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<ZnapUser | null>(null);

  // ตรวจสิทธิ์
  useEffect(() => {
    const token = localStorage.getItem("znap_token");
    const userData = localStorage.getItem("znap_user");

    if (!token) {
      router.push("/login");
      return;
    }
    if (userData) {
      try {
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("znap_token");
        localStorage.removeItem("znap_user");
        router.push("/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("znap_token");
    localStorage.removeItem("znap_user");
    router.push("/login");
  };

  if (!user) {
    return <div className={styles.loading}>กำลังตรวจสอบสิทธิ์…</div>;
  }

  const role: Role = user.role === "photographer" ? "photographer" : "traveler";
  const isTraveler = role === "traveler";

  return (
    <div className={styles.page}>
      <Topbar user={user} role={role} onLogout={handleLogout} />

      <main className={styles.pageContent}>
        {/* =================== WELCOME BANNER =================== */}
        <section className={styles.banner}>
          <div className={styles.bannerTop}>
            <div>
              <h1 className={styles.bannerTitle}>
                สวัสดี, {user.firstName} 👋
              </h1>
              <p className={styles.bannerText}>
                {isTraveler
                  ? "พร้อมตามล่ามุมสวยในทริปต่อไปแล้วหรือยัง?"
                  : "พร้อมเก็บโมเมนต์ดี ๆ ของลูกค้าใหม่วันนี้แล้วหรือยัง?"}
              </p>
            </div>
            <div className={styles.bannerBadges}>
              <span className={styles.roleBadge}>
                {isTraveler ? "🧳 Traveler" : "📷 Photographer"}
              </span>
              <span className={styles.bannerEmail}>{user.email}</span>
            </div>
          </div>
        </section>

        {/* =================== STATS =================== */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>ภาพรวมของคุณ</h2>
          </div>
          <div className={`${styles.gridCards} ${styles.gridStats}`}>
            {(isTraveler ? travelerStats : photographerStats).map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
          <p className={styles.helperText}>
            * ตัวเลขเป็น 0 ทั้งหมดเนื่องจากระบบจองยังไม่เริ่มใช้งานจริง
          </p>
        </section>

        {/* =================== AVAILABLE NOW =================== */}
        <section className={styles.section}>
          <SectionHeader
            title="สิ่งที่ทำได้ตอนนี้"
            subtitle="ฟีเจอร์ที่เปิดใช้งานได้แล้วในเฟสปัจจุบัน"
            badge={{ text: "พร้อมใช้", tone: "ok" }}
          />
          <div className={`${styles.gridCards} ${styles.gridActions}`}>
            <ActionCard
              icon="👤"
              title="ดู / จัดการโปรไฟล์"
              desc="ตรวจสอบข้อมูลพื้นฐาน อีเมล ชื่อ และบทบาทของคุณ"
              cta={{ label: "ดูข้อมูล", href: "#profile-info", variant: "secondary" }}
            />
            <ActionCard
              icon="🏠"
              title="กลับสู่หน้าหลัก"
              desc="ดู Landing Page และตัวอย่างฟีเจอร์ของ Znap++"
              cta={{ label: "ไปหน้าหลัก", href: "/", variant: "secondary" }}
            />

            {isTraveler && (
              <ActionCard
                icon="📷"
                title="สมัครเป็นช่างภาพ"
                desc="อยากสร้างรายได้ระหว่างเที่ยว? อัปเกรดบัญชีเป็น Photography Buddy ได้เลย"
                cta={{
                  label: "Join as a Creator",
                  href: "/become-creator",
                  variant: "primary",
                }}
                highlight
              />
            )}

            {!isTraveler && (
              <ActionCard
                icon="✅"
                title="สถานะช่างภาพ: พร้อมรับงาน"
                desc="บัญชีของคุณได้รับสถานะ Photographer แล้ว — รอเปิดระบบรับงานเร็วๆ นี้"
                cta={{ label: "ดูรายละเอียด", href: "#profile-info", variant: "secondary" }}
              />
            )}

            <ActionCard
              icon="🚪"
              title="ออกจากระบบ"
              desc="สิ้นสุดเซสชันการใช้งานบนอุปกรณ์นี้"
              onClick={handleLogout}
              cta={{ label: "ออกจากระบบ", variant: "danger" }}
            />
          </div>
        </section>

        {/* =================== COMING SOON =================== */}
        <section className={styles.section}>
          <SectionHeader
            title="เร็ว ๆ นี้"
            subtitle={
              isTraveler
                ? "ฟีเจอร์ที่จะเปิดให้นักท่องเที่ยวใช้งานในเฟสถัดไป"
                : "ฟีเจอร์ที่จะเปิดให้ช่างภาพใช้งานในเฟสถัดไป"
            }
            badge={{ text: "Coming Soon", tone: "warn" }}
          />
          <div className={`${styles.gridCards} ${styles.gridActions}`}>
            {(isTraveler ? travelerComingSoon : photographerComingSoon).map((c) => (
              <ComingSoonCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        {/* =================== PROFILE INFO =================== */}
        <section id="profile-info" className={styles.section}>
          <SectionHeader title="ข้อมูลบัญชี" subtitle="ข้อมูลที่ระบบเก็บไว้ของคุณ" />
          <div className={styles.infoTable}>
            <InfoRow label="ชื่อ" value={user.firstName ?? "—"} />
            <InfoRow label="อีเมล" value={user.email ?? "—"} />
            <InfoRow
              label="บทบาท"
              value={
                <span className={styles.infoChip}>
                  {isTraveler ? "Traveler" : "Photographer"}
                </span>
              }
            />
            <InfoRow label="User ID" value={<code className={styles.infoCode}>{user.id ?? "—"}</code>} />
          </div>
        </section>

        {/* =================== PROJECT STATUS =================== */}
        <section className={styles.section}>
          <SectionHeader
            title="สถานะการพัฒนาระบบ"
            subtitle="ความคืบหน้าของแต่ละโมดูลใน Znap++"
          />
          <div className={styles.statusList}>
            {moduleStatus.map((m) => (
              <ModuleRow key={m.name} {...m} />
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          Znap++ Dashboard · เวอร์ชันพัฒนา (alpha)
        </footer>
      </main>
    </div>
  );
}

// ===================================================
// DATA
// ===================================================

const travelerStats: StatProps[] = [
  { label: "การจองทั้งหมด", value: "0", hint: "ครั้ง", icon: "📅" },
  { label: "กำลังรอช่างภาพ", value: "0", hint: "งาน", icon: "⏳" },
  { label: "ภาพที่ได้รับ", value: "0", hint: "ภาพ", icon: "🖼️" },
  { label: "ยอดใช้จ่ายรวม", value: "฿0", hint: "บาท", icon: "💸" },
];

const photographerStats: StatProps[] = [
  { label: "งานที่รับ", value: "0", hint: "งาน", icon: "📸" },
  { label: "งานวันนี้", value: "0", hint: "งาน", icon: "🗓️" },
  { label: "คะแนนรีวิว", value: "—", hint: "ยังไม่มีรีวิว", icon: "⭐" },
  { label: "รายได้รวม", value: "฿0", hint: "บาท", icon: "💰" },
];

const travelerComingSoon: ComingSoonProps[] = [
  { icon: "🔍", title: "ค้นหาช่างภาพใกล้คุณ", desc: "หา Photography Buddy ที่ออนไลน์อยู่ในรัศมีที่กำหนด (PostGIS-powered)" },
  { icon: "📷", title: "จอง Micro-Session 15–30 นาที", desc: "เลือกแพ็คเกจ ระบุจุดถ่าย พร้อมแนบรูปอ้างอิงสไตล์ที่ต้องการ" },
  { icon: "💳", title: "ชำระเงินผ่าน Escrow", desc: "เงินถูกถือไว้อย่างปลอดภัยจนกว่าคุณจะได้รับรูปครบถ้วน" },
  { icon: "🖼️", title: "ดาวน์โหลดภาพคุณภาพสูง", desc: "ปลดล็อกไฟล์ Hi-Res พร้อมรูปเพิ่มเติมในแพ็คเกจอัปเซลล์" },
  { icon: "⭐", title: "ให้รีวิวและคะแนน", desc: "ช่วยช่างภาพคนต่อ ๆ ไปด้วยการเขียนรีวิวจากประสบการณ์จริง" },
  { icon: "🗺️", title: "แผนที่จุดถ่ายแนะนำ", desc: "ค้นพบ Featured Spots จาก Cafe / Landmark ที่เป็นพาร์ทเนอร์" },
];

const photographerComingSoon: ComingSoonProps[] = [
  { icon: "📅", title: "จัดการตารางว่าง", desc: "เปิด/ปิดสถานะออนไลน์ พร้อมตั้ง Time Slot ที่รับงานได้" },
  { icon: "💼", title: "สร้างพอร์ตโฟลิโอ", desc: "อัปโหลดผลงานเด่น แสดงสไตล์การถ่ายให้ลูกค้าเห็นก่อนจอง" },
  { icon: "💰", title: "ตั้งราคา / แพ็คเกจ", desc: "ปรับราคาเริ่มต้น สร้างแพ็คเกจ Micro-Session ของคุณเอง" },
  { icon: "🔔", title: "รับงานเข้ามาแบบ Real-time", desc: "แจ้งเตือนทันทีเมื่อมีนักท่องเที่ยวใกล้คุณส่งคำขอจอง" },
  { icon: "🏦", title: "ถอนเงินจาก Wallet", desc: "ดูยอดคงเหลือใน Escrow และโอนออกได้เมื่อจบงาน" },
  { icon: "⭐", title: "ระบบรีวิว / Rating", desc: "สะสมคะแนนความน่าเชื่อถือเพื่อรับงานง่ายขึ้น" },
];

const moduleStatus: ModuleStatus[] = [
  { name: "ระบบสมาชิก (Auth/JWT)", state: "done", note: "Login, Register, Token, Hash Password" },
  { name: "อัปเกรดเป็นช่างภาพ", state: "partial", note: "UI เสร็จแล้ว — รอ Backend endpoint" },
  { name: "โปรไฟล์ผู้ใช้", state: "partial", note: "แสดงข้อมูลพื้นฐานได้ ยังไม่รองรับแก้ไข" },
  { name: "ค้นหาช่างภาพ (Geo Search)", state: "todo", note: "ฐานข้อมูล PostGIS พร้อมแล้ว รอ API" },
  { name: "ระบบจอง (Booking)", state: "todo", note: "Model ฐานข้อมูลครบ — รอ Controller" },
  { name: "ชำระเงิน + Escrow", state: "todo", note: "Wallet/Payment table พร้อม" },
  { name: "ภาพอัปโหลด / Hi-Res Download", state: "todo", note: "ต้องเชื่อม S3 / Object storage" },
  { name: "รีวิว & Rating", state: "todo", note: "Model พร้อม รอ flow" },
  { name: "PWA (สแกน QR)", state: "todo", note: "manifest.json + Service Worker ยังไม่ทำ" },
];

// ===================================================
// COMPONENTS
// ===================================================

function Topbar({
  user,
  role,
  onLogout,
}: {
  user: ZnapUser;
  role: Role;
  onLogout: () => void;
}) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarInner}>
        <Link href="/" className={styles.brandLink}>
          <span className={styles.brandMark}>Z</span>
          Znap++
          <span className={styles.brandSlash}>/ Dashboard</span>
        </Link>

        <div className={styles.topbarActions}>
          <span className={styles.topbarUser}>
            {user.firstName}
            <span className={styles.topbarRole}>{role}</span>
          </span>
          <Button
            type="button"
            variant="unstyled"
            onClick={onLogout}
            className={styles.topButton}
          >
            ออกจากระบบ
          </Button>
        </div>
      </div>
    </header>
  );
}

// ---------- Section Header ----------
function SectionHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle?: string;
  badge?: { text: string; tone: "ok" | "warn" | "muted" };
}) {
  const toneCls =
    badge?.tone === "ok"
      ? styles.badgeOk
      : badge?.tone === "warn"
        ? styles.badgeWarn
        : styles.badgeMuted;
  return (
    <div className={styles.sectionHeader}>
      <div>
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionHeaderSubtitle}>{subtitle}</p>}
      </div>
      {badge && <span className={`${styles.badgePill} ${toneCls}`}>{badge.text}</span>}
    </div>
  );
}

// ---------- Stat Card ----------
type StatProps = { label: string; value: string; hint?: string; icon?: string };
function StatCard({ label, value, hint, icon }: StatProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <span className={styles.statLabel}>{label}</span>
        <span className={styles.statIcon}>{icon}</span>
      </div>
      <div className={styles.statValue}>{value}</div>
      {hint && <div className={styles.statHint}>{hint}</div>}
    </div>
  );
}

// ---------- Action Card ----------
function ActionCard({
  icon,
  title,
  desc,
  cta,
  onClick,
  highlight,
}: {
  icon: string;
  title: string;
  desc: string;
  cta: { label: string; href?: string; variant: "primary" | "secondary" | "danger" };
  onClick?: () => void;
  highlight?: boolean;
}) {
  const btnCls =
    cta.variant === "primary"
      ? styles.actionButtonPrimary
      : cta.variant === "danger"
        ? styles.actionButtonDanger
        : styles.actionButtonSecondary;

  return (
    <div className={`${styles.actionCard} ${highlight ? styles.actionCardHighlight : ""}`}>
      <div className={styles.actionIcon}>{icon}</div>
      <h3 className={styles.actionTitle}>{title}</h3>
      <p className={styles.actionDesc}>{desc}</p>
      <div>
        {cta.href ? (
          <Button
            href={cta.href}
            variant="unstyled"
            className={`${styles.actionButton} ${btnCls}`}
          >
            {cta.label}
          </Button>
        ) : (
          <Button
            type="button"
            variant="unstyled"
            onClick={onClick}
            className={`${styles.actionButton} ${btnCls}`}
          >
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}

// ---------- Coming Soon Card ----------
type ComingSoonProps = { icon: string; title: string; desc: string };
function ComingSoonCard({ icon, title, desc }: ComingSoonProps) {
  return (
    <div className={styles.comingCard}>
      <span className={styles.comingTag}>เร็ว ๆ นี้</span>
      <div className={styles.comingIcon}>{icon}</div>
      <h3 className={styles.comingTitle}>{title}</h3>
      <p className={styles.comingDesc}>{desc}</p>
      <div>
        <Button type="button" variant="unstyled" disabled className={styles.comingButton}>
          ยังใช้งานไม่ได้
        </Button>
      </div>
    </div>
  );
}

// ---------- Info Row ----------
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.infoLabel}>{label}</span>
      <span className={styles.infoValue}>{value}</span>
    </div>
  );
}

// ---------- Module Status Row ----------
type ModuleStatus = {
  name: string;
  state: "done" | "partial" | "todo";
  note?: string;
};
function ModuleRow({ name, state, note }: ModuleStatus) {
  const dotCls =
    state === "done"
      ? styles.statusDotDone
      : state === "partial"
        ? styles.statusDotPartial
        : styles.statusDotTodo;

  const labelCls =
    state === "done"
      ? styles.statusDone
      : state === "partial"
        ? styles.statusPartial
        : styles.statusTodo;

  const label =
    state === "done" ? "พร้อมใช้งาน" : state === "partial" ? "กำลังพัฒนา" : "ยังไม่เริ่ม";

  return (
    <div className={styles.statusRow}>
      <div className={styles.statusMeta}>
        <span className={`${styles.statusDot} ${dotCls}`} />
        <div>
          <div className={styles.statusName}>{name}</div>
          {note && <div className={styles.statusNote}>{note}</div>}
        </div>
      </div>
      <span className={`${styles.statusLabel} ${labelCls}`}>{label}</span>
    </div>
  );
}
