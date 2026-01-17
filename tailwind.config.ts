import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dark futuristic palette
                dark: {
                    50: "#f7f7f8",
                    100: "#ececf1",
                    200: "#d9d9e3",
                    300: "#c5c5d2",
                    400: "#acacbe",
                    500: "#8e8ea0",
                    600: "#565869",
                    700: "#40414f",
                    800: "#343541",
                    900: "#202123",
                    950: "#0d0d0f",
                },
                // Turquoise accent colors
                neon: {
                    cyan: "#00F0D4",
                    blue: "#00F0D4",
                    purple: "#8b5cf6",
                    pink: "#ec4899",
                },
                primary: {
                    50: "#ecfeff",
                    100: "#cffafe",
                    200: "#a5f3fc",
                    300: "#67e8f9",
                    400: "#22d3ee",
                    500: "#00F0D4",
                    600: "#00d4ba",
                    700: "#00b89f",
                    800: "#009d87",
                    900: "#00826f",
                    950: "#005a4d",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-chakra)", "var(--font-outfit)", "system-ui", "sans-serif"],
                tech: ["var(--font-chakra)", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "glow-conic": "conic-gradient(from 180deg at 50% 50%, #00F0D4 0deg, #00F0D4 90deg, #8b5cf6 180deg, #ec4899 270deg, #00F0D4 360deg)",
            },
            boxShadow: {
                glow: "0 0 20px rgba(0, 240, 212, 0.3)",
                "glow-lg": "0 0 40px rgba(0, 240, 212, 0.4)",
                "glow-blue": "0 0 30px rgba(0, 240, 212, 0.4)",
                "inner-glow": "inset 0 0 20px rgba(0, 240, 212, 0.1)",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.5s ease-out",
                "fade-in": "fadeIn 0.5s ease-out",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(0, 240, 212, 0.3)" },
                    "100%": { boxShadow: "0 0 40px rgba(0, 240, 212, 0.6)" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            borderRadius: {
                "4xl": "2rem",
            },
        },
    },
    plugins: [],
};

export default config;
