import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
}

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesDetailsPage/fetchArticleRecommendations',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _page: getRandomNumber(),
                    _limit: getRandomNumber(),
                    _expand: 'user',
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
