"use client";

export default function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="stat-card rounded-xl p-3 transition-all duration-200"
      style={{
        background: "var(--bg3)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="mb-1 flex items-center gap-1.5">
        {icon && <span className="opacity-60">{icon}</span>}
        <p className="text-[11px] font-medium" style={{ color: "var(--text2)" }}>
          {label}
        </p>
      </div>
      <p
        className="text-xl font-semibold tabular-nums"
        style={{ color: accent ?? "var(--text)" }}
      >
        {value}
      </p>
    </div>
  );
}
