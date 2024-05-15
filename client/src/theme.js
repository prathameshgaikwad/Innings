import { extendTheme } from "@mui/joy/styles";

const myTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#D6CFA5",
          100: "#CDC591",
          200: "#C3BA7D",
          300: "#BAAF69",
          400: "#B1A555",
          500: "#A09449",
          600: "#8C8240",
          700: "#786F37",
          800: "#645D2E",
          900: "#504A25",
        },
        secondary: {
          50: "#C3C7E3",
          100: "#AFB5DA",
          200: "#9BA2D0",
          300: "#868FC6",
          400: "#727CBD",
          500: "#5D69B3",
          600: "#4D59A4",
          700: "#444E90",
          800: "#3A437B",
          900: "#303867",
          outlinedColor: "var(--joy-palette-secondary-500)",
          outlinedBorder: "var(--joy-palette-secondary-300)",
          outlinedHoverBg: "var(--joy-palette-secondary-100)",
          outlinedActiveBg: "var(--joy-palette-secondary-200)",
          outlinedDisabledColor: "var(--joy-palette-neutral-400)",
          outlinedDisabledBorder: "var(--joy-palette-neutral-200)",
          plainColor: "var(--joy-palette-secondary-700)",
          plainHoverBg: "var(--joy-palette-secondary-50)",
          plainActiveBg: "var(--joy-palette-secondary-200)",
          plainDisabledColor: "var(--joy-palette-neutral-400)",
          softColor: "var(--joy-palette-secondary-700)",
          softBg: "var(--joy-palette-secondary-100)",
          softHoverBg: "var(--joy-palette-secondary-200)",
          softActiveColor: "var(--joy-palette-secondary-800)",
          softActiveBg: "var(--joy-palette-secondary-300)",
          softDisabledColor: "var(--joy-palette-neutral-400)",
          softDisabledBg: "var(--joy-palette-neutral-50)",
          solidColor: "var(--joy-palette-common-white)",
          solidBg: "var(--joy-palette-secondary-500)",
          solidHoverBg: "var(--joy-palette-secondary-600)",
          solidActiveBg: "var(--joy-palette-secondary-700)",
          solidDisabledColor: "var(--joy-palette-neutral-400)",
          solidDisabledBg: "var(--joy-palette-neutral-100)",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F8F9FA",
          200: "#CFD6DD",
          300: "#BAC4CE",
          400: "#A5B3C0",
          500: "#596B7D",
          600: "#455361",
          700: "#38434E",
          800: "#2B333C",
          900: "#1E242A",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        background: {},
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#DED9B8",
          100: "#D4CCA1",
          200: "#C9C08A",
          300: "#BEB373",
          400: "#B4A65B",
          500: "#A2954B",
          600: "#8B8040",
          700: "#746B35",
          800: "#5D552B",
          900: "#464020",
        },
        secondary: {
          50: "#C3C7E3",
          100: "#B9BEDF",
          200: "#9199CD",
          300: "#6974BA",
          400: "#4955A0",
          500: "#374078",
          600: "#2E3564",
          700: "#252A50",
          800: "#1C203C",
          900: "#121528",
          outlinedColor: "var(--joy-palette-secondary-200)",
          outlinedBorder: "var(--joy-palette-secondary-700)",
          outlinedHoverBg: "var(--joy-palette-secondary-800)",
          outlinedActiveBg: "var(--joy-palette-secondary-700)",
          outlinedDisabledColor: "var(--joy-palette-neutral-500)",
          outlinedDisabledBorder: "var(--joy-palette-neutral-800)",
          plainColor: "var(--joy-palette-secondary-300)",
          plainHoverBg: "var(--joy-palette-secondary-700)",
          plainActiveBg: "var(--joy-palette-secondary-700)",
          plainDisabledColor: "var(--joy-palette-neutral-500)",
          softColor: "var(--joy-palette-secondary-200)",
          softBg: "var(--joy-palette-secondary-800)",
          softHoverBg: "var(--joy-palette-secondary-700)",
          softActiveColor: "var(--joy-palette-secondary-100)",
          softActiveBg: "var(--joy-palette-secondary-600)",
          softDisabledColor: "var(--joy-palette-neutral-500)",
          softDisabledBg: "var(--joy-palette-neutral-800)",
          solidColor: "var(--joy-palette-common-white)",
          solidBg: "var(--joy-palette-secondary-500)",
          solidHoverBg: "var(--joy-palette-secondary-600)",
          solidActiveBg: "var(--joy-palette-secondary-700)",
          solidDisabledColor: "var(--joy-palette-neutral-500)",
          solidDisabledBg: "var(--joy-palette-neutral-800)",
        },
        neutral: {
          50: "#fafbfc",
          100: "#f8f9fa",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#6c757d",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        warning: {
          50: "#F7BA37",
          100: "#F6B528",
          200: "#F5AE14",
          300: "#EBA40A",
          400: "#D79609",
          500: "#C48808",
          600: "#B07B07",
          700: "#9D6D07",
          800: "#895F06",
          900: "#765205",
        },
        background: {
          body: "var(--joy-palette-neutral-900)",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          transition: "all 0.25s ease-in-out",
        },
      },
    },
  },
});

export default myTheme;
