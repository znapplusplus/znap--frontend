"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { adminGet, adminPatch } from "@/lib/admin-api";
import styles from "../admin.module.css";

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  accountStatus: string | null;
  createdAt: string | null;
};

type UsersResponse = {
  page: number;
  pageSize: number;
  total: number;
  items: User[];
};

const ROLE_OPTIONS = ["traveler", "photographer", "admin"];
const STATUS_OPTIONS = ["active", "suspended", "banned"];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actingOn, setActingOn] = useState<string | null>(null);
  const [me, setMe] = useState<string | null>(null);

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    const raw = localStorage.getItem("znap_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setMe(u.id ?? null);
      } catch {}
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (roleFilter) params.set("role", roleFilter);
      params.set("page", String(page));
      params.set("pageSize", "20");

      const res = await adminGet<UsersResponse>(`/api/admin/users?${params}`);
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, roleFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  // ----- Role change -----
  const handleRoleChange = async (user: User, newRole: string) => {
    if (newRole === user.role) return;
    if (user.id === me) {
      alert("ไม่สามารถเปลี่ยน role ของตัวเองได้ — ขอให้ admin คนอื่นทำให้");
      return;
    }

    // ขอ confirm พิเศษถ้าเลื่อนเป็น admin หรือลด admin ลง
    const sensitive = newRole === "admin" || user.role === "admin";
    if (sensitive) {
      const ok = confirm(
        `⚠️ คุณกำลังจะเปลี่ยน role ของ ${user.email}\n` +
          `จาก "${user.role}" → "${newRole}"\n\n` +
          `${newRole === "admin"
            ? "การให้สิทธิ์ admin จะให้สิทธิ์เต็มเข้าหลังบ้านทั้งหมด"
            : "การลดสิทธิ์ admin จะตัดสิทธิ์การเข้า /admin ของผู้ใช้นี้"}\n\n` +
          "ยืนยันการเปลี่ยนแปลง?"
      );
      if (!ok) return;
    }

    setActingOn(user.id);
    try {
      await adminPatch(`/api/admin/users/${user.id}/role`, { role: newRole });
      await fetchUsers();
    } catch (e) {
      alert(e instanceof Error ? e.message : "เปลี่ยน role ไม่สำเร็จ");
    } finally {
      setActingOn(null);
    }
  };

  // ----- Status change -----
  const handleStatusChange = async (user: User, newStatus: string) => {
    if (newStatus === (user.accountStatus ?? "active")) return;
    if (!confirm(`เปลี่ยนสถานะของ ${user.email} เป็น "${newStatus}"?`)) return;

    setActingOn(user.id);
    try {
      await adminPatch(`/api/admin/users/${user.id}/status`, { status: newStatus });
      await fetchUsers();
    } catch (e) {
      alert(e instanceof Error ? e.message : "เปลี่ยนสถานะไม่สำเร็จ");
    } finally {
      setActingOn(null);
    }
  };

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
        <p className={styles.pageSubtitle}>
          ค้นหา ดูรายละเอียด เปลี่ยน role และระงับบัญชี
        </p>
      </header>

      {/* Filter bar */}
      <form className={styles.filterBar} onSubmit={handleSearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาด้วยอีเมล / ชื่อ / นามสกุล"
          className={styles.filterInput}
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className={styles.filterSelect}
        >
          <option value="">ทุก Role</option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <Button type="submit" variant="primary" size="sm">
          ค้นหา
        </Button>
      </form>

      {data && (
        <p className={styles.smallText} style={{ marginBottom: 12, color: "var(--color-text-muted)" }}>
          พบ {data.total.toLocaleString()} รายการ — หน้า {data.page} จาก {totalPages || 1}
        </p>
      )}

      {loading && <div className={styles.emptyState}>กำลังโหลด…</div>}

      {error && <div className={`${styles.alert} ${styles.alertError}`}>❌ {error}</div>}

      {data && !loading && (
        <div className={styles.tableWrap}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ชื่อ</th>
                  <th>อีเมล</th>
                  <th>Role</th>
                  <th>สถานะ</th>
                  <th>สมัครเมื่อ</th>
                </tr>
              </thead>
              <tbody>
                {data.items.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "var(--color-text-muted)", padding: 32 }}>
                      ไม่พบผู้ใช้
                    </td>
                  </tr>
                )}
                {data.items.map((u) => {
                  const isMe = u.id === me;
                  const busy = actingOn === u.id;
                  return (
                    <tr key={u.id}>
                      <td style={{ fontWeight: 500 }}>
                        {u.firstName} {u.lastName}
                        {isMe && (
                          <span className={`${styles.badge} ${styles.badgeInfo}`} style={{ marginLeft: 8 }}>
                            you
                          </span>
                        )}
                      </td>
                      <td className={styles.muted}>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u, e.target.value)}
                          disabled={busy || isMe}
                          className={styles.selectInput}
                          style={{ height: 30, fontSize: 12, width: "auto" }}
                        >
                          {ROLE_OPTIONS.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select
                          value={u.accountStatus ?? "active"}
                          onChange={(e) => handleStatusChange(u, e.target.value)}
                          disabled={busy}
                          className={styles.selectInput}
                          style={{ height: 30, fontSize: 12, width: "auto" }}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className={styles.smallText} style={{ color: "var(--color-text-muted)" }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString("th-TH") : "—"}
                      </td>
                    </tr>
                  );
                })}
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

      <div className={styles.devNote}>
        💡 <strong>การเปลี่ยน role:</strong> เลือกจาก dropdown ในคอลัมน์ Role —
        ระบบจะถามยืนยันถ้าเกี่ยวกับ admin (เพื่อกันการพลาดให้/ลดสิทธิ์ admin)
        คุณจะเปลี่ยน role ของตัวเองไม่ได้ ขอให้ admin คนอื่นช่วยทำให้
      </div>
    </div>
  );
}
