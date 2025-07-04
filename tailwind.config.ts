import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#116FAE",
          foreground: "#FFFFFF",
        },
        menuItem: {
          selected: "#116FAE",
          hover: "#1A7AB8",
        },
        content: "#F2F2F2",
        text: {
          dark: "#252626",
          light: "#494A4A",
        },
        status: {
          paid: "#22C55E",
          processing: "#3B82F6",
          waiting: "#F59E0B",
          light: {
            up: "#F2FCE2",
            down: "#FEE2E2",
          }
        },
        chart: {
          blue: "#3B82F6",
          green: "#22C55E",
          orange: "#F59E0B",
          red: "#EF4444",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "number-to-check": {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(0.5) rotate(180deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
        // Keeping the existing keyframes for the step indicator arrow
        "slideInRight": {
          "0%": { transform: "translate(20px, -50%)", opacity: "0" },
          "100%": { transform: "translate(0, -50%)", opacity: "1" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "number-to-check": "number-to-check 0.5s ease-out",
        // Keeping the existing animation for the step indicator arrow
        "slideInRight": "slideInRight 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
