import {
  ThemeOverrides,
  dangerDarkBtn,
  defaultDarkTheme,
  primaryDarkBtn,
  secondaryDarkBtn,
  successDarkBtn,
  warningDarkBtn,
} from "@daohaus/ui";
import { neutralDark, secondaryDark, primaryDark } from "./colors";

const border = {
  radius: "0.4rem",
};

export const siloMono = {
  step1: "#663333", // btn background
  step2: "#FFFFFF", // btn text
  step3: "#383838", // 2nd btn bg
  step4: "hsl(0, 0%, 0%)",
  step5: "#DF7676", // hover btn bg
  step6: "#202020" // card bg
};

export const siloPrimaryBtn = {
  ...primaryDarkBtn,
  solid: {
    text: siloMono.step2,
    bg: siloMono.step1,
    border: siloMono.step1,
    bgHover: siloMono.step5,
    borderHover: siloMono.step5,
    bgFocus: siloMono.step1,
    borderFocus: siloMono.step1,
    bgDisabled: siloMono.step1,
    borderDisabled: siloMono.step1,
  },
  ghost: {
    text: siloMono.step1,
    bgHover: neutralDark.step1,
    borderFocus: siloMono.step1,
    disabled: siloMono.step1,
  },
};

export const siloSecondaryBtn = {
  ...secondaryDarkBtn,
  solid: {
    text: siloMono.step2,
    bg: siloMono.step3,
    border: siloMono.step3,
    bgHover: siloMono.step1,
    borderHover: siloMono.step1,
    bgFocus: siloMono.step3,
    borderFocus: siloMono.step3,
    bgDisabled: siloMono.step3,
    borderDisabled: siloMono.step3,
  },
};

const siloFontFamily = {
  body: `'Open Sans', sans-serif`,
  header: `'Open Sans', sans-serif`,
  data: `'Open Sans', sans-serif`,
};

export const siloTheme: ThemeOverrides = {
  themeName: "silo",
  ...defaultDarkTheme,
  rootBgColor: neutralDark.step1,
  rootFontColor: secondaryDark.step12,
  primary: { ...primaryDark },
  font: {
    family: siloFontFamily,
    size: {
      xs: "1.2rem",
      sm: "1.4rem",
      md: "1.6rem",
      lg: "2rem",
      xl: "2.4rem",
      xxl: "3.2rem",
      xxxl: "4rem",
      xxxxl: "4.8rem",
    },
    weight: {
      extraLight: 200,
      light: 300,
      reg: 400,
      med: 500,
      bold: 700,
      black: 900,
    },
    lineHeight: "150%",
    letterSpacing: "1.5px",
  },
  field: {
    ...defaultDarkTheme.field,
    radius: "4px",
    inputFont: siloFontFamily.data,
    labelFont: siloFontFamily.header,
  },
  button: {
    primary: siloPrimaryBtn,
    secondary: siloSecondaryBtn,
    success: successDarkBtn,
    warning: warningDarkBtn,
    danger: dangerDarkBtn,
    radius: border.radius,
  },
  card: {
    bg: siloMono.step6,
    border: siloMono.step6,
    radius: '0.8rem',
  },
  input: {
    ...defaultDarkTheme.input,
    border: siloMono.step6,
    bg: siloMono.step6,
    color: siloMono.step2,
    hover: {
      bg: siloMono.step3,
      border: siloMono.step3,
    },
    focus: {
      bg: siloMono.step3,
      border: siloMono.step2,
    },
  },
  dropdown: {
    ...defaultDarkTheme.dropdown,
    content: {
      primary: {
        bg: siloMono.step6,
      },
      secondary: {
        bg: siloMono.step6,
      },
    },
    item: {
      primary: {
        bg: "transparent",
      },
      secondary: {
        bg: siloMono.step6,
      },
      focus: {
        primary: {
          bg: "transparent",
        },
        secondary: {
          bg: "transparent",
        },
      },
      highlight: {
        primary: {
          bg: siloMono.step3,
        },
        secondary: {
          bg: siloMono.step3,
        },
      },
      disabled: {
        color: siloMono.step6,
      },
    },
  },
};
