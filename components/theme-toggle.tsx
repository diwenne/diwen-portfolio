'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-1 text-sm sm:text-[0.95rem] text-neutral-700 dark:text-neutral-300 whitespace-nowrap" style={{ width: '90px' }}>
        {/* Placeholder to prevent layout shift */}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 text-sm sm:text-[0.95rem] text-neutral-700 dark:text-neutral-300 hover-underline-nudge whitespace-nowrap"
      style={{ verticalAlign: 'middle', position: 'relative', top: '-2px' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <Moon size={14} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Dark mode</span>
        </>
      ) : (
        <>
          <Sun size={14} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
          <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>Light mode</span>
        </>
      )}
    </button>
  );
}

