"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Filter, X } from "lucide-react";

interface HighlightItem {
  id: string;
  title: string;
  date: string;
  description: React.ReactNode;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
}

const highlightsData: HighlightItem[] = [
  {
    id: "techcon26",
    title: "Techcon 26 at Kochi",
    date: "September 3, 2026",
    description: (
      <>
        Had an inspiring experience at Techcon 26 by TechFed Kerala — two days of
        innovation, collaboration, learning, and meaningful connections. Being a
        Coordinator was a valuable experience, managing teams,
        responsibilities, and multiple zones.
      </>
    ),
    tags: ["techfed", "techcon26", "kochi", "2026"],
    imageSrc: "/images/highlights/techcon26.jpg",
    imageAlt: "Muhammed Shareef at Techcon 26 as Coordinator",
  },
  {
    id: "btech-graduation",
    title: "B.Tech Graduation - A Milestone to Remember",
    date: "July 8, 2026",
    description: (
      <>
        Officially completed my B.Tech in Computer Science & Engineering from MEA
        Engineering College, under APJ Abdul Kalam Technological University.
        CGPA: 8.0 | First Class with Distinction.
      </>
    ),
    tags: ["btech", "cse", "graduation", "2026"],
    imageSrc: "/images/highlights/graduation.jpg",
    imageAlt: "Muhammed Shareef receiving B.Tech Graduation Degree",
  },
  {
    id: "mea-tacs",
    title: "MEA Engineering College at Malappuram",
    date: "January 12, 2026",
    description: (
      <>
        Attended an insightful session on &apos;Engineering Careers in the Age of
        AI&apos; by Abdul Majeed P., gaining valuable perspectives on the future
        of engineering and AI.
      </>
    ),
    tags: ["tacs", "ai", "2026"],
    imageSrc: "/images/highlights/tacs-day.jpg",
    imageAlt: "TACS Day event on Engineering Careers in the Age of AI",
  },
  {
    id: "wow-summit",
    title: "WOW Summit Kerala 2025",
    date: "May 20, 2025",
    description: (
      <>
        Recently attended{" "}
        <a
          href="https://www.linkedin.com/company/wowsummit/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue hover:text-ink font-bold underline underline-offset-2 transition-colors"
        >
          WOW Summit
        </a>{" "}
        Kerala 2025 by Google Developer Groups at Jain University, Kochi — an
        inspiring experience filled with learning, creativity, and meaningful
        connections. Grateful to be part of such an inspiring event and looking
        forward to more opportunities to learn, connect, and grow.
      </>
    ),
    tags: ["wowsummit", "gdg", "2025"],
    imageSrc: "/images/highlights/wow-summit.png",
    imageAlt: "Muhammed Shareef with team at WOW Summit Kerala 2025",
  },
  {
    id: "scaleup-conclave",
    title: "ScaleUp Conclave 2025",
    date: "February 15, 2025",
    description: (
      <>
        Recently attended ScaleUp Conclave 2025 as a Delegate — an inspiring
        experience filled with industry insights, innovation, networking, and
        meaningful connections. A great opportunity to learn, connect, and
        explore the evolving startup ecosystem.
      </>
    ),
    tags: ["scaleup", "conclave", "2025"],
    imageSrc: "/images/highlights/scaleup-conclave.jpg",
    imageAlt: "Muhammed Shareef at ScaleUp Conclave 2025",
  },
];

