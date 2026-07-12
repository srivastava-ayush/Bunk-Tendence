"use client";

export type StatusLevel = {
  label: string;
  color: string;
  bg: string;
  text: string;
  icon: string;
};

export function getStatus(
  canMiss: number,
  classesPerDay: number,
  isDark: boolean
): StatusLevel {
  if (canMiss < 0)
    return {
      label: "At risk",
      color: "#E24B4A",
      bg: isDark ? "#2a1515" : "#FCEBEB",
      text: isDark ? "#f09595" : "#A32D2D",
      icon: "🔴",
    };
  if (canMiss <= classesPerDay)
    return {
      label: "Danger zone",
      color: "#EF9F27",
      bg: isDark ? "#2a1f0a" : "#FAEEDA",
      text: isDark ? "#FAC775" : "#854F0B",
      icon: "🟠",
    };
  if (canMiss <= classesPerDay * 2)
    return {
      label: "Be careful",
      color: "#BA7517",
      bg: isDark ? "#241a07" : "#FFF3E0",
      text: isDark ? "#EF9F27" : "#633806",
      icon: "🟡",
    };
  return {
    label: "You're good",
    color: "#1D9E75",
    bg: isDark ? "#0a1f18" : "#E1F5EE",
    text: isDark ? "#5DCAA5" : "#0F6E56",
    icon: "🟢",
  };
}

export default function StatusBadge({
  status,
  className,
}: {
  status: StatusLevel;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium ${className ?? ""}`}
      style={{ background: status.bg, color: status.text }}
    >
      <span className="text-[11px]">{status.icon}</span>
      {status.label}
    </span>
  );
}
