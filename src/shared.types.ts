type UserCredentials = {
  email: string;
  password: string;
};

interface Question {
  id: number;
  title: string;
  subtitle: string;
}

type Devotional = {
  title?: string;
  dateTimeCreated: string;
  isFavorite: boolean;
  forUser: string;
  doc_id: string;

  // new format
  introduction?: string;
  verse?: string;
  insight?: string;
  life_application?: string;
  declaration?: string;
  prayer?: string;
  // old format
  biblePassage?: string;
  personalization?: string;
  journalingPrompt?: string;
};

type WhyStatement = {
  id: string;
  forUser: string;
  dateTimeCreated: string;
  whyStatement: string;
};

type OnboardingAnswer = {
  questionIndex: number;
  userID: string;
  question: string;
  answers: {
    answer: string;
    dateTimeAnswered: string;
  }[];
};

type Goal = {
  [key: string]: any;
  goal: string;
  description?: string;
  deadline?: string | undefined | null;
  forUser: string;
  doc_id: string;
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

interface IFieldProps {
  label?: string;
  description?: string;
  options?: { value: string; label: string }[];
  className?: string;
}

interface ISelectFieldProps {
  label?: string;
  options: { value: string; label: string }[];
  defaultOptionLabel: string;
}
