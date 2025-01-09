export enum Paths {
  Home = "/",
  Login = "/login",
  Signup = "/signup",
  ResetPassword = "/reset-password",
  Terms = "#",
  Privacy = "#",
}

export enum AuthedPaths {
  Questionnaire = "/questionnaire",
  Dashboard = "/dashboard",
  MyWhy = "/mywhy",
  Goals = "/goals",
  Devotionals = "/devotionals",
  Principles = "/goals/principles",
  OnboardingGoals = "/goals/onboarding",
  Settings = "/settings",
}

export enum MaxWindowSize {
  Mobile = 552,
  Desktop = 1024,
}

export const GoalTypeAsset = {
  Joy: {
    color: "ls-pink",
    description:
      "A goal for something that brings you joy -an investment of time, a trip, a project",
  },
  Spiritual: {
    color: "ls-orange",
    description:
      "A goal that has to do with your spiritual life and your relationship with God",
  },
  Physical: {
    color: "ls-blue",
    description:
      "A goal that has to do with something in the natural—your health, your family, your home, your career, etc.",
  },
  Financial: {
    color: "ls-green",
    description: "A goal of givings or savings",
  },
  Other: {
    color: "ls-purple",
    description:
      "A personal goal that you would like to achieve that was not listed",
  },
};
