import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /bg-ls-.+/,
      variants: ["dark"],
    },
  ],
  theme: {
    colors: { ...colors },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#01A0CC",
        },
        blue: {
          DEFAULT: "#01A0CC",
        },
        "text-black": {
          DEFAULT: "#333333",
        },
        "initial-black": "#000000",
        black: "#00031B",
        cloud: {
          DEFAULT: "#F3FAFF",
        },
        "cloud-dark": {
          DEFAULT: "#E5F0F5",
        },
        "cloud-darker": {
          DEFAULT: "#D1DCE1",
        },
        navy: {
          DEFAULT: "#001956",
        },
        "navy-hover": {
          DEFAULT: "2A4077",
        },
        inactive: {
          DEFAULT: "#767676",
          dark: "#9D9D9D",
        },
        "gradient-red": {
          DEFAULT: "#AD2444",
        },
        "gradient-yellow": {
          DEFAULT: "#d48637",
        },
        "gradient-blue": {
          DEFAULT: "#4394bf",
        },
        "gradient-purple": {
          DEFAULT: "#6d55cb",
        },
        "gradient-pink": {
          DEFAULT: "#a22a96",
        },
        "ls-orange": {
          DEFAULT: "#E79853",
          fade: "#FDF5EE",
          dark: "#45302C",
        },
        "ls-blue": {
          DEFAULT: "#3D96D6",
          fade: "#ECF4FB",
          dark: "#122F53",
        },
        "ls-purple": {
          DEFAULT: "#7053C8",
          fade: "#F1EEF9",
          dark: "#221B4F",
        },
        "ls-pink": {
          DEFAULT: "#C73FA8",
          fade: "#F9ECF6",
          dark: "#3C1545",
        },
        "ls-green": {
          DEFAULT: "#5ABF99",
          fade: "#EEF9F5",
          dark: "#1B3B41",
        },
        "ls-green-fade": {
          DEFAULT: "#EEF9F5",
        },
        "dark-mode": {
          subtle: "#1A1C32",
          strong: "#313347",
        },
      },
      backgroundImage: ({ theme }) => ({
        "gradient-1": `linear-gradient(90deg, ${theme(
          "colors.gradient-blue.DEFAULT"
        )} 0%,${theme("colors.gradient-purple.DEFAULT")} 23%,${theme(
          "colors.gradient-pink.DEFAULT"
        )} 49%,${theme("colors.gradient-red.DEFAULT")} 77%, ${theme(
          "colors.gradient-yellow.DEFAULT"
        )} 100%)`,
        "gradient-1-vertical": `linear-gradient(${theme(
          "colors.gradient-blue.DEFAULT"
        )} 0%,${theme("colors.gradient-purple.DEFAULT")} 23%,${theme(
          "colors.gradient-pink.DEFAULT"
        )} 49%,${theme("colors.gradient-red.DEFAULT")} 77%, ${theme(
          "colors.gradient-yellow.DEFAULT"
        )} 100%)`,
        "gradient-2": `linear-gradient(90deg, ${theme(
          "colors.gradient-purple.DEFAULT"
        )} 0%,${theme("colors.gradient-pink.DEFAULT")} 26%,${theme(
          "colors.gradient-blue.DEFAULT"
        )} 50%,${theme("colors.gradient-purple.DEFAULT")} 73%, ${theme(
          "colors.gradient-red.DEFAULT"
        )} 100%)`,
        "gradient-3": `linear-gradient(90deg, transparent 0%, ${theme(
          "colors.navy.DEFAULT"
        )} 32%, ${theme("colors.navy.DEFAULT")} 67%, transparent 100%)`,
        "gradient-4": `linear-gradient(transparent 3%, ${theme(
          "colors.navy.DEFAULT"
        )} 100%)`,
        "gradient-5": `linear-gradient(transparent 0%, ${theme(
          "colors.navy.DEFAULT"
        )} 20%, ${theme("colors.navy.DEFAULT")} 72%, transparent 100%)`,
        "gradient-3-dark": `linear-gradient(90deg, transparent 0%, ${theme(
          "colors.black"
        )} 32%, ${theme("colors.black")} 67%, transparent 100%)`,
        "gradient-4-dark": `linear-gradient(transparent 3%, ${theme(
          "colors.black"
        )} 100%)`,
        "gradient-5-dark": `linear-gradient(transparent 0%, ${theme(
          "colors.black"
        )} 20%, ${theme("colors.black")} 72%, transparent 100%)`,
        "gradient-6": `linear-gradient(90deg, ${theme(
          "colors.gradient-blue.DEFAULT"
        )} 0%,${theme("colors.gradient-purple.DEFAULT")} 16.5%,${theme(
          "colors.gradient-pink.DEFAULT"
        )} 45%,${theme("colors.gradient-red.DEFAULT")} 60.5%)`,
      }),
      padding: {
        "2.5": "0.625rem",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
      },
      fontFamily: {
        serif: ["var(--font-astoria)"],
        sans: ["var(--font-inter)"],
        poppins:["var(--font-poppins)"]
      },
      gap: {
        "18": "4.5rem",
      },
      fontSize: {
        "12.5": "3.125rem",
        "17.5": "4.375rem",
      },
      boxShadow: {
        modal: "0px 0px 22px 0px rgba(0,0,0,0.15)",
        "content-box": "2px 2px 10px 0px rgba(188, 188, 188, 0.50)",
        "content-box-dark": "0px 0px 12px 0px rgba(0, 0, 0, 0.15)",
        "progress-bar": "0px 0px 3px 0px rgba(0, 0, 0, 0.25) inset",
        dropdown: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        calendar: "2px 16px 19px 0px rgba(0, 0, 0, 0.09)",
      },
      animation: {
        loading1: "loadingPath1 2s linear infinite",
        loading2: "loadingPath2 2s linear infinite",
        loading3: "loadingPath3 2s linear infinite",
        loading4: "loadingPath4 2s linear infinite",
      },
      keyframes: {
        loadingPath1: {
          "0%": { transform: "rotate(225deg)" },
          "37.5%": { transform: "rotate(495deg)" },
          "50%": { transform: "rotate(495deg)" },
          "75%": { transform: "rotate(585deg)" },
          "100%": { transform: "rotate(585deg)" },
        },
        loadingPath2: {
          "0%": { transform: "translate(0px, 0px)" },
          "37.5%": { transform: "translate(0px, 0px)" },
          "50%": { transform: "translate(50%, 50%)", opacity: "1" },
          "50.0001%": { opacity: "0" },
          "75%": { transform: "translate(0px, 0px)", opacity: "0" },
          "99.999%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        loadingPath3: {
          "0%": { transform: "rotate(675deg)", opacity: "0" },
          "37.5%": { transform: "rotate(675deg)" },
          "50%": { transform: "rotate(675deg)", opacity: "0" },
          "50.0001%": { transform: "rotate(675deg)", opacity: "1" },
          "87.5%": { transform: "rotate(405deg)" },
          "100%": { transform: "rotate(405deg)" },
        },
        loadingPath4: {
          "0%": { transform: "translate(0px, 0px)" },
          "87.5%": { transform: "translate(0px, 0px)" },
          "100%": { transform: "translate(-50%, 50%)" },
        },
      },
      transitionDuration: {
        "duration-1500": "1500ms",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }: PluginAPI) {
      addVariant(
        "mobile-only",
        "@media screen and (max-width: theme('screens.sm'))"
      );
      addVariant(
        "tablet-down",
        "@media screen and (max-width: theme('screens.md'))"
      );
    }),
  ],
};
export default config;
