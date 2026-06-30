import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { articlesPageAction, articlesPageReducer } from './articlePageSlice';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

describe('articlePageSlice.test', () => {
    test('Test set view', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            view: ArticleView.TILE,
        };
        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                articlesPageAction.setView(ArticleView.LIST),
            ),
        ).toEqual({ view: ArticleView.LIST });
    });

    test('Test update profile service fulfilled', () => {
        const state: DeepPartial<ArticlesPageSchema> = {
            isLoading: true,
        };
        expect(
            articlesPageReducer(
                state as ArticlesPageSchema,
                fetchArticlesList.fulfilled([{ id: '1' } as Article], '', {
                    replace: true,
                }),
            ),
        ).toEqual({
            entities: { 1: { id: '1' } },
            hasMore: false,
            isLoading: false,
            ids: ['1'],
        });
    });
});
