"use client";

import { useEffect, useState } from "react";

function getFormattedDate(): string {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export interface CurrentDateProps {
  className?: string;
}

export function CurrentDate({ className }: CurrentDateProps) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    setDate(getFormattedDate());
  }, []);

  return (
    <time
      suppressHydrationWarning
      className={
        className ??
        "font-pixel text-ink/60 shrink-0 text-[9px] tracking-wider uppercase md:text-[11px]"
      }
    >
      {date ?? null}
    </time>
  );
}
