import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

type AcrionCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true); //  for typescript

/**
 * For working in tests with axios mocked data
 * @augments api
 * @augments navigate
 * @method callThunk works with async actionCreate
 */
export class TestAsyncThunk<Return, Arg, RejectedValue> {
    // mocked all
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.MockedFn<any>;

    actionCreator: AcrionCreatorType<Return, Arg, RejectedValue>;

    // When creating
    constructor(actionCreator: AcrionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this.getState = jest.fn();

        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    /**
     * Function for caling - for don't to mocked
     * @param arg
     * @returns async action - the wrapper that at the redux middleware level takes and throws it off dispatch, getSate and some extra arg
    */
    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg); // value
        const result = await action(
            this.dispatch,
            this.getState,
            { api: this.api, navigate: this.navigate },
        );

        return result;
    }
}
