// @ts-check

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    colors: {
      // Brand Colors — Royal Navy Blue
      primary: '#1a56db',
      'primary-deep': '#0e3fa3',
      'primary-glow': '#93c5fd',
      'primary-light': '#60a5fa',
      'on-primary': '#ffffff',

      secondary: '#1e3a7a',
      'secondary-container': '#bfdbfe',

      tertiary: '#0369a1',
      'tertiary-container': '#0284c7',

      // Dark Mode Surfaces — Deep Navy
      background: '#020e25',
      surface: '#071630',
      'surface-light': '#0d2044',
      'surface-hover': '#0d2044',

      // Light Mode Surfaces
      'light-background': '#f0f5ff',
      'light-surface': '#ffffff',
      'light-surface-hover': '#e8f0fe',
      'light-card': '#ffffff',
      'light-border': '#c7d8f5',
      'light-surface-container': '#dce8fb',
      'light-surface-high': '#d0e2f9',
      'light-on-surface': '#0d1f4e',
      'light-on-variant': '#1e3a7a',
      'light-outline': '#4b6cb7',
      'light-outline-variant': '#93b4e0',
      'light-input-bg': '#EEF4FF',

      // Glassmorphism
      'glass-border': 'rgba(255, 255, 255, 0.08)',
      'glass-bg': 'rgba(7, 22, 48, 0.75)',
      'light-glass-border': 'rgba(26, 86, 219, 0.12)',
      'light-glass-bg': 'rgba(255, 255, 255, 0.82)',

      // Accents
      accent: '#38bdf8',
      'accent-purple': '#818cf8',
      'accent-emerald': '#10b981',
      'accent-rose': '#f43f5e',
      'accent-amber': '#f59e0b',

      // Semantic
      error: '#ba1a1a',
      'error-container': '#ffdad6',
      success: '#10b981',
      warning: '#f59e0b',
    },
    boxShadow: {
      'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      'neon-blue': '0 0 15px rgba(26, 86, 219, 0.5)',
      'neon-primary': '0 0 20px rgba(26, 86, 219, 0.4)',
      'neon-purple': '0 0 15px rgba(96, 165, 250, 0.4)',
      'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.12)',
      'light-glass': '0 10px 30px rgba(26, 86, 219, 0.08)',
      'light-card': '0 4px 20px rgba(13, 31, 78, 0.07)',
      'light-elevated': '0 8px 30px rgba(13, 31, 78, 0.10)',
    },
    borderRadius: {
      '3xl': '24px',
      '4xl': '32px',
    },
  },
}

module.exports = {
  theme,
}
