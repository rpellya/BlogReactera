import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../types/profile';

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

describe('validateProfileData.test', () => {
    test('Success validate data', async () => {
        const result = validateProfileData(data);
        expect(result).toEqual([]);
    });

    test('Without first and last name data', async () => {
        const result = validateProfileData({
            ...data,
            firstname: '',
            lastname: '',
        });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('Incorrect age data', async () => {
        const result = validateProfileData({ ...data, age: undefined });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('Incorrect country data', async () => {
        const result = validateProfileData({ ...data, country: undefined });
        expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
    });

    test('Incorrect all data', async () => {
        const result = validateProfileData({});
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });
});
