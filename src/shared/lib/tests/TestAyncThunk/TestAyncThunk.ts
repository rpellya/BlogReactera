import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

type AcrionCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true); //  for typescript

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    // mocked all
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.MockedFn<any>;

    actionCreator: AcrionCreatorType<Return, Arg, RejectedValue>;

    constructor(actionCreator: AcrionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();

        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg); // value
        const result = await action(
            this.dispatch,
            this.getState,
            { api: this.api, navigate: this.navigate },
        ); // action - async fn

        return result;
    }
}
