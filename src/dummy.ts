import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

type UserSchema = z.infer<typeof userSchema>;

class UserManager {
  private registeredUsers: UserSchema[] = [
    {
      id: uuidv4(),
      name: "John",
      email: "john@gmail.com",
      password: "johnsecret",
    },
  ];

  private _loggedInUser: UserSchema | undefined;

  get loggedInUser(): UserSchema | undefined {
    return this._loggedInUser;
  }

  public login(user: Pick<UserSchema, "email" | "password">) {
    const registeredUser = this.registeredUsers.find(
      (registeredUser) =>
        registeredUser.email === user.email &&
        registeredUser.password === user.password
    );

    if (!registeredUser) {
      throw new Error("user not found");
    }

    this._loggedInUser = registeredUser;
  }

  public register(user: Pick<UserSchema, "email" | "password" | "name">) {
    this.registeredUsers.push({
      id: uuidv4(),
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

const userManager = new UserManager();

export { userManager, userSchema };
