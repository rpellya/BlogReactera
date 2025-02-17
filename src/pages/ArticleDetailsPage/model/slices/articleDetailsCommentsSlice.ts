import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArtciclesDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';

// Normalizes the data so that it's easier to work with in the reducer
const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id, // selector for normalizing data
});

// get comments for a specific article
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.articleDetailsPage?.comments || commentsAdapter.getInitialState(),
);

// in the slice we initialize the state using the method from the docs
const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState:
        commentsAdapter.getInitialState<ArtciclesDetailsCommentsSchema>({
            entities: {},
            ids: [],
            error: undefined,
            isLoading: false,
        }),
    reducers: {
        // add comment to the state store for a specific article
        addComment: (state, action: PayloadAction<Comment>) => {
            commentsAdapter.addOne(state, action.payload);
        },
    },
    // extraReducers - redusers with business logic for async thunk that can have anything in it
    extraReducers: (builder) => {
        // describe every use-case (pending, filfilled, rejected) for fetch
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCommentsByArticleId.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.isLoading = false;
                    commentsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsCommentsActions } =
    articleDetailsCommentsSlice;
export const { reducer: articleDetailsCommentsReducer } =
    articleDetailsCommentsSlice;
