"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import { adminDelete, adminGet, adminPut } from "@/lib/admin-api";
import styles from "../admin.module.css";

type ConfigItem = {
  key: string;
  category: string;
  displayName: string;
  description: string;
  valueType: "Number" | "Integer" | "Boolean" | "String";
  value: string | number | boolean;
  defaultValue: string | number | boolean;
  min: number | null;
  max: number | null;
  unit: string | null;
  isCustomized: boolean;
  updatedAt: string | null;
};

type ConfigsResponse = {
  items: ConfigItem[];
  categories: string[];
};

const CATEGORY_LABELS: Record<string, { label: string; icon: string }> = {
  search: { label: "การค้นหา", icon: "🔍" },
  booking: { label: "การจอง", icon: "📅" },
  photographer: { label: "ช่างภาพ", icon: "📷" },
  payment: { label: "การเงิน", icon: "💰" },
  notification: { label: "การแจ้งเตือน", icon: "🔔" },
  system: { label: "ระบบ", icon: "⚙️" },
};

export default function AdminConfigsPage() {
  const [data, setData] = useState<ConfigsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminGet<ConfigsResponse>("/api/admin/configs");
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredItems = useMemo(() => {
    if (!data) return [];
    if (activeCategory === "all") return data.items;
    return data.items.filter((i) => i.category === activeCategory);
  }, [data, activeCategory]);

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>System Configs</h1>
        <p className={styles.pageSubtitle}>
          ปรับพารามิเตอร์ระบบโดยไม่ต้องแก้โค้ด — เปลี่ยนค่าแล้วมีผลทันที
        </p>
      </header>

      {data && (
        <div className={styles.chipRow}>
          <CategoryChip
            label="ทั้งหมด"
            icon="✨"
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
            count={data.items.length}
          />
          {data.categories.map((cat) => {
            const meta = CATEGORY_LABELS[cat] ?? { label: cat, icon: "•" };
            const count = data.items.filter((i) => i.category === cat).length;
            return (
              <CategoryChip
                key={cat}
                label={meta.label}
                icon={meta.icon}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                count={count}
              />
            );
          })}
        </div>
      )}

      {loading && <div className={styles.emptyState}>กำลังโหลด configs…</div>}

      {error && (
        <div className={`${styles.alert} ${styles.alertError}`}>❌ {error}</div>
      )}

      {data && !loading && (
        <div>
          {filteredItems.length === 0 && (
            <div className={styles.emptyState}>ไม่มี config ในหมวดนี้</div>
          )}
          {filteredItems.map((cfg) => (
            <ConfigCard key={cfg.key} config={cfg} onChange={refresh} />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  label,
  icon,
  active,
  onClick,
  count,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.chipActive : ""}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className={styles.chipCount}>{count}</span>
    </button>
  );
}

function ConfigCard({
  config,
  onChange,
}: {
  config: ConfigItem;
  onChange: () => void | Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(String(config.value));
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const startEdit = () => {
    setDraft(String(config.value));
    setMsg(null);
    setEditing(true);
  };

  const cancel = () => {
    setEditing(false);
    setMsg(null);
  };

  const save = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const value =
        config.valueType === "Boolean"
          ? draft === "true"
          : config.valueType === "Integer"
          ? parseInt(draft, 10)
          : config.valueType === "Number"
          ? parseFloat(draft)
          : draft;

      await adminPut(`/api/admin/configs/${encodeURIComponent(config.key)}`, { value });
      setMsg({ text: "บันทึกแล้ว", ok: true });
      setEditing(false);
      await onChange();
    } catch (e) {
      setMsg({ text: e instanceof Error ? e.message : "บันทึกไม่สำเร็จ", ok: false });
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!confirm(`รีเซ็ต "${config.displayName}" กลับเป็นค่าเริ่มต้น (${config.defaultValue})?`)) {
      return;
    }
    setSaving(true);
    setMsg(null);
    try {
      await adminDelete(`/api/admin/configs/${encodeURIComponent(config.key)}`);
      setMsg({ text: "รีเซ็ตเป็นค่าเริ่มต้นแล้ว", ok: true });
      await onChange();
    } catch (e) {
      setMsg({ text: e instanceof Error ? e.message : "รีเซ็ตไม่สำเร็จ", ok: false });
    } finally {
      setSaving(false);
    }
  };

  const displayValue =
    config.valueType === "Boolean"
      ? (config.value ? "เปิด" : "ปิด")
      : `${config.value}${config.unit ? ` ${config.unit}` : ""}`;

  return (
    <div className={styles.configRow}>
      <div className={styles.configRowInner}>
        <div className={styles.configMeta}>
          <div className={styles.configTitleRow}>
            <span className={styles.configTitle}>{config.displayName}</span>
            {config.isCustomized && (
              <span className={`${styles.badge} ${styles.badgeWarning}`}>Customized</span>
            )}
          </div>
          <p className={styles.configDescription}>{config.description}</p>
          <div className={styles.configKeyRow}>
            <code className={styles.configKey}>{config.key}</code>
            <span>type: {config.valueType}</span>
            {(config.min !== null || config.max !== null) && (
              <span>
                range: {config.min ?? "–"} ↔ {config.max ?? "–"}
              </span>
            )}
            <span>default: {String(config.defaultValue)}</span>
          </div>
        </div>

        <div className={styles.configValueBlock}>
          {!editing ? (
            <div className={styles.editor}>
              <div className={styles.configCurrentValue}>
                <div className={styles.configCurrentLabel}>ค่าปัจจุบัน</div>
                <div className={styles.configCurrentValueText}>{displayValue}</div>
              </div>
              <div className={styles.row}>
                <Button variant="primary" size="sm" fullWidth onClick={startEdit}>
                  แก้ไข
                </Button>
                {config.isCustomized && (
                  <Button variant="secondary" size="sm" onClick={reset} disabled={saving}>
                    รีเซ็ต
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.editor}>
              <ValueEditor config={config} value={draft} onChange={setDraft} />
              <div className={styles.row}>
                <Button variant="primary" size="sm" fullWidth onClick={save} disabled={saving}>
                  {saving ? "กำลังบันทึก…" : "บันทึก"}
                </Button>
                <Button variant="secondary" size="sm" onClick={cancel} disabled={saving}>
                  ยกเลิก
                </Button>
              </div>
            </div>
          )}

          {msg && (
            <div
              className={`${styles.miniMessage} ${
                msg.ok ? styles.miniMessageOk : styles.miniMessageError
              }`}
              style={{ marginTop: 8 }}
            >
              {msg.ok ? "✅" : "❌"} {msg.text}
            </div>
          )}

          {config.updatedAt && !editing && (
            <p className={styles.timestamp} style={{ marginTop: 6 }}>
              ล่าสุด: {new Date(config.updatedAt).toLocaleString("th-TH")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ValueEditor({
  config,
  value,
  onChange,
}: {
  config: ConfigItem;
  value: string;
  onChange: (v: string) => void;
}) {
  if (config.valueType === "Boolean") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.selectInput}
      >
        <option value="true">เปิด (true)</option>
        <option value="false">ปิด (false)</option>
      </select>
    );
  }

  if (config.valueType === "Number" || config.valueType === "Integer") {
    return (
      <div className={styles.numberInputWrap}>
        <input
          type="number"
          step={config.valueType === "Integer" ? 1 : 0.01}
          min={config.min ?? undefined}
          max={config.max ?? undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.numberInput}
        />
        {config.unit && <span className={styles.numberUnit}>{config.unit}</span>}
      </div>
    );
  }

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={2}
      className={styles.textareaInput}
    />
  );
}
