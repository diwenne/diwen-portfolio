'use client';

import Image from "next/image";
import Link from "next/link";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { Footer } from "@/components/footer";

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
        <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Diwen Huang</h1>
            <div className="flex items-center gap-2 font-extralight">
              <Link href="/work" className={`hover-underline-nudge ${shouldBounce('work') ? 'nav-bounce' : ''}`}>Work</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <Link href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce-delayed' : ''}`}>Projects</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`hover-underline-nudge ${shouldBounce('resume') ? 'nav-bounce-delayed' : ''}`}>Resume</a>
            </div>
          </div>
          <div>↳ Founding Engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/solace.png" alt="Solace" /><Label><a href="https://solacelaunch.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Solace</a></Label></span> (<span className="font-bold slight-italic">UC Berkeley Web3 startup</span>)</div>
          <div>↳ IB Student @ <span className="font-bold slight-italic">Port Moody Secondary</span></div>
          <div>↳ Aspiring <span className="font-bold slight-italic">CS + AI</span> major based in Vancouver</div>
        </div>

        <div className="my-4 border-t border-neutral-200 dark:border-neutral-700" />

        {/* What I've Built */}
        <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-3">
          <div>◆ What I've built:</div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/smashspeed.png" alt="Smashspeed" /><Label><a href="https://smashspeed.ca" target="_blank" rel="noreferrer" className="hover-underline-nudge">Smashspeed</a></Label></span> — <span className="font-bold slight-italic">35,000+ users, #1 App Store Taiwan, #2 Vietnam, 5M+ views in 2 months as a tenth grader</span></div>
          <div>↳ Real-time gaze tracking system for <span className="inline-flex items-center align-middle gap-1"><Logo src="/cluely.jpg" alt="Cluely" /><Label><a href="https://cluely.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Cluely</a></Label></span></div>
          <div>↳ Shuttlecock tracking <span className="inline-flex items-center align-middle gap-1"><Logo src="/arxiv.png" alt="arXiv" /><Label><a href="https://www.arxiv.org/abs/2509.05334" target="_blank" rel="noreferrer" className="hover-underline-nudge">research on arXiv</a></Label></span> — mentored by <span className="font-bold slight-italic">Stanford CS PhD, UPenn Data Science MEng</span></div>
          <div>↳ Hands-free game using tongue detection — <span className="font-bold slight-italic">won hackathon, 200K+ LinkedIn impressions</span></div>
          <div>↳ <span className="font-bold slight-italic">Amazon #1 Best Seller</span> in App Development (Swift Faststart textbook)</div>
        </div>

        <div className="my-4 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Stats */}
        <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-3">
          <div>◆ Stats:</div>
          <div>↳ <span className="font-bold slight-italic">4.0 GPA (97.1%), Rank 2/300, SAT 1540 (800M/740E)</span></div>
          <div>↳ ML Specialization, Google UX Design, Imperial College Mathematics</div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
