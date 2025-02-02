import { TestAsyncThunk } from 'shared/lib/tests/TestAyncThunk/TestAyncThunk';
import { fetchNextArticlesPage } from './fetchNextArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('fetchNextArticlesPage.test', () => {
    // test('Success fetch next articles page data', async () => {
    //     const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
    //         articlesPage: {
    //             hasMore: true,
    //             isLoading: false,
    //             page: 2,
    //             limit: 5,
    //             entities: {},
    //         },
    //     });

    //     await thunk.callThunk();

    //     expect(thunk.dispatch).toBeCalledTimes(4);
    //     expect(fetchArticlesList).toHaveBeenCalledWith({ page: 3 });
    // });

    test("fetchArticlesList isn't called", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                hasMore: false,
                isLoading: false,
                page: 2,
                limit: 5,
                entities: {},
                ids: [],
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });

    test("fetchArticlesList isn't called with isLoading was false", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlesPage: {
                hasMore: true,
                isLoading: true,
                page: 2,
                limit: 5,
                entities: {},
                ids: [],
            },
        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
