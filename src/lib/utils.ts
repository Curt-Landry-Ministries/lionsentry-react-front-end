"use server";
import { cookies } from "next/headers";

const LOCAL_TESTING: boolean = true; // change to true when testing locally

const getBaseUrl = (isAuth: boolean): string => {
  return `https://${LOCAL_TESTING ? "test-api" : "api"}.lionsentry.com/${
    isAuth ? "auth_server" : "app_server"
  }`;
};

const validateAuthToken = () => {
  const authToken = cookies().get("authToken")?.value;

  if (!authToken) {
    throw new Error("Authentication required");
  } else {
    return authToken;
  }
};

const isLoggedIn = async () => {
  return Promise.resolve(!!cookies().get("authToken")?.value);
};

export { getBaseUrl, validateAuthToken, isLoggedIn };