export default function HighlightsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Derive unique tags maintaining semantic ordering
  const allTags = useMemo(() => {
    const set = new Set<string>();
    highlightsData.forEach((item) => {
      item.tags.forEach((tag) => set.add(tag));
    });
    return Array.from(set);
  }, []);

  // Filter items based on selectedTag
  const filteredHighlights = useMemo(() => {
    if (!selectedTag || selectedTag === "all") {
      return highlightsData;
    }
    return highlightsData.filter((item) => item.tags.includes(selectedTag));
  }, [selectedTag]);

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <div className="relative space-y-10 py-6 sm:py-8 md:space-y-12 md:py-12">
      {/* Header Section */}
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h1 className="font-pixel text-ink text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          HIGHLIGHTS
        </h1>

        <p className="text-ink/80 mx-auto max-w-xl font-mono text-sm leading-relaxed sm:text-base">
          A curated collection of significant moments and achievements that have
          shaped my journey.
        </p>

        {/* Filter Timeline Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="border-sketch border-ink bg-surface shadow-sketch hover:shadow-sketchHover inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold transition-all hover:-translate-y-0.5 cursor-pointer"
            aria-expanded={isFilterOpen}
          >
            <Filter className="h-3.5 w-3.5" />
            <span>FILTER TIMELINE</span>
            {selectedTag && selectedTag !== "all" && (
              <span className="bg-blue text-ink ml-1 px-1.5 py-0.2 text-[10px]">
                #{selectedTag}
              </span>
            )}
          </button>
        </div>

        {/* Expandable Filter Panel */}
        {isFilterOpen && (
          <div className="border-sketch border-ink bg-surface shadow-sketch animate-in fade-in zoom-in-95 mx-auto mt-4 max-w-xl p-4 duration-150">
            <div className="mb-3 flex items-center justify-between border-b border-dashed border-ink/20 pb-2">
              <span className="font-pixel text-ink text-[11px] font-bold uppercase tracking-wider">
                Filter by Tag
              </span>
              {selectedTag && (
                <button
                  type="button"
                  onClick={() => setSelectedTag(null)}
                  className="text-ink/70 hover:text-ink inline-flex items-center gap-1 font-mono text-xs hover:underline cursor-pointer"
                >
                  <X className="h-3 w-3" />
                  <span>Clear filter</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={`border-sketch border-ink px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                  !selectedTag
                    ? "bg-blue text-ink font-bold shadow-[2px_2px_0_0_#2A2A2A]"
                    : "bg-cream text-ink/80 hover:bg-white hover:text-ink shadow-[1px_1px_0_0_#2A2A2A]"
                }`}
              >
                All Moments ({highlightsData.length})
              </button>
              {allTags.map((tag) => {
                const count = highlightsData.filter((item) =>
                  item.tags.includes(tag)
                ).length;
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`border-sketch border-ink px-2.5 py-1 font-mono text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue text-ink font-bold shadow-[2px_2px_0_0_#2A2A2A]"
                        : "bg-cream text-ink/80 hover:bg-white hover:text-ink shadow-[1px_1px_0_0_#2A2A2A]"
                    }`}
                  >
                    #{tag} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Timeline Section */}
      <div className="relative mx-auto max-w-5xl pt-4 pb-12">
        {/* Central Vertical Line for Desktop */}
        <div
          className="border-ink absolute top-0 bottom-0 left-4 hidden w-0 -translate-x-1/2 border-l-2 md:left-1/2 md:block"
          aria-hidden="true"
        />

        {/* Left Vertical Line for Mobile */}
        <div
          className="border-ink absolute top-0 bottom-0 left-4 block w-0 -translate-x-1/2 border-l-2 md:hidden"
          aria-hidden="true"
        />

        {filteredHighlights.length === 0 ? (
          <div className="border-sketch border-ink bg-surface shadow-sketch mx-auto max-w-md p-8 text-center">
            <p className="font-pixel text-ink text-sm">No highlights found</p>
            <p className="text-ink/70 mt-2 font-mono text-xs">
              No entries tagged with #{selectedTag}
            </p>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className="border-sketch border-ink bg-blue text-ink shadow-sketchSm mt-4 px-4 py-1.5 font-mono text-xs font-bold cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {filteredHighlights.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className="relative">
                  {/* Timeline Square Node Marker */}
                  <div
                    aria-hidden="true"
                    className="border-ink bg-cream shadow-[1px_1px_0_0_#2A2A2A] absolute top-6 left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 border-2 md:top-8 md:left-1/2 md:h-4 md:w-4"
                  />

                  {/* Desktop Alternating Row (md and above) */}
                  <div className="hidden md:flex md:items-center md:gap-12">
                    {/* Left Column */}
                    <div className="w-1/2 pr-6">
                      {isEven ? (
                        /* Text block aligned right */
                        <div className="flex flex-col items-end text-right">
                          <h2 className="font-pixel text-ink text-lg font-bold leading-tight sm:text-xl">
                            {item.title}
                          </h2>
                          <div className="border-ink/20 mt-1 mb-3 w-full border-b border-dashed" />
                          <p className="font-mono text-xs font-bold text-ink/70">
                            {item.date}
                          </p>
                          <p className="text-ink/90 mt-3 font-mono text-xs sm:text-sm leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-4 flex flex-wrap justify-end gap-2">
                            {item.tags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagClick(tag)}
                                className={`border-sketch border-ink px-2 py-0.5 font-mono text-[11px] select-none transition-all cursor-pointer ${
                                  selectedTag === tag
                                    ? "bg-blue text-ink font-bold shadow-[2px_2px_0_0_#2A2A2A]"
                                    : "bg-cream text-ink hover:bg-white shadow-[1px_1px_0_0_#2A2A2A]"
                                }`}
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Photo Card on Left */
                        <div className="group border-sketch border-ink bg-surface shadow-sketch hover:shadow-sketchHover relative overflow-visible p-3 transition-all hover:-translate-y-1">
                          {/* Torn-paper tape */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-2.5deg] border border-[#4A4A4A]/40 bg-[#E8E1D2]/85 shadow-sm"
                          />
                          <div className="border-sketch border-ink relative aspect-[4/3] w-full overflow-hidden bg-[#2A2A2A]/5">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              fill
                              unoptimized
                              priority
                              sizes="(min-width: 768px) 45vw, 90vw"
                              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="w-1/2 pl-6">
                      {isEven ? (
                        /* Photo Card on Right */
                        <div className="group border-sketch border-ink bg-surface shadow-sketch hover:shadow-sketchHover relative overflow-visible p-3 transition-all hover:-translate-y-1">
                          {/* Torn-paper tape */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-2.5deg] border border-[#4A4A4A]/40 bg-[#E8E1D2]/85 shadow-sm"
                          />
                          <div className="border-sketch border-ink relative aspect-[4/3] w-full overflow-hidden bg-[#2A2A2A]/5">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              fill
                              unoptimized
                              priority
                              sizes="(min-width: 768px) 45vw, 90vw"
                              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Text block aligned left */
                        <div className="flex flex-col items-start text-left">
                          <h2 className="font-pixel text-ink text-lg font-bold leading-tight sm:text-xl">
                            {item.title}
                          </h2>
                          <div className="border-ink/20 mt-1 mb-3 w-full border-b border-dashed" />
                          <p className="font-mono text-xs font-bold text-ink/70">
                            {item.date}
                          </p>
                          <p className="text-ink/90 mt-3 font-mono text-xs sm:text-sm leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-4 flex flex-wrap justify-start gap-2">
                            {item.tags.map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagClick(tag)}
                                className={`border-sketch border-ink px-2 py-0.5 font-mono text-[11px] select-none transition-all cursor-pointer ${
                                  selectedTag === tag
                                    ? "bg-blue text-ink font-bold shadow-[2px_2px_0_0_#2A2A2A]"
                                    : "bg-cream text-ink hover:bg-white shadow-[1px_1px_0_0_#2A2A2A]"
                                }`}
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Stacked Layout (< md) */}
                  <div className="block pl-10 md:hidden">
                    <div className="space-y-4">
                      {/* Photo Card */}
                      <div className="group border-sketch border-ink bg-surface shadow-sketch relative overflow-visible p-2.5">
                        {/* Torn-paper tape */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-2.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rotate-[-2deg] border border-[#4A4A4A]/40 bg-[#E8E1D2]/85 shadow-xs"
                        />
                        <div className="border-sketch border-ink relative aspect-[4/3] w-full overflow-hidden bg-[#2A2A2A]/5">
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fill
                            unoptimized
                            priority
                            sizes="90vw"
                            className="object-cover object-center"
                          />
                        </div>
                      </div>

                      {/* Text Details */}
                      <div>
                        <h2 className="font-pixel text-ink text-sm font-bold leading-snug">
                          {item.title}
                        </h2>
                        <div className="border-ink/20 my-2 border-b border-dashed" />
                        <p className="font-mono text-xs font-bold text-ink/70">
                          {item.date}
                        </p>
                        <p className="text-ink/90 mt-2 font-mono text-xs leading-relaxed">
                          {item.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagClick(tag)}
                              className={`border-sketch border-ink px-2 py-0.5 font-mono text-[10px] select-none transition-all cursor-pointer ${
                                selectedTag === tag
                                  ? "bg-blue text-ink font-bold shadow-[2px_2px_0_0_#2A2A2A]"
                                  : "bg-cream text-ink hover:bg-white shadow-[1px_1px_0_0_#2A2A2A]"
                              }`}
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
