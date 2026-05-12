"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { adminGet } from "@/lib/admin-api";
import styles from "../admin.module.css";

type Photographer = {
  id: string;
  userId: string;
  bio: string | null;
  basePricePerHr: number;
  isOnline: boolean | null;
  ratingAvg: number | null;
  createdAt: string | null;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    accountStatus: string | null;
  };
};

type Response = {
  page: number;
  pageSize: number;
  total: number;
  items: Photographer[];
};

export default function AdminPhotographersPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    let mounted = true;
    setLoading(true);
    adminGet<Response>(`/api/admin/photographers?page=${page}&pageSize=20`)
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
  }, [page]);

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Photographers</h1>
        <p className={styles.pageSubtitle}>รายชื่อช่างภาพในระบบ</p>
      </header>

      {loading && <div className={styles.emptyState}>กำลังโหลด…</div>}

      {error && <div className={`${styles.alert} ${styles.alertError}`}>❌ {error}</div>}

      {data && !loading && (
        <>
          <p className={styles.smallText} style={{ marginBottom: 12, color: "var(--color-text-muted)" }}>
            พบ {data.total.toLocaleString()} ช่างภาพ
          </p>

          {data.items.length === 0 ? (
            <div className={styles.emptyState}>ยังไม่มีช่างภาพในระบบ</div>
          ) : (
            <div className={styles.cardGrid}>
              {data.items.map((p) => (
                <div key={p.id} className={styles.photoCard}>
                  <div className={styles.photoCardHeader}>
                    <div>
                      <div style={{ fontWeight: 700 }}>
                        {p.user.firstName} {p.user.lastName}
                      </div>
                      <div className={styles.smallText} style={{ color: "var(--color-text-muted)" }}>
                        {p.user.email}
                      </div>
                    </div>
                    {p.isOnline && (
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Online</span>
                    )}
                  </div>

                  {p.bio && <p className={styles.photoBio}>{p.bio}</p>}

                  <div className={styles.photoStats}>
                    <div className={styles.photoStat}>
                      <div className={styles.photoStatLabel}>ราคา/ชม.</div>
                      <div className={styles.photoStatValue}>
                        ฿{p.basePricePerHr.toLocaleString()}
                      </div>
                    </div>
                    <div className={styles.photoStat}>
                      <div className={styles.photoStatLabel}>คะแนน</div>
                      <div className={styles.photoStatValue}>
                        {p.ratingAvg != null ? `⭐ ${p.ratingAvg.toFixed(1)}` : "—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination} style={{ marginTop: 16, border: "none", padding: 0 }}>
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
        </>
      )}

      <div className={styles.devNote}>
        🚧 <strong>กำลังพัฒนา</strong> — ฟีเจอร์ที่จะเพิ่ม:
        <ul>
          <li>อนุมัติช่างภาพใหม่ (Approve / Reject)</li>
          <li>ดูพอร์ตโฟลิโอและเอกสาร KYC</li>
          <li>ระงับช่างภาพที่มีปัญหา</li>
          <li>Feature/Highlight ช่างภาพแนะนำ</li>
        </ul>
      </div>
    </div>
  );
}
