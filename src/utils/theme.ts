import { ThemeMode } from '../types/site.ts';

export interface ThemeStyles {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentBg: string;
  accentText: string;
  accentHover: string;
  tagBg: string;
  badgeBg: string;
}

export const THEME_MAP: Record<ThemeMode, ThemeStyles> = {
  obsidian: {
    bg: 'bg-neutral-950',
    surface: 'bg-neutral-900/70',
    surfaceAlt: 'bg-neutral-900/40',
    border: 'border-neutral-800',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-400',
    textMuted: 'text-neutral-500',
    accentBg: 'bg-white',
    accentText: 'text-neutral-950',
    accentHover: 'hover:bg-neutral-200',
    tagBg: 'bg-neutral-800/60 text-neutral-300',
    badgeBg: 'bg-neutral-800 text-neutral-200',
  },
  light: {
    bg: 'bg-neutral-50',
    surface: 'bg-white',
    surfaceAlt: 'bg-neutral-100/60',
    border: 'border-neutral-200',
    textPrimary: 'text-neutral-900',
    textSecondary: 'text-neutral-600',
    textMuted: 'text-neutral-500',
    accentBg: 'bg-neutral-900',
    accentText: 'text-white',
    accentHover: 'hover:bg-neutral-800',
    tagBg: 'bg-neutral-100 text-neutral-700',
    badgeBg: 'bg-neutral-200 text-neutral-800',
  },
  cobalt: {
    bg: 'bg-slate-950',
    surface: 'bg-slate-900/80',
    surfaceAlt: 'bg-slate-900/40',
    border: 'border-slate-800',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    textMuted: 'text-slate-500',
    accentBg: 'bg-blue-600',
    accentText: 'text-white',
    accentHover: 'hover:bg-blue-500',
    tagBg: 'bg-blue-950/60 text-blue-300',
    badgeBg: 'bg-slate-800 text-slate-200',
  },
  luxury: {
    bg: 'bg-stone-950',
    surface: 'bg-stone-900/70',
    surfaceAlt: 'bg-stone-900/40',
    border: 'border-stone-800',
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-400',
    textMuted: 'text-stone-500',
    accentBg: 'bg-amber-100',
    accentText: 'text-stone-950',
    accentHover: 'hover:bg-amber-200',
    tagBg: 'bg-stone-800 text-stone-300',
    badgeBg: 'bg-stone-800 text-stone-200',
  },
  emerald: {
    bg: 'bg-zinc-950',
    surface: 'bg-zinc-900/80',
    surfaceAlt: 'bg-emerald-950/20',
    border: 'border-zinc-800',
    textPrimary: 'text-zinc-100',
    textSecondary: 'text-zinc-400',
    textMuted: 'text-zinc-500',
    accentBg: 'bg-emerald-500',
    accentText: 'text-zinc-950',
    accentHover: 'hover:bg-emerald-400',
    tagBg: 'bg-emerald-950/50 text-emerald-300',
    badgeBg: 'bg-zinc-800 text-zinc-200',
  },
};
