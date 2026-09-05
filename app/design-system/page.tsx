"use client";

/**
 * NOTE: This is a temporary demo route for Step 1 verification.
 * Delete this route once real pages are built (Step 10 cleanup).
 */

import React, { useState } from "react";
import {
  Button,
  Card,
  CornerBracketCard,
  Tag,
  SectionHeading,
  DecoSquare,
} from "@/components/ui";

export default function DesignSystemPage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="bg-cream relative mx-auto min-h-screen max-w-5xl space-y-12 p-6 md:p-12">
      {/* Scattered decorative squares in margins */}
      <DecoSquare
        color="coral"
        className="absolute top-10 right-8 md:right-16"
      />
      <DecoSquare color="sage" className="absolute top-36 left-4 md:left-12" />
      <DecoSquare
        color="blue"
        className="absolute top-80 right-6 md:right-24"
      />
      <DecoSquare
        color="coral"
        className="absolute bottom-20 left-8 md:left-20"
      />

      {/* Header */}
      <div>
        <div className="bg-yellow border-ink shadow-sketchSm mb-3 inline-block border-2 px-3 py-1 font-mono text-xs font-bold">
          STEP 1 VERIFICATION
        </div>
        <h1 className="font-pixel text-ink text-2xl sm:text-3xl">
          Design System & Primitives
        </h1>
        <p className="text-ink/80 mt-2 font-mono text-sm">
          Visual test bench for retro sketch tokens, buttons, cards, tags, and
          pixel typography.
        </p>
      </div>

      <hr className="dashed-divider" />

      {/* Section 1: Color Tokens */}
      <section className="space-y-4">
        <SectionHeading accentColor="coral" level={2}>
          Color Palette
        </SectionHeading>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {[
            { name: "Cream (bg)", hex: "#F4EDE1", bgClass: "bg-cream" },
            { name: "Surface", hex: "#FFFFFF", bgClass: "bg-surface" },
            { name: "Ink", hex: "#2A2A2A", bgClass: "bg-ink", textLight: true },
            { name: "Blue", hex: "#6495ED", bgClass: "bg-blue" },
            {
              name: "Olive (CTA)",
              hex: "#546B2F",
              bgClass: "bg-olive",
              textLight: true,
            },
            { name: "Yellow", hex: "#FCEF84", bgClass: "bg-yellow" },
            { name: "Coral", hex: "#E0A49E", bgClass: "bg-coral" },
            { name: "Sage", hex: "#B0BD82", bgClass: "bg-sage" },
            { name: "Snake", hex: "#A5AC88", bgClass: "bg-snake" },
          ].map((token) => (
            <div
              key={token.name}
              className="border-sketch border-ink shadow-sketchSm bg-surface p-3"
            >
              <div
                className={`border-ink h-12 w-full border ${token.bgClass} mb-2 flex items-center justify-center font-mono text-xs font-bold ${
                  token.textLight ? "text-white" : "text-ink"
                }`}
              >
                {token.hex}
              </div>
              <p className="text-ink font-mono text-xs font-bold">
                {token.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="dashed-divider" />

      {/* Section 2: Buttons with Press Interaction */}
      <section className="space-y-4">
        <SectionHeading accentColor="sage" level={2}>
          Buttons & Press Interaction
        </SectionHeading>
        <p className="text-ink/80 text-xs">
          Click any button to test the sketch press interaction (hard offset
          shadow disappears and button shifts down-right).
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="solid" onClick={() => setClickCount((c) => c + 1)}>
            Solid (Default)
          </Button>

          <Button variant="outline" onClick={() => setClickCount((c) => c + 1)}>
            Outline
          </Button>

          <Button variant="cta" onClick={() => setClickCount((c) => c + 1)}>
            CTA (Book a Call)
          </Button>

          <Button
            variant="highlight"
            onClick={() => setClickCount((c) => c + 1)}
          >
            Highlight Banner
          </Button>
        </div>

        <div className="bg-surface border-ink inline-block border-2 p-3 font-mono text-xs">
          Interactive Click Counter:{" "}
          <span className="text-blue font-bold">{clickCount}</span>
        </div>
      </section>

      <hr className="dashed-divider" />

      {/* Section 3: Cards */}
      <section className="space-y-4">
        <SectionHeading accentColor="blue" level={2}>
          Card Primitives
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3">
          {/* Standard Card */}
          <Card>
            <h3 className="font-pixel text-ink mb-2 text-sm">Standard Card</h3>
            <p className="text-ink/80 text-xs leading-relaxed">
              Surface background with 3px ink sketch border and hard offset 6px
              shadow.
            </p>
          </Card>

          {/* Card with Tape Strip */}
          <Card hasTape>
            <h3 className="font-pixel text-ink mb-2 text-sm">Tape Card</h3>
            <p className="text-ink/80 text-xs leading-relaxed">
              Includes a torn translucent tape strip at the top edge, rotated
              slightly.
            </p>
          </Card>

          {/* Corner Bracket Card */}
          <CornerBracketCard>
            <h3 className="font-pixel text-ink mb-2 text-sm">
              Corner Brackets
            </h3>
            <p className="text-ink/80 text-xs leading-relaxed">
              Camera crop mark corner brackets with open edges instead of full
              border.
            </p>
          </CornerBracketCard>
        </div>
      </section>

      <hr className="dashed-divider" />

      {/* Section 4: Tags & Badges */}
      <section className="space-y-4">
        <SectionHeading accentColor="yellow" level={2}>
          Tags & Badges
        </SectionHeading>
        <div className="flex flex-wrap items-center gap-3">
          <Tag variant="cream">Next.js 14+</Tag>
          <Tag variant="cream">TypeScript</Tag>
          <Tag variant="surface">Tailwind CSS</Tag>
          <Tag variant="surface">Framer Motion</Tag>
          <Tag variant="blue">Status: Active</Tag>
          <Tag variant="blue">Available for hire</Tag>
        </div>
      </section>

      <hr className="dashed-divider" />

      {/* Section 5: Typography & Headings */}
      <section className="space-y-4">
        <SectionHeading accentColor="olive" level={2}>
          Pixel Typography Scale
        </SectionHeading>
        <div className="bg-surface border-sketch border-ink shadow-sketch space-y-3 p-6">
          <h1 className="font-pixel text-xl md:text-2xl">
            h1 — The Quick Brown Fox
          </h1>
          <h2 className="font-pixel text-base md:text-lg">
            h2 — Jumped Over The Lazy Dog
          </h2>
          <h3 className="font-pixel text-xs md:text-sm">
            h3 — 1234567890 Pixel Display
          </h3>
          <p className="text-ink pt-2 font-mono text-sm leading-relaxed">
            Body text rendered in JetBrains Mono font. Clean, legible monospace
            suited for retro technical portfolios.
          </p>
        </div>
      </section>
    </div>
  );
}
