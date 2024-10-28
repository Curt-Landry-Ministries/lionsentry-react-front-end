import { createStore } from "zustand/vanilla";
import { fetchGoals, fetchUserData } from "../app/actions";

export type User = {
  name: string;
  email: string;
  logins: string[];
  profile_photo?: string;
  devotionals: Devotional[];
  emails: Email[];
  whyStatements: WhyStatement[];
  onboardingAnswers: OnboardingAnswer[];
  goals: Goal[];
  isLoading: boolean;
};

export type UserAction = {
  updateName: (name: User["name"]) => void;
  updateEmail: (email: User["email"]) => void;
  updateLogins: (logins: User["logins"]) => void;
  updateProfilePhoto: (profile_photo: User["profile_photo"]) => void;
  updateDevotionals: (devotionals: User["devotionals"]) => void;
  updateEmails: (emails: User["emails"]) => void;
  updateWhyStatements: (whyStatements: User["whyStatements"]) => void;
  updateGoals: (goals: User["goals"]) => void;
  fetchUserData: () => Promise<void>;
  getGoals: () => Promise<void>;
  reset: () => void;
};

export type UserStore = User & UserAction;

export const defaultInitUserState: User = {
  name: "",
  email: "",
  logins: [],
  profile_photo: "",
  devotionals: [],
  emails: [],
  whyStatements: [],
  onboardingAnswers: [],
  goals: [],
  isLoading: false,
};

export const initUserStore = (): User => {
  return defaultInitUserState;
};

export const createUserStore = (initState: User = defaultInitUserState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    updateName: (name) => set(() => ({ name: name })),
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
      set(() => ({ ...response, isLoading: false }));
    },
    getGoals: async () => {
      const response = await fetchGoals();
      set(() => ({ goals: response }));
    },
    reset: () => {
      set(() => ({ ...defaultInitUserState }));
    },
  }));
};
