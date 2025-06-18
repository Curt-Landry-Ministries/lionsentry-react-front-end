const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const LOCAL_TESTING: boolean = process.env.NEXT_PUBLIC_LOCAL_TESTING === "true"; // change to true when testing locally
export const CURRENT_AI_DISCLAIMER_VERSION = "1.0";

const getBaseUrl = (isAuth: boolean): string => {
  return `https://${LOCAL_TESTING ? "test-api" : "api"}.lionsentry.com/${
    isAuth ? "auth_server" : "app_server"
  }`;
};

const isValidTimezone = (tz: string) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch (err) {
    return false;
  }
};
export { formatDate, getBaseUrl, isValidTimezone, LOCAL_TESTING };
