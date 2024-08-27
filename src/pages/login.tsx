import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../libs/firebaseApp";

const provider = new GoogleAuthProvider();
export default function Login() {
  async function handleLogin() {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(
        new Error("Error when sign in with Google: ", { cause: error })
      );
    }
  }

  return (
    <>
      <button onClick={handleLogin} type="button">
        Login
      </button>
    </>
  );
}
