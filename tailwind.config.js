/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/customers/*.liquid",
    "./templates/*.liquid",
    "./sections/*.json",
    "./templates/*.json",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: {
            DEFAULT: "#FFFFFF",
            rgb: "rgb(255, 255, 255)",
            hsl: "hsl(0, 0%, 100%)",
          },
          "extra-light": {
            DEFAULT: "#F5F5F7",
            rgb: "rgb(245, 245, 247)",
            hsl: "hsl(240, 11%, 96%)",
          },
          "light-gray": {
            DEFAULT: "#D2D2D7",
            rgb: "rgb(210, 210, 215)",
            hsl: "hsl(240, 6%, 83%)",
          },
          gray: {
            DEFAULT: "#808080",
            rgb: "rgb(128, 128, 128)",
            hsl: "hsl(0, 0%, 50%)",
          },
          "dark-gray": {
            DEFAULT: "#424245",
            rgb: "rgb(66, 66, 69)",
            hsl: "hsl(240, 2%, 26%)",
          },
          black: {
            DEFAULT: "#121212",
            rgb: "rgb(18, 18, 18)",
            hsl: "hsl(0, 0%, 7%)",
          },
        },
        status: {
          success: {
            DEFAULT: "#32936F",
            rgb: "rgb(50, 147, 111)",
            hsl: "hsl(158, 49%, 39%)",
          },
          error: {
            DEFAULT: "#F55F56",
            rgb: "rgb(245, 95, 86)",
            hsl: "hsl(3, 89%, 65%)",
          },
        },
      },
      fontSize: {
        // Desktop Typography
        "desktop-heading-1": ["67px", "120%"],
        "desktop-heading-2": ["50px", "120%"],
        "desktop-heading-3": ["38px", "120%"],
        "desktop-heading-4": ["28px", "120%"],
        "desktop-heading-5": ["21px", "120%"],
        "desktop-heading-6": ["16px", "120%"],
        "desktop-subtitle": ["18px", "120%"],
        "desktop-body": ["16px", "140%"],
        "desktop-button": ["16px", "120%"],
        "desktop-links": ["16px", "120%"],
        "desktop-overline": ["14px", "120%"],
        "desktop-caption": ["14px", "120%"],
        "desktop-hero-caption": ["18px", "140%"],
        "desktop-caption-small": ["12px", "120%"],

        // Mobile Typography
        "mobile-heading-1": ["40px", "120%"],
        "mobile-heading-2": ["34px", "120%"],
        "mobile-heading-3": ["26px", "120%"],
        "mobile-heading-4": ["22px", "120%"],
        "mobile-heading-5": ["18px", "120%"],
        "mobile-heading-6": ["16px", "100%"],
        "mobile-subtitle": ["18px", "140%"],
        "mobile-body": ["16px", "140%"],
        "mobile-button": ["14px", "100%"],
        "mobile-links": ["14px", "120%"],
        "mobile-overline": ["12px", "120%"],
        "mobile-caption": ["14px", "120%"],
        "mobile-hero-caption": ["14px", "140%"],
        "mobile-caption-small": ["12px", "120%"],
        "mobile-small-description": ["11px", "120%"],
      },
      fontFamily: {
        bodyFont: ["var(--body-font)", "sans-serif"],
        headingFont: ["var(--heading-font)", "sans-serif"],
      },
      fontWeight: {
        semibold: 600,
        medium: 500,
        regular: 400,
      },
      textTransform: {
        uppercase: "uppercase",
      },
      screens: {
        md: "768px", // tablet
        lg: "1440px", // large screen
      },
      animation: {
        'infinite-slider': 'infiniteSlider 20s linear infinite',
        fadeIn: "fadeIn 0.2s ease-in-out forwards",
      },
      keyframes: {
        infiniteSlider: {
          '0%': { transform: 'translateX(0)' },
          '100%': {
            transform: 'translateX(calc(-250px * 5))',
          },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },  
    },
  },
};
