import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui";

interface TalkItem {
  image: string;
  date: string;
  title: string;
  typeLabel: string;
  tags: string[];
  imagePosition: string;
}

const talksData: TalkItem[] = [
  {
    image: "/images/talks/ai-workshop.png",
    date: "August 16, 2026",
    title: "AI Using Prompt Engineering & Loop Engineering",
    typeLabel: "AI Workshop",
    tags: ["AI", "Prompt Engineering"],
    imagePosition: "object-[center_54%]",
  },
  {
    image: "/images/talks/druggpt-presentation.png",
    date: "March 13, 2026",
    title: "DrugGPT: A Multimodal & Multi-Intent-Aware RAG Framework",
    typeLabel: "Paper Presentation",
    tags: ["AI", "Research"],
    imagePosition: "object-[50%_15%]",
  },
];

export default function TalksPage() {
  return (
    <div className="relative space-y-12 py-6 sm:py-8 md:space-y-16 md:py-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-pixel text-ink text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          TALKS &amp; WORKSHOPS
        </h1>
        <p className="text-ink font-mono text-base sm:text-lg leading-relaxed">
          I love sharing knowledge and connecting with fellow developers! Whether
          it&apos;s tech talks, workshops, or just geeking out about code-I&apos;m
          always down to chat. Got an event or just want to talk about anything
          tech?{" "}
          <Link
            href="/contact"
            className="font-bold text-blue hover:underline decoration-2 underline-offset-4"
          >
            Hit me up!
          </Link>
        </p>
      </div>

      {/* Talks Grid: Responsive 2-Card Grid Centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {talksData.map((talk, index) => (
          <Card
            key={index}
            hasTape
            className="group flex flex-col justify-between p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#6495ED]"
          >
            {/* Top portion: Image + Date + Title */}
            <div>
              {/* Thumbnail Container - static, no video play overlay, no link */}
              <div className="relative aspect-video w-full mb-4 border-2 border-ink overflow-hidden bg-cream/40 group-hover:border-blue transition-colors">
                <Image
                  src={talk.image}
                  alt={talk.title}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${talk.imagePosition}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </div>

              {/* Date with Calendar Icon */}
              <div className="flex items-center gap-2 text-xs font-mono text-ink/70 mb-2">
                <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{talk.date}</span>
              </div>

              {/* Title (can wrap lines cleanly) */}
              <h2
                className="font-pixel text-ink text-xs sm:text-[13px] md:text-sm font-bold leading-relaxed line-clamp-3"
                title={talk.title}
              >
                {talk.title}
              </h2>
            </div>

            {/* Bottom portion: Dashed divider + Type label + Tag chips */}
            <div className="mt-6 border-t-2 border-dashed border-ink/20 pt-4">
              {/* Type / Category Label */}
              <div className="text-[10px] sm:text-[11px] font-pixel font-bold uppercase tracking-wider text-ink/60 mb-3">
                {talk.typeLabel}
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2">
                {talk.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-pixel text-ink bg-cream border border-ink px-2 py-1 shadow-[2px_2px_0_0_#2A2A2A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
