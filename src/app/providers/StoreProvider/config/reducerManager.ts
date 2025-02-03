import {
    AnyAction,
    combineReducers,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

/**
 * Reducer Manager - loads asynchronously reducers at the moment when they are needed (allows you not to drag all the reducers in main bundle)
 * @param initialReducers: ReducersMapObject<StateSchema>
 * @returns getReducerMap: () => reducers
 * @returns reducer: combinedReducer(state: StateSchema, action: AnyAction)
 */

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: StateSchemaKey[] = [];

    return {
        getReducerMap: () => reducers,

        // root reduce - creates a copy of the new state, delets Keystoremove (data) from the state
        // and adds a new combinedReducer(state, action) with a new state and cction
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }

            return combinedReducer(state, action);
        },

        // adding a new reducer by key
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }

            reducers[key] = reducer;
            combinedReducer = combineReducers(reducers);
        },

        // adding a new reducer by key
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];

            keysToRemove.push(key);

            combinedReducer = combineReducers(reducers);
        },
    };
}
