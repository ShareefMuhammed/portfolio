"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { SnakeProvider, Snake } from "@/components/snake";

export interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <SnakeProvider>
      <div className="bg-cream text-ink selection:bg-yellow selection:text-ink relative flex min-h-screen flex-col font-mono">
        {/* Ambient Autonomous Snake Layer */}
        <Snake />

        {/* Global Nav Bar */}
        <Navbar />

        {/* Main Content Container */}
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 md:px-8 md:py-12">
          {children}
        </main>
      </div>
    </SnakeProvider>
  );
}
