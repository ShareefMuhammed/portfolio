"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  name: string;
  href: string;
}

const leftLinks: NavLinkItem[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
];

const rightLinks: NavLinkItem[] = [
  { name: "HIGHLIGHTS", href: "/highlights" },
  { name: "TALKS", href: "/talks" },
  { name: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full relative z-40 select-none">
      {/* Top viewport solid line */}
      <div className="w-full border-t border-ink" />

      {/* Nav Container */}
      <div className="w-full max-w-4xl mx-auto px-4 pt-3 pb-2">
        <div className="relative w-full h-[54px] sm:h-[58px]">
          {/* Layered Paper SVG Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 800 68"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Back Paper Layer (Parchment/under-paper)
                - Left side: extends down to y=67 forming the classic sketch wedge
                - Bottom edge slants smoothly up from y=67 on left to y=58 on right
                - Right edge extends to x=798 from y=6 to y=58
                - Top-right peeks out above front paper from x=520 to x=798, up to y=6 */}
            <path
              d="M 1 50 L 1 67 L 798 58 L 798 6 L 520 9 L 520 12 L 1 50 Z"
              fill="#ECE5D6"
              stroke="#2A2A2A"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Front White Paper Layer
                - Top line slants gently from y=9 at left to y=13 at right
                - Right edge ends at x=790 (revealing the under-paper on the right)
                - Bottom line slants from y=50 at left to y=56 at right */}
            <path
              d="M 1 9 L 790 13 L 790 56 L 1 50 Z"
              fill="#FFFFFF"
              stroke="#2A2A2A"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Subtle Ruled Notebook Lines across the white paper */}
            <line
              x1="2"
              y1="23"
              x2="788"
              y2="27"
              stroke="#ECE7DE"
              strokeWidth="1"
            />
            <line
              x1="2"
              y1="36"
              x2="788"
              y2="40"
              stroke="#ECE7DE"
              strokeWidth="1"
            />
            <line
              x1="2"
              y1="48"
              x2="788"
              y2="52"
              stroke="#F0ECE4"
              strokeWidth="1"
            />
          </svg>

          {/* Center Clipboard/Briefcase Tab */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 -top-2.5 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_4px_3px_rgba(42,42,42,0.4)]"
          >
            <svg
              width="48"
              height="38"
              viewBox="0 0 48 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="clipBodyGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#9E9E9E" />
                  <stop offset="100%" stopColor="#6C6C6C" />
                </linearGradient>
                <linearGradient
                  id="clipHandleGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#8A8A8A" />
                  <stop offset="100%" stopColor="#606060" />
                </linearGradient>
              </defs>

              {/* Top Curved Handle Loop */}
              <path
                d="M 12 9 C 12 2 36 2 36 9 Z"
                fill="url(#clipHandleGradient)"
                stroke="#2A2A2A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Main Clip Clamp Body */}
              <rect
                x="1"
                y="8"
                width="46"
                height="28"
                rx="1"
                fill="url(#clipBodyGradient)"
                stroke="#2A2A2A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Center Rivet Outer Ring & Hole */}
              <circle
                cx="24"
                cy="22"
                r="4.5"
                fill="#424242"
                stroke="#2A2A2A"
                strokeWidth="1.5"
              />
              <circle cx="24" cy="22" r="2" fill="#202020" />
            </svg>
          </div>

          {/* Nav Links overlaid across the front paper */}
          <nav
            aria-label="Main Navigation"
            className="relative z-20 w-full h-full flex items-center justify-between px-4 sm:px-7 md:px-9 pt-1.5"
          >
            {/* Left Nav Group: HOME, ABOUT, PROJECTS */}
            <div className="flex items-center justify-between flex-1 pr-6 sm:pr-8 md:pr-10">
              {leftLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-pixel text-[9px] sm:text-[10px] md:text-[11px] tracking-wider transition-colors duration-150 py-1",
                      active
                        ? "text-[#4D88FF] font-bold"
                        : "text-ink hover:text-[#4D88FF]"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Empty Center Spacer for Clip */}
            <div className="w-12 sm:w-16 shrink-0" aria-hidden="true" />

            {/* Right Nav Group: HIGHLIGHTS, TALKS, CONTACT */}
            <div className="flex items-center justify-between flex-1 pl-6 sm:pl-8 md:pl-10">
              {rightLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-pixel text-[9px] sm:text-[10px] md:text-[11px] tracking-wider transition-colors duration-150 py-1",
                      active
                        ? "text-[#4D88FF] font-bold"
                        : "text-ink hover:text-[#4D88FF]"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
