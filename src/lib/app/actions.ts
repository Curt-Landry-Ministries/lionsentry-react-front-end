"use server";

import { User } from "../stores/userStore";
import { getBaseUrl, logError, logTest, validateAuthToken } from "../utils";
import { cookies } from "next/headers";
import { logout } from "../auth/actions";
import { createServerAction, ServerActionError } from "../action-utils";
import { Paths } from "../constants";
import { redirect } from "next/navigation";

const BASE_URL = getBaseUrl(false);

export const fetchUserData = createServerAction(async () => {
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

  if (!userID || !authToken) throw new ServerActionError("Unauthorized Access");

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
    userData.profile_photo = respNameEmail.photoURL;

    const whyStatementResp = await getLatestWhyStatementFromServer();

    if (!whyStatementResp.success) {
      await logout();

      redirect(Paths.Login);
    }

    const devotionalsResp = await fetchDevotionals();
    const goalsResp = await fetchGoals();

    userData.devotionals = devotionalsResp.success ? devotionalsResp.value : [];
    userData.goals = goalsResp.success ? goalsResp.value : [];
    userData.whyStatements = whyStatementResp.success
      ? [whyStatementResp.value]
      : [];

    return userData;
  } catch (error: any) {
    if (error.error == "Invalid authentication token") logout();

    throw new ServerActionError(error || "Failed to fetch user data");
  }
});

export const fetchGoals = createServerAction(async () => {
  const authToken = validateAuthToken();

  try {
    const resp = await fetch(`${BASE_URL}/get-goals`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!resp.ok)
      throw new ServerActionError("Failed to fetch goals from the server");

    return await resp.json();
  } catch (error: any) {
    throw new ServerActionError(error.error || "Failed to fetch goal");
  }
});

export const fetchDevotionals = createServerAction(async () => {
  const authToken = validateAuthToken();
  const resp = await fetch(`${BASE_URL}/get-devotionals`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) {
    throw new ServerActionError("Failed to fetch devotionals from the server");
  }

  return await resp.json();
});

export const submitAnswerToServer = createServerAction(
  async (answer: string, question: string, questionIndex: number) => {
    const authToken = validateAuthToken();

    try {
      const resp = await fetch(`${BASE_URL}/submit-onboarding-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          abswer: answer,
          question: question,
          questionIndex: questionIndex,
        }),
      });
      const respData = await resp.json();

      return respData;
    } catch (error: any) {
      throw new ServerActionError(error.error || "Failed to submit answer");
    }
  }
);

export const fetchAnswersFromServer = createServerAction(
  async (authToken: string) => {
    const resp = await fetch(`${BASE_URL}/get-answers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!resp.ok)
      throw new ServerActionError("Failed to fetch answers from the server");

    return await resp.json();
  }
);

export const generateWhyStatementFromAnswers = createServerAction(
  async (questions: any[], answers: string[]) => {
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
        // body: JSON.stringify({ questionsAnswers }),
      });
      logTest(`Received response:`);
      logTest(await resp.json());

      if (!resp.ok) {
        throw new ServerActionError("Error generation whyStatement");
      }

      const respData = await resp.json();

      cookies().set("whyStatement", respData.whyStatement);
      return respData.whyStatement;
    } catch (error: any) {
      throw new ServerActionError(error.error);
    }
  }
);

export const updateDevotional = createServerAction(
  async ({ doc_id, isFavorite }: { doc_id: string; isFavorite: boolean }) => {
    const authToken = validateAuthToken();

    try {
      const resp = await fetch(`${BASE_URL}/update-devotional`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          doc_id: doc_id,
          isFavorite: isFavorite,
        }),
      });

      const respData = await resp.json();

      if (resp.ok) return respData;
    } catch (err: any) {
      throw new ServerActionError(err.error);
    }
  }
);

export const generateDevotional = createServerAction(
  async (): Promise<Devotional | undefined> => {
    const authToken = validateAuthToken();

    try {
      const resp = await fetch(`${BASE_URL}/generate-devotional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ saveToFirestore: true }),
      });
      const respData: Devotional = await resp.json();

      if (resp.ok) return respData;
    } catch (err: any) {
      throw new ServerActionError(err.error);
    }
  }
);

export const saveUserDataPoint = createServerAction(
  async (key: string, value: any, action: "replace" | "append" = "replace") => {
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
        throw new ServerActionError("Unauthorized access");
      } else if (resp.status === 403) {
        throw new ServerActionError("Forbidden access");
      } else {
        throw new ServerActionError("An error occurred while saving data");
      }
    }

    return respData;
  }
);

export const uploadProfilePhoto = createServerAction(
  async (formData: FormData): Promise<any> => {
    const authToken = validateAuthToken();

    if (cookies().get("userID")?.value) {
      formData.append("user_id", cookies().get("userID")?.value as string);
    }

    const resp = await fetch(`${BASE_URL}/upload-profile-photo`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });

    const respData = await resp.json();

    if (!resp.ok) {
      throw new ServerActionError("Failed to upload profile photo");
    }

    return respData;
  }
);
export const getLatestWhyStatementFromServer = createServerAction(
  async (): Promise<any> => {
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
      throw new ServerActionError("Failed to fetch why statement");
    }
  }
);

export const fetchQuestionsFromServer = createServerAction(
  async (): Promise<Question[] | any> => {
    const resp = await fetch(`${BASE_URL}/get-questions`);

    if (!resp.ok) {
      throw new ServerActionError("Failed to fetch questions from the server");
    }

    return await resp.json();
  }
);

export const saveGoal = createServerAction(
  async ({
    goal,
    description,
    category,
    deadline = "",
  }: Pick<
    Goal,
    "goal" | "description" | "category" | "deadline"
  >): Promise<any> => {
    const authToken = validateAuthToken();

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
        deadline: deadline ? new Date(deadline).toUTCString() : "", // convert to UTC time
      }),
    });
    const respData = await resp.json();

    if (!resp.ok) {
      logError(respData);

      throw new ServerActionError("Failed to save your goal");
    }

    return respData;
  }
);

export const updateGoal = createServerAction(
  async ({
    doc_id,
    updateFields,
  }: {
    doc_id: string;
    updateFields: Partial<Goal>;
  }): Promise<any> => {
    const authToken = validateAuthToken();

    if (updateFields.deadline) {
      updateFields.deadline = new Date(updateFields.deadline).toUTCString();
    }

    const resp = await fetch(`${BASE_URL}/update-goal`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        doc_id: doc_id,
        updateFields: updateFields,
      }),
    });

    const respData = await resp.json();

    if (!resp.ok) {
      logError(respData);

      throw new ServerActionError("Failed to save your goal");
    }

    return respData;
  }
);
