"use client";

export default function BunkPlanner({
  stats,
  targetPercent,
  classesPerDay,
  theme,
}: {
  stats: {
    currentPercent: number;
    canMiss: number;
    neededMore: number;
    projectedPercent: number;
  };
  targetPercent: number;
  daysLeft: number;
  classesPerDay: number;
  theme: "dark" | "light";
}) {
  const scenarios = [
    {
      label: "Bunk 1 day",
      missed: classesPerDay,
    },
    {
      label: "Bunk 2 days",
      missed: classesPerDay * 2,
    },
    {
      label: "Bunk 1 week",
      missed: classesPerDay * 5,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {scenarios.map((s) => {
        const newCanMiss = stats.canMiss - s.missed;
        const meetsTarget = newCanMiss >= 0;
        const wouldMissBy = newCanMiss < 0 ? Math.abs(newCanMiss) : 0;

        return (
          <div
            key={s.label}
            className="flex items-center justify-between rounded-xl px-3 py-2.5"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--text)" }}>
                {s.label}
              </p>
              <p className="text-[11px]" style={{ color: "var(--text3)" }}>
                {s.missed} classes missed
              </p>
            </div>
            <div className="text-right">
              <div
                className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{
                  background: meetsTarget
                    ? theme === "dark"
                      ? "#0a1f18"
                      : "#E1F5EE"
                    : theme === "dark"
                      ? "#2a1515"
                      : "#FCEBEB",
                  color: meetsTarget
                    ? theme === "dark"
                      ? "#5DCAA5"
                      : "#0F6E56"
                    : theme === "dark"
                      ? "#f09595"
                      : "#A32D2D",
                }}
              >
                {meetsTarget ? "OK" : `Short by ${wouldMissBy}`}
              </div>
              <p className="mt-0.5 text-[10px]" style={{ color: "var(--text3)" }}>
                Can still miss {Math.max(newCanMiss, 0)}
              </p>
            </div>
          </div>
        );
      })}

      {stats.canMiss > 0 && (
        <div
          className="mt-1 rounded-xl px-3 py-2.5 text-center"
          style={{
            background: theme === "dark" ? "#0a1f18" : "#E1F5EE",
            border: `1px solid ${theme === "dark" ? "#1D9E7533" : "#1D9E7533"}`,
          }}
        >
          <p className="text-[12px] font-medium" style={{ color: theme === "dark" ? "#5DCAA5" : "#0F6E56" }}>
            You can safely bunk {stats.canMiss} more classes and still hit {targetPercent}%
          </p>
        </div>
      )}
    </div>
  );
}
