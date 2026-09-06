"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLinkItem {
  name: string;
  href: string;
}

const allLinks: NavLinkItem[] = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "PROJECTS", href: "/projects" },
  { name: "HIGHLIGHTS", href: "/highlights" },
  { name: "TALKS", href: "/talks" },
  { name: "CONTACT", href: "/contact" },
];

const leftLinks = allLinks.slice(0, 3);
const rightLinks = allLinks.slice(3);

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const currentPageItem = allLinks.find((link) => isLinkActive(link.href));
  const currentPageName = currentPageItem?.name ?? "HOME";

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle Escape key and outside clicks
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="pointer-events-none sticky top-0 left-0 z-50 w-full pt-1">
      <div className="pointer-events-auto relative mx-auto max-w-5xl">
        {/* The "Clip" - Centered (Scaled slightly on mobile so it doesn't dominate) */}
        <div className="navbar-clip group pointer-events-auto absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 scale-90 sm:scale-100 cursor-pointer flex-col items-center transition-transform">
          <div
            className="navbar-clip-body relative z-10 transition-all duration-400 ease-out group-hover:[transform:perspective(1000px)_rotateX(45deg)] group-hover:shadow-[0_30px_40px_-10px_rgba(0,0,0,0.4)]"
            style={{ transformOrigin: "top" }}
          >
            {/* Main clip shape */}
            <div className="border-ink relative flex h-9 w-16 sm:h-10 sm:w-20 items-center justify-center border-2 bg-gradient-to-b from-[#a8a8a8] to-[#808080] shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
              {/* Top handle bump */}
              <div className="border-ink absolute -top-1.5 left-1/2 h-4 w-9 sm:w-10 -translate-x-1/2 rounded-t-lg border-2 border-b-0 bg-gradient-to-b from-[#a8a8a8] to-[#808080]" />
              {/* Transparent hole */}
              <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#1a1a1a] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
        </div>

        {/* The "Paper" - Navigation Strip */}
        <div className="relative mx-2 mt-4 md:mx-4 lg:mx-8">
          <div className="border-ink relative rotate-[0.5deg] transform border-2 bg-surface shadow-[0_8px_16px_-4px_rgba(0,0,0,0.1)]">
            {/* Paper Texture/Lines */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,transparent_19px,#000_20px)] bg-[size:100%_20px] opacity-10" />

            <div className="flex min-h-[52px] sm:min-h-[60px] items-center justify-between px-3 py-2.5 sm:px-4 sm:py-4 md:px-4 md:py-5 lg:px-6">
              {/* Desktop Navigation Links (>= md) */}
              <div className="hidden md:flex w-full items-center justify-between">
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

              {/* Mobile Navigation Header (< md) */}
              <div className="flex md:hidden w-full items-center justify-between">
                {/* Left: Current Page / Home Link */}
                <Link
                  href="/"
                  className="font-pixel text-ink hover:text-blue text-[10px] sm:text-xs font-bold tracking-wider transition-colors"
                >
                  {currentPageName}
                </Link>

                {/* Center Spacer for Clip */}
                <div className="w-16 shrink-0" />

                {/* Right: Hamburger Toggle Button */}
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                  className="border-sketch border-ink bg-surface shadow-sketch-xs hover:shadow-sketch-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex h-9 w-9 items-center justify-center p-1.5 transition-all cursor-pointer select-none"
                >
                  {isOpen ? (
                    <X className="h-5 w-5 text-ink" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5 text-ink" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Second sheet of paper behind for depth: -rotate-[1deg] translate-y-1 */}
          <div className="border-ink absolute inset-0 -z-10 translate-y-1 -rotate-[1deg] transform border-2 bg-cream" />

          {/* Mobile Dropdown Panel (< md) */}
          {isOpen && (
            <div
              ref={menuRef}
              className="pointer-events-auto relative mt-3 md:hidden"
            >
              <div className="border-sketch border-ink bg-surface shadow-sketch-xl relative p-5 transition-all">
                {/* Torn-paper tape at top of dropdown */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-24 -translate-x-1/2 rotate-[-1.5deg] border border-ink/40 bg-cream/90 shadow-sm"
                />

                {/* Corner bracket accents inside mobile menu */}
                <span className="border-t-2 border-l-2 border-ink pointer-events-none absolute top-2 left-2 h-3.5 w-3.5" />
                <span className="border-t-2 border-r-2 border-ink pointer-events-none absolute top-2 right-2 h-3.5 w-3.5" />
                <span className="border-b-2 border-l-2 border-ink pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5" />
                <span className="border-b-2 border-r-2 border-ink pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5" />

                {/* Menu list */}
                <ul className="flex flex-col divide-y-2 divide-dashed divide-ink/15">
                  {allLinks.map((link) => {
                    const active = isLinkActive(link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "font-pixel flex items-center justify-between py-3 px-2 text-xs tracking-wider transition-colors",
                            active
                              ? "text-blue font-bold bg-blue/10 border-l-4 border-blue pl-3"
                              : "text-ink hover:text-blue hover:bg-cream/40"
                          )}
                        >
                          <span>{link.name}</span>
                          {active && (
                            <span className="text-blue font-mono text-[10px] font-bold">
                              ● ACTIVE
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
