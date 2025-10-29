'use client';

import Link from 'next/link';
import ExpandableItem from '@/components/expandable-item';
import { Footer } from '@/components/footer';
import { useNavigationBounce } from '@/lib/useNavigationBounce';

const workData = [
  {
    icon: '/solace.png',
    title: 'Founding Engineer',
    subtitle: 'Solace • UC Berkeley Web3 Startup',
    link: 'https://solacelaunch.com',
    date: '2025 - Present',
    description:
      'Building an AI wellness agent for a Web3 startup based at UC Berkeley, backed by Virtuals Protocol. Leading product development and engineering iOS and Android applications using React Native and TypeScript.',
    tags: ['Product Management', 'React Native', 'TypeScript', 'iOS', 'Android', 'Web3', 'AI', 'Mobile Development'],
  },
  {
    icon: '/stemsphere.png',
    title: 'President',
    subtitle: 'Stemsphere Foundation',
    link: 'https://stemsf.org',
    date: '2025 - Present',
    description:
      'Founded a non-profit with the mission to provide STEM education and mentorship for young people. I lead a team of 8 executive directors to develop and execute programs that empower the next generation of innovators and problem-solvers.',
    tags: ['Founder', 'Leadership', 'Management', 'Non-Profit', 'STEM Education'],
  },
  {
    icon: '/enhanced.png',
    title: 'Badminton Coach',
    subtitle: 'Enhanced Badminton • NCCP Level 2 Certified',
    date: '2024 - Present',
    description:
      'Coaching in various competitions, group lessons, and private lessons, focusing on player development and strategic gameplay.',
    tags: [
      'Leadership',
      'Communication',
      'Mentorship',
      'Strategy',
      'Time Management',
    ],
  },
];

export default function Work() {
  const { shouldBounce } = useNavigationBounce('work');

  return (
    <main className="relative">
      <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
        <div className="pt-16 sm:pt-24" />

        {/* Header */}
        <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="underline underline-offset-[3px] font-extralight">◆ Work Experience</h1>
            <div className="flex items-center gap-2 font-extralight">
              <Link href="/" className="hover-underline-nudge">Home</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <Link href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce' : ''}`}>Projects</Link>
              <span className="text-neutral-400 dark:text-neutral-600">|</span>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`hover-underline-nudge ${shouldBounce('resume') ? 'nav-bounce-delayed' : ''}`}>Resume</a>
            </div>
          </div>
        </div>

        <div className="my-4 border-t border-neutral-200 dark:border-neutral-700" />

        {/* Work Items */}
        <div>
          {workData.map((item, index) => (
            <ExpandableItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              link={item.link}
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
