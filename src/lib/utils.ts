"use server";
import { cookies } from "next/headers";
import { logout, refreshUserToken } from "./auth/actions";
import { LOCAL_TESTING } from "./utils-global";

const validateAuthToken = async () => {
  const authToken = cookies().get("authToken")?.value;
  const startTime = cookies().get("startAuth")?.value;
  const expiresIn = cookies().get("expiresIn")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!authToken || !startTime || !expiresIn || !refreshToken) await logout();

  const now = new Date();
  const isExpired =
    (now.valueOf() - new Date(startTime as string).valueOf()) / 1000 >
    parseInt(expiresIn as string);

  if (isExpired) {
    await logout();
  } else {
    const freshToken = await refreshUserToken();

    if (!freshToken.success) await logout();
    else return freshToken.value;
  }
};

const isLoggedIn = async () => {
  return Promise.resolve(!!cookies().get("authToken")?.value);
};

const hasWhyStatement = async () => {
  return Promise.resolve(!!cookies().get("whyStatement")?.value);
};

const logError = (error: any) => {
  if (LOCAL_TESTING) {
    console.error("Server Error:", error);
  }
};

const logTest = (message: any) => {
  if (LOCAL_TESTING) {
    console.log(message);
  }
};

export { validateAuthToken, isLoggedIn, hasWhyStatement, logError, logTest };
