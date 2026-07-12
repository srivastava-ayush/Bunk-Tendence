"use client";

import type { Theme } from "./theme";
import type { StatusLevel } from "./StatusBadge";
import ThemeToggle from "./ThemeToggle";
import DonutChart from "./DonutChart";
import StatusBadge from "./StatusBadge";
import StatCard from "./StatCard";
import Card from "./Card";
import NumberInput from "./NumberInput";

export default function DashboardView({
  theme,
  onToggleTheme,
  onEdit,
  onClearData,
  stats,
  status,
  targetPercent,
  daysLeft,
  classesPerDay,
  attended,
  total,
  todayInput,
  onTodayInputChange,
  onSubmitToday,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  onEdit: () => void;
  onClearData: () => void;
  stats: {
    currentPercent: number;
    canMiss: number;
    neededMore: number;
  };
  status: StatusLevel;
  targetPercent: number;
  daysLeft: number;
  classesPerDay: number;
  attended: number;
  total: number;
  todayInput: number;
  onTodayInputChange: (n: number) => void;
  onSubmitToday: () => void;
}) {
  const isDark = theme === "dark";
  const semesterDone = daysLeft <= 0;
  const quickOptions = [
    { label: "Bunked", value: 0 },
    { label: "Half day", value: Math.floor(classesPerDay / 2) },
    { label: "Full day", value: classesPerDay },
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <span className="brand-badge">Bunk-Tendance</span>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="ghost-btn text-[13px]">
            <span className="mr-1">←</span> Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Clear all attendance data? This cannot be undone.")) {
                onClearData();
              }
            }}
            className="danger-btn text-[13px]"
          >
            Clear
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Hero section: chart + status */}
      <Card className="mb-5 p-5">
        <div className="flex items-center gap-5">
          <DonutChart
            percent={stats.currentPercent}
            color={status.color}
            size={140}
          />
          <div className="flex-1 min-w-0">
            <StatusBadge status={status} className="mb-3" />
            <div className="space-y-1.5">
              <InfoRow label="Target" value={`${targetPercent}%`} />
              <InfoRow
                label="Can bunk"
                value={`${Math.max(stats.canMiss, 0)} classes`}
              />
              <InfoRow label="Days left" value={String(daysLeft)} />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats row */}
      <div className="mb-5 grid grid-cols-3 gap-3">
        <StatCard label="Attended" value={attended} icon="✓" />
        <StatCard label="Total held" value={total} icon="📚" />
        <StatCard
          label="Need more"
          value={Math.max(stats.neededMore, 0)}
          icon="→"
          accent={
            stats.neededMore > 0
              ? isDark
                ? "#f09595"
                : "#c0392b"
              : isDark
                ? "#5DCAA5"
                : "#0F6E56"
          }
        />
      </div>

      {/* Log today */}
      <Card className="p-5">
        <h3
          className="mb-1 text-[14px] font-medium"
          style={{ color: "var(--text)" }}
        >
          Log today
        </h3>
        <p className="mb-3 text-[13px]" style={{ color: "var(--text2)" }}>
          {semesterDone
            ? "Semester is over!"
            : "How many classes did you attend?"}
        </p>

        {!semesterDone && (
          <>
            <div className="mb-3 flex items-center gap-2">
              <NumberInput
                value={todayInput}
                onChange={(e) =>
                  onTodayInputChange(
                    e.target.value === "" ? 0 : Number(e.target.value)
                  )
                }
                min={0}
                max={classesPerDay}
                theme={theme}
                className="flex-1"
              />
              <span
                className="whitespace-nowrap text-[13px]"
                style={{ color: "var(--text2)" }}
              >
                of {classesPerDay}
              </span>
            </div>

            <div className="mb-4 flex gap-2">
              {quickOptions.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => onTodayInputChange(value)}
                  className={`quick-btn flex-1 ${todayInput === value ? "active" : ""}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={onSubmitToday}
          disabled={semesterDone}
          className="primary-btn w-full"
          style={{
            opacity: semesterDone ? 0.5 : 1,
            cursor: semesterDone ? "not-allowed" : "pointer",
          }}
        >
          {semesterDone ? "Semester over" : "Submit day"}
        </button>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[13px]" style={{ color: "var(--text2)" }}>
      {label}:{" "}
      <strong className="font-medium" style={{ color: "var(--text)" }}>
        {value}
      </strong>
    </p>
  );
}
