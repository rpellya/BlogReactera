import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAyncThunk/TestAyncThunk';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { fetchProfileData } from './fetchProfileData';

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

describe('fetchProfileData.test', () => {
    test('Success fetch profile data', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled(); // is was get request
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('Error fetch profile data', async () => {
        const thunk = new TestAsyncThunk(fetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
