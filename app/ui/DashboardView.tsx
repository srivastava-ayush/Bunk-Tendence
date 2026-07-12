"use client";

import { useState } from "react";
import type { Theme } from "./theme";
import type { StatusLevel } from "./StatusBadge";
import {
  ChartBar,
  Target,
  MagicWand,
  Check,
  Books,
  ArrowRight,
  PencilSimple,
  Trash,
} from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";
import ThemeToggle from "./ThemeToggle";
import DonutChart from "./DonutChart";
import StatusBadge from "./StatusBadge";
import StatCard from "./StatCard";
import Card from "./Card";
import NumberInput from "./NumberInput";
import BunkPlanner from "./BunkPlanner";
import Projection from "./Projection";

type Tab = "overview" | "plan" | "project";

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
    projectedPercent: number;
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
  const [tab, setTab] = useState<Tab>("overview");

  const quickOptions = [
    { label: "Bunked", value: 0 },
    { label: "Half day", value: Math.floor(classesPerDay / 2) },
    { label: "Full day", value: classesPerDay },
  ];

  const tabs: { key: Tab; label: string; Icon: React.ComponentType<IconProps> }[] = [
    { key: "overview", label: "Overview", Icon: ChartBar },
    { key: "plan", label: "Planner", Icon: Target },
    { key: "project", label: "Project", Icon: MagicWand },
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <span className="brand-badge">Bunk-Tendance</span>
        <div className="flex items-center gap-2">
          <button onClick={onEdit} className="ghost-btn text-[13px]">
            <PencilSimple size={14} weight="bold" className="mr-1" /> Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Clear all attendance data? This cannot be undone.")) {
                onClearData();
              }
            }}
            className="danger-btn text-[13px]"
          >
            <Trash size={14} weight="bold" />
          </button>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Tab bar */}
      <div className="mb-5 flex gap-1 rounded-xl p-1" style={{ background: "var(--bg3)" }}>
        {tabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-medium transition-all duration-200"
            style={{
              background: tab === key ? "var(--bg)" : "transparent",
              color: tab === key ? "var(--text)" : "var(--text3)",
              boxShadow: tab === key ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              border: tab === key ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            <Icon size={14} weight={tab === key ? "fill" : "regular"} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "overview" && (
        <div className="page-enter">
          {/* Hero section: chart + status */}
          <Card className="mb-4 p-5">
            <div className="flex items-center gap-5">
              <DonutChart
                percent={stats.currentPercent}
                color={status.color}
                size={140}
              />
              <div className="min-w-0 flex-1">
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

          {/* Projected % banner */}
          <div
            className="mb-4 flex items-center justify-between rounded-xl px-4 py-3"
            style={{
              background: stats.projectedPercent >= targetPercent
                ? isDark ? "#0a1f18" : "#E1F5EE"
                : isDark ? "#2a1515" : "#FCEBEB",
              border: `1px solid ${stats.projectedPercent >= targetPercent
                ? isDark ? "#1D9E7533" : "#1D9E7533"
                : isDark ? "#E24B4A33" : "#E24B4A33"}`,
            }}
          >
            <div>
              <p className="text-[11px]" style={{ color: "var(--text2)" }}>
                Projected final attendance
              </p>
              <p
                className="text-[20px] font-bold tabular-nums"
                style={{
                  color: stats.projectedPercent >= targetPercent
                    ? isDark ? "#5DCAA5" : "#0F6E56"
                    : isDark ? "#f09595" : "#A32D2D",
                }}
              >
                {stats.projectedPercent.toFixed(1)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                {stats.projectedPercent >= targetPercent ? "On track" : "Below target"}
              </p>
              <p className="text-[11px]" style={{ color: "var(--text2)" }}>
                at current pace
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <StatCard label="Attended" value={attended} icon={<Check size={12} weight="bold" />} />
            <StatCard label="Total held" value={total} icon={<Books size={12} weight="bold" />} />
            <StatCard
              label="Need more"
              value={Math.max(stats.neededMore, 0)}
              icon={<ArrowRight size={12} weight="bold" />}
              accent={
                stats.neededMore > 0
                  ? isDark ? "#f09595" : "#c0392b"
                  : isDark ? "#5DCAA5" : "#0F6E56"
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
      )}

      {tab === "plan" && (
        <Card className="p-4 page-enter">
          <h3
            className="mb-1 text-[14px] font-medium"
            style={{ color: "var(--text)" }}
          >
            Bunk Planner
          </h3>
          <p
            className="mb-3 text-[12px]"
            style={{ color: "var(--text2)" }}
          >
            See what happens if you skip classes
          </p>
          <BunkPlanner
            stats={stats}
            targetPercent={targetPercent}
            daysLeft={daysLeft}
            classesPerDay={classesPerDay}
            theme={theme}
          />
        </Card>
      )}

      {tab === "project" && (
        <Card className="p-4 page-enter">
          <h3
            className="mb-1 text-[14px] font-medium"
            style={{ color: "var(--text)" }}
          >
            Attendance Projection
          </h3>
          <p
            className="mb-3 text-[12px]"
            style={{ color: "var(--text2)" }}
          >
            See what your attendance will look like after X days
          </p>
          <Projection
            attended={attended}
            total={total}
            classesPerDay={classesPerDay}
            targetPercent={targetPercent}
            theme={theme}
          />
        </Card>
      )}
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
