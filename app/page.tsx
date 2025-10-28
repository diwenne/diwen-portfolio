'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Instagram } from "lucide-react";
import { SiX, SiLinkedin } from "react-icons/si";
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
            </div>
          </div>
          <div>↳ IB Student @ <span className="font-bold slight-italic">Port Moody Secondary</span></div>
          <div>↳ Aspiring <span className="font-bold slight-italic">CS + AI</span> major based in Vancouver</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* What I'm Working On */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Currently working on:</div>
          <div>↳ Founding Engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/solace.png" alt="Solace" /><Label><a href="https://solacelaunch.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Solace</a></Label></span>, a <span className="font-bold slight-italic">UC Berkeley Web3 startup</span> backed by Virtuals Protocol.</div>
          <div className="ml-4">↳ Building an AI wellness agent using <span className="font-bold slight-italic">React Native</span> and <span className="font-bold slight-italic">TypeScript</span>.</div>
          <div>↳ President of <span className="inline-flex items-center align-middle gap-1"><Logo src="/stemsphere.png" alt="Stemsphere" /><Label><a href="https://stemsf.org" target="_blank" rel="noreferrer" className="hover-underline-nudge">Stemsphere Foundation</a></Label></span>, a non-profit providing STEM education and mentorship.</div>
          <div className="ml-4">↳ Leading a team of <span className="font-bold slight-italic">8 executive directors</span> to empower the next generation of innovators.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Highlights */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Notable projects:</div>
          <div>↳ Built <span className="inline-flex items-center align-middle gap-1"><Logo src="/smashspeed.png" alt="Smashspeed" /><Label><a href="https://smashspeed.ca" target="_blank" rel="noreferrer" className="hover-underline-nudge">Smashspeed</a></Label></span>, an iOS app with <span className="font-bold slight-italic">35,000+ users</span> and <span className="font-bold slight-italic">#1 ranking</span> in App Store (Sports).</div>
          <div className="ml-4">↳ Achieved <span className="font-bold slight-italic">~5 million views</span> online through viral content.</div>
          <div className="ml-4">↳ Built custom ML pipeline based on <span className="font-bold slight-italic">published research</span> on arXiv.</div>
          <div>↳ Published original research on <span className="inline-flex items-center align-middle gap-1"><Logo src="/arxiv.png" alt="arXiv" /><Label><a href="https://www.arxiv.org/abs/2509.05334" target="_blank" rel="noreferrer" className="hover-underline-nudge">arXiv</a></Label></span> in computer vision and multimedia.</div>
          <div>↳ Authored <span className="font-bold slight-italic">Amazon #1 Best Seller</span> textbooks on programming (<span className="font-bold slight-italic">Swift Faststart</span> and <span className="font-bold slight-italic">Python Faststart</span>).</div>
          <div>↳ Won <span className="font-bold slight-italic">1st place</span> at Daydream Game Jam 2025 (BC's biggest youth hackathon) out of <span className="font-bold slight-italic">124 participants</span>.</div>
          <div className="ml-4">↳ Built a hands-free game using real-time facial landmark detection.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Background */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Background:</div>
          <div>↳ <span className="font-bold slight-italic">NCCP Level 2 Certified</span> Badminton Coach at Enhanced Badminton.</div>
          <div>↳ Skilled in <span className="font-bold slight-italic">Swift</span>, <span className="font-bold slight-italic">Python</span>, <span className="font-bold slight-italic">TypeScript</span>, <span className="font-bold slight-italic">React Native</span>, <span className="font-bold slight-italic">Next.js</span>, and <span className="font-bold slight-italic">Machine Learning</span>.</div>
          <div>↳ Experienced in <span className="font-bold slight-italic">iOS/Android development</span>, <span className="font-bold slight-italic">web design</span>, and <span className="font-bold slight-italic">product leadership</span>.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Reach out */}
        <div className="text-sm sm:text-[0.95rem] leading-tight space-y-2">
          <div>◆ Please reach out if you're:</div>
          <div>↳ Interested in collaborating on a project.</div>
          <div>↳ Looking for help with iOS/Android development or ML.</div>
          <div>↳ Someone who is curious about my work.</div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Contact */}
        <div className="text-sm sm:text-[0.95rem] leading-tight">
          <div className="pt-4" />
          <footer className="pb-16 sm:pb-24">
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-3">
                <div>◆ Contact:</div>
                <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
                  <a className="inline-flex items-center gap-1" href="mailto:diwennee@gmail.com"><Mail size={14} /><span className="hover-underline-nudge">Email</span></a>
                  <a className="inline-flex items-center gap-1" href="https://github.com/diwenne" target="_blank" rel="noreferrer"><Github size={14} /><span className="hover-underline-nudge">GitHub</span></a>
                  <a className="inline-flex items-center gap-1" href="https://x.com/diwennee" target="_blank" rel="noreferrer"><SiX size={14} /><span className="hover-underline-nudge">Twitter</span></a>
                  <a className="inline-flex items-center gap-1" href="https://linkedin.com/in/diwenh5" target="_blank" rel="noreferrer"><SiLinkedin size={14} /><span className="hover-underline-nudge">LinkedIn</span></a>
                  <a className="inline-flex items-center gap-1" href="https://instagram.com/devdiwen" target="_blank" rel="noreferrer"><Instagram size={14} /><span className="hover-underline-nudge">Instagram</span></a>
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
