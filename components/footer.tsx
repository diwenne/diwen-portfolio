'use client';

import { Mail } from "lucide-react";
import { SiX, SiLinkedin, SiGithub, SiInstagram } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";

export function Footer() {
  return (
    <footer className="pb-16 sm:pb-24">
      <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />
      <div className="text-sm sm:text-base leading-tight">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div>◆ Contact:</div>
            <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-neutral-700 dark:text-neutral-300">
              <a className="inline-flex items-center gap-1" href="mailto:diwennee@gmail.com"><Mail size={14} /><span className="hover-underline-nudge">Email</span></a>
              <a className="inline-flex items-center gap-1" href="https://github.com/diwenne" target="_blank" rel="noreferrer"><SiGithub size={14} /><span className="hover-underline-nudge">GitHub</span></a>
              <a className="inline-flex items-center gap-1" href="https://x.com/diwennee" target="_blank" rel="noreferrer"><SiX size={14} /><span className="hover-underline-nudge">Twitter</span></a>
              <a className="inline-flex items-center gap-1" href="https://linkedin.com/in/diwenh5" target="_blank" rel="noreferrer"><SiLinkedin size={14} /><span className="hover-underline-nudge">LinkedIn</span></a>
              <a className="inline-flex items-center gap-1" href="https://instagram.com/devdiwen" target="_blank" rel="noreferrer"><SiInstagram size={14} /><span className="hover-underline-nudge">Instagram</span></a>
            </div>
          </div>
          <div className="sm:ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
