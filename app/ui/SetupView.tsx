"use client";

import type { Theme } from "./theme";
import ThemeToggle from "./ThemeToggle";
import Field from "./Field";
import NumberInput from "./NumberInput";

export default function SetupView({
  theme,
  onToggleTheme,
  total,
  attended,
  daysLeft,
  classesPerDay,
  targetPercent,
  totalError,
  attendedError,
  isValid,
  onTotalChange,
  onAttendedChange,
  onDaysLeftChange,
  onClassesPerDayChange,
  onTargetPercentChange,
  onSubmit,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  total: number;
  attended: number;
  daysLeft: number;
  classesPerDay: number;
  targetPercent: number;
  totalError: string | null;
  attendedError: string | null;
  isValid: boolean;
  onTotalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAttendedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDaysLeftChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClassesPerDayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTargetPercentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <span className="brand-badge">Bunk-Tendance</span>
          <h1
            className="mt-2 text-[26px] font-medium tracking-tight"
            style={{ color: "var(--text)" }}
          >
            Let&apos;s set things up
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: "var(--text2)" }}>
            Enter your current attendance details below
          </p>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5">
        <Field
          label="Total classes held so far"
          hint="e.g. 80"
          theme={theme}
          error={totalError}
        >
          <NumberInput
            value={total}
            onChange={onTotalChange}
            min={0}
            placeholder="0"
            theme={theme}
            error={totalError}
          />
        </Field>

        <Field
          label="Classes attended so far"
          hint="e.g. 45"
          theme={theme}
          error={attendedError}
        >
          <NumberInput
            value={attended}
            onChange={onAttendedChange}
            min={0}
            placeholder="0"
            theme={theme}
            error={attendedError}
          />
        </Field>

        <Field
          label="Days left in semester"
          hint="How many days to reach your target?"
          theme={theme}
        >
          <NumberInput
            value={daysLeft}
            onChange={onDaysLeftChange}
            min={0}
            placeholder="0"
            theme={theme}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Classes per day" hint="" theme={theme}>
            <NumberInput
              value={classesPerDay}
              onChange={onClassesPerDayChange}
              min={1}
              max={20}
              placeholder="8"
              theme={theme}
            />
          </Field>
          <Field label="Target %" hint="your goal" theme={theme}>
            <NumberInput
              value={targetPercent}
              onChange={onTargetPercentChange}
              min={1}
              max={100}
              placeholder="75"
              theme={theme}
            />
          </Field>
        </div>
      </div>

      {/* Helper text */}
      {!isValid && (total > 0 || daysLeft > 0 || attended > 0) && (
        <p
          className="mt-4 text-center text-[12px]"
          style={{ color: "var(--text3)" }}
        >
          {attendedError || totalError
            ? "Fix the errors above to continue"
            : total === 0
              ? "Enter total classes held to continue"
              : "Enter days left in semester to continue"}
        </p>
      )}

      {/* Submit */}
      <button onClick={onSubmit} disabled={!isValid} className="primary-btn mt-6 w-full">
        <span>{isValid ? "See my dashboard" : "See my dashboard"}</span>
        {isValid && <span className="ml-1 text-[15px]">→</span>}
      </button>
    </div>
  );
}
