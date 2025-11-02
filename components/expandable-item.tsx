'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ExpandableItemProps {
  icon: string;
  title: string;
  subtitle: string;
  link?: string;
  githubLink?: string;
  date: string;
  description: string;
  tags: string[];
}

export default function ExpandableItem({
  icon,
  title,
  subtitle,
  link,
  githubLink,
  date,
  description,
  tags,
}: ExpandableItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isImagePath = icon.includes('/') || icon.includes('.');
  const isInternalLink = link?.startsWith('/');

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const ArrowIcon = () => (
    <svg
      className="inline-block w-[1em] h-[1em]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );

  const GitHubIcon = () => (
    <svg
      className="inline-block w-[1em] h-[1em]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const titleContent = (
    <>
      {link ? (
        isInternalLink ? (
          <Link href={link} className="hover-underline-nudge inline-flex items-baseline gap-0.5" onClick={handleLinkClick}>
            {title} <ArrowIcon />
          </Link>
        ) : (
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover-underline-nudge inline-flex items-baseline gap-0.5" onClick={handleLinkClick}>
            {title} <ArrowIcon />
          </a>
        )
      ) : (
        title
      )}
      {githubLink && (
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="hover-underline-nudge inline-flex items-baseline gap-0.5 ml-1" onClick={handleLinkClick}>
          <GitHubIcon />
        </a>
      )}
    </>
  );

  const subtitleContent = subtitle;

  return (
    <div className="border-t border-neutral-200 dark:border-neutral-700 py-4 space-y-3">
      <div
        className="flex items-start justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3 flex-1">
          {/* Chevron indicator */}
          <div className="flex-shrink-0 self-center">
            <svg
              className={`w-4 h-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-200 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="flex-shrink-0 w-[40px] h-[40px] flex items-center justify-center">
            {isImagePath ? (
              <Image
                src={icon}
                alt={`${title} icon`}
                width={40}
                height={40}
                className="object-contain rounded"
              />
            ) : (
              <span className="text-2xl">{icon}</span>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-0.5">
            <h3 className="text-sm sm:text-[0.95rem] font-normal">
              {titleContent}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
              {subtitleContent}
            </p>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500 flex-shrink-0 ml-4">
          {date}
        </span>
      </div>

      {isExpanded && (
        <div className="pl-[80px] space-y-3">
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
