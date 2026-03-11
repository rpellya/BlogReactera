import { Article } from './types';

export interface GraphSparse {
    outLinks: number[][]; // для каждой вершины список индексов исходящих соседей
    inLinks: number[][]; // входящие соседи
    outDegree: number[];
    n: number;
}

export interface GraphDense {
    matrix: number[][]; // плотная матрица смежности
    n: number;
}

/**
 * Строит разреженное представление графа.
 */
export function buildGraphSparse(
    articles: Article[],
    options = { ignoreMissing: false },
): GraphSparse {
    const idToIndex = new Map<string, number>();
    articles.forEach((a, idx) => idToIndex.set(a.id, idx));

    const outLinks: number[][] = Array(articles.length)
        .fill(0)
        .map(() => []);
    const inLinks: number[][] = Array(articles.length)
        .fill(0)
        .map(() => []);
    const outDegree = Array(articles.length).fill(0);

    articles.forEach((article, idx) => {
        const targets = article.citations
            .map((ref) => idToIndex.get(ref))
            .filter((t) => t !== undefined) as number[];
        if (
            !options.ignoreMissing &&
            targets.length !== article.citations.length
        ) {
            throw new Error('Some citations refer to missing articles');
        }
        outLinks[idx] = targets;
        outDegree[idx] = targets.length;
        targets.forEach((t) => inLinks[t].push(idx));
    });

    return { outLinks, inLinks, outDegree, n: articles.length };
}

/**
 * Строит плотную матрицу смежности.
 */
export function buildGraphDense(articles: Article[]): GraphDense {
    const n = articles.length;
    const idToIndex = new Map<string, number>();
    articles.forEach((a, idx) => idToIndex.set(a.id, idx));

    const matrix = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));
    articles.forEach((article, i) => {
        article.citations.forEach((ref) => {
            const j = idToIndex.get(ref);
            if (j !== undefined) {
                matrix[i][j] = 1;
            }
        });
    });

    return { matrix, n };
}
