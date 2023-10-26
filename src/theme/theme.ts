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

export const siloTheme: ThemeOverrides = {
  themeName: "silo",
  ...defaultDarkTheme,
  rootBgColor: neutralDark.step1,
  rootFontColor: secondaryDark.step12,
  primary: { ...primaryDark },
  button: {
    primary: primaryDarkBtn,
    secondary: secondaryDarkBtn,
    success: successDarkBtn,
    warning: warningDarkBtn,
    danger: dangerDarkBtn,
    radius: border.radius,
  },
};
