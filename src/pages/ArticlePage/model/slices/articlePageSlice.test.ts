import { ArticleView } from 'entities/Article';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { articlesPageAction, articlesPageReducer } from './articlePageSlice';

describe('articlePageSlice.test', () => {
    test('Test set view', () => {
        const state: DeepPartial<ArticlesPageSchema> = { view: ArticleView.TILE };
        expect(articlesPageReducer(
            state as ArticlesPageSchema,
            articlesPageAction.setView(ArticleView.LIST),
        )).toEqual({ view: ArticleView.LIST });
    });
});
