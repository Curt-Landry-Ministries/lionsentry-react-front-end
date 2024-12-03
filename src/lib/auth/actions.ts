"use server";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { getBaseUrl } from "../utils-global";
import { logError, logTest } from "../utils";
import { cookies } from "next/headers";
import { createServerAction, ServerActionError } from "../action-utils";
import { redirect } from "next/navigation";
import { Paths } from "../constants";

const BASE_URL = getBaseUrl(true);

export const login = createServerAction(
  async (credentials: UserCredentials): Promise<any> => {
    const { email, password } = credentials;

    const resp = await fetch(`${BASE_URL}/get-id-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const respData = await resp.json();

    if (!resp.ok) {
      throw new ServerActionError(respData.error || "Failed to login");
    }

    if (resp.ok && respData.idToken) {
      cookies().set("authToken", respData.idToken);
      cookies().set("refreshToken", respData.refreshToken);
      cookies().set("expiresIn", respData.expiresIn);
      cookies().set("startAuth", new Date().toString());

      const decodedToken: any = jwtDecode(respData.idToken);
      const userId = decodedToken.user_id;

      cookies().set("userID", userId);

      logTest(`User Logged in: ${email}`);

      return true;
    }
  }
);

export const refreshUserToken = createServerAction(async (): Promise<any> => {
  const refreshToken = cookies().get("refreshToken")?.value;

  const resp = await fetch(`${BASE_URL}/refresh-id-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refreshToken: refreshToken,
    }),
  });

  const respData = await resp.json();

  if (!resp.ok) {
    throw new ServerActionError(respData.error || "Failed to refresh token");
  }

  if (resp.ok && respData.idToken) {
    cookies().set("authToken", respData.idToken);
    cookies().set("refreshToken", respData.refreshToken);
    cookies().set("expiresIn", respData.expiresIn);
    cookies().set("startAuth", new Date().toString());

    return respData.idToken;
  }
});

export const logout = async (): Promise<void> => {
  cookies().delete("authToken");
  cookies().delete("userID");
  cookies().delete("refreshToken");
  cookies().delete("expiresIn");
  cookies().delete("startAuth");
  cookies().delete("whyStatement");

  redirect(Paths.Login);
};

export const signup = createServerAction(
  async (credentials: UserCredentials): Promise<any> => {
    const { email, password } = credentials;

    const resp = await fetch(`${BASE_URL}/create-user-manually`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    const data = await resp.json();

    if ("uid" in data) {
      return data;
    }

    if (!resp.ok) {
      throw new ServerActionError(data.error || "Failed to signup");
    }
  }
);

export const fetchUserId = createServerAction(async (): Promise<any> => {
  const resp = await fetch(`${BASE_URL}/get-id-token`);
  const respData = await resp.json();

  if (resp.ok && respData.idToken) {
    const idToken = respData.idToken;
    const decodedToken: any = jwtDecode(idToken);
    const userID = decodedToken.user_id;

    cookies().set("userID", userID);
    return userID;
  }

  if (!resp.ok || !respData.idToken) {
    throw new ServerActionError(respData.error || "Failed to fetch user id");
  }
});

export const deleteUser = createServerAction(async (): Promise<void> => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (currentUser) {
    const idToken = await currentUser.getIdToken();
    const userID = currentUser.uid;

    const resp = await fetch(`${BASE_URL}/delete-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: userID, idToken: idToken }),
    });

    const respData = await resp.json();

    if (resp.ok) {
      logTest(`User deleted successfully: ${respData.message}`);
      await logout();
    } else {
      throw new ServerActionError(`Failed to delete user: ${respData.error}`);
    }
  }
});
