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
import { auth } from "../libs/firebaseApp";

interface User {
  name: string;
  email: string;
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
          email: user.email ?? "",
          avatarURL: user.photoURL ?? "",
        });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h1 className="text-red-600 text-2xl text-center">LOADING...</h1>;
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
