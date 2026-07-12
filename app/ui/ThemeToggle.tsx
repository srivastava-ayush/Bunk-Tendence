"use client";

import { Sun, Moon } from "@phosphor-icons/react";
import type { Theme } from "./theme";

export default function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: Theme;
  onToggle: () => void;
}) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="group relative flex h-8 w-[52px] items-center rounded-full transition-colors duration-300"
      style={{
        background: isDark ? "var(--bg4)" : "var(--bg4)",
        border: "1px solid var(--border)",
      }}
    >
      <span
        className="absolute left-1 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300"
        style={{
          transform: isDark ? "translateX(0)" : "translateX(28px)",
          background: isDark ? "var(--bg)" : "var(--bg2)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        {isDark ? <Sun size={13} weight="fill" /> : <Moon size={13} weight="fill" />}
      </span>
    </button>
  );
}
