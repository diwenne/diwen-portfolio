'use client';

import Image from "next/image";
import Link from "next/link";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { Footer } from "@/components/footer";

function Logo({ src, alt, size = 26, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
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
        className={`h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] object-contain align-middle ${className}`}
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
        <div className="text-sm sm:text-base leading-tight space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Diwen Huang, 16</h1>
            <div className="flex items-center gap-2 font-extralight">
              {/* <Link href="/work" className={`hover-underline-nudge ${shouldBounce('work') ? 'nav-bounce' : ''}`}>Work</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span> */}
              <Link href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce-delayed' : ''}`}>Projects</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <Link href="/writing" className={`hover-underline-nudge ${shouldBounce('writing') ? 'nav-bounce-delayed' : ''}`}>Writing</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`hover-underline-nudge ${shouldBounce('resume') ? 'nav-bounce-delayed-more' : ''}`}>Resume</a>
            </div>
          </div>

          <div>↳ Founding Engineer <span className="inline-flex items-center align-middle gap-1"><Logo src="/solace.png" alt="Solace" /><Label><a href="https://solacelaunch.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Solace</a></Label></span></div>
          <div className="ml-4">↳ backed by <span className="inline-flex items-center align-middle gap-1"><Logo src="/berkeley.png" alt="UC Berkeley" /><Label><a href="https://berkeley.edu" target="_blank" rel="noreferrer" className="hover-underline-nudge">UC Berkeley</a></Label></span> & <span className="inline-flex items-center align-middle gap-1"><Logo src="/virtuals.png" alt="Virtuals Protocol" /><Label><a href="https://virtuals.io" target="_blank" rel="noreferrer" className="hover-underline-nudge">Virtuals Protocol</a></Label></span></div>
        </div>

        <div className="my-3 border-t border-neutral-200 dark:border-neutral-700" />

        {/* What I've Built */}
        <div className="text-sm sm:text-base leading-tight space-y-3">
          <div>◆ What I've built:</div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/smashspeed.png" alt="Smashspeed" /><Label><a href="/projects/smashspeed-engine" className="hover-underline-nudge">Smashspeed</a></Label></span> — track badminton smash speed, <span className="font-bold slight-italic">45K+ users, 5M+ views, #1 App Store Taiwan</span></div>
          <div className="ml-4">↳ <span className="font-bold slight-italic">15K hand-annotated images → YOLOv5 93% accuracy</span></div>
          <div>↳ Real-time gaze tracking system for <span className="inline-flex items-center align-middle gap-1"><Logo src="/cluely.jpg" alt="Cluely" /><Label><a href="https://cluely.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Cluely</a></Label></span></div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/arxiv.png" alt="arXiv" /><Label><a href="https://www.arxiv.org/abs/2509.05334" target="_blank" rel="noreferrer" className="hover-underline-nudge">arXiv paper</a></Label></span> on shuttlecock tracking — <span className="font-bold slight-italic">Stanford/UPenn mentors</span></div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><Logo src="/steve.png" alt="Freakysaur" /><Label><a href="https://haocuii.itch.io/steve-the-freakysaur" target="_blank" rel="noreferrer" className="hover-underline-nudge">Freakysaur</a></Label></span> — hands-free game, <span className="font-bold slight-italic">won <span className="inline-flex items-center align-middle gap-1"><Logo src="/hackclub.png" alt="Daydream" /><Label><a href="https://daydream.hackclub.com" target="_blank" rel="noreferrer" className="hover-underline-nudge">Daydream</a></Label></span>, 250K+ impressions</span></div>
          <div>↳ <span className="inline-flex items-center align-middle gap-1"><span className="text-sm sm:text-base">📖</span><Label><a href="/projects/faststart-series" className="hover-underline-nudge">Programming books</a></Label></span> –– <span className="font-bold slight-italic">Amazon #1 Best Seller</span> in App Development</div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
