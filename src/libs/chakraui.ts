import { extendBaseTheme, theme as chakraTheme } from "@chakra-ui/react";

const { Button, Heading, Avatar, Table, Alert, Skeleton, Spinner } =
  chakraTheme.components;
const theme = extendBaseTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Button,
    Heading,
    Avatar,
    Table,
    Alert,
    Skeleton,
    Spinner,
  },
});

export { theme };
