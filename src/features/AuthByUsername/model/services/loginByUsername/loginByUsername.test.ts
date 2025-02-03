import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAyncThunk/TestAyncThunk';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername', () => {
    const userValue = { username: 'admin', id: '1' };

    // beforeEach(() => {
    //     // for mocked
    //     dispatch = jest.fn();
    //     getState = jest.fn();
    // });

    // test('Success login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
    //     const action = loginByUsername({ username: 'admin', password: '123' });
    //     const result = await action(dispatch, getState, undefined); // action - async fn

    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    //     expect(dispatch).toHaveBeenCalledTimes(3);
    //     expect(mockedAxios.post).toHaveBeenCalled(); // was post request
    //     expect(result.meta.requestStatus).toBe('fulfilled');
    //     expect(result.payload).toEqual(userValue);
    // });

    // test('Error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
    //     const action = loginByUsername({ username: 'admin', password: '123' });
    //     const result = await action(dispatch, getState, undefined); // action - async fn

    //     expect(dispatch).toHaveBeenCalledTimes(2);
    //     expect(mockedAxios.post).toHaveBeenCalled(); // was post request
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toBe('error');
    // });

    // new method for TestAsyncThunk
    test('Success login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({
            username: 'admin',
            password: '123',
        });

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.api.post).toHaveBeenCalled(); // was post request
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('Error login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({
            username: 'admin',
            password: '123',
        });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.post).toHaveBeenCalled(); // was post request
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
