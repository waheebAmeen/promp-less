import { useAppStore } from '../storage/store';

/**
 * Promptless Design System Theme Hook
 * 
 * Provides theme-aware class names and color values based on the current
 * darkMode state. Maps style.md design tokens to Tailwind utility classes.
 * 
 * Usage:
 *   const theme = useTheme();
 *   <View className={`${theme.cardBg} ${theme.cardBorder}`}>
 *     <Typography className={theme.text}>Hello</Typography>
 *   </View>
 */
export function useTheme() {
  const { darkMode } = useAppStore();
  const isDark = darkMode;

  return {
    isDark,

    // ── Backgrounds ──
    bg: isDark ? 'bg-background' : 'bg-light-background',
    surface: isDark ? 'bg-surface' : 'bg-light-surface',
    surfaceHover: isDark ? 'bg-surface-hover' : 'bg-light-surface-hover',

    // ── Cards ──
    cardBg: isDark ? 'bg-surface/80' : 'bg-white',
    cardBorder: isDark ? 'border-slate-700/50' : 'border-light-border',
    cardShadow: isDark ? 'shadow-glass' : 'shadow-light-card',

    // ── Glass ──
    glassBg: isDark ? 'bg-surface/60 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md',
    glassBorder: isDark ? 'border-white/10' : 'border-light-border',

    // ── Text ──
    text: isDark ? 'text-slate-100' : 'text-light-on-surface',
    textSecondary: isDark ? 'text-slate-300' : 'text-light-on-variant',
    textMuted: isDark ? 'text-slate-400' : 'text-light-outline',
    textInverse: isDark ? 'text-slate-900' : 'text-white',

    // ── Borders ──
    border: isDark ? 'border-white/10' : 'border-light-border',
    borderSubtle: isDark ? 'border-white/5' : 'border-light-outline-variant/30',

    // ── Inputs ──
    inputBg: isDark ? 'bg-surface' : 'bg-light-input-bg',
    inputBorder: isDark ? 'border-slate-700/50' : 'border-light-outline-variant',
    inputText: isDark ? 'text-slate-100' : 'text-light-on-surface',
    inputPlaceholder: isDark ? '#64748b' : '#767586',

    // ── Header / Navigation ──
    headerBg: isDark ? 'bg-background/50 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md',
    headerBorder: isDark ? 'border-white/5' : 'border-light-border',
    navBg: isDark ? 'bg-surface/90 backdrop-blur-3xl' : 'bg-white/90 backdrop-blur-3xl',
    navBorder: isDark ? 'border-white/10' : 'border-light-border',

    // ── Raw Colors ──
    colors: {
      primary: '#1a56db',
      primaryGlow: '#93c5fd',
      primaryDeep: '#0e3fa3',
      secondary: '#60a5fa',
      icon: isDark ? '#93c5fd' : '#4b6cb7',
      iconActive: '#1a56db',
      switchTrackOff: isDark ? '#0d2044' : '#dce8fb',
      switchTrackOn: '#1a56db',
      thumbColor: '#f8fafc',
    },
  };
}
