import { FC, useEffect } from 'react';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { useDispatch, useStore } from 'react-redux';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

/**
 *  For using in components
 * @param reducers ReducersList
 * @param removeAfterUnmount boolean;
 * @returns children
 */
export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { reducers, children, removeAfterUnmount = true } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    // Code spliting (Optimes build for prod)
    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            const mountedReducer = mountedReducers[name as StateSchemaKey];
            // Add a new reducer only if it is not
            if (!mountedReducer) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name} reducer` }); // for devtools
            }
        });

        return () => {
            // you can not delete, but the all state, which accumulated, will remain in memory
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` }); // for devtools
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
    );
};
