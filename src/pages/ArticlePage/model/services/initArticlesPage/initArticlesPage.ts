import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageAction } from '../../slices/articlePageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const inited = getArticlesPageInited(getState());

    // If we have not yet state is initialize, then we initialize it and call fetCharticleSlist
    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const sortFromUrl = searchParams.get('sort') as ArticleSortField;
        const searchFromUrl = searchParams.get('search');
        const typeFromUrl = searchParams.get('type') as ArticleType;

        if (orderFromUrl) {
            dispatch(articlesPageAction.setOrder(orderFromUrl));
        }

        if (sortFromUrl) {
            dispatch(articlesPageAction.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(articlesPageAction.setSearch(searchFromUrl));
        }
        if (typeFromUrl) {
            dispatch(articlesPageAction.setType(typeFromUrl));
        }

        dispatch(articlesPageAction.initState());
        dispatch(fetchArticlesList({}));
    }
});
