"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./admin.module.css";

type StoredUser = {
  id?: string;
  email?: string;
  role?: string;
  firstName?: string;
  isAdmin?: boolean;
};

type NavItem = { href: string; label: string; icon: string; description?: string };

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "📊", description: "สถิติรวม" },
  { href: "/admin/configs", label: "System Configs", icon: "⚙️", description: "ตั้งค่าระบบ" },
  { href: "/admin/users", label: "Users", icon: "👥", description: "จัดการผู้ใช้" },
  { href: "/admin/photographers", label: "Photographers", icon: "📷", description: "ช่างภาพ" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅", description: "การจอง" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [checking, setChecking] = useState(true);

  // Guard: เช็คว่ามี token + role === "admin"
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const token = localStorage.getItem("znap_token");
    const raw = localStorage.getItem("znap_user");

    if (!token || !raw) {
      router.replace("/login?next=/admin");
      return;
    }

    try {
      const u = JSON.parse(raw) as StoredUser;
      setUser(u);

      // เช็ค role จาก localStorage (มาจาก JWT login response)
      const isAdmin = u.role === "admin" || u.isAdmin === true;
      if (!isAdmin) {
        router.replace("/");
        return;
      }
      setChecking(false);
    } catch {
      router.replace("/login?next=/admin");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("znap_token");
    localStorage.removeItem("znap_user");
    router.push("/login");
  };

  if (checking || !user) {
    return (
      <div className={styles.emptyState} style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        กำลังตรวจสอบสิทธิ์ admin…
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      {/* ==================== SIDEBAR ==================== */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.brandMark}>Z</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Znap++</span>
            <span className={styles.brandSubname}>Admin</span>
          </div>
        </div>

        <nav className={styles.sidebarNav} aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.sidebarLink} ${active ? styles.sidebarLinkActive : ""}`}
              >
                <span className={styles.sidebarIcon}>{item.icon}</span>
                <span className={styles.sidebarLinkLabel}>
                  <span>{item.label}</span>
                  {item.description && (
                    <span className={styles.sidebarLinkDesc}>{item.description}</span>
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userBox}>
            <div className={styles.userBoxLabel}>เข้าใช้งานในชื่อ</div>
            <div className={styles.userBoxName}>{user.firstName}</div>
            <div className={styles.userBoxEmail}>{user.email}</div>
          </div>
          <Link href="/" className={styles.footerLink}>
            ← กลับหน้าผู้ใช้
          </Link>
          <button
            onClick={handleLogout}
            className={`${styles.footerLink} ${styles.footerLinkDanger}`}
            style={{ border: "none", cursor: "pointer", background: "transparent", width: "100%" }}
          >
            ออกจากระบบ
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        {/* ==================== MOBILE TOPBAR ==================== */}
        <header className={styles.mobileTopbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className={styles.brandMark}>Z</span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Admin</span>
          </div>
          <select
            value={pathname}
            onChange={(e) => router.push(e.target.value)}
            className={styles.mobileSelect}
          >
            {NAV_ITEMS.map((item) => (
              <option key={item.href} value={item.href}>
                {item.icon} {item.label}
              </option>
            ))}
          </select>
        </header>

        {/* ==================== CONTENT ==================== */}
        <main className={styles.container}>{children}</main>
      </div>
    </div>
  );
}
