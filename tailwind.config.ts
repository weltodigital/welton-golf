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
        // Brand Colors
        brand: {
          primary: "#099669",      // Brand emerald green
          secondary: "#0B4F6C",    // Brand dark blue-teal
          light: "#E6F7F1",        // Light green tint
          dark: "#064A42",         // Darker green for depth
        },
        // Override emerald with brand green
        emerald: {
          50: "#E6F7F1",
          100: "#CCEFE4",
          200: "#99DFC9",
          300: "#66CFAD",
          400: "#33BF92",
          500: "#099669",  // Brand primary
          600: "#087B54",
          700: "#066240",
          800: "#04482B",
          900: "#022F17",
        },
        // Shadcn/ui colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#099669",  // Brand primary
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#0B4F6C",  // Brand secondary
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        cooper: ['Cooper BT', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;