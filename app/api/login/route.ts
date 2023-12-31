import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

//Route handler login endpoint that
//gets the client ID token from headers
//verifies it
//creates a session cookie
//and sets it in the browser
//the session can then be verified with getUser()
export async function POST() {
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return new NextResponse("", {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
