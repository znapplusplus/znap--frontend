import type { ReactNode } from "react";
import styles from "./PhotographerStyleChip.module.css";

export type PhotographerStyleOption = {
  id: string;
  label: string;
  /** Icon shown to the left of the label. SVG component or text/emoji. */
  icon: ReactNode;
};

export type PhotographerStyleChipsProps = {
  options: PhotographerStyleOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 2 | 3;
};

export function PhotographerStyleChips({
  options,
  selected,
  onChange,
  columns = 3,
}: PhotographerStyleChipsProps) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    );
  };

  return (
    <div
      className={styles.grid}
      style={{ "--chip-columns": columns } as React.CSSProperties}
      role="group"
      aria-label="Photographer styles"
    >
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <button
            key={option.id}
            type="button"
            className={`${styles.chip} ${active ? styles.active : ""}`}
            onClick={() => toggle(option.id)}
            aria-pressed={active}
          >
            <span className={styles.icon} aria-hidden="true">
              {option.icon}
            </span>
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
