import {
  defineStyle,
  defineStyleConfig,
  theme as chakraTheme,
} from "@chakra-ui/react";

// theme.js
export const theme = {
  initialColorMode: "light",
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    primary: chakraTheme.colors.blue,
  },
};
