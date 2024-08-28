import { useContext } from "react";
import { Avatar, Box, Button, Stack } from "@chakra-ui/react";

import { UserContext } from "../context/User";
import { NextIcon } from "./NextIcon";
import { auth } from "../libs/firebaseApp";

export function Navbar() {
  const { user } = useContext(UserContext);

  async function handleLogout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(new Error("Error when logout: ", { cause: error }));
    }
  }

  return (
    <Box as="header" backgroundColor="gray.100" boxShadow="md">
      <Stack
        paddingX={{ base: "32px", lg: "64px" }}
        maxWidth="1280px"
        marginX="auto"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingY="8px"
      >
        <NextIcon />

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          columnGap="24px"
        >
          <Button onClick={handleLogout} variant="outline" colorScheme="red">
            Logout
          </Button>
          <Avatar name={user?.name} src={user?.avatarURL} />
        </Stack>
      </Stack>
    </Box>
  );
}
