import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Comment } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { articleDetailsCommentsActions } from '../../slices/articleDetailsCommentsSlice';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articleDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const {
            dispatch, extra, rejectWithValue, getState,
        } = thunkApi;

        const userData = getUserAuthData(getState());
        const aricle = getArticleDetailsData(getState());

        if (!userData || !text || !aricle) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                text,
                articleId: aricle.id,
                userId: userData.id,
            });

            if (!response.data) {
                throw new Error();
            }

            const newComment: Comment = {
                id: response.data.id,
                text: response.data.text,
                user: userData,
            };

            dispatch(articleDetailsCommentsActions.addComment(newComment));

            // It is better to directly add a comment rather than re-requesting all comments on the article
            // dispatch(fetchCommentsByArticleId(article.id));

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('error');
        }
    },
);
