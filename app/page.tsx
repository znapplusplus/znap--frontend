"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserLite = { firstName?: string; role?: "traveler" | "photographer" | string } | null;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserLite>(null);
  const [mounted, setMounted] = useState(false);

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
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* ============== NAVBAR (เฉพาะหน้า Landing) ============== */}
      <Navbar mounted={mounted} user={user} onLogout={handleLogout} />

      {/* ============== HERO ============== */}
      <main className="relative flex-1 overflow-hidden">
        {/* soft brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[color:var(--brand-200)] opacity-40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-[-120px] top-40 h-[300px] w-[300px] rounded-full bg-[color:var(--brand-100)] opacity-60 blur-3xl"
        />

        <section className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-16 text-center sm:pt-24">
          {/* pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-200)] bg-[color:var(--brand-50)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-700)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-500)]" />
            On-demand Photography Ecosystem
          </span>

          {/* headline */}
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            เปลี่ยนทุก<span className="text-[color:var(--brand-500)]">การท่องเที่ยว</span>
            <br className="hidden sm:block" /> ให้กลายเป็น <span className="text-[color:var(--brand-500)]">สตูดิโอส่วนตัว</span>
          </h1>

          {/* tagline */}
          <p className="mt-5 max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
            จองช่างภาพ (หรือ Photography Buddy) แบบทันใจในจุดเช็คอินที่คุณยืนอยู่
            <br className="hidden sm:block" />
            สแกน QR — ใช้งานผ่านเว็บได้เลย ไม่ต้องโหลดแอป
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--brand-500)] px-7 font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-600)] focus-ring"
            >
              เริ่มใช้งานฟรี
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 font-semibold text-slate-800 transition hover:border-[color:var(--brand-500)] hover:text-[color:var(--brand-600)] focus-ring"
            >
              เข้าสู่ระบบ
            </Link>
          </div>

          {/* trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500">
            <TrustItem icon="✦" text="Escrow ปลอดภัย" />
            <TrustItem icon="✦" text="Micro-Session 15–30 นาที" />
            <TrustItem icon="✦" text="ค่าธรรมเนียมแพลตฟอร์ม 20%" />
            <TrustItem icon="✦" text="Web-First / ไม่ต้องลงแอป" />
          </div>

          {/* mock illustration card */}
          <div className="mt-14 w-full max-w-4xl">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-slate-400">znapplus.app</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                <DemoCard
                  title="หา Buddy ในรัศมี 2 กม."
                  body="พบช่างภาพออนไลน์ 12 คนใกล้คุณ"
                  badge="LIVE"
                  accent
                />
                <DemoCard
                  title="แพ็คเกจ 15 นาที"
                  body="เริ่มต้น ฿199 — รวมแต่งภาพพื้นฐาน"
                  badge="HOT"
                />
                <DemoCard
                  title="ชำระผ่าน Escrow"
                  body="เงินถูกถือไว้จนกว่าคุณจะรับรูป"
                  badge="SAFE"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-400">
              * ภาพประกอบจำลอง ระบบจริงอยู่ระหว่างการพัฒนา
            </p>
          </div>
        </section>
      </main>

      {/* ============== FOOTER ============== */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-md bg-[color:var(--brand-500)] text-white grid place-items-center text-xs font-bold">
              Z
            </span>
            <span>
              © {new Date().getFullYear()} Znap++ — Infrastructure for Digital Memories
            </span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[color:var(--brand-600)]">เกี่ยวกับเรา</a>
            <a href="#" className="hover:text-[color:var(--brand-600)]">ติดต่อ</a>
            <a href="#" className="hover:text-[color:var(--brand-600)]">เงื่อนไข</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ----------------- Sub-components -----------------

function Navbar({
  mounted,
  user,
  onLogout,
}: {
  mounted: boolean;
  user: UserLite;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-[color:var(--brand-600)]"
        >
          <span className="inline-block h-8 w-8 rounded-md bg-[color:var(--brand-500)] text-white grid place-items-center text-sm">
            Z
          </span>
          Znap<span className="text-[color:var(--brand-400)]">++</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <a href="#how" className="hover:text-[color:var(--brand-600)]">วิธีใช้งาน</a>
          <a href="#for-traveler" className="hover:text-[color:var(--brand-600)]">สำหรับนักท่องเที่ยว</a>
          <a href="#for-photographer" className="hover:text-[color:var(--brand-600)]">สำหรับช่างภาพ</a>
        </nav>

        <div className="flex items-center gap-2">
          {/* รอ mount เพื่อหลีกเลี่ยง hydration mismatch จาก localStorage */}
          {!mounted ? (
            <div className="h-9 w-40" />
          ) : user ? (
            <>
              {/* ปุ่มเฉพาะ traveler — ชวนสมัครเป็นช่างภาพ */}
              {user.role === "traveler" && (
                <Link
                  href="/become-creator"
                  className="group hidden items-center gap-1.5 rounded-full border border-[color:var(--brand-500)] bg-white px-3.5 py-1.5 text-sm font-semibold text-[color:var(--brand-600)] transition hover:bg-[color:var(--brand-500)] hover:text-white sm:inline-flex"
                >
                  <CameraIcon className="h-4 w-4" />
                  Join as a Creator
                </Link>
              )}
              <Link
                href="/dashboard"
                className="hidden text-sm font-medium text-slate-700 hover:text-[color:var(--brand-600)] md:inline"
              >
                สวัสดี, {user.firstName ?? "ผู้ใช้"}
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-[color:var(--brand-500)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-600)]"
              >
                แดชบอร์ด
              </Link>
              <button
                onClick={onLogout}
                className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-[color:var(--brand-500)] hover:text-[color:var(--brand-600)] sm:inline"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:text-[color:var(--brand-600)]"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[color:var(--brand-500)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-600)]"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function TrustItem({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[color:var(--brand-500)]">{icon}</span>
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
    <div
      className={`flex flex-col gap-2 border-b border-slate-200 p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
        accent ? "bg-[color:var(--brand-50)]" : "bg-white"
      }`}
    >
      <span
        className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider ${
          accent
            ? "bg-[color:var(--brand-500)] text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {badge}
      </span>
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs text-slate-500">{body}</div>
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
