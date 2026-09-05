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
    <nav className="sticky top-0 left-0 w-full z-50 pointer-events-none pt-1">
      <div className="max-w-5xl mx-auto relative pointer-events-auto">
        {/* The "Clip" - Centered */}
        <div className="navbar-clip group absolute left-1/2 -translate-x-1/2 -top-3 z-20 flex flex-col items-center pointer-events-auto cursor-pointer">
          <div
            className="navbar-clip-body relative z-10 transition-all duration-400 ease-out group-hover:[transform:perspective(1000px)_rotateX(45deg)] group-hover:shadow-[0_30px_40px_-10px_rgba(0,0,0,0.4)]"
            style={{ transformOrigin: "top" }}
          >
            {/* Main clip shape */}
            <div className="relative w-20 h-10 bg-gradient-to-b from-[#a8a8a8] to-[#808080] border-2 border-ink shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] flex items-center justify-center">
              {/* Top handle bump */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-gradient-to-b from-[#a8a8a8] to-[#808080] rounded-t-lg border-2 border-ink border-b-0" />
              {/* Transparent hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#1a1a1a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>

        {/* The "Paper" - Navigation Strip */}
        <div className="mx-2 mt-4 md:mx-4 lg:mx-8 relative">
          <div className="bg-white border-2 border-ink shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)] relative transform rotate-[0.5deg]">
            {/* Paper Texture/Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(0deg,transparent_19px,#000_20px)] bg-[size:100%_20px]" />

            <div className="px-3 py-4 md:px-4 lg:px-6 md:py-5 flex justify-between items-center min-h-[60px]">
              {/* Navigation Links */}
              <div className="flex w-full items-center justify-between">
                {/* Left Side: Exactly 3 links (HOME, ABOUT, PROJECTS) */}
                <ul className="flex-1 flex justify-end gap-2 md:gap-4 lg:gap-8 pr-2 md:pr-4 lg:pr-10">
                  {leftLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <li key={link.href} className="relative z-10">
                        <Link
                          href={link.href}
                          className={cn(
                            "font-pixel text-[9px] md:text-[10px] lg:text-xs tracking-wide transition-all relative group whitespace-nowrap",
                            active
                              ? "text-blue font-bold"
                              : "text-ink hover:text-blue"
                          )}
                        >
                          {link.name}
                          <span
                            className={cn(
                              "absolute -bottom-1 left-0 w-full h-2 bg-blue/20 -z-10 transition-all duration-300",
                              active
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Spacer for Clip */}
                <div className="w-14 md:w-16 lg:w-24 shrink-0" />

                {/* Right Side: Exactly 3 links (HIGHLIGHTS, TALKS, CONTACT) */}
                <ul className="flex-1 flex justify-start gap-2 md:gap-4 lg:gap-8 pl-2 md:pl-4 lg:pl-10">
                  {rightLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <li key={link.href} className="relative z-10">
                        <Link
                          href={link.href}
                          className={cn(
                            "font-pixel text-[9px] md:text-[10px] lg:text-xs tracking-wide transition-all relative group whitespace-nowrap",
                            active
                              ? "text-blue font-bold"
                              : "text-ink hover:text-blue"
                          )}
                        >
                          {link.name}
                          <span
                            className={cn(
                              "absolute -bottom-1 left-0 w-full h-2 bg-blue/20 -z-10 transition-all duration-300",
                              active
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Second sheet of paper behind for depth: -rotate-[1deg] translate-y-1 */}
          <div className="absolute inset-0 bg-[#F6EEE3] border-2 border-ink -z-10 transform -rotate-[1deg] translate-y-1" />
        </div>
      </div>
    </nav>
  );
}
