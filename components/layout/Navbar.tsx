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
    <header className="relative z-40 w-full select-none">
      {/* Thin full-width ink line running along the very top of the viewport */}
      <div className="border-ink w-full border-t" />

      <div className="mx-auto max-w-4xl px-4 pt-3 pb-2">
        {/* Nav Bar Outer Container with layered sketch paper */}
        <div className="relative">
          {/* Layered Under-Paper: tilted/offset outline for hand-drawn double border effect */}
          <div
            aria-hidden="true"
            className="border-ink pointer-events-none absolute inset-0 -translate-x-1.5 translate-y-1 -rotate-[0.6deg] border-2 bg-[#F4EDE1]"
          />

          {/* Foreground White Paper Strip */}
          <nav
            aria-label="Main Navigation"
            className="bg-surface border-ink relative flex items-center justify-between border-2 px-4 py-3.5 sm:px-6 md:px-8"
          >
            {/* Faint notebook ruling lines inside paper */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex flex-col justify-evenly overflow-hidden px-2 opacity-20"
            >
              <div className="border-ink/40 w-full border-t border-dashed" />
              <div className="border-ink/30 w-full border-t" />
            </div>

            {/* Center Clipboard / Briefcase Tab Decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-3.5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center"
            >
              {/* Top rounded clip handle / arch */}
              <div className="border-ink -mb-[2px] h-3 w-6 rounded-t-md border-2 bg-[#787878]" />
              {/* Main clip body */}
              <div className="border-ink flex h-9 w-9 items-center justify-center border-2 bg-gradient-to-b from-[#8C8C8C] to-[#787878] shadow-[2px_3px_0_0_rgba(42,42,42,0.3)]">
                {/* Central circular rivet / hole */}
                <div className="border-ink h-2.5 w-2.5 rounded-full border-2 bg-[#525252]" />
              </div>
            </div>

            {/* Left Nav Group */}
            <div className="z-10 flex flex-1 items-center justify-between pr-6 sm:pr-8 md:pr-10">
              {leftLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-pixel py-1 text-[9px] tracking-wider transition-colors duration-150 sm:text-[10.5px] md:text-xs",
                      active
                        ? "text-blue font-bold"
                        : "text-ink hover:text-blue"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Empty Center Spacer for Clip */}
            <div className="w-10 shrink-0 sm:w-12" aria-hidden="true" />

            {/* Right Nav Group */}
            <div className="z-10 flex flex-1 items-center justify-between pl-6 sm:pl-8 md:pl-10">
              {rightLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-pixel py-1 text-[9px] tracking-wider transition-colors duration-150 sm:text-[10.5px] md:text-xs",
                      active
                        ? "text-blue font-bold"
                        : "text-ink hover:text-blue"
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
