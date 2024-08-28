import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { Box, Spinner } from "@chakra-ui/react";

import { auth } from "../libs/firebaseApp";

interface User {
  name: string;
  avatarURL: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({ user: null, setUser: () => {} });

function UserProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUser({
          name: user.displayName ?? "John Doe",
          avatarURL: user.photoURL ?? "",
        });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Box width="100vw" height="100vh">
        <Spinner
          size="xl"
          thickness="4px"
          color="teal.600"
          position="absolute"
          top="50%"
          transform="translate(-50%,-50%)"
          left="50%"
        />
      </Box>
    );
  }

  if (user === null && router.pathname !== "/login") {
    router.replace("/login");
    return <></>;
  }

  if (user !== null && router.pathname === "/login") {
    router.replace("/");
    return <></>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
