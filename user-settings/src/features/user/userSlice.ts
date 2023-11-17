// src/features/user/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserState } from './userTypes';

const initialState: UserState = {
    currentUser: null,
    status: 'idle',
    error: null,
};

// Async thunks
export const fetchUser = createAsyncThunk<User, string>('user/fetchUser', async (userId) => {
    console.log({ userId });
    const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
    return response.data;
});

export const updateUser = createAsyncThunk<User, User>('user/updateUser', async (user) => {
    const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, user);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = 'succeeded';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;
