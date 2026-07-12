"use client";

import { useState, useMemo } from "react";
import type { Theme } from "./theme";
import Card from "./Card";

export default function Projection({
  attended,
  total,
  classesPerDay,
  targetPercent,
  theme,
}: {
  attended: number;
  total: number;
  classesPerDay: number;
  targetPercent: number;
  theme: Theme;
}) {
  const [days, setDays] = useState<number>(0);
  const isDark = theme === "dark";

  const results = useMemo(() => {
    if (days <= 0) return null;

    const extraClasses = days * classesPerDay;

    const fullDayNewTotal = total + extraClasses;
    const fullDayNewAttended = attended + extraClasses;
    const fullDayPct =
      fullDayNewTotal > 0
        ? (fullDayNewAttended / fullDayNewTotal) * 100
        : 0;

    const halfPerDay = Math.floor(classesPerDay / 2);
    const halfExtra = halfPerDay * days;
    const halfDayNewTotal = total + extraClasses;
    const halfDayNewAttended = attended + halfExtra;
    const halfDayPct =
      halfDayNewTotal > 0
        ? (halfDayNewAttended / halfDayNewTotal) * 100
        : 0;

    return {
      fullDay: {
        pct: fullDayPct,
        attended: fullDayNewAttended,
        total: fullDayNewTotal,
        meets: fullDayPct >= targetPercent,
      },
      halfDay: {
        pct: halfDayPct,
        attended: halfDayNewAttended,
        total: halfDayNewTotal,
        meets: halfDayPct >= targetPercent,
      },
    };
  }, [days, attended, total, classesPerDay, targetPercent]);

  return (
    <div className="flex flex-col gap-4">
      {/* Input */}
      <div>
        <p
          className="mb-2 text-[13px] font-medium"
          style={{ color: "var(--text)" }}
        >
          See your attendance after X days
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={365}
            value={days || ""}
            onChange={(e) =>
              setDays(e.target.value === "" ? 0 : Number(e.target.value))
            }
            placeholder="e.g. 10"
            className="number-input w-full rounded-[10px] px-3 py-2.5 text-[15px] outline-none transition-all duration-200"
            style={{
              background: "var(--bg3)",
              color: "var(--text)",
              border: "1.5px solid var(--border)",
            }}
          />
          <span
            className="whitespace-nowrap text-[13px]"
            style={{ color: "var(--text2)" }}
          >
            days
          </span>
        </div>
      </div>

      {/* Results */}
      {results && days > 0 && (
        <div className="flex flex-col gap-3 page-enter">
          {/* Full day scenario */}
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>
                  If you attend full day every day
                </p>
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  {classesPerDay} classes/day × {days} days = {classesPerDay * days} extra classes
                </p>
              </div>
              <div
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{
                  background: results.fullDay.meets
                    ? isDark ? "#0a1f18" : "#E1F5EE"
                    : isDark ? "#2a1515" : "#FCEBEB",
                  color: results.fullDay.meets
                    ? isDark ? "#5DCAA5" : "#0F6E56"
                    : isDark ? "#f09595" : "#A32D2D",
                }}
              >
                {results.fullDay.meets ? "Meets target" : "Below target"}
              </div>
            </div>
            <div className="flex items-end gap-4">
              <p
                className="text-[28px] font-bold tabular-nums leading-none"
                style={{
                  color: results.fullDay.meets
                    ? isDark ? "#5DCAA5" : "#0F6E56"
                    : isDark ? "#f09595" : "#A32D2D",
                }}
              >
                {results.fullDay.pct.toFixed(1)}%
              </p>
              <div className="pb-0.5">
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  {results.fullDay.attended}/{results.fullDay.total} classes attended
                </p>
              </div>
            </div>
          </Card>

          {/* Half day scenario */}
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>
                  If you attend half day every day
                </p>
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  ~{Math.floor(classesPerDay / 2)} classes/day × {days} days = {Math.floor(classesPerDay / 2) * days} extra classes
                </p>
              </div>
              <div
                className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{
                  background: results.halfDay.meets
                    ? isDark ? "#0a1f18" : "#E1F5EE"
                    : isDark ? "#2a1515" : "#FCEBEB",
                  color: results.halfDay.meets
                    ? isDark ? "#5DCAA5" : "#0F6E56"
                    : isDark ? "#f09595" : "#A32D2D",
                }}
              >
                {results.halfDay.meets ? "Meets target" : "Below target"}
              </div>
            </div>
            <div className="flex items-end gap-4">
              <p
                className="text-[28px] font-bold tabular-nums leading-none"
                style={{
                  color: results.halfDay.meets
                    ? isDark ? "#5DCAA5" : "#0F6E56"
                    : isDark ? "#f09595" : "#A32D2D",
                }}
              >
                {results.halfDay.pct.toFixed(1)}%
              </p>
              <div className="pb-0.5">
                <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                  {results.halfDay.attended}/{results.halfDay.total} classes attended
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {(!results || days <= 0) && (
        <p
          className="py-6 text-center text-[12px]"
          style={{ color: "var(--text3)" }}
        >
          Enter the number of days above to see your projected attendance
        </p>
      )}
    </div>
  );
}
