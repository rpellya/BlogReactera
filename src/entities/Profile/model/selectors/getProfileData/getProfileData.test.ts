import { StateSchema } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileData } from '../getProfileData/getProfileData';

describe('getProfileData.test', () => {
    test('should work with filled state', () => {
        const data = {
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
            profile: { data },
        };

        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('should wotk with emty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
