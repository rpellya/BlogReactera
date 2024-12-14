import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

/**
 * @arg extra We throw it into asynchronous action for convenient use, because don't use import api, navigate and etc
 * @param initialStore StateSchema
 * @param asyncReducers ReducersMapObject<StateSchema>
 * @param navigate (to: To, options?: NavigateOptions) => void
 * @returns  const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialStore,
        middleware: (getDeafultMiddleware) => getDeafultMiddleware({
            thunk: {
                extraArgument: extraArg,
        }})})
 */
export function createReduxStore(
    initialStore?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,

) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    // Вынес для удобства
    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialStore,
        middleware: (getDeafultMiddleware) => getDeafultMiddleware({ // for instance API
            thunk: {
                // extraArgument for that we using withou full api url (http://localhost...)
                extraArgument: extraArg,
            },
        }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
