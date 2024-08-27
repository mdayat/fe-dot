import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Hide,
  Stack,
  Text,
} from "@chakra-ui/react";

import { auth } from "../libs/firebaseApp";

const provider = new GoogleAuthProvider();
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(
        new Error("Error when sign in with Google: ", { cause: error })
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      height="100vh"
    >
      <Hide below="lg">
        <GridItem bgColor="teal.600" position="relative">
          <Stack
            width="100%"
            position="absolute"
            top="50%"
            transform="translate(-50%,-50%)"
            left="50%"
            padding="24px"
          >
            <Heading
              as="h1"
              size="2xl"
              lineHeight="100%"
              color="white"
              marginBottom="16px"
            >
              Begin your journey with our services.
            </Heading>

            <Text fontSize="large" color="white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
              facilis molestiae sint deleniti alias, quo, dignissimos eaque
              perferendis quasi natus delectus.
            </Text>
          </Stack>
        </GridItem>
      </Hide>

      <GridItem position="relative">
        <Stack
          width="100%"
          maxWidth="384px"
          position="absolute"
          top="50%"
          transform="translate(-50%,-50%)"
          left="50%"
          boxShadow="2xl"
          padding="24px"
          borderRadius="8px"
        >
          <Heading as="h2" fontSize="3xl" textAlign="left">
            Welcome back!
          </Heading>

          <Text maxWidth="320px" marginBottom="6">
            Sign in with your existing Google account to continue access.
          </Text>

          <Button
            isLoading={isLoading}
            onClick={handleLogin}
            colorScheme="teal"
          >
            Login with Google
          </Button>
        </Stack>
      </GridItem>
    </Grid>
  );
}
