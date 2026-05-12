"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { adminGet } from "@/lib/admin-api";
import styles from "../admin.module.css";

type Booking = {
  id: string;
  travelerId: string;
  photographerId: string;
  bookingType: string;
  status: string;
  totalAmount: number;
  platformFee: number;
  netPayout: number;
  createdAt: string | null;
};

type Response = {
  page: number;
  pageSize: number;
  total: number;
  items: Booking[];
};

const STATUS_OPTIONS = [
  { value: "", label: "ทุกสถานะ" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    let mounted = true;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    params.set("page", String(page));
    params.set("pageSize", "20");
    adminGet<Response>(`/api/admin/bookings?${params}`)
      .then((r) => {
        if (mounted) {
          /* eslint-disable-next-line react-hooks/set-state-in-effect */
          setData(r);
        }
      })
      .catch((e) => {
        if (mounted) {
          /* eslint-disable-next-line react-hooks/set-state-in-effect */
          setError(e instanceof Error ? e.message : "โหลดไม่สำเร็จ");
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
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [page, statusFilter]);

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Bookings</h1>
        <p className={styles.pageSubtitle}>รายการการจองทั้งหมดในระบบ</p>
      </header>

      <div className={styles.filterBar}>
        <label className={styles.smallText} style={{ marginRight: 8 }}>
          กรองตามสถานะ:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={styles.filterSelect}
        >
          {STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {loading && <div className={styles.emptyState}>กำลังโหลด…</div>}

      {error && <div className={`${styles.alert} ${styles.alertError}`}>❌ {error}</div>}

      {data && !loading && (
        <>
          <p className={styles.smallText} style={{ marginBottom: 12, color: "var(--color-text-muted)" }}>
            พบ {data.total.toLocaleString()} รายการ
          </p>

          {data.items.length === 0 ? (
            <div className={styles.emptyState}>ยังไม่มีการจอง</div>
          ) : (
            <div className={styles.tableWrap}>
              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>สถานะ</th>
                      <th className={styles.alignRight}>ยอดรวม</th>
                      <th className={styles.alignRight}>ค่าธรรมเนียม</th>
                      <th className={styles.alignRight}>ช่างได้รับ</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((b) => (
                      <tr key={b.id}>
                        <td className={styles.codeText}>{b.id.slice(0, 8)}…</td>
                        <td className={styles.smallText}>{b.bookingType}</td>
                        <td><BookingStatusBadge status={b.status} /></td>
                        <td className={styles.alignRight} style={{ fontWeight: 500 }}>
                          ฿{b.totalAmount.toLocaleString()}
                        </td>
                        <td className={`${styles.alignRight} ${styles.smallText}`} style={{ color: "var(--color-text-muted)" }}>
                          ฿{b.platformFee.toLocaleString()}
                        </td>
                        <td className={styles.alignRight} style={{ fontWeight: 500, color: "var(--color-success)" }}>
                          ฿{b.netPayout.toLocaleString()}
                        </td>
                        <td className={styles.smallText} style={{ color: "var(--color-text-muted)" }}>
                          {b.createdAt ? new Date(b.createdAt).toLocaleString("th-TH") : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ← ก่อนหน้า
                  </Button>
                  <span className={styles.paginationInfo}>
                    หน้า {page} / {totalPages}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    ถัดไป →
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className={styles.devNote}>
        🚧 <strong>กำลังพัฒนา</strong> — ฟีเจอร์ที่จะเพิ่ม:
        <ul>
          <li>ดู detail booking (ลูกค้า / ช่าง / ตำแหน่ง / รูป)</li>
          <li>ยกเลิก / Refund booking</li>
          <li>Resolve dispute</li>
          <li>Export CSV รายงานรายได้</li>
        </ul>
      </div>
    </div>
  );
}

function BookingStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: styles.badge,
    accepted: `${styles.badge} ${styles.badgeInfo}`,
    in_progress: `${styles.badge} ${styles.badgeWarning}`,
    completed: `${styles.badge} ${styles.badgeSuccess}`,
    cancelled: `${styles.badge} ${styles.badgeDanger}`,
  };
  return <span className={map[status] ?? styles.badge}>{status}</span>;
}
