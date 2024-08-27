import { useContext } from "react";

import { UserContext } from "../context/User";
import { auth } from "../libs/firebaseApp";

export default function Home() {
  const { user } = useContext(UserContext);

  async function handleLogout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(new Error("Error when logout: ", { cause: error }));
    }
  }

  return (
    <main>
      <p>{user?.name}</p>
      <p>{user?.avatarURL}</p>
      <p>{user?.email}</p>

      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </main>
  );
}
