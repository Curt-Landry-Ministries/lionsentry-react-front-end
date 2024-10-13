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
    name: 'User Name',
    email: 'test@lionsentry.com',
    logins: [],
    profile_photo: '',
    devotionals: [{title: 'Devotional Test Title', devotional: 'I see your desire to make a difference and live out God\'s calling in your life. Your heart for standing firm in your beliefs and your drive to overcome challenges are truly commendable. God has uniquely equipped you to impact the world around you, and your passion is a reflection of His light within you. \n "For I know the plans I have for you, says the Lord, plans for peace and not for evil, to give you a future and a hope." - Jeremiah 29:11\n This verse is a beautiful reminder that God\'s plans for you are filled with hope and purpose. It isn\'t coincidence that you have these strong passions and inclinations. God has woven these desires into your heart for a significant reason. Whether you\'re tackling hardships or nurturing your natural talents, remember that God is guiding you each step of the way. You are designed to be a beacon of hope and strength, Joni. Embrace your God-given identity and boldly step into your calling. The Lord\'s purpose for you is greater than any fear or obstacle. Walk in faith and trust that He is at work in your life, using you to bring transformation and light to others.', dateTimeCreated: new Date().toDateString(), forUser: '1', id: 'devotional-id'}],
    emails: [],
    whyStatements: [{id: '1', forUser: '1', dateTimeCreated: new Date().toDateString(), whyStatement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}],
    onboardingAnswers: [],
    goals: [{
        goal: 'Pray every morning and night',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        forUser: '1',
        id: 'goal-1',
        category: 'Spiritual',
        deadline: 'Oct 31, 2024'
    },
    {
        goal: 'Do 1 Unassisted Pull Up',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        forUser: '1',
        id: 'goal-2',
        category: 'Physical'
    },
    {
        goal: 'Write in my journal everyday',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        forUser: '1',
        id: 'goal-3',
        category: "Other"
    },
    {
        goal: 'Quilt for Trang',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        forUser: '1',
        id: 'goal-4',
        category: 'Joy',
        deadline: 'Dec 25, 2024'
    },
    {
        goal: 'Follow a Budget',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        forUser: '1',
        id: 'goal-5',
        category: 'Financial',
        deadline: 'Jan 1, 2025'
    }
]
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
