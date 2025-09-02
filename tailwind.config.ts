import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B8E23", // Olive Green (main theme)
        secondary: "#FFFFFF", // White
        accent: "#556B2F", // Dark Olive for hover / highlights
        lightOlive: "#9ACD32", // Lighter olive for hover states
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "glass-effect":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3))",
      },
    },
  },
  plugins: [],
};

export default config;
