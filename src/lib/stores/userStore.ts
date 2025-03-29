import { createStore } from "zustand/vanilla";
import { fetchBasicData, fetchGoals, fetchUserData } from "../app/actions";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  logins: string[];
  profile_photo?: string;
  devotionals: Devotional[];
  emails: Email[];
  whyStatements: WhyStatement[];
  onboardingAnswers: OnboardingAnswer[];
  goals: Goal[];
  isLoading: boolean;
  questions: Question[];
};

export type UserAction = {
  name: () => string;
  updateFirstName: (firstName: User["firstName"]) => void;
  updateLastName: (lastName: User["lastName"]) => void;
  updateEmail: (email: User["email"]) => void;
  updateLogins: (logins: User["logins"]) => void;
  updateProfilePhoto: (profile_photo: User["profile_photo"]) => void;
  updateDevotionals: (devotionals: User["devotionals"]) => void;
  updateEmails: (emails: User["emails"]) => void;
  updateWhyStatements: (whyStatements: User["whyStatements"]) => void;
  updateGoals: (goals: User["goals"]) => void;
  fetchUserData: () => Promise<void>;
  fetchBasicData: () => Promise<void>;
  getGoals: () => Promise<void>;
  reset: () => void;
};

export type UserStore = User & UserAction;

export const defaultInitUserState: User = {
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
  isLoading: true,
};

export const initUserStore = (): User => {
  return defaultInitUserState;
};

export const createUserStore = (initState: User = defaultInitUserState) => {
  return createStore<UserStore>()((set, get) => ({
    ...initState,
    name: () => `${get().firstName} ${get().lastName}`,
    updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
    updateLastName: (lastName) => set(() => ({ lastName: lastName })),
    updateEmail: (email) => set(() => ({ email: email })),
    updateLogins: (logins) => set(() => ({ logins: logins })),
    updateProfilePhoto: (profile_photo) =>
      set(() => ({ profile_photo: profile_photo })),
    updateDevotionals: (devotionals) =>
      set(() => ({ devotionals: [...devotionals] })),
    updateEmails: (emails) => set(() => ({ emails: emails })),
    updateWhyStatements: (whyStatements) =>
      set(() => ({ whyStatements: whyStatements })),
    updateGoals: (goals) => set(() => ({ goals: [...goals] })),
    fetchUserData: async () => {
      set(() => ({ isLoading: true }));
      const response = await fetchUserData();

      if (!!response && response.success)
        set(() => ({ ...response.value, isLoading: false }));
    },
    fetchBasicData: async () => {
      set(() => ({ isLoading: true }));
      const response = await fetchBasicData();

      if (!!response && response.success) {
        set(() => ({ ...response.value, isLoading: false }));
      }
    },
    getGoals: async () => {
      const response = await fetchGoals();

      if (response.success) set(() => ({ goals: response.value }));
    },
    reset: () => {
      set(() => ({ ...defaultInitUserState }));
    },
  }));
};
