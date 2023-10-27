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
  step1: "#663333", // background
  step2: "#FFFFFF", // text
  step3: "hsl(0, 0%, 22%)", // 
  step4: "hsl(0, 0%, 0%)",
  step5: "#DF7676", // hover bg
};

export const siloPrimaryBtn = {
  ...primaryDarkBtn,
  solid: {
    text: siloMono.step2,
    bg: siloMono.step1,
    border: siloMono.step1,
    bgHover: siloMono.step5,
    borderHover: siloMono.step5,
    bgFocus: siloMono.step2,
    borderFocus: siloMono.step1,
    bgDisabled: siloMono.step5,
    borderDisabled: siloMono.step3,
  },

export const siloTheme: ThemeOverrides = {
  themeName: "silo",
  ...defaultDarkTheme,
  rootBgColor: neutralDark.step1,
  rootFontColor: secondaryDark.step12,
  primary: { ...primaryDark },
  button: {
    primary: siloPrimaryBtn,
    secondary: secondaryDarkBtn,
    success: successDarkBtn,
    warning: warningDarkBtn,
    danger: dangerDarkBtn,
    radius: border.radius,
  },
};
