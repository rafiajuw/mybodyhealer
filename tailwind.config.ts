import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B8E23", // Olive Green as the base theme color
        secondary: "#FFFFFF", // Pure White for backgrounds and text
        accent: "#556B2F", // Dark Olive for highlights and active states
        lightOlive: "#A3E4D7", // Lighter, soothing green for hover and subtle effects (updated from #9ACD32 to match previous preference)
        graySoft: "#F5F5F5", // Soft gray for inactive states and contrast
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "glass-effect":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4))", // Adjusted for a subtler glass effect
      },
      spacing: {
        '7': '1.75rem', // Added for consistent padding
        '18': '4.5rem', // For larger spacing needs
      },
      borderRadius: {
        '2xl': '1.5rem', // Enhanced for rounded corners
      },
      boxShadow: {
        'xl': '0 10px 15px rgba(0, 0, 0, 0.1)', // Softer shadow for professionalism
        '2xl': '0 15px 25px rgba(0, 0, 0, 0.15)', // Deeper shadow for overlays
      },
    },
  },
  plugins: [],
};

export default config;