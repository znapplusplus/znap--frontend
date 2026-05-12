"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminGet } from "@/lib/admin-api";
import styles from "./admin.module.css";

type Stats = {
  totalUsers: number;
  totalTravelers: number;
  totalPhotographers: number;
  newUsersLast7Days: number;
  totalBookings: number;
  bookingsLast7Days: number;
  totalRevenue: number;
  revenueLast7Days: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    adminGet<Stats>("/api/admin/dashboard/stats")
      .then((s) => {
        if (mounted) {
          /* eslint-disable-next-line react-hooks/set-state-in-effect */
          setStats(s);
        }
      })
      .catch((e) => {
        if (mounted) {
          /* eslint-disable-next-line react-hooks/set-state-in-effect */
          setError(e instanceof Error ? e.message : "โหลดข้อมูลไม่สำเร็จ");
        }
      })
      .finally(() => {
        if (mounted) {
          /* eslint-disable-next-line react-hooks/set-state-in-effect */
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>ภาพรวมระบบ Znap++ — อัปเดต real-time</p>
      </header>

      {loading && <div className={styles.emptyState}>กำลังโหลดสถิติ…</div>}

      {error && (
        <div className={`${styles.alert} ${styles.alertError}`}>❌ {error}</div>
      )}

      {stats && (
        <>
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>ผู้ใช้</h2>
            <div className={styles.statGrid}>
              <StatCard label="ผู้ใช้ทั้งหมด" value={stats.totalUsers} icon="👥" />
              <StatCard label="นักท่องเที่ยว" value={stats.totalTravelers} icon="🧳" />
              <StatCard label="ช่างภาพ" value={stats.totalPhotographers} icon="📷" />
              <StatCard
                label="สมัครใหม่ 7 วัน"
                value={stats.newUsersLast7Days}
                icon="✨"
                accent
              />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>การจอง</h2>
            <div className={styles.statGrid}>
              <StatCard label="Booking ทั้งหมด" value={stats.totalBookings} icon="📅" />
              <StatCard label="Booking 7 วันล่าสุด" value={stats.bookingsLast7Days} icon="🆕" />
              <StatCard
                label="รายได้แพลตฟอร์มรวม"
                value={`฿${stats.totalRevenue.toLocaleString()}`}
                icon="💰"
              />
              <StatCard
                label="รายได้ 7 วันล่าสุด"
                value={`฿${stats.revenueLast7Days.toLocaleString()}`}
                icon="📈"
                accent
              />
            </div>
          </section>

          <section className={styles.card}>
            <h3 style={{ fontSize: "var(--font-size-base)", fontWeight: 700, marginBottom: 8 }}>
              ทางลัด
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 1.8 }}>
              <li className={styles.smallText}>
                ⚙️ ปรับพารามิเตอร์ระบบ (เช่น เวลาค้นหาช่าง) ที่หน้า{" "}
                <Link href="/admin/configs" style={{ color: "var(--color-primary)" }}>
                  System Configs
                </Link>
              </li>
              <li className={styles.smallText}>
                👥 ค้นหา / ตั้ง role / ระงับบัญชี user ที่หน้า{" "}
                <Link href="/admin/users" style={{ color: "var(--color-primary)" }}>
                  Users
                </Link>
              </li>
              <li className={styles.smallText}>
                📷 ดูช่างภาพในระบบที่หน้า{" "}
                <Link href="/admin/photographers" style={{ color: "var(--color-primary)" }}>
                  Photographers
                </Link>
              </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon?: string;
  accent?: boolean;
}) {
  return (
    <div className={`${styles.statCard} ${accent ? styles.statCardAccent : ""}`}>
      <div className={styles.statHeader}>
        <span className={styles.statLabel}>{label}</span>
        {icon && <span className={styles.statIcon}>{icon}</span>}
      </div>
      <div className={styles.statValue}>{value}</div>
    </div>
  );
}
