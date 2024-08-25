import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { getAuth, getIdToken } from "firebase/auth";
import axios from "axios";

//Get the user from the session cookie
//if theres no session or its invalid, return null
export default async function getUser() {
  const session = cookies().get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    const user = (await adminAuth.verifySessionCookie(session, true)) as any;

    if (!user) {
      await axios.post(`${process.env.NEXT_PUBLIC_LOCAL}/api/auth/logout`);
      deleteCookie("session");

      return null;
    }

    return user;
  } catch (error: any) {
    if (error?.errorInfo?.code === "auth/session-cookie-expired") {
      console.log("Session cookie expired. Refreshing...");
      console.log("USER_SESSION_ERROR", error?.errorInfo?.code);
      deleteCookie("session");
      console.log("cookie-deleted");
      try {
        // Refresh token on the client-side
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const idToken = await getIdToken(user);
          // Send the refreshed token to the server to update the session cookie
          return { refreshedToken: idToken };
        } else {
          console.log("User not logged in.");
          return null;
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        return null;
      }
    } else {
      // Handle other errors
      console.error("Error verifying session cookie:", error);
      throw error;
    }
  }
}
