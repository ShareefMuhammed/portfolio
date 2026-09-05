import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { CornerBracketCard } from "@/components/ui";

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
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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

export default function ContactPage() {
  return (
    <div className="relative space-y-8 py-6 sm:py-8 md:space-y-12 md:py-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="font-pixel text-ink text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          GET IN TOUCH
        </h1>
      </div>

      {/* Main Contact Container */}
      <div className="max-w-3xl w-full mx-auto">
        <CornerBracketCard
          hasTape
          insetBrackets
          className="p-6 md:p-10 shadow-sketch-xl text-center"
        >
          {/* Intro Paragraph */}
          <p className="text-ink font-mono text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;m always open
            to discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </p>

          {/* Email and Location Rows */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8 md:mb-10 font-mono">
            {/* Email Row */}
            <a
              href="mailto:shareef2003p@gmail.com"
              className="flex items-center gap-3 sm:gap-4 text-ink group hover:text-blue transition-colors"
            >
              <div className="p-3 bg-surface border-2 border-ink shadow-sketch-md group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_0_var(--color-blue)] transition-all">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
              </div>
              <span className="text-base sm:text-lg font-bold break-all">
                shareef2003p@gmail.com
              </span>
            </a>

            {/* Location Row */}
            <div className="flex items-center gap-3 sm:gap-4 text-ink">
              <div className="p-3 bg-surface border-2 border-ink shadow-sketch-md">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
              </div>
              <span className="text-base sm:text-lg font-bold">
                Kerala, India
              </span>
            </div>
          </div>

          {/* CTA Button: Phone Link */}
          <div className="flex justify-center mb-8 md:mb-10">
            <a
              href="tel:+919567209599"
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 px-5 py-3 md:px-6 md:py-3.5 bg-olive text-white border-2 border-ink shadow-sketch-md hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-olive)] active:translate-y-0 active:shadow-sketch-tag transition-all font-pixel text-xs sm:text-sm md:text-base tracking-wide"
            >
              <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>+91 95672 09599</span>
            </a>
          </div>

          {/* Dashed Divider */}
          <div className="border-t-2 border-dashed border-ink/20 pt-8">
            {/* Connect With Me Angled Label */}
            <div className="inline-block bg-ink text-cream px-3 py-1 font-pixel text-xs mb-6 transform -rotate-2 select-none shadow-sketch-tag">
              CONNECT WITH ME
            </div>

            {/* Social Icons (Only LinkedIn and GitHub) */}
            <div className="flex justify-center items-center gap-8">
              <a
                href="https://www.linkedin.com/in/muhammedshareef-p"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-all hover:scale-125 hover:-rotate-6 hover:text-blue cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-8 h-8" />
              </a>

              <a
                href="https://github.com/ShareefMuhammed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-all hover:scale-125 hover:rotate-6 hover:text-blue cursor-pointer"
                aria-label="GitHub"
              >
                <GithubIcon className="w-8 h-8" />
              </a>
            </div>
          </div>
        </CornerBracketCard>
      </div>
    </div>
  );
}
