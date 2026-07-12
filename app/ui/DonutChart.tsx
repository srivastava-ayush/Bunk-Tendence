"use client";

import { useEffect, useState } from "react";

export default function DonutChart({
  percent,
  color,
  size = 140,
}: {
  percent: number;
  color: string;
  size?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const clamped = Math.min(percent, 100);
  const strokeWidth = 9;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="donut-chart" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
          opacity={0.5}
        />
        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? dashOffset : circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          filter="url(#glow)"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Center text */}
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.17}
          fontWeight="700"
          fill="var(--text)"
          style={{ fontFamily: "var(--font-geist-sans), system-ui" }}
        >
          {clamped.toFixed(0)}%
        </text>
        <text
          x={center}
          y={center + size * 0.1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.08}
          fill="var(--text2)"
        >
          current
        </text>
      </svg>
    </div>
  );
}
