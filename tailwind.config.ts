import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4EDE1", // page background
        surface: "#FFFFFF", // card / nav background
        ink: "#2A2A2A", // primary text, borders, shadow color (near-black, not pure black)
        blue: "#6495ED", // links, active nav state, dates/timestamps
        olive: "#546B2F", // primary CTA button (e.g. "Book a Call")
        yellow: "#FCEF84", // highlight banner background
        coral: "#E0A49E", // decorative accent square, variant A
        sage: "#B0BD82", // decorative accent square, variant B
        snake: "#A5AC88", // reserved for the ambient snake body (Step 3 will use this)
      },
      borderWidth: {
        sketch: "3px",
      },
      boxShadow: {
        sketch: "6px 6px 0 0 #2A2A2A", // standard card/button offset shadow
        sketchSm: "3px 3px 0 0 #2A2A2A", // smaller offset shadow for tags/chips
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
