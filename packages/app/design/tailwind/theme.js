// @ts-check

/** @type {import('tailwindcss').Config['theme']} */
const theme = {
  extend: {
    colors: {
      primary: '#3b82f6', // Brighter blue
      'primary-glow': '#60a5fa',
      secondary: '#6366f1', // Indigo
      background: '#020617', 
      surface: '#0f172a', 
      'surface-hover': '#1e293b',
      'glass-border': 'rgba(255, 255, 255, 0.08)',
      'glass-bg': 'rgba(15, 23, 42, 0.7)',
      accent: '#0ea5e9',
      'accent-purple': '#8b5cf6',
      'accent-emerald': '#10b981',
      'accent-rose': '#f43f5e',
      'accent-amber': '#f59e0b',
    },
    boxShadow: {
      'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      'neon-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
      'neon-purple': '0 0 15px rgba(139, 92, 246, 0.4)',
      'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
    },
    borderRadius: {
      '3xl': '24px',
      '4xl': '32px',
    }
  },
}

module.exports = {
  theme,
}
