import type { Config } from "tailwindcss";
import { colors, spacing, typography, shadows, borderRadius } from "./src/styles/design-tokens";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors,
    spacing,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    boxShadow: shadows,
    borderRadius,
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
};

export default config;
