import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
}

/**
 * @param StoreProviderProps
 * @returns const StoreProvider: ({ children, initialState, asyncReducers }: StoreProviderProps) => JSX.Element
 */
export const StoreProvider = ({ children, initialState, asyncReducers }: StoreProviderProps) => {
    // const navigate = useMemo(() => useNavigate, []);
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>, // for good working with storybook
        // navigate,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
