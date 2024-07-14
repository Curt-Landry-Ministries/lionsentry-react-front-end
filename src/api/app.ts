// src/api/app.tsx

const LOCAL_TESTING: string = "false"; // change to true when testing locally
let BASE_URL: string;

if (LOCAL_TESTING === "true"){
  BASE_URL = "http://localhost:5002"; 
}
else {
  BASE_URL = "https://api.lionsentry.com/app_server"; 
}

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
  const response = await fetch(`${BASE_URL}/get-questions`);
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
  TimeStamp: string;
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

    // return {
    //   "BiblePassage": "Absolutely, your unique purpose resonates with a beautiful scripture from the book of Philippians that encourages us to live vibrant, purpose-driven lives. Here is a passage tailored to your journey:\n\n\"Do everything without grumbling or arguing, so that you may become blameless and pure, 'children of God without fault in a warped and crooked generation.' Then you will shine among them like stars in the sky as you hold firmly to the word of life. And then I will be able to boast on the day of Christ that I did not run or labor in vain. But even if I am being poured out like a drink offering on the sacrifice and service coming from your faith, I am glad and rejoice with all of you.\" -Philippians 2:14-17 (NIV)\n\nIn these verses, we are reminded to embrace our daily walk with a spirit of joy and without discontent. It speaks to your intention to foster fulfilling moments and to solve challenges with resilience. As you shine your light through service and contribute to a better world, you do so with the spirit of one who is making an impact without expecting anything in return.\n\nThis scriptural encouragement aligns with your dedication to live courageously and with integrity. Indeed, it communicates the joy of serving others and the personal fulfillment found in being our best selves. As 'children of God', we are called to be luminaries in the darkness, resilient in faith and steadfast in our commitment to goodness. Let's therefore hold firmly to this word of life, carrying out our purpose with hope and love, and rejoicing in the journey we have been blessed with.",
    //   "JournalingPrompt": "Journal Prompt: As you consider the powerful message in Philippians 2:14-17, take a moment to contemplate the essence of your unique purpose. How can you, in your everyday actions, \"do everything without grumbling or arguing\" and contribute to fostering a community of joy and service? Reflect on specific instances where you've navigated life's challenges with resilience and without complaint. How did these experiences amplify your ability to shine like a star in the sky, and in what ways have they reinforced the integrity and hope that are cornerstones of your life's pledge? Write about how you can continue to hold firmly to the word of life today, and how doing so will enable you to inspire and influence others on their own journey towards discovering their inner light.",
    //   "Personalization": "The scripture from Philippians 2:14-17 beautifully mirrors the brightness of your own purpose in this world. Your \"Why\" isn't just a statement; it's a living, breathing manifestation of faith in action. Just as the verses urge us to shine like stars, your life radiates positive energy and hope to those around you. You're not just navigating challenges; you're transforming them into opportunities to showcase grace, patience, and the kind of joy that doesn't fade with circumstances. Despite the wear and tear of the daily grind, which might weigh heavily on your spirit, your commitment to living without grumbling or arguing reframes your experience and turns it into one of growth and service. \n\nYour choice to focus on solutions and to treasure every fulfilling moment aligns with the call to become blameless and pure. It's evident in the way you engage with your world—from the service you provide within your community to the love and support you offer to friends and family. Holding firmly to the word of life, your path is alight with the integrity and hope that define your journey. Crucially, this is not a solitary path. Together with others whom you inspire, you're part of a collective brightness that pierces through even the densest darkness.\n\nAnd on those days when you might feel as though you're being poured out like a drink offering, remember the joy and celebration that come from a fulfilled promise of faith. Your life is a vivid reflection of this scripture, a testament to the beauty and strength of living a purpose-driven life tethered to profound faith and a heart open to the world. Keep shining, keep serving, and keep rejoicing, for your journey uplifts not only yourself but all who witness it.",
    //   "Title": "Title: Journeying with Joy: Embracing Your Inner Star through Service and Resilience",
    //   "TimeStamp": new Date().toLocaleString()
    // }
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

export const getLatestWhyStatement = async (): Promise<string> => {
  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    console.error('No authentication token found');
    throw new Error('Authentication required');
  }

  try {
    // Make the GET request to the Flask endpoint
    const response = await fetch(`${BASE_URL}/get-latest-why-statement`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`, // Send the auth token in the request headers
      },
    });

    // Check if the response is OK and contains data
    if (response.ok) {
      const data = await response.json();
      // Ensure only the whyStatement string is returned
      if (data && data.whyStatement) {
        return data.whyStatement; // Return the whyStatement field as a string
      } else {
        throw new Error('No Why Statement field found in the response');
      }
    } else if (response.status === 404) {
      throw new Error('No Why Statement found for the user');
    } else {
      throw new Error('Failed to retrieve the latest Why Statement');
    }
  } catch (error) {
    console.error('Error fetching the latest Why Statement:', error);
    throw error;
  }
};
