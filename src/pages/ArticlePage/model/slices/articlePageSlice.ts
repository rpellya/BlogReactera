import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

// Normalizes the data so that it's easier to work with in the reducer
const articlesAdapter = createEntityAdapter<Article>({
    selectId: (comment) => comment.id, // selector for normalizing data
});

// get comments for a specific article
export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

/**
 * Actions, redusers (edit, delete profile)
 * extraReducers - redusers with business logic for async thunk that can have anything in it
 */
export const articlePageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        entities: {},
        ids: [],
        error: undefined,
        isLoading: false,
        view: ArticleView.TILE,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        initState: (state) => {
            state.view = localStorage.getItem('articles_view') as ArticleView;
        },
    },
    // extraReducers - redusers with business logic for async thunk that can have anything in it
    extraReducers: (builder) => {
        // describe every use-case (pending, filfilled, rejected) for fetch
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchArticlesList.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false;
                    articlesAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: articlesPageAction } = articlePageSlice;
export const { reducer: articlesPageReducer } = articlePageSlice;
