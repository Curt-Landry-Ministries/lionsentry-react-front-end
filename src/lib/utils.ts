"use server";
import { cookies } from "next/headers";
import { logout, refreshUserToken } from "./auth/actions";
import { LOCAL_TESTING } from "./utils-global";

const validateAuthToken = async () => {
  const cookiesStore = await cookies();

  const authToken = cookiesStore.get("authToken")?.value;
  const startTime = cookiesStore.get("startAuth")?.value;
  const expiresIn = cookiesStore.get("expiresIn")?.value;
  const refreshToken = cookiesStore.get("refreshToken")?.value;

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
  const cookiesStore = await cookies();
  return !!cookiesStore.get("authToken")?.value;
};

const hasWhyStatement = async () => {
  const cookiesStore = await cookies();
  return cookiesStore.get("whyStatement")?.value;
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
