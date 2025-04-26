import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

type UserSchema = z.infer<typeof userSchema>;

interface AuthContextType {
  loggedInUser: UserSchema | null;
  login: (user: Pick<UserSchema, "email" | "password">) => void;
  register: (user: Pick<UserSchema, "email" | "password" | "name">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: PropsWithChildren) {
  const [loggedInUser, setLoggedInUser] = useState<UserSchema | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<UserSchema[]>([
    {
      id: uuidv4(),
      name: "John",
      email: "john@gmail.com",
      password: "johnsecret",
    },
  ]);

  const login = useCallback(
    (user: Pick<UserSchema, "email" | "password">) => {
      const registeredUser = registeredUsers.find(
        (registeredUser) =>
          registeredUser.email === user.email &&
          registeredUser.password === user.password
      );

      if (!registeredUser) {
        throw new Error("user not found");
      }

      setLoggedInUser(registeredUser);
    },
    [registeredUsers]
  );

  const register = useCallback(
    (user: Pick<UserSchema, "email" | "password" | "name">) => {
      setRegisteredUsers((registeredUsers) => [
        ...registeredUsers,
        {
          id: uuidv4(),
          name: user.name,
          email: user.email,
          password: user.password,
        },
      ]);
    },
    []
  );

  const value = useMemo((): AuthContextType => {
    return { loggedInUser, login, register };
  }, [loggedInUser, login, register]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuthContext, userSchema };
