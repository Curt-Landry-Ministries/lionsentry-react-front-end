"use server";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import { getBaseUrl } from "../utils-global";
import { logTest, validateAuthToken } from "../utils";
import { cookies } from "next/headers";
import { createServerAction, ServerActionError } from "../action-utils";
import { redirect } from "next/navigation";
import { Paths } from "../constants";

const BASE_URL = getBaseUrl(true);

export const login = createServerAction(
  async (credentials: UserCredentials): Promise<any> => {
    const cookiesStore = await cookies();

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
      cookiesStore.set("authToken", respData.idToken);
      cookiesStore.set("refreshToken", respData.refreshToken);
      cookiesStore.set("expiresIn", respData.expiresIn);
      cookiesStore.set("startAuth", new Date().toString());

      const decodedToken: any = jwtDecode(respData.idToken);
      const userId = decodedToken.user_id;

      cookiesStore.set("userID", userId);

      logTest(`User Logged in: ${email}`);

      return true;
    }
  }
);

export const refreshUserToken = createServerAction(async (): Promise<any> => {
  const cookiesStore = await cookies();

  const refreshToken = cookiesStore.get("refreshToken")?.value;

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
    cookiesStore.set("authToken", respData.idToken);
    cookiesStore.set("refreshToken", respData.refreshToken);
    cookiesStore.set("expiresIn", respData.expiresIn);
    cookiesStore.set("startAuth", new Date().toString());

    return respData.idToken;
  }
});

export const logout = () => {
  const cookiesStore = cookies();

  cookiesStore.delete("authToken");
  cookiesStore.delete("userID");
  cookiesStore.delete("refreshToken");
  cookiesStore.delete("expiresIn");
  cookiesStore.delete("startAuth");
  cookiesStore.delete("whyStatement");

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
  const cookiesStore = await cookies();

  const resp = await fetch(`${BASE_URL}/get-id-token`);
  const respData = await resp.json();

  if (resp.ok && respData.idToken) {
    const idToken = respData.idToken;
    const decodedToken: any = jwtDecode(idToken);
    const userID = decodedToken.user_id;

    cookiesStore.set("userID", userID);
    return userID;
  }

  if (!resp.ok || !respData.idToken) {
    throw new ServerActionError(respData.error || "Failed to fetch user id");
  }
});

export const createKeapUser = createServerAction(
  async (email: string, firstName: string, lastName: string) => {
    const authToken = await validateAuthToken();

    const resp = await fetch(`${BASE_URL}/create-keap-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        email: email,
        firstName: firstName,
        lastName: lastName,
      }),
    });

    const respData = await resp.json();

    logTest(respData);

    if (resp.ok) return respData;
    else
      throw new ServerActionError(
        `Failed to create Keap user: ${respData.error}`
      );
  }
);

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

export const resetPassword = createServerAction(async (email: string) => {
  const resp = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });

  const respData = await resp.json();

  logTest(resp);

  if (resp.ok) return respData;
  else
    throw new ServerActionError(`Failed to reset password: ${respData.error}`);
});
