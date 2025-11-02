'use client';

import Link from 'next/link';
import ExpandableItem from '@/components/expandable-item';
import { Footer } from '@/components/footer';
import { useNavigationBounce } from '@/lib/useNavigationBounce';

const projectData = [
  {
    icon: '/cluely.jpg',
    title: 'Real-time Gaze Tracking System',
    subtitle: 'Pilot project for Cluely — Privacy-first webcam gaze estimation',
    link: 'https://cluely.com',
    date: 'October 2025',
    description: 'Built a lightweight, local-only gaze tracking prototype using standard webcam to infer eye/pupil position and head pose. The system classifies gaze direction (left/right/up/down/center) and emits continuous gaze vectors at 15–30 FPS. Features include swappable face/landmark detection, optional five-point calibration, temporal smoothing with confidence scores, and dual outputs: debug overlay with face/eye ROI visualization and programmatic stream (NDJSON console + optional WebSocket). Privacy-first architecture with no frame storage or network transmission, CPU-only performance with less than 100ms latency, and simple integration for immediate live gaze event streaming.',
    tags: ['Computer Vision', 'Gaze Tracking', 'Head Pose Estimation', 'Python', 'WebSocket', 'Privacy-First', 'Real-time Processing', 'Facial Landmarks']
  },
  {
    icon: '/steve.png',
    title: 'Steve the Freakysaur',
    subtitle: 'Daydream Game Jam 2025 — 1st Place Winner',
    link: 'https://haocuii.itch.io/steve-the-freakysaur',
    githubLink: 'https://github.com/diwenne/freakysaur_next',
    date: 'September 2025',
    description: 'Co-created "Steve the Freakysaur," a Chrome Dino–style game controlled entirely hands-free using tongue detection through real-time facial landmark segmentation. Built during BC\'s biggest youth hackathon (Daydream Game Jam), which was also the largest Daydream event in North America, the project won 1st place out of 124 participants and 50+ projects. The game features single-player, two-player, and Flappy Bird–style modes, and was prototyped in Pygame before being ported to Next.js with TypeScript for web play.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Pygame', 'Computer Vision', 'Hackathon', 'Game Development', 'Segmentation Model', '200k+ LinkedIn Impressions']
  },
  {
    icon: '/arxiv.png',
    title: 'Shuttlecock Trajectory & Speed Estimation',
    subtitle: 'Published original research in computer vision and multimedia.',
    link: 'https://www.arxiv.org/abs/2509.05334',
    date: 'September 2025',
    description: 'Authored and published original research detailing a novel pipeline for accurately tracking badminton shuttlecock trajectories. This work, which forms the scientific foundation for the Smashspeed app, was conducted under the guidance of mentors including a University of Pennsylvania M.Eng and a Stanford PhD. The paper contributes to the fields of multimedia (cs.MM) and computer vision (cs.CV) by introducing a robust methodology for object detection and state estimation of small, high-velocity objects.',
    tags: ['Original Research', 'arXiv', 'Computer Vision', 'Multimedia', 'Deep Learning', 'PyTorch', 'Academic Publishing']
  },
  {
    icon: '📖',
    title: 'Programming Faststart Series',
    subtitle: 'Textbooks teaching coding in the age of AI.',
    link: '/projects/faststart-series',
    date: 'August 2025',
    description: 'Authored and self-published a series of textbooks designed to modernize the way beginners learn to code. The books, starting with Python and Swift, emphasize a hands-on, project-based approach, teaching fundamental concepts with the assumption that AI tools are available to supplement learning. The series focuses on developing problem-solving skills and preparing new programmers for the modern development landscape. Swift Faststart achieved Amazon #1 Best Seller status in September 2025 (Mobile App Development & Programming).',
    tags: ['Python', 'Swift', 'Authoring', 'Design', 'Publishing', 'AI in Education', 'Amazon Best Seller']
  },
  {
    icon: '🌐',
    title: 'Web Design',
    subtitle: 'Portfolio of commissioned client websites.',
    link: 'https://diwen.dev',
    githubLink: 'https://github.com/diwenne/diwensstudio',
    date: 'August 2025',
    description: 'I get commissioned by clients to design and develop modern, responsive, and SEO-optimized websites. Each project emphasizes fast shipping, clean UX design principles, and cutting-edge web technologies including TypeScript, Next.js, Vite, Tailwind CSS, and custom CSS. My work focuses on delivering high-performance websites that look great on all devices and rank well in search engines.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'CSS', 'Vite', 'UX Design', 'SEO', 'Responsive Design']
  },
  {
    icon: '/smashspeed.png',
    title: 'Smashspeed',
    subtitle: 'Viral iOS app & ML engine to calculate badminton smash speed.',
    link: '/projects/smashspeed-engine',
    githubLink: 'https://github.com/diwenne/smashspeed_ios',
    date: 'July 2025',
    description: 'As the Founder and Lead Developer of a 6-person team, I developed and launched Smashspeed, an iOS/Android app that has over 35,000 users, achieved a peak ranking of #1 in the App Store (Sports), and gained ~5 million views online through viral content. The app allows badminton players to measure their smash speed by simply importing a video. The front-end was built natively with SwiftUI, and its core is a custom machine learning pipeline I engineered based on my published research.',
    tags: ['Founder', 'Leadership', 'SwiftUI', 'CoreML', 'iOS', 'Product Development', 'Python', 'PyTorch', 'YOLOv5', 'Kalman Filters', 'Machine Learning']
  },
];

export default function Projects() {
  const { shouldBounce } = useNavigationBounce('projects');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Projects</h1>
            <div className="flex items-center gap-2 font-extralight">
              <Link href="/" className="hover-underline-nudge">Home</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <Link href="/work" className={`hover-underline-nudge ${shouldBounce('work') ? 'nav-bounce' : ''}`}>Work</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`hover-underline-nudge ${shouldBounce('resume') ? 'nav-bounce-delayed' : ''}`}>Resume</a>
            </div>
          </div>
        </div>

        <div className="my-4 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Project Items */}
        <div>
          {projectData.map((item, index) => (
            <ExpandableItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              link={item.link}
              githubLink={item.githubLink}
              date={item.date}
              description={item.description}
              tags={item.tags}
            />
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}
