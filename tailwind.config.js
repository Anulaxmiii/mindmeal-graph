/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Mint/Teal Gradient Theme
                mint: {
                    50: '#f0fdf9',
                    100: '#ccfbed',
                    200: '#99f6db',
                    300: '#5eecc5',
                    400: '#2dd4aa',
                    500: '#14b890',
                    600: '#0d9475',
                    700: '#0f7660',
                    800: '#115d4e',
                    900: '#124d42',
                },
                teal: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf',
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                },
                // Custom theme colors
                primary: {
                    DEFAULT: '#14b890',
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#f0fdf9',
                    foreground: '#0d9475',
                },
                accent: {
                    DEFAULT: '#2dd4aa',
                    foreground: '#115d4e',
                },
                background: '#fafffe',
                foreground: '#1a1a2e',
                card: {
                    DEFAULT: '#ffffff',
                    foreground: '#1a1a2e',
                },
                muted: {
                    DEFAULT: '#f4f9f8',
                    foreground: '#6b7280',
                },
                destructive: {
                    DEFAULT: '#ef4444',
                    foreground: '#ffffff',
                },
                border: '#e5e7eb',
                input: '#e5e7eb',
                ring: '#14b890',
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                lg: '1rem',
                md: '0.75rem',
                sm: '0.5rem',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in': {
                    '0%': { opacity: '0', transform: 'translateX(-10px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'scale-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 144, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(20, 184, 144, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-in': 'slide-in 0.3s ease-out',
                'scale-in': 'scale-in 0.3s ease-out',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                shimmer: 'shimmer 2s linear infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'mint-gradient': 'linear-gradient(135deg, #14b890 0%, #2dd4aa 50%, #5eecc5 100%)',
                'teal-gradient': 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%)',
                'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
