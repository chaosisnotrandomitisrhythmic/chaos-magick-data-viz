/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'terminal-green': '#00ff00',
                'terminal-amber': '#ffb000',
                'terminal-cyan': '#00ffff',
                'terminal-bg': '#000000',
                'terminal-dark': '#0a0a0a',
                'terminal-gray': '#333333',
                'terminal-white': '#ffffff',
                'crt-green': '#33ff33',
                'phosphor-green': '#41ff00',
            },
            fontFamily: {
                'mono': ['Courier New', 'monospace'],
                'terminal': ['VT323', 'Courier New', 'monospace'],
            },
            animation: {
                'blink': 'blink 1s step-end infinite',
                'scanline': 'scanline 8s linear infinite',
                'flicker': 'flicker 0.15s infinite',
                'typing': 'typing 0.15s steps(1) infinite',
            },
            keyframes: {
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                flicker: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                typing: {
                    '0%, 100%': { borderColor: 'transparent' },
                    '50%': { borderColor: '#00ff00' },
                }
            }
        },
    },
    plugins: [],
} 