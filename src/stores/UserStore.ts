import { StoreApi, UseBoundStore, create } from "zustand";

interface User {

    id: string;
}

interface UserState {
    user: User,
    setUser: (user: User) => void
};

export const useUserStore = create<UserState>()((set) => ({

    user: {
        id: '',
    },
    setUser: (user) => set((state) => ({ user }))
}));


export const userStore = function () {

    
    return {

        updateUser(id: string) {

            const { setUser } = useUserStore((state) => state)
    
            setUser({
                id
            });
        },

        getUser() : string {

            const { user } = useUserStore((state) => state);
    
            return user?.id;
        }
    };
    
}
