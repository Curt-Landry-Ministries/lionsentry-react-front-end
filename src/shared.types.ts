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
