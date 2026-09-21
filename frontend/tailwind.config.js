/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          main: '#07111F',        // Main background
          secondary: '#0B1728',   // Secondary background
          card: '#10213A',        // Card background
          cardHover: '#142B46',   // Card hover
          border: '#1D3A56',      // Border
          cyan: '#22D3EE',        // Primary cyan
          cyanGlow: 'rgba(34, 211, 238, 0.25)',
          blue: '#3B82F6',        // Blue accent
          green: '#10B981',       // Green status
          warning: '#F59E0B',     // Warning orange
          danger: '#EF4444',      // Danger red
          textPrimary: '#E5F3FF', // Primary text
          textSecondary: '#8BA6C1', // Secondary text
          textMuted: '#526D86',   // Muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 15px -3px rgba(34, 211, 238, 0.3), 0 0 6px -2px rgba(34, 211, 238, 0.2)',
        'glow-red': '0 0 15px -3px rgba(239, 68, 68, 0.35), 0 0 6px -2px rgba(239, 68, 68, 0.2)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px #1D3A56',
        'card-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.7), 0 0 0 1px #22D3EE55',
      },
      keyframes: {
        pulseRadar: {
          '0%': { transform: 'scale(0.95)', opacity: '0.9' },
          '50%': { transform: 'scale(1.25)', opacity: '0.3' },
          '100%': { transform: 'scale(0.95)', opacity: '0.9' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'pulse-radar': 'pulseRadar 2.5s infinite ease-in-out',
        'radar-sweep': 'radarSweep 4s linear infinite',
      }
    },
  },
  plugins: [],
}
