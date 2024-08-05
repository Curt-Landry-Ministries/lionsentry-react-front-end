"use server";
import { cookies } from "next/headers";

const LOCAL_TESTING: string = "false"; // change to true when testing locally

const getBaseUrl = (isAuth: boolean) : string => {

  if (LOCAL_TESTING === "true"){
    return "http://localhost:5002"; 
  }
  else {
    return  `https://api.lionsentry.com/${isAuth ? 'auth_server' : 'app_server'}`; 
  }
}

const validateAuthToken = () => {
  const authToken = cookies().get('authToken')?.value;

  if(!authToken) {
    throw new Error('Authentication required');
  }
  else {
    return authToken;
  }
}

const isLoggedIn = () => {
  return !!cookies().get('authToken')?.value;
}

export { getBaseUrl, validateAuthToken, isLoggedIn }