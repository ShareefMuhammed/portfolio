"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

export default function HomePage() {
  const formattedDate = React.useSyncExternalStore(
    () => () => {},
    getFormattedDate,
    () => getFormattedDate()
  );

  return (
    <div className="relative flex min-h-[72vh] flex-col items-start justify-center gap-8 pt-4 sm:pt-6 md:px-6 md:pt-12 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
      {/* Main Hero Card */}
      <div className="z-10 w-full max-w-3xl">
        <div className="border-sketch border-ink shadow-sketch-xl relative bg-surface p-6 sm:p-8 md:p-10 md:shadow-[16px_16px_0_0_var(--color-ink)]">
          <div className="space-y-6">
            {/* Kicker Line: Star + Name on left, uppercase dynamic date on right */}
            <div className="border-ink/20 mb-4 flex items-baseline justify-between gap-4 border-b-2 pb-3.5">
              <h2 className="font-pixel text-ink flex items-center gap-2 truncate text-[11px] uppercase tracking-wider md:text-sm">
                <span className="text-yellow text-sm">★</span>
                <span>MUHAMMED SHAREEF</span>
              </h2>
              <time
                suppressHydrationWarning
                className="font-pixel text-ink/60 shrink-0 text-[9px] tracking-wider uppercase md:text-[11px]"
              >
                {formattedDate}
              </time>
            </div>

            {/* Heading + Mobile Polaroid Preview */}
            <div className="flex items-start justify-between gap-4 sm:gap-6">
              <div className="min-w-0 flex-1">
                <h1 className="font-pixel text-ink text-3xl leading-tight sm:text-4xl md:text-5xl">
                  HI, I&apos;M
                  <br />
                  <span className="text-blue block pt-1">SHAREEF</span>
                </h1>
              </div>

              {/* Mobile/Tablet Polaroid Card — Clickable to LinkedIn profile */}
              <a
                href="https://www.linkedin.com/in/muhammedshareef-p"
                target="_blank"
                rel="noopener noreferrer"
                title="View Muhammed Shareef on LinkedIn"
                aria-label="View Muhammed Shareef on LinkedIn"
                className="border-sketch border-ink shadow-sketch-md hover:shadow-sketch relative shrink-0 rotate-2 cursor-pointer bg-surface p-1.5 pb-1 transition-transform hover:rotate-0 lg:hidden"
              >
                <div className="border-sketch border-ink relative h-20 w-20 overflow-hidden sm:h-24 sm:w-24 md:h-28 md:w-28">
                  <Image
                    src="/images/profile.jpg"
                    alt="Muhammed Shareef"
                    fill
                    priority
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    className="object-cover object-center"
                  />
                </div>
                {/* Tape strip */}
                <span
                  aria-hidden="true"
                  className="bg-cream border-ink/20 pointer-events-none absolute -top-2.5 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-6 border opacity-90 shadow-sm"
                />
              </a>
            </div>

            {/* Badge Row — Exactly ONE LinkedIn badge */}
            <div>
              <a
                href="https://www.linkedin.com/in/muhammedshareef-p"
                target="_blank"
                rel="noopener noreferrer"
                title="Muhammed Shareef on LinkedIn"
                aria-label="Muhammed Shareef on LinkedIn"
                className="border-sketch border-ink shadow-sketch-sm hover:shadow-[5px_5px_0_0_var(--color-ink)] group inline-flex cursor-pointer items-center gap-2 bg-surface px-3 py-1.5 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 sm:px-3.5 sm:py-2"
              >
                <LinkedinIcon className="h-4 w-4 shrink-0 text-blue" />
                <span className="text-ink group-hover:text-blue font-mono text-xs font-bold transition-colors sm:text-sm">
                  linkedin.com/in/muhammedshareef-p
                </span>
              </a>
            </div>

            {/* Bio Paragraph with colored left accent bar */}
            <p className="border-olive text-ink max-w-2xl border-l-4 pl-4 font-mono text-sm leading-relaxed sm:text-base md:text-lg">
              Shareef is an aspiring AI engineer with a focus on Machine
              Learning and Deep Learning. Currently a Machine Learning Trainee
              at <strong className="text-ink font-bold">SMEC Technology</strong>
              , working on classification and NLP projects with Python and
              Scikit-Learn. Creator of{" "}
              <strong className="text-ink font-bold">ContextForge CLI</strong>,
              an open-source command-line tool (published on npm) that scaffolds
              structured AI context files for coding assistants like Claude
              Code, Cursor, and GitHub Copilot. Also built{" "}
              <strong className="text-ink font-bold">DrugGPT</strong>, a
              multimodal RAG-based drug information system using FAISS, OCR, and
              LLMs.
            </p>

            {/* Action Buttons: Solid variant + Outline variant */}
            <div className="flex flex-wrap gap-3 pt-2 sm:gap-4 md:pt-4">
              <Link href="/projects">
                <Button variant="solid" className="px-6 py-3 text-xs sm:text-sm">
                  View Projects →
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-6 py-3 text-xs sm:text-sm">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Polaroid Card — Clickable to LinkedIn profile */}
      <a
        href="https://www.linkedin.com/in/muhammedshareef-p"
        target="_blank"
        rel="noopener noreferrer"
        title="View Muhammed Shareef on LinkedIn"
        aria-label="View Muhammed Shareef on LinkedIn"
        className="border-sketch border-ink shadow-sketch-lg hover:shadow-[10px_10px_0_0_var(--color-ink)] group relative hidden shrink-0 rotate-2 cursor-pointer bg-surface p-3 pb-2 transition-all duration-200 hover:-translate-y-1 hover:rotate-0 lg:block"
      >
        <div className="border-sketch border-ink relative h-48 w-48 overflow-hidden xl:h-56 xl:w-56">
          <Image
            src="/images/profile.jpg"
            alt="Muhammed Shareef"
            fill
            priority
            sizes="(max-width: 1280px) 192px, 224px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <span className="text-ink/70 group-hover:text-blue block pt-2 pb-1 text-center font-mono text-xs font-bold tracking-tight transition-colors">
          in/muhammedshareef-p
        </span>
        {/* Tape strip */}
        <span
          aria-hidden="true"
          className="bg-cream border-ink/20 pointer-events-none absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-6 border opacity-90 shadow-sm"
        />
      </a>
    </div>
  );
}
