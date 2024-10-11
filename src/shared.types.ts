type UserCredentials = {
  email: string;
  password: string;
}

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
  devotional: string;
  dateTimeCreated: string;
  forUser: string;
  id: string;
}

type WhyStatement = {
  id: string;
  forUser: string;
  dateTimeCreated: string;
  whyStatement: string;
}

type OnboardingAnswer = {
  questionId: string;
  answer: string;
  questionIndex: number;
  dateTimeCreated: string;
  forUser: string;
  id: string;
}

type Goal = {
  goal: string;
  deadline?: string;
  forUser: string;
  id: string;
}

type Email = {
  devotionalID: string;
  forUser: string;
  dateTimeCreated: string;
  dateTimeScheduled: string;
  id: string;
}

