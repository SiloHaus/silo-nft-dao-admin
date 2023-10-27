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
  step5: "#DF7676", // hover bg
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

export const siloTheme: ThemeOverrides = {
  themeName: "silo",
  ...defaultDarkTheme,
  rootBgColor: neutralDark.step1,
  rootFontColor: secondaryDark.step12,
  primary: { ...primaryDark },
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
};
