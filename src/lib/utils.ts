"use server";
import { cookies } from "next/headers";

const LOCAL_TESTING: boolean = process.env.NEXT_PUBLIC_LOCAL_TESTING === "true"; // change to true when testing locally

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

const hasWhyStatement = () => {
  return !!cookies().get("whyStatement")?.value;
};

const logError = (error: any) => {
  if (LOCAL_TESTING) {
    console.error("Server Error:", error);
  }
  throw new Error(error);
};

const logTest = (message: any) => {
  if (LOCAL_TESTING) {
    console.log(message);
  }
};

export {
  getBaseUrl,
  validateAuthToken,
  isLoggedIn,
  hasWhyStatement,
  logError,
  logTest,
};
