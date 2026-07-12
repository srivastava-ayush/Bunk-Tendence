"use client";

import type { Theme } from "./theme";

export default function NumberInput({
  value,
  onChange,
  min,
  max,
  placeholder,
  theme,
  error,
  className,
}: {
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  theme: Theme;
  error?: string | null;
  className?: string;
}) {
  return (
    <input
      type="number"
      min={min}
      max={max}
      value={value === 0 ? "" : value}
      onChange={onChange}
      placeholder={placeholder}
      className={`number-input w-full rounded-[10px] px-3 py-2.5 text-[15px] outline-none transition-all duration-200 ${className ?? ""}`}
      style={{
        background: "var(--bg3)",
        color: "var(--text)",
        border: `1.5px solid ${error ? (theme === "dark" ? "#5a2020" : "#f5c0c0") : "var(--border)"}`,
      }}
    />
  );
}
