'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ExpandableItemProps {
  icon: string;
  title: string;
  subtitle: string;
  link?: string;
  date: string;
  description: string;
  tags: string[];
}

export default function ExpandableItem({
  icon,
  title,
  subtitle,
  link,
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

  const titleContent = link ? (
    isInternalLink ? (
      <Link href={link} className="hover-underline-nudge" onClick={handleLinkClick}>
        {title} <span className="relative -top-[0.4em] text-[0.8em]">↗</span>
      </Link>
    ) : (
      <a href={link} target="_blank" rel="noopener noreferrer" className="hover-underline-nudge" onClick={handleLinkClick}>
        {title} <span className="relative -top-[0.4em] text-[0.8em]">↗</span>
      </a>
    )
  ) : (
    title
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
