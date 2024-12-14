import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authdata, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.post<User>('/login', authdata);
            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            // extra.navigate(AppRoutes.PROFILE); // hard-code!
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
