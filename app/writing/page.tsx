'use client';

import Link from 'next/link';
import { Footer } from '@/components/footer';
import { useNavigationBounce } from '@/lib/useNavigationBounce';
import { getPublishedWritings, WritingType } from '@/lib/writing-data';

function TypeBadge({ type }: { type: WritingType }) {
    const styles = {
        'case-study': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        'blog': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    };

    const labels = {
        'case-study': 'Case Study',
        'blog': 'Blog',
    };

    return (
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[type]}`}>
            {labels[type]}
        </span>
    );
}

export default function Writing() {
    const { shouldBounce } = useNavigationBounce('writing');
    const writings = getPublishedWritings();

    return (
        <main className="relative">
            <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
                <div className="pt-16 sm:pt-24" />

                {/* Header */}
                <div className="text-sm sm:text-[0.95rem] leading-relaxed space-y-3">
                    <div className="flex items-center justify-between">
                        <h1 className="underline underline-offset-[3px] font-extralight">◆ Writing</h1>
                        <div className="flex items-center gap-2 font-extralight">
                            <Link href="/" className="hover-underline-nudge">Home</Link>
                            <span className="text-neutral-400 dark:text-neutral-600">|</span>
                            <Link href="/projects" className={`hover-underline-nudge ${shouldBounce('projects') ? 'nav-bounce' : ''}`}>Projects</Link>
                            <span className="text-neutral-400 dark:text-neutral-600">|</span>
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`hover-underline-nudge ${shouldBounce('resume') ? 'nav-bounce-delayed' : ''}`}>Resume</a>
                            {/* <span className="text-neutral-400 dark:text-neutral-600">|</span>
                            <Link href="/work" className={`hover-underline-nudge ${shouldBounce('work') ? 'nav-bounce-delayed' : ''}`}>Work</Link> */}
                        </div>
                    </div>
                </div>

                <div className="my-4 border-t border-neutral-200 dark:border-neutral-700" />

                {/* Description */}
                <p className="text-sm sm:text-[0.95rem] text-neutral-600 dark:text-neutral-400 mb-6">
                    Thoughts on building products, machine learning, and lessons learned along the way.
                </p>

                {/* Writing List */}
                <div className="space-y-6">
                    {writings.map((writing) => (
                        <Link
                            key={writing.slug}
                            href={`/writing/${writing.slug}`}
                            className="block group"
                        >
                            <article className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 sm:p-5 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:shadow-sm">
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h2 className="text-base sm:text-lg font-light group-hover:underline underline-offset-2 transition-all">
                                        {writing.title}
                                    </h2>
                                    <TypeBadge type={writing.type} />
                                </div>

                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                                    {writing.subtitle}
                                </p>

                                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
                                    <span>{writing.date}</span>
                                    <span>•</span>
                                    <span>{writing.readingTime}</span>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-3">
                                    {writing.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {writings.length === 0 && (
                    <div className="text-center py-12 text-neutral-500">
                        <p>No writings yet. Check back soon!</p>
                    </div>
                )}

                <Footer />
            </div>
        </main>
    );
}
