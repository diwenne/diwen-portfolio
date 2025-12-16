export type WritingType = 'case-study' | 'blog';

export interface WritingMeta {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    type: WritingType;
    readingTime: string;
    tags: string[];
    published: boolean;
}

// Add your writings here - they'll automatically appear on the /writing page
export const writingData: WritingMeta[] = [
    {
        slug: 'building-smashspeed',
        title: 'How I Built a Viral iOS App from Scratch',
        subtitle: 'From idea to 45K users: the technical journey of building Smashspeed.',
        date: 'August 18, 2025',
        type: 'case-study',
        readingTime: '8 min read',
        tags: ['Machine Learning', 'iOS', 'Product Development'],
        published: true,
    },
];

export function getWritingBySlug(slug: string): WritingMeta | undefined {
    return writingData.find((w) => w.slug === slug);
}

export function getPublishedWritings(): WritingMeta[] {
    return writingData.filter((w) => w.published);
}
