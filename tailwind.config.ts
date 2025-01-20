import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px",
            },
            colors: {
                primary: {
                    "100": "#fae4c1",
                    DEFAULT: "#e7580f",
                },
                secondary: "#ed6060",
                black: {
                    "100": "#6d84b2",
                    "200": "#56688d",
                    "300": "#7D8087",
                    DEFAULT: "#465573",
                },
                white: {
                    "100": "#fbfcf7",
                    DEFAULT: "#f0ecdf",
                },
            },
            fontFamily: {
                "roboto-condensed": ["var(--font-roboto-condensed)"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(238, 43, 105)",
            },
        },
    },
    plugins: [
        tailwindcssAnimate,
        typography,
    ],
};

export default config;