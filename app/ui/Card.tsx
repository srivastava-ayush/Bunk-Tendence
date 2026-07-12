"use client";

export default function Card({
  children,
  className,
  hover,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`card rounded-xl transition-all duration-200 ${hover ? "hover-scale" : ""} ${className ?? ""}`}
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}
