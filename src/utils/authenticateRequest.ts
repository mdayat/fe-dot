import type { NextApiRequest } from "next";
import { auth } from "../libs/firebaseAdmin";

async function authenticateRequest(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    throw new Error("Invalid JWT Token");
  }

  const splittedHeader = authHeader.split(" ");
  if (splittedHeader.length !== 2 || splittedHeader?.[0] !== "Bearer") {
    throw new Error("Invalid JWT Token");
  }

  const jwtToken = splittedHeader[1];
  try {
    await auth.verifyIdToken(jwtToken);
  } catch (error) {
    throw new Error("Invalid JWT Token: ", { cause: error });
  }
}

export { authenticateRequest };
