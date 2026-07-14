import { createReduxStore, AppDispatch } from './config/store';
import { StoreProvider } from './ui/StoreProvider';
import type {
    StateSchema,
    ReduxStoreWithManager,
    ThunkConfig,
} from './config/StateSchema';

export type { StateSchema, ThunkConfig, AppDispatch };

export { createReduxStore, StoreProvider, ReduxStoreWithManager };
