import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileLoading.test', () => {
    test('should work with filled state', () => {
        const isLoading = true;

        const state: DeepPartial<StateSchema> = {
            profile: { isLoading },
        };

        expect(getProfileIsLoading(state as StateSchema)).toEqual(isLoading);
    });

    test('should wotk with emty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
    });
});
