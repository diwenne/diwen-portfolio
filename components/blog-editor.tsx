'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { WritingMeta, WritingType, writingData } from '@/lib/writing-data';

const EDITOR_PASSWORD = '090415';

interface EditorBlock {
    id: string;
    type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'ol' | 'code' | 'quote';
    content: string;
}

interface BlogDraft {
    meta: Omit<WritingMeta, 'published'>;
    blocks: EditorBlock[];
}

// Slash commands configuration
const SLASH_COMMANDS = [
    { command: '/h1', type: 'h1', label: 'Heading 1', description: 'Big section heading' },
    { command: '/h2', type: 'h2', label: 'Heading 2', description: 'Medium section heading' },
    { command: '/h3', type: 'h3', label: 'Heading 3', description: 'Small section heading' },
    { command: '/p', type: 'p', label: 'Paragraph', description: 'Regular text' },
    { command: '/ul', type: 'ul', label: 'Bullet List', description: 'Unordered list' },
    { command: '/ol', type: 'ol', label: 'Numbered List', description: 'Ordered list' },
    { command: '/code', type: 'code', label: 'Code', description: 'Code block' },
    { command: '/quote', type: 'quote', label: 'Quote', description: 'Blockquote' },
];

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

function BlockEditor({
    block,
    onUpdate,
    onDelete,
    onAddAfter,
    onMergeWithPrevious,
    autoFocus = false,
}: {
    block: EditorBlock;
    onUpdate: (content: string, type?: EditorBlock['type']) => void;
    onDelete: () => void;
    onAddAfter: () => void;
    onMergeWithPrevious: () => void;
    autoFocus?: boolean;
}) {
    const [showSlashMenu, setShowSlashMenu] = useState(false);
    const [menuFilter, setMenuFilter] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const filteredCommands = SLASH_COMMANDS.filter(cmd =>
        cmd.command.includes(menuFilter.toLowerCase()) ||
        cmd.label.toLowerCase().includes(menuFilter.toLowerCase())
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement | HTMLInputElement;
        const value = target.value;

        // Handle slash menu navigation
        if (showSlashMenu) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
                return;
            }
            if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                e.preventDefault();
                const cmd = filteredCommands[selectedIndex];
                onUpdate('', cmd.type as EditorBlock['type']);
                setShowSlashMenu(false);
                setMenuFilter('');
                return;
            }
            if (e.key === 'Escape') {
                setShowSlashMenu(false);
                setMenuFilter('');
                return;
            }
        }

        // Enter to create new block
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onAddAfter();
            return;
        }

        // Backspace at start to delete or merge
        if (e.key === 'Backspace' && value === '') {
            e.preventDefault();
            onMergeWithPrevious();
            return;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;

        // Check for slash commands
        if (value.startsWith('/')) {
            setShowSlashMenu(true);
            setMenuFilter(value);
            setSelectedIndex(0);
        } else {
            setShowSlashMenu(false);
            setMenuFilter('');
        }

        onUpdate(value);
    };

    const selectCommand = (cmd: typeof SLASH_COMMANDS[0]) => {
        onUpdate('', cmd.type as EditorBlock['type']);
        setShowSlashMenu(false);
        setMenuFilter('');
    };

    const getPlaceholder = () => {
        switch (block.type) {
            case 'h1': return 'Heading 1...';
            case 'h2': return 'Heading 2...';
            case 'h3': return 'Heading 3...';
            case 'ul': return 'List item (use • at start for new items)...';
            case 'ol': return 'List item (use numbers at start)...';
            case 'code': return 'Code block...';
            case 'quote': return 'Quote...';
            default: return 'Type "/" for commands, or start writing...';
        }
    };

    const getInputClassName = () => {
        const base = 'w-full bg-transparent border-none outline-none resize-none';
        switch (block.type) {
            case 'h1': return `${base} text-2xl sm:text-3xl font-light`;
            case 'h2': return `${base} text-xl sm:text-2xl font-light`;
            case 'h3': return `${base} text-lg sm:text-xl font-light`;
            case 'code': return `${base} font-mono text-sm bg-neutral-100 dark:bg-neutral-800 p-3 rounded`;
            case 'quote': return `${base} text-sm sm:text-[0.95rem] italic border-l-2 border-neutral-300 dark:border-neutral-600 pl-4`;
            default: return `${base} text-sm sm:text-[0.95rem] leading-relaxed`;
        }
    };

    return (
        <div className="relative group">
            <div className="flex items-start gap-2">
                <span className="text-xs text-neutral-400 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity pt-1 select-none cursor-grab">
                    ⋮⋮
                </span>
                <div className="flex-1">
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={block.content}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={getPlaceholder()}
                        className={getInputClassName()}
                        rows={1}
                        style={{ minHeight: '1.5em' }}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                        }}
                    />
                </div>
                <button
                    onClick={onDelete}
                    className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity pt-1 hover:text-red-500"
                >
                    ×
                </button>
            </div>

            {/* Slash command menu */}
            {showSlashMenu && filteredCommands.length > 0 && (
                <div className="absolute left-6 top-full mt-1 z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden min-w-[200px]">
                    {filteredCommands.map((cmd, idx) => (
                        <button
                            key={cmd.command}
                            onClick={() => selectCommand(cmd)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${idx === selectedIndex
                                    ? 'bg-neutral-100 dark:bg-neutral-800'
                                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                                }`}
                        >
                            <div className="font-medium">{cmd.label}</div>
                            <div className="text-xs text-neutral-500">{cmd.description}</div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function TagsEditor({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = input.trim();
            if (newTag && !tags.includes(newTag)) {
                onChange([...tags, newTag]);
            }
            setInput('');
        }
        if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            onChange(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(tags.filter(t => t !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap gap-2 items-center p-2 border border-neutral-200 dark:border-neutral-700 rounded-lg">
            {tags.map(tag => (
                <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                >
                    {tag}
                    <button
                        onClick={() => removeTag(tag)}
                        className="text-neutral-400 hover:text-red-500"
                    >
                        ×
                    </button>
                </span>
            ))}
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tag..."
                className="flex-1 min-w-[100px] text-sm bg-transparent border-none outline-none"
            />
        </div>
    );
}

function BlogPreview({ draft }: { draft: BlogDraft }) {
    const renderBlock = (block: EditorBlock) => {
        const content = block.content || '';
        switch (block.type) {
            case 'h1':
                return <h1 key={block.id} className="text-2xl sm:text-3xl font-light mb-4">{content}</h1>;
            case 'h2':
                return <h2 key={block.id} className="text-xl sm:text-2xl font-light mb-4 mt-10">{content}</h2>;
            case 'h3':
                return <h3 key={block.id} className="text-lg sm:text-xl font-light mb-3 mt-8">{content}</h3>;
            case 'ul':
                return (
                    <ul key={block.id} className="text-sm sm:text-[0.95rem] leading-relaxed mb-5 ml-6 list-disc">
                        {content.split('\n').filter(Boolean).map((item, i) => (
                            <li key={i} className="mb-3">{item.replace(/^[•\-]\s*/, '')}</li>
                        ))}
                    </ul>
                );
            case 'ol':
                return (
                    <ol key={block.id} className="text-sm sm:text-[0.95rem] leading-relaxed mb-5 ml-6 list-decimal">
                        {content.split('\n').filter(Boolean).map((item, i) => (
                            <li key={i} className="mb-3">{item.replace(/^\d+\.\s*/, '')}</li>
                        ))}
                    </ol>
                );
            case 'code':
                return (
                    <pre key={block.id} className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-sm overflow-x-auto mb-5">
                        <code>{content}</code>
                    </pre>
                );
            case 'quote':
                return (
                    <blockquote key={block.id} className="border-l-2 border-neutral-300 dark:border-neutral-600 pl-4 italic text-sm sm:text-[0.95rem] mb-5">
                        {content}
                    </blockquote>
                );
            default:
                return <p key={block.id} className="text-sm sm:text-[0.95rem] leading-relaxed mb-5">{content}</p>;
        }
    };

    return (
        <article className="case-study">
            <header>
                <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${draft.meta.type === 'case-study'
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        }`}>
                        {draft.meta.type === 'case-study' ? 'Case Study' : 'Blog'}
                    </span>
                    <span className="text-xs text-neutral-500">{draft.meta.date} • {draft.meta.readingTime}</span>
                </div>
                <h1>{draft.meta.title || 'Untitled'}</h1>
                <p className="subtitle">{draft.meta.subtitle || 'Add a subtitle...'}</p>
            </header>

            {draft.blocks.map(renderBlock)}

            <div className="flex flex-wrap gap-1.5 mt-6">
                {draft.meta.tags.map(tag => (
                    <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    );
}

export function BlogEditor() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [showExport, setShowExport] = useState(false);

    const [draft, setDraft] = useState<BlogDraft>({
        meta: {
            slug: '',
            title: '',
            subtitle: '',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            type: 'blog',
            readingTime: '1 min read',
            tags: [],
        },
        blocks: [{ id: generateId(), type: 'p', content: '' }],
    });

    const [focusedBlockId, setFocusedBlockId] = useState<string | null>(draft.blocks[0]?.id || null);

    // Calculate reading time
    useEffect(() => {
        const wordCount = draft.blocks.reduce((acc, block) => acc + block.content.split(/\s+/).filter(Boolean).length, 0);
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        setDraft(prev => ({
            ...prev,
            meta: { ...prev.meta, readingTime: `${minutes} min read` }
        }));
    }, [draft.blocks]);

    const handlePasswordSubmit = () => {
        if (password === EDITOR_PASSWORD) {
            setIsUnlocked(true);
            setShowPasswordInput(false);
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
    };

    const updateBlock = (id: string, content: string, type?: EditorBlock['type']) => {
        setDraft(prev => ({
            ...prev,
            blocks: prev.blocks.map(b =>
                b.id === id ? { ...b, content, ...(type ? { type } : {}) } : b
            ),
        }));
    };

    const deleteBlock = (id: string) => {
        if (draft.blocks.length <= 1) return;
        setDraft(prev => ({
            ...prev,
            blocks: prev.blocks.filter(b => b.id !== id),
        }));
    };

    const addBlockAfter = (id: string) => {
        const newBlock: EditorBlock = { id: generateId(), type: 'p', content: '' };
        setDraft(prev => {
            const idx = prev.blocks.findIndex(b => b.id === id);
            const newBlocks = [...prev.blocks];
            newBlocks.splice(idx + 1, 0, newBlock);
            return { ...prev, blocks: newBlocks };
        });
        setFocusedBlockId(newBlock.id);
    };

    const mergeWithPrevious = (id: string) => {
        const idx = draft.blocks.findIndex(b => b.id === id);
        if (idx <= 0) return;

        const prevBlock = draft.blocks[idx - 1];
        const currentBlock = draft.blocks[idx];

        setDraft(prev => ({
            ...prev,
            blocks: prev.blocks
                .map(b => b.id === prevBlock.id ? { ...b, content: b.content + currentBlock.content } : b)
                .filter(b => b.id !== id),
        }));
        setFocusedBlockId(prevBlock.id);
    };

    const generateExportCode = () => {
        const slug = draft.meta.slug || draft.meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Generate blocks as JSX
        const blocksJsx = draft.blocks.map(block => {
            const content = block.content.replace(/'/g, "\\'").replace(/\n/g, '\\n');
            switch (block.type) {
                case 'h2':
                    return `                    <section>
                        <h2>${content}</h2>`;
                case 'h3':
                    return `                        <h3>${content}</h3>`;
                case 'p':
                    return `                        <p>${content}</p>`;
                case 'ul':
                    const ulItems = content.split('\n').filter(Boolean).map(item =>
                        `                            <li>${item.replace(/^[•\-]\s*/, '')}</li>`
                    ).join('\n');
                    return `                        <ul>\n${ulItems}\n                        </ul>`;
                case 'ol':
                    const olItems = content.split('\n').filter(Boolean).map(item =>
                        `                            <li>${item.replace(/^\d+\.\s*/, '')}</li>`
                    ).join('\n');
                    return `                        <ol>\n${olItems}\n                        </ol>`;
                case 'code':
                    return `                        <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-sm overflow-x-auto mb-5"><code>${content}</code></pre>`;
                case 'quote':
                    return `                        <blockquote className="border-l-2 border-neutral-300 dark:border-neutral-600 pl-4 italic">${content}</blockquote>`;
                default:
                    return `                        <p>${content}</p>`;
            }
        }).join('\n                    </section>\n\n');

        const metaEntry = `    {
        slug: '${slug}',
        title: '${draft.meta.title.replace(/'/g, "\\'")}',
        subtitle: '${draft.meta.subtitle.replace(/'/g, "\\'")}',
        date: '${draft.meta.date}',
        type: '${draft.meta.type}',
        readingTime: '${draft.meta.readingTime}',
        tags: [${draft.meta.tags.map(t => `'${t}'`).join(', ')}],
        published: true,
    },`;

        const pageComponent = `'use client';

import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function ${slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}Post() {
    return (
        <main className="relative">
            <div className="relative z-10 mx-auto max-w-screen-sm px-4 sm:px-0">
                <div className="pt-16 sm:pt-24" />

                {/* Breadcrumb */}
                <div className="text-sm sm:text-[0.95rem] leading-relaxed mb-8">
                    <Link href="/writing" className="hover-underline-nudge">Writing</Link>
                    <span className="mx-2 text-neutral-400 dark:text-neutral-600">/</span>
                    <span>${draft.meta.title}</span>
                </div>

                <article className="case-study">
                    <header>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium ${draft.meta.type === 'case-study' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'}">
                                ${draft.meta.type === 'case-study' ? 'Case Study' : 'Blog'}
                            </span>
                            <span className="text-xs text-neutral-500">${draft.meta.date} • ${draft.meta.readingTime}</span>
                        </div>
                        <h1>${draft.meta.title}</h1>
                        <p className="subtitle">${draft.meta.subtitle}</p>
                    </header>

${blocksJsx}
                    </section>
                </article>

                {/* Back Navigation */}
                <div className="my-6 border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <div className="flex items-center gap-4">
                        <Link href="/writing" className="hover-underline-nudge font-extralight text-sm sm:text-[0.95rem]">
                            ← Back to Writing
                        </Link>
                        <span className="text-neutral-400">|</span>
                        <Link href="/" className="hover-underline-nudge font-extralight text-sm sm:text-[0.95rem]">
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
`;

        return { slug, metaEntry, pageComponent };
    };

    if (!isUnlocked) {
        return (
            <>
                {/* Hidden trigger button - tiny and subtle */}
                <button
                    onClick={() => setShowPasswordInput(true)}
                    className="fixed bottom-2 right-2 w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 opacity-20 hover:opacity-60 transition-opacity z-50"
                    aria-label="Editor access"
                />

                {/* Password modal */}
                {showPasswordInput && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
                            <h3 className="text-lg font-light mb-4">Enter Password</h3>
                            <input
                                type="password"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setPasswordError(false); }}
                                onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
                                placeholder="Password..."
                                className={`w-full px-3 py-2 border rounded-lg bg-transparent text-sm ${passwordError
                                        ? 'border-red-500'
                                        : 'border-neutral-200 dark:border-neutral-700'
                                    }`}
                                autoFocus
                            />
                            {passwordError && (
                                <p className="text-red-500 text-xs mt-2">Incorrect password</p>
                            )}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => { setShowPasswordInput(false); setPassword(''); setPasswordError(false); }}
                                    className="flex-1 px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePasswordSubmit}
                                    className="flex-1 px-3 py-2 text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Unlock
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    const { slug, metaEntry, pageComponent } = generateExportCode();

    return (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 overflow-auto">
            <div className="mx-auto max-w-4xl px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-light">✏ Blog Editor</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowExport(true)}
                            className="px-3 py-1.5 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                            Export
                        </button>
                        <button
                            onClick={() => setIsUnlocked(false)}
                            className="px-3 py-1.5 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* Meta fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                    <div>
                        <label className="block text-xs text-neutral-500 mb-1">Title</label>
                        <input
                            type="text"
                            value={draft.meta.title}
                            onChange={e => setDraft(prev => ({ ...prev, meta: { ...prev.meta, title: e.target.value } }))}
                            placeholder="Blog title..."
                            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 mb-1">Slug</label>
                        <input
                            type="text"
                            value={draft.meta.slug}
                            onChange={e => setDraft(prev => ({ ...prev, meta: { ...prev.meta, slug: e.target.value } }))}
                            placeholder="auto-generated-from-title"
                            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs text-neutral-500 mb-1">Subtitle</label>
                        <input
                            type="text"
                            value={draft.meta.subtitle}
                            onChange={e => setDraft(prev => ({ ...prev, meta: { ...prev.meta, subtitle: e.target.value } }))}
                            placeholder="A brief description..."
                            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 mb-1">Type</label>
                        <select
                            value={draft.meta.type}
                            onChange={e => setDraft(prev => ({ ...prev, meta: { ...prev.meta, type: e.target.value as WritingType } }))}
                            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                        >
                            <option value="blog">Blog</option>
                            <option value="case-study">Case Study</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 mb-1">Date</label>
                        <input
                            type="text"
                            value={draft.meta.date}
                            onChange={e => setDraft(prev => ({ ...prev, meta: { ...prev.meta, date: e.target.value } }))}
                            placeholder="Month Day, Year"
                            className="w-full px-3 py-2 text-sm border border-neutral-200 dark:border-neutral-700 rounded-lg bg-transparent"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-xs text-neutral-500 mb-1">Tags</label>
                        <TagsEditor
                            tags={draft.meta.tags}
                            onChange={tags => setDraft(prev => ({ ...prev, meta: { ...prev.meta, tags } }))}
                        />
                    </div>
                </div>

                {/* Tab switcher */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('edit')}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'edit'
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                : 'border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-2 text-sm rounded-lg transition-colors ${activeTab === 'preview'
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                : 'border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            }`}
                    >
                        Preview
                    </button>
                </div>

                {/* Content area */}
                <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 min-h-[400px]">
                    {activeTab === 'edit' ? (
                        <div className="space-y-2">
                            <p className="text-xs text-neutral-400 mb-4">
                                Type <code className="bg-neutral-100 dark:bg-neutral-800 px-1 rounded">/</code> for commands like /h2, /h3, /ul, /quote...
                            </p>
                            {draft.blocks.map((block, idx) => (
                                <BlockEditor
                                    key={block.id}
                                    block={block}
                                    onUpdate={(content, type) => updateBlock(block.id, content, type)}
                                    onDelete={() => deleteBlock(block.id)}
                                    onAddAfter={() => addBlockAfter(block.id)}
                                    onMergeWithPrevious={() => mergeWithPrevious(block.id)}
                                    autoFocus={block.id === focusedBlockId}
                                />
                            ))}
                        </div>
                    ) : (
                        <BlogPreview draft={draft} />
                    )}
                </div>

                {/* Export modal */}
                {showExport && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto">
                            <div className="sticky top-0 bg-white dark:bg-neutral-900 p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
                                <h3 className="text-lg font-light">Export Blog</h3>
                                <button
                                    onClick={() => setShowExport(false)}
                                    className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="p-4 space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">1. Create folder: <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">app/writing/{slug}/</code></h4>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">2. Add to <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">lib/writing-data.ts</code> in writingData array:</h4>
                                    <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-xs overflow-x-auto">
                                        <code>{metaEntry}</code>
                                    </pre>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-2">3. Create <code className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">app/writing/{slug}/page.tsx</code>:</h4>
                                    <pre className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg text-xs overflow-x-auto max-h-96">
                                        <code>{pageComponent}</code>
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function BlogEditorTrigger() {
    return <BlogEditor />;
}
