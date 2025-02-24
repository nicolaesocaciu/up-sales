
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
        purple: {
          DEFAULT: "#9b87f5",
          secondary: "#7E69AB",
          tertiary: "#6E59A5",
          dark: "#1A1F2C",
          light: "#D6BCFA",
          soft: "#E5DEFF",
          vivid: "#8B5CF6",
        },
        magenta: {
          pink: "#D946EF",
        },
        blue: {
          ocean: "#0EA5E9",
          bright: "#1EAEDB",
          sky: "#33C3F0",
          bright2: "#0FA0CE",
          soft: "#D3E4FD",
        },
        soft: {
          green: "#F2FCE2",
          yellow: "#FEF7CD",
          orange: "#FEC6A1",
          pink: "#FFDEE2",
          peach: "#FDE1D3",
          gray: "#F1F0FB",
        },
        orange: {
          bright: "#F97316",
        },
        gray: {
          charcoal: "#403E43",
          medium: "#8A898C",
          dark: {
            charcoal: "#221F26",
          },
          light: "#C8C8C9",
          silver: "#9F9EA1",
          DEFAULT: "#888888",
          neutral: "#8E9196",
        },
        red: {
          DEFAULT: "#ea384c",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        slideIn: "slideIn 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
