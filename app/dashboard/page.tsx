"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    return (
      <div className="grid min-h-screen place-items-center text-slate-500">
        กำลังตรวจสอบสิทธิ์…
      </div>
    );
  }

  const role: Role = user.role === "photographer" ? "photographer" : "traveler";
  const isTraveler = role === "traveler";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =================== TOPBAR =================== */}
      <Topbar user={user} role={role} onLogout={handleLogout} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* =================== WELCOME BANNER =================== */}
        <section className="rounded-2xl border border-[color:var(--brand-100)] bg-gradient-to-r from-[color:var(--brand-500)] to-[color:var(--brand-700)] p-6 text-white shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                สวัสดี, {user.firstName} 👋
              </h1>
              <p className="mt-1 text-sm text-white/85">
                {isTraveler
                  ? "พร้อมตามล่ามุมสวยในทริปต่อไปแล้วหรือยัง?"
                  : "พร้อมเก็บโมเมนต์ดี ๆ ของลูกค้าใหม่วันนี้แล้วหรือยัง?"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                {isTraveler ? "🧳 Traveler" : "📷 Photographer"}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                {user.email}
              </span>
            </div>
          </div>
        </section>

        {/* =================== STATS =================== */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
            ภาพรวมของคุณ
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(isTraveler ? travelerStats : photographerStats).map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            * ตัวเลขเป็น 0 ทั้งหมดเนื่องจากระบบจองยังไม่เริ่มใช้งานจริง
          </p>
        </section>

        {/* =================== AVAILABLE NOW =================== */}
        <section className="mt-8">
          <SectionHeader
            title="สิ่งที่ทำได้ตอนนี้"
            subtitle="ฟีเจอร์ที่เปิดใช้งานได้แล้วในเฟสปัจจุบัน"
            badge={{ text: "พร้อมใช้", tone: "ok" }}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* ทุก role */}
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

            {/* Traveler-only */}
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

            {/* Photographer-only */}
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
        <section className="mt-8">
          <SectionHeader
            title="เร็ว ๆ นี้"
            subtitle={
              isTraveler
                ? "ฟีเจอร์ที่จะเปิดให้นักท่องเที่ยวใช้งานในเฟสถัดไป"
                : "ฟีเจอร์ที่จะเปิดให้ช่างภาพใช้งานในเฟสถัดไป"
            }
            badge={{ text: "Coming Soon", tone: "warn" }}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(isTraveler ? travelerComingSoon : photographerComingSoon).map((c) => (
              <ComingSoonCard key={c.title} {...c} />
            ))}
          </div>
        </section>

        {/* =================== PROFILE INFO =================== */}
        <section id="profile-info" className="mt-8 scroll-mt-24">
          <SectionHeader title="ข้อมูลบัญชี" subtitle="ข้อมูลที่ระบบเก็บไว้ของคุณ" />
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <InfoRow label="ชื่อ" value={user.firstName ?? "—"} />
            <InfoRow label="อีเมล" value={user.email ?? "—"} />
            <InfoRow
              label="บทบาท"
              value={
                <span className="rounded-full bg-[color:var(--brand-50)] px-2 py-0.5 text-xs font-semibold text-[color:var(--brand-700)]">
                  {isTraveler ? "Traveler" : "Photographer"}
                </span>
              }
            />
            <InfoRow label="User ID" value={<code className="text-xs text-slate-500">{user.id ?? "—"}</code>} last />
          </div>
        </section>

        {/* =================== PROJECT STATUS =================== */}
        <section className="mt-8">
          <SectionHeader
            title="สถานะการพัฒนาระบบ"
            subtitle="ความคืบหน้าของแต่ละโมดูลใน Znap++"
          />
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            {moduleStatus.map((m, i) => (
              <ModuleRow key={m.name} {...m} last={i === moduleStatus.length - 1} />
            ))}
          </div>
        </section>

        <footer className="mt-10 pb-6 text-center text-xs text-slate-400">
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
  {
    icon: "🔍",
    title: "ค้นหาช่างภาพใกล้คุณ",
    desc: "หา Photography Buddy ที่ออนไลน์อยู่ในรัศมีที่กำหนด (PostGIS-powered)",
  },
  {
    icon: "📷",
    title: "จอง Micro-Session 15–30 นาที",
    desc: "เลือกแพ็คเกจ ระบุจุดถ่าย พร้อมแนบรูปอ้างอิงสไตล์ที่ต้องการ",
  },
  {
    icon: "💳",
    title: "ชำระเงินผ่าน Escrow",
    desc: "เงินถูกถือไว้อย่างปลอดภัยจนกว่าคุณจะได้รับรูปครบถ้วน",
  },
  {
    icon: "🖼️",
    title: "ดาวน์โหลดภาพคุณภาพสูง",
    desc: "ปลดล็อกไฟล์ Hi-Res พร้อมรูปเพิ่มเติมในแพ็คเกจอัปเซลล์",
  },
  {
    icon: "⭐",
    title: "ให้รีวิวและคะแนน",
    desc: "ช่วยช่างภาพคนต่อ ๆ ไปด้วยการเขียนรีวิวจากประสบการณ์จริง",
  },
  {
    icon: "🗺️",
    title: "แผนที่จุดถ่ายแนะนำ",
    desc: "ค้นพบ Featured Spots จาก Cafe / Landmark ที่เป็นพาร์ทเนอร์",
  },
];

