import type { NextApiResponse } from "next";
import { onAuthStateChanged } from "@firebase/auth";

import { auth } from "../libs/firebaseApp";
import type { FailedResponse } from "../types/api";

function getUserIDToken() {
  return new Promise<string>((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        try {
          const idToken = await user.getIdToken(true);
          resolve(idToken);
        } catch (error) {
          reject(error);
        }
      } else {
        try {
          await auth.signOut();
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}

type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
function handleInvalidMethod(
  res: NextApiResponse,
  allowedMethods: HTTPMethod[]
): void {
  const payload: FailedResponse = {
    status: "failed",
    message: "Invalid HTTP Method",
  };

  res.setHeader("Allow", allowedMethods.join(", "));
  res.status(405).json(payload);
}

export { getUserIDToken, handleInvalidMethod };
