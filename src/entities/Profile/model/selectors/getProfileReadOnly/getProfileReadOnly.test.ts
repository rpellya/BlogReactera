import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileReadOnly } from '../getProfileReadOnly/getProfileReadOnly';

describe('getProfileReadOnly.test', () => {
    test('should work with filled state', () => {
        const readonly = true;

        const state: DeepPartial<StateSchema> = {
            profile: { readonly },
        };

        expect(getProfileReadOnly(state as StateSchema)).toEqual(readonly);
    });

    test('should wotk with emty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileReadOnly(state as StateSchema)).toEqual(undefined);
    });
});
