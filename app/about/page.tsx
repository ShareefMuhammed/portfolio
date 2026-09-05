"use client";

import React from "react";
import Image from "next/image";
import { FoodPoint } from "@/components/snake";

interface TimelineEntry {
  role: string;
  company: string;
  dates: string;
  description: string;
}

const experienceEntries: TimelineEntry[] = [
  {
    role: "Machine Learning Trainee",
    company: "SMEC Technology",
    dates: "Jul 2026 - Present",
    description:
      "Training in ML workflows covering data preprocessing, model training, and evaluation. Building classification and NLP projects with Python and Scikit-Learn, and exploring supervised and unsupervised learning techniques with TensorFlow.",
  },
  {
    role: "Coordinator - Hello AI",
    company: "Techcon26",
    dates: "Aug 2026 - Sep 2026",
    description:
      "Coordinated Hello AI, an AI awareness workshop introducing students to practical AI usage, core concepts, and emerging career opportunities. Planned session content and logistics, improving accessibility of AI concepts for a non-technical audience.",
  },
  {
    role: "Program Committee Lead",
    company: "TACS MEA",
    dates: "Aug 2025 - Jul 2026",
    description:
      "Led a 10+ member student committee to plan and execute 12+ technical and non-technical programs, including workshops, coding sessions, and tech talks. Coordinated hands-on workshops with 80%+ positive feedback.",
  },
  {
    role: "B.Tech, Computer Science and Engineering",
    company: "MEA Engineering College, Kerala",
    dates: "Sep 2022 - Jul 2026",
    description: "CGPA 8/10.",
  },
];

const technicalSkills: string[] = [
  "Machine Learning",
  "Deep Learning",
  "Data Analytics",
  "NLP & LLMs",
  "CLI Tooling",
  "Team Leadership",
];

export default function AboutPage() {
  return (
    <div className="relative space-y-16 py-6 sm:py-8 md:space-y-20 md:py-12">
      {/* Top Section: About Me Bio & Widescreen Photo Card */}
      <section className="grid items-start gap-8 md:gap-12 lg:grid-cols-2">
        {/* Left Column: Bio Card */}
        <div className="border-sketch border-ink shadow-[8px_8px_0_0_#2A2A2A] relative bg-white p-6 sm:p-8">
          <h1 className="font-pixel text-ink mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
            ABOUT ME
          </h1>
          <div className="text-ink space-y-4 font-mono text-sm leading-relaxed sm:text-base">
            <p>
              Hi, I&apos;m{" "}
              <span className="text-ink font-bold">Shareef</span>. I&apos;m an
              aspiring AI engineer with a foundation in Data Science and Machine
              Learning, focused on building AI-driven solutions to real-world
              problems.
            </p>
            <p>
              I build in public on GitHub and LinkedIn — from{" "}
              <strong className="text-ink font-bold">DrugGPT</strong>, a
              multimodal RAG-based drug information system, to{" "}
              <strong className="text-ink font-bold">ContextForge CLI</strong>,
              an open-source command-line tool for AI-assisted development
              workflows.
            </p>
            <p>
              My journey started with a curiosity about deep learning
              architectures — CNNs, RNNs, LSTMs, GANs, Transformers — and grew
              into building complete, deployable AI systems rather than just
              isolated models.
            </p>
            <p>
              Currently a Machine Learning Trainee at{" "}
              <strong className="text-ink font-bold">SMEC Technology</strong>,
              training in ML workflows and building classification and NLP
              projects with Python and Scikit-Learn.
            </p>
          </div>
        </div>

        {/* Right Column: Presentation Photo Card — Full Body & Face Alignment */}
        <div className="border-sketch border-ink shadow-[12px_12px_0_0_#CD5C5C] group relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden bg-[#1A1A1A] lg:max-w-none">
          <Image
            src="/images/ieee1.jpg"
            alt="Muhammed Shareef presenting DrugGPT at IEEE student paper contest"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectPosition: "left top" }}
            className="object-cover opacity-95 transition-opacity duration-300 group-hover:opacity-100"
          />
          {/* 4 White Corner Bracket Accents */}
          <div className="border-ink/40 pointer-events-none absolute top-2 left-2 z-10 h-4 w-4 border bg-white shadow-sm" />
          <div className="border-ink/40 pointer-events-none absolute top-2 right-2 z-10 h-4 w-4 border bg-white shadow-sm" />
          <div className="border-ink/40 pointer-events-none absolute bottom-2 left-2 z-10 h-4 w-4 border bg-white shadow-sm" />
          <div className="border-ink/40 pointer-events-none absolute right-2 bottom-2 z-10 h-4 w-4 border bg-white shadow-sm" />
        </div>
      </section>

      {/* Middle Section: Professional Experience Timeline */}
      <section>
        <h2 className="font-pixel text-ink mb-8 flex items-center gap-3 text-xl font-bold sm:gap-4 sm:text-2xl">
          <span
            className="border-sketch border-ink shadow-[1px_1px_0_0_#2A2A2A] inline-block h-6 w-6 shrink-0 bg-[#556B2F] sm:h-8 sm:w-8"
            aria-hidden="true"
          />
          <span>Professional Experience</span>
        </h2>

        <div className="border-ink ml-3 space-y-8 border-l-4 border-dashed pl-6 sm:ml-4 sm:pl-8">
          {experienceEntries.map((entry, index) => (
            <div key={index} className="relative">
              {/* Timeline Circular Dot */}
              <div
                className="bg-cream border-sketch border-ink absolute -left-[37px] top-0 h-6 w-6 rounded-full sm:-left-[45px]"
                aria-hidden="true"
              />

              {/* Timeline Card */}
              <div className="border-sketch border-ink shadow-[4px_4px_0_0_#2A2A2A] bg-white p-5 transition-transform hover:translate-x-1 sm:p-6">
                <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
                  <h3 className="font-pixel text-ink text-base font-bold sm:text-lg md:text-xl">
                    {entry.role}
                  </h3>
                  <span className="text-blue bg-ink/5 mt-2 self-start px-2 py-1 font-mono text-xs font-bold whitespace-nowrap md:mt-0 md:ml-4 md:self-auto sm:text-sm">
                    {entry.dates}
                  </span>
                </div>
                <h4 className="text-coral mb-3 font-mono text-base font-bold sm:text-lg">
                  {entry.company}
                </h4>
                <p className="text-ink font-mono text-xs leading-relaxed sm:text-sm">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Section: Technical Expertise Tag Grid */}
      <section className="relative">
        <h2 className="font-pixel text-ink mb-8 flex items-center gap-3 text-xl font-bold sm:gap-4 sm:text-2xl">
          <span
            className="border-sketch border-ink shadow-[1px_1px_0_0_#2A2A2A] bg-blue inline-block h-6 w-6 shrink-0 sm:h-8 sm:w-8"
            aria-hidden="true"
          />
          <span>Technical Expertise</span>
        </h2>

        <div className="flex flex-wrap gap-3 sm:gap-4">
          {technicalSkills.map((skill) => (
            <span
              key={skill}
              className="font-pixel text-ink border-sketch border-ink shadow-[2px_2px_0_0_#2A2A2A] hover:shadow-[4px_4px_0_0_#556B2F] cursor-pointer bg-white px-3.5 py-2 text-[10px] select-none transition-all hover:-translate-y-0.5 sm:px-4 sm:text-xs"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* 1 Sequential FoodPoint placed in page margin */}
        <FoodPoint
          id="about-food-1"
          order={1}
          color="sage"
          className="absolute -bottom-6 right-4 z-20"
        />
      </section>
    </div>
  );
}
