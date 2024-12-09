import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'admin' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUserName('adminchik'),
        )).toEqual({ username: 'adminchik' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('1234'),
        )).toEqual({ password: '1234' });
    });
});
