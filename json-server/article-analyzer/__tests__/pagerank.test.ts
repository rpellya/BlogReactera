/* eslint-disable no-plusplus */
import { pagerankSparse, pagerankDense } from '../pagerank';
import { buildGraphSparse, buildGraphDense } from '../graph';

describe('PageRank', () => {
    const articles = [
        { id: '1', title: 'A', authors: [], year: 2020, citations: ['2'] },
        { id: '2', title: 'B', authors: [], year: 2020, citations: ['1', '3'] },
        { id: '3', title: 'C', authors: [], year: 2020, citations: ['1'] },
    ];
    const graphSparse = buildGraphSparse(articles);
    const graphDense = buildGraphDense(articles);
    const n = 3;

    test('Сравнение двух реализаций (результаты должны совпадать)', () => {
        const prSparse = pagerankSparse(graphSparse, 0.85, 20, n);
        const prDense = pagerankDense(graphDense, 0.85, 20, n);
        for (let i = 0; i < n; i++) {
            expect(prSparse[i]).toBeCloseTo(prDense[i], 6);
        }
    });

    test('iterations = 1 (минимальное допустимое)', () => {
        expect(() => pagerankSparse(graphSparse, 0.85, 1, n)).not.toThrow();
    });

    test('iterations = 0 (недопустимо)', () => {
        expect(() => pagerankSparse(graphSparse, 0.85, 0, n)).toThrow(
            'Iterations must be >= 1',
        );
    });

    test('damping = 0.5 (допустимо)', () => {
        const pr = pagerankSparse(graphSparse, 0.5, 20, n);
        expect(pr).toBeDefined();
    });

    test('damping = 1 (недопустимо)', () => {
        expect(() => pagerankSparse(graphSparse, 1, 20, n)).toThrow(
            'Damping must be in (0,1)',
        );
    });
});