const photographerComingSoon: ComingSoonProps[] = [
  {
    icon: "📅",
    title: "จัดการตารางว่าง",
    desc: "เปิด/ปิดสถานะออนไลน์ พร้อมตั้ง Time Slot ที่รับงานได้",
  },
  {
    icon: "💼",
    title: "สร้างพอร์ตโฟลิโอ",
    desc: "อัปโหลดผลงานเด่น แสดงสไตล์การถ่ายให้ลูกค้าเห็นก่อนจอง",
  },
  {
    icon: "💰",
    title: "ตั้งราคา / แพ็คเกจ",
    desc: "ปรับราคาเริ่มต้น สร้างแพ็คเกจ Micro-Session ของคุณเอง",
  },
  {
    icon: "🔔",
    title: "รับงานเข้ามาแบบ Real-time",
    desc: "แจ้งเตือนทันทีเมื่อมีนักท่องเที่ยวใกล้คุณส่งคำขอจอง",
  },
  {
    icon: "🏦",
    title: "ถอนเงินจาก Wallet",
    desc: "ดูยอดคงเหลือใน Escrow และโอนออกได้เมื่อจบงาน",
  },
  {
    icon: "⭐",
    title: "ระบบรีวิว / Rating",
    desc: "สะสมคะแนนความน่าเชื่อถือเพื่อรับงานง่ายขึ้น",
  },
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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-[color:var(--brand-600)]"
        >
          <span className="inline-block h-8 w-8 rounded-md bg-[color:var(--brand-500)] text-white grid place-items-center text-sm">
            Z
          </span>
          Znap<span className="text-[color:var(--brand-400)]">++</span>
          <span className="ml-1 hidden text-xs font-medium uppercase tracking-wider text-slate-400 sm:inline">
            / Dashboard
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-slate-600 sm:inline">
            {user.firstName}{" "}
            <span className="ml-1 rounded-full bg-[color:var(--brand-50)] px-2 py-0.5 text-[10px] font-bold uppercase text-[color:var(--brand-700)]">
              {role}
            </span>
          </span>
          <button
            onClick={onLogout}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            ออกจากระบบ
          </button>
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
      ? "bg-emerald-100 text-emerald-700"
      : badge?.tone === "warn"
      ? "bg-amber-100 text-amber-700"
      : "bg-slate-100 text-slate-600";
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 sm:text-sm">{subtitle}</p>}
      </div>
      {badge && (
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${toneCls}`}
        >
          {badge.text}
        </span>
      )}
    </div>
  );
}

// ---------- Stat Card ----------
type StatProps = { label: string; value: string; hint?: string; icon?: string };
function StatCard({ label, value, hint, icon }: StatProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <span className="text-base">{icon}</span>
      </div>
      <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
      {hint && <div className="mt-0.5 text-[11px] text-slate-400">{hint}</div>}
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
      ? "bg-[color:var(--brand-500)] text-white hover:bg-[color:var(--brand-600)]"
      : cta.variant === "danger"
      ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
      : "border border-slate-300 bg-white text-slate-700 hover:border-[color:var(--brand-500)] hover:text-[color:var(--brand-600)]";

  return (
    <div
      className={`flex flex-col rounded-xl border p-5 shadow-sm transition ${
        highlight
          ? "border-[color:var(--brand-200)] bg-[color:var(--brand-50)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1 flex-1 text-xs text-slate-600">{desc}</p>
      <div className="mt-4">
        {cta.href ? (
          <Link
            href={cta.href}
            className={`inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition focus-ring ${btnCls}`}
          >
            {cta.label}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className={`inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold transition focus-ring ${btnCls}`}
          >
            {cta.label}
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- Coming Soon Card ----------
type ComingSoonProps = { icon: string; title: string; desc: string };
function ComingSoonCard({ icon, title, desc }: ComingSoonProps) {
  return (
    <div className="relative flex flex-col rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5">
      <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
        เร็ว ๆ นี้
      </span>
      <div className="text-2xl opacity-60 grayscale">{icon}</div>
      <h3 className="mt-2 text-sm font-bold text-slate-700">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{desc}</p>
      <div className="mt-4">
        <button
          type="button"
          disabled
          className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-white/50 px-3 py-2 text-xs font-medium text-slate-400"
        >
          ยังใช้งานไม่ได้
        </button>
      </div>
    </div>
  );
}

// ---------- Info Row ----------
function InfoRow({
  label,
  value,
  last,
}: {
  label: string;
  value: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 sm:px-5 ${
        last ? "" : "border-b border-slate-100"
      }`}
    >
      <span className="text-xs font-medium text-slate-500 sm:text-sm">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

// ---------- Module Status Row ----------
type ModuleStatus = {
  name: string;
  state: "done" | "partial" | "todo";
  note?: string;
};
function ModuleRow({ name, state, note, last }: ModuleStatus & { last?: boolean }) {
  const cfg =
    state === "done"
      ? { dot: "bg-emerald-500", label: "พร้อมใช้งาน", cls: "text-emerald-700 bg-emerald-50" }
      : state === "partial"
      ? { dot: "bg-amber-500", label: "กำลังพัฒนา", cls: "text-amber-700 bg-amber-50" }
      : { dot: "bg-slate-300", label: "ยังไม่เริ่ม", cls: "text-slate-600 bg-slate-100" };

  return (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 sm:px-5 ${
        last ? "" : "border-b border-slate-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${cfg.dot}`} />
        <div>
          <div className="text-sm font-semibold text-slate-900">{name}</div>
          {note && <div className="text-[11px] text-slate-500">{note}</div>}
        </div>
      </div>
      <span
        className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.cls}`}
      >
        {cfg.label}
      </span>
    </div>
  );
}
