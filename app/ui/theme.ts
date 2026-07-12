export type Theme = "dark" | "light";

export type DayLog = {
  date: string;
  attended: number;
  total: number;
};

export const DARK = {
  "--bg": "#0c0c0c",
  "--bg2": "#151515",
  "--bg3": "#1e1e1e",
  "--bg4": "#282828",
  "--text": "#ececec",
  "--text2": "#8a8a8a",
  "--text3": "#555",
  "--border": "#222",
  "--ring": "rgba(255,255,255,0.08)",
} as React.CSSProperties;

export const LIGHT = {
  "--bg": "#f8f8f8",
  "--bg2": "#ffffff",
  "--bg3": "#f0f0f0",
  "--bg4": "#e6e6e6",
  "--text": "#111",
  "--text2": "#666",
  "--text3": "#aaa",
  "--border": "#e0e0e0",
  "--ring": "rgba(0,0,0,0.06)",
} as React.CSSProperties;

export function vars(theme: Theme): React.CSSProperties {
  return theme === "dark" ? DARK : LIGHT;
}
