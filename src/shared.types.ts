type UserCredentials = {
  email: string;
  password: string;
};

interface DevotionalContent {
  Title: string;
  BiblePassage: string;
  Personalization: string;
  JournalingPrompt: string;
  TimeStamp: string;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
}

type Devotional = {
  title: string;
  // devotional: string;
  biblePassage: string;
  personalization: string;
  journalingPrompt: string;
  dateTimeCreated: string;
  forUser: string;
  id: string;
};

type WhyStatement = {
  id: string;
  forUser: string;
  dateTimeCreated: string;
  whyStatement: string;
};

type OnboardingAnswer = {
  questionId: string;
  answer: string;
  questionIndex: number;
  dateTimeCreated: string;
  forUser: string;
  id: string;
};

type Goal = {
  goal: string;
  description?: string;
  deadline?: string;
  forUser: string;
  id: string;
  category: "Spiritual" | "Physical" | "Other" | "Joy" | "Financial";
  isComplete: boolean;
  isDeleted: boolean;
};

type Email = {
  devotionalID: string;
  forUser: string;
  dateTimeCreated: string;
  dateTimeScheduled: string;
  id: string;
};

type FilterOrder = "ASC" | "DESC" | null;
