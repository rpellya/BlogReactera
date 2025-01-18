import { StateSchema } from 'app/providers/StoreProvider';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from './addCommentFormSelectors';

describe('addCommentFormSelectors.test', () => {
    test('should return text', () => {
        const text = 'test comment';
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { text },
        };

        expect(getAddCommentFormText(state as StateSchema)).toEqual(text);
    });

    test('should wotk with emty state data', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAddCommentFormText(state as StateSchema)).toEqual(undefined);
    });

    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { error: 'error' },
        };

        expect(getAddCommentFormError(state as StateSchema)).toEqual('error');
    });
});
