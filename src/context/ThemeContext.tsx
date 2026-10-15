import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppTheme } from '../types';

interface ThemeConfig {
  id: AppTheme;
  nameEn: string;
  nameHi: string;
  primaryBg: string;
  accentBg: string;
  badgeBg: string;
  bannerGradient: string;
  cardBorder: string;
  icon: string;
}

export const THEME_CONFIGS: Record<AppTheme, ThemeConfig> = {
  tricolor: {
    id: 'tricolor',
    nameEn: 'Indian Tricolor (Tiranga)',
    nameHi: '🇮🇳 भारतीय तिरंगा थीम',
    primaryBg: 'bg-stone-900',
    accentBg: 'bg-amber-600',
    badgeBg: 'bg-emerald-700 text-white',
    bannerGradient: 'from-amber-600 via-stone-900 to-emerald-800',
    cardBorder: 'border-amber-400',
    icon: '🇮🇳',
  },
  maroon: {
    id: 'maroon',
    nameEn: 'Railway Classic Crimson & Gold',
    nameHi: '🚂 रेलवे क्लासिक मेहरून व स्वर्ण',
    primaryBg: 'bg-red-950',
    accentBg: 'bg-red-700',
    badgeBg: 'bg-amber-500 text-stone-950',
    bannerGradient: 'from-red-900 via-stone-900 to-red-950',
    cardBorder: 'border-red-600',
    icon: '🚂',
  },
  navy: {
    id: 'navy',
    nameEn: 'Waltair & Coastal Deep Navy',
    nameHi: '⚓ वाल्टेयर एवं कोस्टल नेवी',
    primaryBg: 'bg-slate-900',
    accentBg: 'bg-sky-700',
    badgeBg: 'bg-blue-600 text-white',
    bannerGradient: 'from-sky-900 via-slate-900 to-blue-950',
    cardBorder: 'border-sky-500',
    icon: '⚓',
  },
  emerald: {
    id: 'emerald',
    nameEn: 'East Coast Emerald Green',
    nameHi: '🌲 ईस्ट कोस्ट गहरा हरा',
    primaryBg: 'bg-emerald-950',
    accentBg: 'bg-emerald-700',
    badgeBg: 'bg-amber-400 text-stone-950',
    bannerGradient: 'from-emerald-900 via-stone-900 to-teal-950',
    cardBorder: 'border-emerald-500',
    icon: '🌲',
  },
  amber: {
    id: 'amber',
    nameEn: 'Royal Gold & Charcoal',
    nameHi: '👑 रॉयल स्वर्ण व चारकोल',
    primaryBg: 'bg-stone-950',
    accentBg: 'bg-amber-500',
    badgeBg: 'bg-amber-500 text-stone-950',
    bannerGradient: 'from-amber-800 via-stone-950 to-amber-950',
    cardBorder: 'border-amber-500',
    icon: '👑',
  },
  slate: {
    id: 'slate',
    nameEn: 'Modern Charcoal Dark',
    nameHi: '🌑 आधुनिक डार्क स्लेट',
    primaryBg: 'bg-zinc-950',
    accentBg: 'bg-zinc-800',
    badgeBg: 'bg-stone-200 text-stone-900',
    bannerGradient: 'from-zinc-900 via-stone-950 to-neutral-900',
    cardBorder: 'border-zinc-700',
    icon: '🌑',
  },
};

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  config: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('ecorsc_app_theme');
    if (saved && saved in THEME_CONFIGS) {
      return saved as AppTheme;
    }
    return 'tricolor';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('ecorsc_app_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const config = THEME_CONFIGS[theme] || THEME_CONFIGS.tricolor;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
