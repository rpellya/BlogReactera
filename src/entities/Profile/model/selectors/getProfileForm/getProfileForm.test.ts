import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
    test('should work with filled state', () => {
        const form = {
            firstname: 'Roman',
            lastname: 'Pellya',
            age: 20,
            currency: Currency.GBP,
            country: Country.Russia,
            city: 'Saint-P.',
            username: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
        };

        const state: DeepPartial<StateSchema> = {
            profile: { form },
        };

        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });

    test('should wotk with emty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
