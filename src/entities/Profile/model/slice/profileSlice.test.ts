import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const data = {
    firstname: 'Roman',
    lastname: 'Pellya',
    age: 20,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Saint-P.',
    username: 'admin',
    avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
};

describe('profileSlice.test', () => {
    test('Test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadOnly(true),
            ),
        ).toEqual({ readonly: true });
    });

    test('Test cancelEdit profile', () => {
        const state: DeepPartial<ProfileSchema> = { data };
        expect(
            profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
        ).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        });
    });

    test('Test update profile', () => {
        const state: DeepPartial<ProfileSchema> = { form: { username: '' } };
        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.updateProfile({ username: 'pellya' }),
            ),
        ).toEqual({ form: { username: 'pellya' } });
    });

    test('Test update profile service pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending),
        ).toEqual({ isLoading: true, validateErrors: undefined });
    });

    test('Test update profile service fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: true };
        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.fulfilled(data, ''),
            ),
        ).toEqual({
            isLoading: false,
            data,
            form: data,
            readonly: true,
            validateErrors: undefined,
        });
    });
});
