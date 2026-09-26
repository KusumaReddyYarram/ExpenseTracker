/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          bg: '#FAFAF7',         // Warm off-white
          surface: '#FFFFFF',    // Clean white
          card: '#F4F4EE',       // Soft neutral surface
          border: '#E2E8F0',     // Subtle border
          charcoal: '#0F172A',   // Deep charcoal
          navy: '#1E293B',       // Muted slate
          emerald: '#059669',    // Muted emerald for growth/positive
          emeraldHover: '#047857',
          mint: '#ECFDF5',       // Soft emerald tint
          beige: '#F5F2EA',      // Soft beige card highlight
          amber: '#D97706',      // Warm amber alert
          rose: '#E11D48',       // Muted rose for expense
          muted: '#64748B',      // Neutral gray text
          light: '#F8FAFC'       // Light background
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'fintech': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'fintech-lg': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'fintech-hover': '0 20px 40px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -3px rgba(15, 23, 42, 0.06)'
      }
    },
  },
  plugins: [],
}
