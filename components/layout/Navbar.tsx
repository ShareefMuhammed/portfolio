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
    <nav className="pointer-events-none sticky top-0 left-0 z-50 w-full pt-1">
      <div className="pointer-events-auto relative mx-auto max-w-5xl">
        {/* The "Clip" - Centered */}
        <div className="navbar-clip group pointer-events-auto absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center">
          <div
            className="navbar-clip-body relative z-10 transition-all duration-400 ease-out group-hover:[transform:perspective(1000px)_rotateX(45deg)] group-hover:shadow-[0_30px_40px_-10px_rgba(0,0,0,0.4)]"
            style={{ transformOrigin: "top" }}
          >
            {/* Main clip shape */}
            <div className="border-ink relative flex h-10 w-20 items-center justify-center border-2 bg-gradient-to-b from-[#a8a8a8] to-[#808080] shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
              {/* Top handle bump */}
              <div className="border-ink absolute -top-1.5 left-1/2 h-4 w-10 -translate-x-1/2 rounded-t-lg border-2 border-b-0 bg-gradient-to-b from-[#a8a8a8] to-[#808080]" />
              {/* Transparent hole */}
              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1a1a1a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>

        {/* The "Paper" - Navigation Strip */}
        <div className="relative mx-2 mt-4 md:mx-4 lg:mx-8">
          <div className="border-ink relative rotate-[0.5deg] transform border-2 bg-white shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)]">
            {/* Paper Texture/Lines */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_19px,#000_20px)] bg-[size:100%_20px] opacity-10" />

            <div className="flex min-h-[60px] items-center justify-between px-3 py-4 md:px-4 md:py-5 lg:px-6">
              {/* Navigation Links */}
              <div className="flex w-full items-center justify-between">
                {/* Left Side: Exactly 3 links (HOME, ABOUT, PROJECTS) */}
                <ul className="flex flex-1 justify-end gap-2 pr-2 md:gap-4 md:pr-4 lg:gap-8 lg:pr-10">
                  {leftLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <li key={link.href} className="relative z-10">
                        <Link
                          href={link.href}
                          className={cn(
                            "font-pixel group relative text-[9px] tracking-wide whitespace-nowrap transition-all md:text-[10px] lg:text-xs",
                            active
                              ? "text-blue font-bold"
                              : "text-ink hover:text-blue"
                          )}
                        >
                          {link.name}
                          <span
                            className={cn(
                              "bg-blue/20 absolute -bottom-1 left-0 -z-10 h-2 w-full transition-all duration-300",
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
                <div className="w-14 shrink-0 md:w-16 lg:w-24" />

                {/* Right Side: Exactly 3 links (HIGHLIGHTS, TALKS, CONTACT) */}
                <ul className="flex flex-1 justify-start gap-2 pl-2 md:gap-4 md:pl-4 lg:gap-8 lg:pl-10">
                  {rightLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <li key={link.href} className="relative z-10">
                        <Link
                          href={link.href}
                          className={cn(
                            "font-pixel group relative text-[9px] tracking-wide whitespace-nowrap transition-all md:text-[10px] lg:text-xs",
                            active
                              ? "text-blue font-bold"
                              : "text-ink hover:text-blue"
                          )}
                        >
                          {link.name}
                          <span
                            className={cn(
                              "bg-blue/20 absolute -bottom-1 left-0 -z-10 h-2 w-full transition-all duration-300",
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
          <div className="border-ink absolute inset-0 -z-10 translate-y-1 -rotate-[1deg] transform border-2 bg-[#F6EEE3]" />
        </div>
      </div>
    </nav>
  );
}
