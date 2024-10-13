import { createStore } from "zustand/vanilla";

export type User = {
    name: string;
    email: string;
    logins: string[];
    profile_photo?: string;
    devotionals: Devotional[];
    emails: Email[];
    whyStatements: WhyStatement[];
    onboardingAnswers: OnboardingAnswer[];
    goals: Goal[]
}
  
export type UserAction = {
    updateName: (name: User['name']) => void;
    updateLogins: (logins: User['logins']) => void;
    updateProfilePhoto: (profile_photo: User['profile_photo']) => void;
    updateDevotionals: (devotionals: User['devotionals']) => void;
    updateEmails: (emails: User['emails']) => void;
    updateWhyStatements: (whyStatements: User['whyStatements']) => void;
    updateGoals: (goals: User['goals']) => void;
}

export type UserStore = User & UserAction;

export const defaultInitUserState: User = {
    name: '',
    email: '',
    logins: [],
    profile_photo: '',
    devotionals: [],
    emails: [],
    whyStatements: [],
    onboardingAnswers: [],
    goals: []
}

export const initUserStore = (): User => {
    return defaultInitUserState;
}

export const createUserStore = ( initState: User = defaultInitUserState) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        updateName: (name) => set(() => ({ name: name})),
    updateLogins: (logins) => set(() => ({logins : logins})),
    updateProfilePhoto: (profile_photo) => set(() => ({profile_photo: profile_photo})),
    updateDevotionals: (devotionals) => set(() => ({ devotionals: devotionals})),
    updateEmails: (emails) => set(() => ({ emails: emails})),
    updateWhyStatements: (whyStatements) => set(() => ({ whyStatements : whyStatements })),
    updateGoals: (goals) => set(() => ({ goals })),
    }))
}
