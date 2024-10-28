"use server";

import { redirect, RedirectType } from "next/navigation";
import { User } from "../stores/userStore";
import { getBaseUrl, logError, logTest, validateAuthToken } from "../utils";
import { cookies } from "next/headers";
import { AuthedPaths } from "../constants";
import { logout } from "../auth/actions";

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

  if (!userID || !authToken) return { message: "Unauthorized Access" };

  try {
    const resp = await fetch(`${BASE_URL}/get-user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const respNameEmail = await resp.json();

    userData.name =
      `${respNameEmail.firstName} ${respNameEmail.lastName}`.replace(
        /['"]+/g,
        ""
      );
    userData.email = respNameEmail.email;

    const whyStatement = await getLatestWhyStatementFromServer();
    // if (!whyStatement) redirect(AuthedPaths.Questionnaire);
    const devotionals = await fetchDevotionals();
    const goals = await fetchGoals();

    userData.devotionals = devotionals ? devotionals : [];
    userData.goals = goals ? goals : [];
    userData.whyStatements = whyStatement ? [whyStatement] : [];
    userData.profile_photo = "/images/user_image.png"; // placeholder image for user

    return userData;
  } catch (error: any) {
    logError(error);
    if (error.error == "Invalid authentication token") logout();
  }
};

export const fetchGoals = async () => {
  const authToken = validateAuthToken();

  try {
    const resp = await fetch(`${BASE_URL}/get-goals`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!resp.ok) throw new Error("Failed to fetch goals from the server");

    return await resp.json();
  } catch (error) {
    logError(error);
  }
};

export const fetchDevotionals = async () => {
  const authToken = validateAuthToken();
  const resp = await fetch(`${BASE_URL}/get-devotionals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) {
    throw new Error("Failed to fetch devotionals from the server");
  }

  return await resp.json();
};

export const submitAnswerToServer = async (
  answer: string,
  question: string,
  questionIndex: number
) => {
  const authToken = validateAuthToken();

  try {
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
  } catch (error) {
    logError(error);
  }
};

export const fetchAnswersFromServer = async (authToken: string) => {
  const resp = await fetch(`${BASE_URL}/get-answers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) logError("Failed to fetch answers from the server");

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

  logTest(`Sending questions and answers to server`);
  logTest(questionsAnswers);

  try {
    const resp = await fetch(`${BASE_URL}/generate-why-statement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ questionsAnswers }),
    });
    logTest(`Received response:`);
    logTest(resp);

    if (!resp.ok) {
      logError("Error generation whyStatement");
    }

    const respData = await resp.json();

    if ("error" in respData) {
      throw new Error(respData.error);
    } else {
      cookies().set("whyStatement", respData.whyStatement);
      return respData.whyStatement;
    }
  } catch (error) {
    logError(error);
  }
};

export const generateDevotional = async (): Promise<
  DevotionalContent | undefined
> => {
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
    logError(resp);
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
    logTest(respData);

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
  cookies().delete("whyStatement");

  if (resp.ok) {
    const respData = await resp.json();

    if (respData && respData.whyStatement) {
      cookies().set("whyStatement", respData.whyStatement);
      return respData;
    } else {
      logTest("No Why Statement field found");
      return null;
    }
  } else if (resp.status === 404) {
    return null;
  } else {
    throw new Error("Failed to retrieve the latest Why Statement");
  }
};

export const getLatestWhyStatement = async (): Promise<string | null> => {
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

export const saveGoal = async ({
  goal,
  description,
  category,
}: Pick<Goal, "goal" | "description" | "category">): Promise<any> => {
  const authToken = validateAuthToken();

  console.log(
    JSON.stringify({
      goal: goal,
      category: category,
      description: description,
    })
  );
  const resp = await fetch(`${BASE_URL}/save-goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      goal: goal,
      category: category,
      description: description,
    }),
  });
  const respData = await resp.json();

  if (!resp.ok) {
    logError(respData);

    throw new Error("Failed to save yout goal");
  }

  return respData;

  // return {};
};
