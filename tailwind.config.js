/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'black': '#000000',
                'white': '#ffffff',
                'gray': {
                    50: '#f9f9f9',
                    100: '#f0f0f0',
                    500: '#808080',
                    900: '#1a1a1a',
                },
            },
            fontFamily: {
                'sans': ['Arial', 'Helvetica', 'sans-serif'],
                'mono': ['Courier New', 'monospace'],
                'display': ['Impact', 'Arial Black', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}