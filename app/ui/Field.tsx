"use client";

import type { Theme } from "./theme";

export default function Field({
  label,
  hint,
  theme,
  children,
  error,
}: {
  label: string;
  hint: string;
  theme: Theme;
  children: React.ReactNode;
  error?: string | null;
}) {
  const isDark = theme === "dark";

  return (
    <div className="field-group">
      <label className="mb-1.5 block">
        <span
          className="text-[13px] font-medium"
          style={{ color: "var(--text)" }}
        >
          {label}
        </span>
        {hint && (
          <span
            className="ml-1.5 text-[11px]"
            style={{ color: "var(--text3)" }}
          >
            {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <div
          className="error-msg mt-1.5 flex items-center gap-1.5 rounded-lg px-2.5 py-[7px]"
          style={{
            background: isDark ? "#2a1010" : "#fff0f0",
            border: `1px solid ${isDark ? "#5a2020" : "#f5c0c0"}`,
          }}
        >
          <span className="text-xs leading-none">⚠</span>
          <span
            className="text-xs font-medium"
            style={{ color: isDark ? "#f08080" : "#c0392b" }}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
