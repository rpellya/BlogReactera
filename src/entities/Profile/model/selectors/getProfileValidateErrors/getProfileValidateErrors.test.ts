import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from '../getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from '../../types/profile';

describe('getProfileValidateErrors.test', () => {
    test('should work with filled state', () => {
        const validateErrors: ValidateProfileError[] = [
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
            ValidateProfileError.INCORRECT_USER_DATA,
        ];

        const state: DeepPartial<StateSchema> = {
            profile: { validateErrors },
        };

        expect(getProfileValidateErrors(state as StateSchema)).toEqual(validateErrors);
    });

    test('should wotk with emty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
