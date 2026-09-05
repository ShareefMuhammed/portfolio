import React from "react";
import { Navbar } from "./Navbar";

export interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="bg-cream text-ink selection:bg-yellow selection:text-ink flex min-h-screen flex-col font-mono">
      {/* Global Nav Bar */}
      <Navbar />

      {/* Main Content Container with consistent max-width, padding, and vertical rhythm */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 md:px-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
