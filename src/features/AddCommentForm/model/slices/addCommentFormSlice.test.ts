import { AddCommentFormSchema } from '../types/addCommentForm';
import { addCommentFormActions, addCommentFormReducer } from './addCommentFormSlice';

describe('addCommentFormSlice.test', () => {
    test('Test add comment', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: 'test comment' };
        expect(addCommentFormReducer(
            state as AddCommentFormSchema,
            addCommentFormActions.setText('test comment'),
        )).toEqual({ text: 'test comment' });
    });

    test('Test update profile service fulfilled', () => {
        const state: DeepPartial<AddCommentFormSchema> = { error: 'test error' };
        expect(addCommentFormReducer(
            state as AddCommentFormSchema,
            addCommentFormActions.setText(''),
        )).toEqual({ error: 'test error', text: '' });
    });
});
