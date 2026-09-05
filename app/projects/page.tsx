"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { DecoSquare, Card, Tag } from "@/components/ui";
import { FoodPoint } from "@/components/snake";

function GithubIcon({ className }: { className?: string }) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectItem {
  title: string;
  githubUrl?: string;
  liveUrl?: string;
  description: string;
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    title: "ContextForge CLI",
    githubUrl: "https://github.com/ShareefMuhammed/contextforge",
    liveUrl: "https://www.npmjs.com/package/@shareefmuhammed/contextforge",
    description:
      "Open-source CLI tool that scaffolds structured AI context files (AGENTS.md, architecture.md, coding-guidelines.md) for AI coding assistants like Claude Code, Cursor, and GitHub Copilot. Built with a modular, extensible Node.js architecture supporting multiple AI assistant ecosystems, reducing onboarding time and improving context consistency across AI-assisted workflows.",
    tags: ["Node.js", "CLI", "npm", "Open Source"],
  },
  {
    title: "DrugGPT",
    githubUrl: "https://github.com/ShareefMuhammed/DrugGPT",
    description:
      "Multimodal RAG-based drug information system built with FAISS, OCR, and LLMs. Uses intent-aware semantic retrieval with FAISS vector databases and E5 embeddings to improve query accuracy and reduce hallucinations, plus OCR-based medicine label recognition for image queries. Presented at the IEEE Student Paper Contest 2026.",
    tags: ["RAG", "FAISS", "OCR", "LLMs"],
  },
  {
    title: "Uber Ride-Hailing Analysis",
    description:
      "Interactive Power BI dashboard analyzing 93K completed rides, 57K lost bookings, and INR 51.85M total revenue. DAX measures validate KPIs including revenue, completed bookings, and averages, surfacing metrics like 2.51M km total distance, 24.64 km average ride distance, and a 4.40 average customer rating.",
    tags: ["Power BI", "DAX", "Data Analytics"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative space-y-12 py-6 sm:py-8 md:space-y-16 md:py-12">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <DecoSquare color="blue" size={14} />
          <DecoSquare color="coral" size={14} />
          <DecoSquare color="olive" size={14} />
        </div>

        <h1 className="font-pixel text-ink text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          FEATURED PROJECTS
        </h1>

        <p className="text-ink/80 max-w-2xl font-mono text-sm leading-relaxed sm:text-base">
          A showcase of open-source CLI tools, multimodal AI systems, and
          interactive analytics dashboards built by Muhammed Shareef.
        </p>
      </div>

      {/* Projects Grid: Responsive 3-Column Grid */}
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const hasIcons = Boolean(project.githubUrl || project.liveUrl);

          return (
            <Card
              key={index}
              hasTape
              className="group flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#6495ED]"
            >
              {/* Card Top: Title & Icon Links */}
              <div>
                <div className="mb-4 flex items-start justify-between gap-2 sm:gap-3">
                  <h2 className="font-pixel text-ink text-xs sm:text-sm font-bold leading-relaxed break-words min-w-0">
                    {project.title}
                  </h2>

                  {/* Icon-link row: only render when URLs exist */}
                  {hasIcons && (
                    <div className="flex shrink-0 items-center gap-2 pt-0.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${project.title} source on GitHub`}
                          className="text-ink hover:text-blue p-0.5 transition-colors"
                        >
                          <GithubIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${project.title} on npm`}
                          className="text-ink hover:text-blue p-0.5 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Description Paragraph */}
                <p className="text-ink/90 mb-6 font-mono text-xs sm:text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Bottom: Dashed Divider & Tag Chips */}
              <div className="border-ink/20 mt-auto flex flex-wrap gap-2 border-t-2 border-dashed pt-4">
                {project.tags.map((tag) => (
                  <Tag key={tag} variant="cream" className="font-pixel text-[10px]">
                    {tag}
                  </Tag>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* 1 FoodPoint placed sensibly in the page margin */}
      <div className="pointer-events-none absolute top-4 right-2 sm:right-6 lg:-right-8" aria-hidden="true">
        <FoodPoint id="projects-food-1" order={1} color="coral" size={14} />
      </div>
    </div>
  );
}
