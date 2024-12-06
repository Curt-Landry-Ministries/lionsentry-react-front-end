const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const LOCAL_TESTING: boolean = process.env.NEXT_PUBLIC_LOCAL_TESTING === "true"; // change to true when testing locally

const getBaseUrl = (isAuth: boolean): string => {
  return `https://${LOCAL_TESTING ? "test-api" : "api"}.lionsentry.com/${
    isAuth ? "auth_server" : "app_server"
  }`;
};
export { formatDate, getBaseUrl, LOCAL_TESTING };
