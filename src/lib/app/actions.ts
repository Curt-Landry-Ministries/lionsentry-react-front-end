"use server";

import { User } from "../stores/userStore";
import { getBaseUrl, validateAuthToken } from "../utils";
import { cookies } from "next/headers";

const BASE_URL = getBaseUrl(false);

export const fetchUserData = async () => {
  const userID = cookies().get("userID")?.value;
  const authToken = validateAuthToken();
  let userData: User = {
    isLoading: false,
    name: "",
    email: "",
    logins: [],
    profile_photo: "",
    devotionals: [],
    emails: [],
    whyStatements: [],
    onboardingAnswers: [],
    goals: [],
  };

  if (!userID || !authToken) throw new Error("Unauthorized access!");

  const resp = await fetch(`${BASE_URL}/get-user-info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  const respNameEmail = await resp.json();

  userData.name = respNameEmail.firstName + " " + respNameEmail.lastName;
  userData.email = respNameEmail.email;

  const devotionals = await fetchDevotionals();
  const goals = await fetchGoals();
  const whyStatement = await getLatestWhyStatementFromServer();

  userData.devotionals = devotionals ? devotionals : [];
  userData.goals = goals ? goals : [];
  userData.whyStatements = whyStatement ? [whyStatement] : [];

  return userData;
};

export const fetchGoals = async () => {
  const authToken = validateAuthToken();

  const resp = await fetch(`${BASE_URL}/get-goals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch goals from the server");

  return await resp.json();
};

export const fetchDevotionals = async () => {
  const authToken = validateAuthToken();
  const resp = await fetch(`${BASE_URL}/get-devotionals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch devotionals from the server");

  return await resp.json();
};

export const submitAnswerToServer = async (
  answer: string,
  question: string,
  questionIndex: number
) => {
  const authToken = validateAuthToken();

  const resp = await fetch(`${BASE_URL}/submit-onboarding-answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ answer, question, questionIndex }),
  });
  const respData = await resp.json();
  return respData;
};

export const fetchAnswersFromServer = async (authToken: string) => {
  const resp = await fetch(`${BASE_URL}/get-answers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch answers from the server");

  return await resp.json();
};

export const generateWhyStatementFromAnswers = async (
  questions: any[],
  answers: string[]
) => {
  const authToken = validateAuthToken();

  const questionsAnswers = questions.map((q, index) => ({
    questions: q.title,
    answer: answers[index] || "",
  }));

  console.log("Sending questions and answers to server:", questionsAnswers);

  try {
    const resp = await fetch(`${BASE_URL}/generate-why-statement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ questionsAnswers }),
    });
    console.log("Received response:", resp);

    if (!resp.ok) {
      console.log("Error generation whyStatement:", resp);
      throw new Error(`HTTP error!: ${resp.status}`);
    }

    const respData = await resp.json();

    if ("error" in respData) {
      throw new Error(respData.error);
    } else {
      return respData.whyStatement;
    }
  } catch (error) {
    console.error("Error in generating Why Statement:", error);

    throw error;
  }
};

export const generateDevotional = async (): Promise<DevotionalContent> => {
  const authToken = validateAuthToken();

  const resp = await fetch(`${BASE_URL}/generate-devotional`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ saveToFirestore: true }),
  });

  if (resp.ok) {
    const respData: DevotionalContent = await resp.json();

    return respData;
  } else {
    console.error("Response status:", resp.status);
    throw new Error(`HTTP error! status: ${resp.status}`);
  }
};

export const saveUserDataPoint = async (
  key: string,
  value: any,
  action: "replace" | "append" = "replace"
) => {
  const authToken = validateAuthToken();

  const resp = await fetch(`${BASE_URL}/save-user-data-point`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      targetUserId: cookies().get("userID")?.value,
      dataPoint: key,
      action: action,
      value: JSON.stringify(value),
    }),
  });
  const respData = await resp.json();

  if (!resp.ok) {
    console.error("Server responsded with error:", respData);

    // Provide more specific error messages based on status code
    if (resp.status === 401) {
      throw new Error("Unauthorized access");
    } else if (resp.status === 403) {
      throw new Error("Forbidden access");
    } else {
      throw new Error("An error occurred while saving data");
    }
  }

  return respData;
};

export const getLatestWhyStatementFromServer = async (): Promise<any> => {
  const authToken = validateAuthToken();

  const resp = await fetch(`${BASE_URL}/get-latest-why-statement`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (resp.ok) {
    const respData = await resp.json();

    if (respData && respData.whyStatement) {
      cookies().set(respData.whyStatement);
      return respData;
    } else {
      throw new Error("No Why Statement field found");
    }
  } else if (resp.status === 404) {
    throw new Error("No Why Statement found for the user");
  } else {
    throw new Error("Failed to retrieve the latest Why Statement");
  }
};

export const getLatestWhyStatement = async (): Promise<string | null> => {
  const storeStatement = cookies().get("whyStatement")?.value;

  if (storeStatement) return storeStatement;

  const requestStatement = await getLatestWhyStatementFromServer();

  if (requestStatement) return requestStatement;

  throw new Error("Error getting latest why statement");
};

export const fetchQuestionsFromServer = async (): Promise<Question[]> => {
  const resp = await fetch(`${BASE_URL}/get-questions`);

  if (!resp.ok) {
    throw new Error("Failed to fetch questions from the server");
  }

  return await resp.json();
};
