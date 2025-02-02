import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from '../getProfileError/getProfileError';

describe('getProfileError.test', () => {
    test('should work with filled state', () => {
        const error = 'errorMessage';

        const state: DeepPartial<StateSchema> = {
            profile: { error },
        };

        expect(getProfileError(state as StateSchema)).toEqual(error);
    });

    test('should wotk with emty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
