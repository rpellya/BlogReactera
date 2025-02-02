import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
    test('test with one param', () => {
        const params = getQueryParams({ test: 'testValue' });
        expect(params).toEqual('?test=testValue');
    });

    test('test with two params', () => {
        const params = getQueryParams({ test: 'testValue', test2: 'testValue2' });
        expect(params).toEqual('?test=testValue&test2=testValue2');
    });

    test('test with undifned', () => {
        const params = getQueryParams({
            test: 'testValue',
            test2: undefined,
        });
        expect(params).toEqual('?test=testValue');
    });
});
