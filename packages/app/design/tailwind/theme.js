// @ts-check

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    colors: {
      // Brand Colors — Electric Indigo (from style.md)
      primary: '#5D5FEF',
      'primary-deep': '#4343D5',
      'primary-glow': '#c1c1ff',
      'primary-light': '#A5A6F6',
      'on-primary': '#ffffff',

      secondary: '#5557a0',
      'secondary-container': '#aeafff',

      tertiary: '#006279',
      'tertiary-container': '#007c98',

      // Dark Mode Surfaces
      background: '#020617',
      surface: '#0f172a',
      'surface-light': '#1e293b',
      'surface-hover': '#1e293b',

      // Light Mode Surfaces (from style.md YAML)
      'light-background': '#f7f9fb',
      'light-surface': '#ffffff',
      'light-surface-hover': '#f1f5f9',
      'light-card': '#ffffff',
      'light-border': '#e2e8f0',
      'light-surface-container': '#eceef0',
      'light-surface-high': '#e6e8ea',
      'light-on-surface': '#191c1e',
      'light-on-variant': '#464555',
      'light-outline': '#767586',
      'light-outline-variant': '#c7c4d7',
      'light-input-bg': '#F1F5F9',

      // Glassmorphism
      'glass-border': 'rgba(255, 255, 255, 0.08)',
      'glass-bg': 'rgba(15, 23, 42, 0.7)',
      'light-glass-border': 'rgba(93, 95, 239, 0.10)',
      'light-glass-bg': 'rgba(255, 255, 255, 0.80)',

      // Accents
      accent: '#0ea5e9',
      'accent-purple': '#8b5cf6',
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
      'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      'neon-blue': '0 0 15px rgba(93, 95, 239, 0.4)',
      'neon-primary': '0 0 20px rgba(93, 95, 239, 0.3)',
      'neon-purple': '0 0 15px rgba(139, 92, 246, 0.4)',
      'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      'light-glass': '0 10px 30px rgba(0, 0, 0, 0.05)',
      'light-card': '0 4px 20px rgba(0, 0, 0, 0.05)',
      'light-elevated': '0 8px 30px rgba(0, 0, 0, 0.08)',
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
