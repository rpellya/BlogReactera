import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
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
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        order: 'asc',
        sort: ArticleSortField.CREATED_AT,
        search: '',
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<ArticleSortField>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.LIST ? 4 : 17;
            state._inited = true;
        },
    },
    // extraReducers - redusers with business logic for async thunk that can have anything in it
    extraReducers: (builder) => {
        // describe every use-case (pending, filfilled, rejected) for fetch
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state);
                }
            })
            .addCase(
                fetchArticlesList.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.hasMore = action.payload.length >= state.limit;

                    // every time the user gets a new list of articles when filtering/sorting/searching - the user has to refresh the state to overwrite all the articles in the list, rather than adding new ones at the end as with infinite loading
                    if (action.meta.arg.replace) {
                        articlesAdapter.setAll(state, action.payload);
                    } else {
                        articlesAdapter.addMany(state, action.payload);
                    }
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
