import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';

// Normalizes the data so that it's easier to work with in the reducer
const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (comment) => comment.id, // selector for normalizing data
});

// get comments for a specific article
export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articleDetailsPage?.recomendations ||
            recommendationsAdapter.getInitialState(),
    );

// in the slice we initialize the state using the method from the docs
const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
            {
                entities: {},
                ids: [],
                error: undefined,
                isLoading: false,
            },
        ),
    reducers: {
        // add comment to the state store for a specific article
        addComment: (state, action: PayloadAction<Article>) => {
            recommendationsAdapter.addOne(state, action.payload);
        },
    },
    // extraReducers - redusers with business logic for async thunk that can have anything in it
    extraReducers: (builder) => {
        // describe every use-case (pending, filfilled, rejected) for fetch
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticleRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    recommendationsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// export const { actions: articleDetailsPageRecommendationsActions } =
//     articleDetailsPageRecommendationsSlice;
export const { reducer: articleDetailsPageRecommendationsReducer } =
    articleDetailsPageRecommendationsSlice;
