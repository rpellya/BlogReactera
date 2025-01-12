import { TestAsyncThunk } from 'shared/lib/tests/TestAyncThunk/TestAyncThunk';
import { fetchArticleById } from './fetchArticleById';
import { ArticleBlockType, ArticleType } from '../../types/article';

const articleData = {
    id: '1',
    title: 'React',
    subtitle: 'Что нового в React 19',
    img: 'https://habrastorage.org/r/w1560/webt/jc/hw/st/jchwst6a3nwlxlscnmuw5tdhmry.png',
    createdAt: '07.01.2025',
    views: 99999,
    type: [ArticleType.IT],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: '❯ Серверные компоненты',
            paragraphs: [
                // eslint-disable-next-line max-len
                'Серверные компоненты позволяют создавать сложные веб-приложения с помощью языка программирования JavaScript. Серверные компоненты позволяют создавать сложные веб-приложения с помощью языка программирования JavaScript.',
            ],
        },
        {
            id: '2',
            type: ArticleBlockType.CODE,
            // eslint-disable-next-line max-len
            code: "<!DOCTYPE html>\n<html>\n<body>\n<div id='root'></div>\n<script src='/static/js/bundle.js'></script>\n</body></html>",
        },

        {
            id: '4',
            type: ArticleBlockType.IMAGE,
            src: 'https://habrastorage.org/webt/ef/fp/oc/effpocn_jas3pmtxbcthcdzrlim.png',
            title: 'Изображение 1',
        },
    ],
};

describe('fetchArticleById.test', () => {
    test('Success fetch articles data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: articleData }));

        const result = await thunk.callThunk('1');

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalled(); // is was get request
        expect(thunk.api.get).toHaveBeenCalledWith('/articles/1');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(articleData);
    });

    test('Error fetch article data', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
    });
});
