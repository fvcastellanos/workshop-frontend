import { User } from "@supabase/supabase-js";

import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    }
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
