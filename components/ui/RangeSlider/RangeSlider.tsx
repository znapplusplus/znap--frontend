"use client";

import { useId } from "react";
import styles from "./RangeSlider.module.css";

export type RangeSliderProps = {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  formatValue?: (value: number) => string;
};

export function RangeSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  disabled = false,
  formatValue,
}: RangeSliderProps) {
  const id = useId();
  const percent = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : `${value}${unit ? ` ${unit}` : ""}`;
  const displayMin = formatValue ? formatValue(min) : `${min}${unit ? ` ${unit}` : ""}`;
  const displayMax = formatValue ? formatValue(max) : `${max}${unit ? ` ${unit}` : ""}`;

  return (
    <div className={`${styles.root} ${disabled ? styles.disabled : ""}`}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}

      <div className={styles.sliderWrapper}>
        <input
          id={id}
          type="range"
          className={styles.slider}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          style={
            {
              "--range-percent": `${percent}%`,
            } as React.CSSProperties
          }
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={displayValue}
        />

        <div
          className={styles.valueLabel}
          style={{ left: `calc(${percent}% + (${8 - percent * 0.16}px))` }}
          aria-hidden="true"
        >
          {displayValue}
        </div>
      </div>

      <div className={styles.limits}>
        <span>{displayMin}</span>
        <span>{displayMax}</span>
      </div>
    </div>
  );
}
