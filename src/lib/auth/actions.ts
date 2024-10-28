"use server";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { getBaseUrl, logError, logTest } from "../utils";
import { cookies } from "next/headers";

const BASE_URL = getBaseUrl(true);

export const login = async (credentials: UserCredentials): Promise<any> => {
  const { email, password } = credentials;

  const resp = await fetch(`${BASE_URL}/get-id-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  const respData = await resp.json();

  if (resp.ok && respData.idToken) {
    cookies().set("authToken", respData.idToken);

    const decodedToken: any = jwtDecode(respData.idToken);
    const userId = decodedToken.user_id;

    cookies().set("userID", userId);

    logTest(`User Logged in: ${email}`);

    return true;
  }

  logError(respData.error || "Failed to login");
};

export const logout = async (): Promise<void> => {
  cookies().delete("authToken");
  cookies().delete("userID");
  cookies().delete("whyStatement");
};

export const signup = async (credentials: UserCredentials): Promise<any> => {
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
    logTest(`Account created. UID: ${data.uid}`);

    return data;
  }

  if (!resp.ok) {
    logError(data.error || "Failed to signup");
  }
};

export const fetchUserId = async (): Promise<any> => {
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
    logError(respData.error || "Failed to fetch user id");
  }
};

export const deleteUser = async (): Promise<void> => {
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
      logError(`Failed to delete user: ${respData.error}`);
    }
  }
};
