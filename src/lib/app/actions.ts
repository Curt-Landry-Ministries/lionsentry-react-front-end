"use server";
import { User } from "../stores/userStore";
import { logError, logTest, validateAuthToken } from "../utils";
import { getBaseUrl } from "../utils-global";
import { cookies } from "next/headers";
import { createServerAction, ServerActionError } from "../action-utils";

const BASE_URL = getBaseUrl(false);
const CURRENT_AI_DISCLAIMER_VERSION = "1.0";
const CONTENT_ENGINE: string = process.env.CONTENT_ENGINE
  ? process.env.CONTENT_ENGINE
  : "";

export const fetchBasicData = createServerAction(async () => {
  const cookiesStore = await cookies();

  const userID = cookiesStore.get("userID")?.value;
  const authToken = await validateAuthToken();
  if (!userID || !authToken) throw new ServerActionError("Unauthorized Access");

  try {
    const resp = await fetch(`${BASE_URL}/get-user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const respNameEmail = await resp.json();

    let userData: Partial<User> = {
      firstName: "",
      lastName: "",
      email: "",
      profile_photo: "",
    };

    userData.firstName = respNameEmail.firstName.replace(/['"]+/g, "");
    userData.lastName = respNameEmail.lastName.replace(/['"]+/g, "");

    userData.email = respNameEmail.email.replace(/['"]+/g, "");
    userData.profile_photo = respNameEmail.photoURL;

    return userData;
  } catch (error: any) {
    throw new ServerActionError(error || "Failed to fetch user basic data");
  }
});

export const fetchUserData = createServerAction(async () => {
  const cookiesStore = await cookies();

  const userID = cookiesStore.get("userID")?.value;

  const authToken = await validateAuthToken();

  let userData: User = {
    isLoading: false,
    firstName: "",
    lastName: "",
    email: "",
    logins: [],
    profile_photo: "",
    devotionals: [],
    emails: [],
    whyStatements: [],
    onboardingAnswers: [],
    goals: [],
    questions: [],
  };

  if (!userID || !authToken) throw new ServerActionError("Unauthorized Access");

  try {
    const basicData = await fetchBasicData();

    if (basicData.success) {
      userData = {
        ...userData,
        ...basicData.value,
      };
    }

    const whyStatementResp = await getLatestWhyStatementFromServer();

    const devotionalsResp = await fetchDevotionals();
    const answers = await fetchAnswersFromServer();
    const questions = await fetchQuestionsFromServer();
    const goalsResp = await fetchGoals();

    userData.devotionals = devotionalsResp.success
      ? [...devotionalsResp.value]
      : [];

    userData.goals = goalsResp.success ? goalsResp.value : [];
    userData.whyStatements = whyStatementResp.success
      ? [whyStatementResp.value]
      : [];

    userData.onboardingAnswers = answers.success
      ? answers.value.sort(
          (a: any, b: any) => a.questionIndex - b.questionIndex
        )
      : [];

    userData.questions = questions.success ? questions.value : [];

    return userData;
  } catch (error: any) {
    throw new ServerActionError(error || "Failed to fetch user data");
  }
});

export const fetchGoals = createServerAction(async () => {
  const authToken = await validateAuthToken();

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
  const authToken = await validateAuthToken();
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
    const authToken = await validateAuthToken();

    try {
      const resp = await fetch(`${BASE_URL}/submit-onboarding-answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          answer: answer,
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

export const fetchAnswersFromServer = createServerAction(async () => {
  const authToken = await validateAuthToken();

  try {
    const resp = await fetch(`${BASE_URL}/get-all-answers`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const respData = await resp.json();

    return respData;
  } catch (error: any) {
    throw new ServerActionError(error.error || "Failed to fetch answers");
  }
});

export const generateWhyStatementFromAnswers = createServerAction(
  async (questions: any[], answers: string[]) => {
    const cookiesStore = await cookies();

    const authToken = await validateAuthToken();

    const questionsAnswers = questions.map((q, index) => ({
      questions: q.title,
      answer: answers[index] || "",
    }));

    const payload = {
      answers: questionsAnswers,
      "content-type": CONTENT_ENGINE,
    };

    logTest(`Sending questions and answers to server`);
    logTest(questionsAnswers);

    try {
      const resp = await fetch(`${BASE_URL}/generate-why-statement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const respData = await resp.json();

      // Log response data
      logTest(`Received response:${JSON.stringify(respData)}`);

      // Check both HTTP status and response success
      if (!respData.whyStatement) {
        throw new ServerActionError("WhyStatement generation failed.");
      }

      cookiesStore.set("whyStatement", respData.whyStatement);

      return respData.whyStatement;
    } catch (error: any) {
      throw new ServerActionError(error.error);
    }
  }
);

export const updateDevotional = createServerAction(
  async ({ doc_id, isFavorite }: { doc_id: string; isFavorite: boolean }) => {
    const authToken = await validateAuthToken();

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
    const authToken = await validateAuthToken();

    try {
      const resp = await fetch(`${BASE_URL}/generate-devotional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          saveToFirestore: true,
          "content-type": CONTENT_ENGINE,
        }),
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
    const cookiesStore = await cookies();

    const authToken = await validateAuthToken();

    const resp = await fetch(`${BASE_URL}/save-user-data-point`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        targetUserId: cookiesStore.get("userID")?.value,
        dataPoint: key,
        action: action,
        value: value,
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

export const setDisclaimerUserValues = createServerAction(async () => {
  await saveUserDataPoint(
    "ai_disclaimer_agreement",
    CURRENT_AI_DISCLAIMER_VERSION,
    "replace"
  );
  await saveUserDataPoint(
    "ai_disclaimer_agreement_date",
    new Date().toString(),
    "replace"
  );
});

export const uploadProfilePhoto = createServerAction(
  async (formData: FormData): Promise<any> => {
    const cookiesStore = await cookies();

    const authToken = await validateAuthToken();

    if (cookiesStore.get("userID")?.value) {
      formData.append("user_id", cookiesStore.get("userID")?.value as string);
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
    const cookiesStore = await cookies();

    const authToken = await validateAuthToken();

    const resp = await fetch(`${BASE_URL}/get-latest-why-statement`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    cookiesStore.delete("whyStatement");

    if (resp.ok) {
      const respData = await resp.json();

      if (respData && respData.whyStatement) {
        cookiesStore.set("whyStatement", respData.whyStatement);
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
    const authToken = await validateAuthToken();

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
    const authToken = await validateAuthToken();

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
