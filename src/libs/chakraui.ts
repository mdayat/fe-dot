import { extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";

const { Button, Heading } = chakraTheme.components;
const theme = extendBaseTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Button,
    Heading,
  },
});

export { theme };
