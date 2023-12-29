// apiCalls.ts

const BASE_URL = "http://localhost:5001"; // Your App server URL

export const submitAnswerToServer = async (
  answer: string,
  question: string,
  questionIndex: number,
) => {

  const authToken = localStorage.getItem('authToken');
if (!authToken) {
  console.error('No authentication token found');
  throw new Error('Authentication required');
}

  const response = await fetch(`${BASE_URL}/submit-onboarding-answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
    body: JSON.stringify({ answer, question, questionIndex }),
  });
  const data = await response.json();
  return data;
};

export const fetchQuestionsFromServer = async () => {
  // Get the questions for the onboarding UI
  const response = await fetch("http://localhost:5001/get-questions");
  if (!response.ok) {
    throw new Error("Failed to fetch questions from the server");
  }
  return await response.json();
};

export const fetchAnswersFromServer = async (authToken: string) => {
  const response = await fetch(`${BASE_URL}/get-answers`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch answers from the server");
  }
  return await response.json();
};

type GenerateWhyStatementSuccessResponse = {
  whyStatement: string;
  doc_id?: string;
};

type GenerateWhyStatementErrorResponse = {
  error: string;
};

type GenerateWhyStatementResponse = GenerateWhyStatementSuccessResponse | GenerateWhyStatementErrorResponse;

export const generateWhyStatementFromAnswers = async (
  questions: any[],
  answers: string[],
): Promise<string> => {
  const authToken = localStorage.getItem('authToken');
if (!authToken) {
  console.error('No authentication token found');
  throw new Error('Authentication required');
}
  
  const questionsAnswers = questions.map((q, index) => ({
    question: q.title,
    answer: answers[index] || "",
  }));
  console.log("Sending questions and answers to server:", questionsAnswers);

  try {
    const response = await fetch(`${BASE_URL}/generate-why-statement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify({ questionsAnswers }),
    });
    console.log("Received response:", response);
    if (!response.ok) {
      console.error("Response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData: GenerateWhyStatementResponse = await response.json();
    
    if ('error' in responseData) {
      // Handle the error response
      throw new Error(responseData.error);
    } else {
      // Now TypeScript knows responseData must be GenerateWhyStatementSuccessResponse
      console.log("Response data:", responseData)
      return responseData.whyStatement;
    }
  } catch (error) {
    console.error("Error in generating Why Statement:", error);
    throw error;
  }
};

// Define a TypeScript interface for the expected response structure
export interface DevotionalContent {
  Title: string;
  BiblePassage: string;
  Personalization: string;
  JournalingPrompt: string;
}

export const generateDevotional = async (): Promise<DevotionalContent> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('No authentication token found');
    throw new Error('Authentication required');
  }

  try {
    const response = await fetch(`${BASE_URL}/generate-devotional`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      // No need to send user information in the body, as it's obtained from the token
      body: JSON.stringify({ saveToFirestore: true }),
    });

    if (response.ok) {
      const responseData: DevotionalContent = await response.json();
      return responseData;
    } else {
      console.error("Response status:", response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in generating Devotional:", error);
    throw error; // Rethrow the error so it can be caught by the caller
  }
};

// Define TypeScript types for the request and response
type SaveUserDataPointRequest = {
  targetUserId: string;
  dataPoint: string;
  action: 'replace' | 'append';
  value: any;
};

type SaveUserDataPointResponse = {
  message: string;
};

export const saveUserDataPoint = async (
  key: string,
  value: any,
  action: 'replace' | 'append' = 'replace'
): Promise<SaveUserDataPointResponse> => {
  // The key here is the name of the question in the user document

  // Retrieve the auth token from local storage
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('No authentication token found');
    throw new Error('Authentication required');
  } else {
    console.log("Using auth token:", authToken)
  }

  try {
    console.log(value)
    const response = await fetch(`${BASE_URL}/save-user-data-point`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        targetUserId: localStorage.getItem('userID'),
        dataPoint: key,
        action: action,
        value: JSON.stringify(value) // Convert value to a JSON string
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Server responded with error:', errorResponse);
      // Provide more specific error messages based on status code
      if (response.status === 401) {
        throw new Error('Unauthorized access');
      } else if (response.status === 403) {
        throw new Error('Forbidden access');
      } else {
        throw new Error('An error occurred while saving data');
      }
    }

    const responseData: SaveUserDataPointResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error saving user data point:', error);
    // Rethrow the error to be handled by the calling function
    throw error;
  }
};

