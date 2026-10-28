import React from 'react';
import { useTourMan } from '../context/TourManContext';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false }) => {
  const { theme, setTheme } = useTourMan();

  const options: { id: 'light' | 'dark' | 'system'; label: string; icon: any }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode"
      className="inline-flex items-center p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/60 shadow-inner"
    >
      {options.map(opt => {
        const Icon = opt.icon;
        const isActive = theme === opt.id;

        return (
          <button
            key={opt.id}
            onClick={() => setTheme(opt.id)}
            title={`Switch to ${opt.label} mode`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
              isActive
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {!compact && <span className="hidden sm:inline text-[11px]">{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
};
