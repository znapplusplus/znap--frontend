import { Button } from "@/components/ui";
import styles from "./StylePreferencePicker.module.css";

export type StyleOption = {
  id: string;
  label: string;
  imageUrl: string;
};

export type StylePreferencePickerProps = {
  options: StyleOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function StylePreferencePicker({ options, selected, onChange }: StylePreferencePickerProps) {
  const toggleStyle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  };

  return (
    <div className={styles.grid}>
      {options.map((option) => {
        const active = selected.includes(option.id);
        return (
          <Button
            key={option.id}
            type="button"
            variant="unstyled"
            className={`${styles.card} ${active ? styles.active : ""}`}
            onClick={() => toggleStyle(option.id)}
            aria-pressed={active}
          >
            <span
              className={styles.image}
              style={{ backgroundImage: `url(${option.imageUrl})` }}
              aria-hidden="true"
            />
            <span className={styles.overlay} />
            <span className={styles.label}>{option.label}</span>
            {active ? <span className={styles.check}>{"✓"}</span> : null}
          </Button>
        );
      })}
    </div>
  );
}
