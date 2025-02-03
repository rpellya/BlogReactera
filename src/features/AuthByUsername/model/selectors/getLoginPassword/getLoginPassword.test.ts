import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginLoading tests', () => {
    test('should return password value', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '123',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('123');
    });

    test('should work even with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
