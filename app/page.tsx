'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SiX, SiLinkedin, SiGithub, SiInstagram } from "react-icons/si";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { ThemeToggle } from "@/components/theme-toggle";

function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[18px] w-[18px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="relative -top-[1px] leading-none align-middle">{children}</span>
);

export default function Home() {
  const { shouldBounce } = useNavigationBounce('home');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Diwen Huang</h1>
            <div className="flex items-center gap-2 font-extralight">
              <Link href="/work" className={`hover-underline-nudge ${shouldBounce('work') ? 'nav-bounce' : ''}`}>Work</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <Link href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce-delayed' : ''}`}>Projects</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hover-underline-nudge">Resume</a>
            </div>
          </div>
          <div>↳ IB Student @ <span className="font-bold slight-italic">Port Moody Secondary</span></div>
          <div>↳ Aspiring <span className="font-bold slight-italic">CS + AI</span> major based in Vancouver</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* What I'm Working On */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Currently:</div>
          <div>↳ Founding Engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/solace.png" alt="Solace" /><Label><a href="https://solacelaunch.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Solace</a></Label></span> (UC Berkeley Web3 startup) building mobile app with <span className="font-bold slight-italic">React Native</span>.</div>
          <div>↳ Leading <span className="inline-flex items-center align-middle gap-1"><Logo src="/smashspeed.png" alt="Smashspeed" /><Label><a href="https://smashspeed.ca" target="_blank" rel="noreferrer" className="hover-underline-nudge">Smashspeed AI</a></Label></span> — <span className="font-bold slight-italic">35,000+ users, #1 Taiwan App Store, #2 Vietnam, #4 Google Play</span> (Sports).</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Highlights */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Highlights:</div>
          <div>↳ Built real-time computer vision pipeline for Smashspeed using <span className="font-bold slight-italic">YOLOv5, CoreML, Kalman filtering</span> — <span className="font-bold slight-italic">93% accuracy</span> on <span className="font-bold slight-italic">15K+ images</span>.</div>
          <div>↳ Published research on <span className="inline-flex items-center align-middle gap-1"><Logo src="/arxiv.png" alt="arXiv" /><Label><a href="https://www.arxiv.org/abs/2509.05334" target="_blank" rel="noreferrer" className="hover-underline-nudge">arXiv</a></Label></span> on shuttlecock tracking; mentored by <span className="font-bold slight-italic">Stanford PhD (CS)</span> and <span className="font-bold slight-italic">UPenn MEng</span>.</div>
          <div>↳ Won <span className="font-bold slight-italic">1st place</span> at Daydream Game Jam (BC's largest youth hackathon) with hands-free game using tongue detection; <span className="font-bold slight-italic">200K+ LinkedIn impressions</span>.</div>
          <div>↳ Authored <span className="font-bold slight-italic">Swift FastStart</span> (Amazon #1 Best Seller, App Development) and <span className="font-bold slight-italic">Python FastStart</span>.</div>
          <div>↳ Freelance web design at <span className="font-bold slight-italic"><a href="https://diwen.dev" target="_blank" rel="noopener noreferrer" className="hover-underline-nudge">diwen.dev</a></span> — building client websites with React, Next.js, Tailwind CSS.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Background */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Background:</div>
          <div>↳ <span className="font-bold slight-italic">4.0 GPA (97.1%), Rank 2/300</span> • <span className="font-bold slight-italic">SAT 1540</span> • <span className="font-bold slight-italic">IB student, 4 HL courses</span>.</div>
          <div>↳ <span className="font-bold slight-italic">Python, Swift, TypeScript, React Native, Next.js, PyTorch, YOLOv5, CoreML</span>.</div>
          <div>↳ Deep Learning Specialization, Google UX Design, Linear Algebra & Calculus (Imperial College).</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Reach out */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Open to:</div>
          <div>↳ Collaborations, internships, and interesting conversations.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Contact */}
        <div className="text-sm sm:text-[0.95rem] leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
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
              <ThemeToggle />
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
