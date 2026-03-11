/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import { GraphSparse, GraphDense } from './graph';

/**
 * Разреженная версия PageRank.
 */
export function pagerankSparse(
    graph: GraphSparse,
    damping: number,
    iterations: number,
    n: number,
): number[] {
    if (iterations < 1) throw new Error('Iterations must be >= 1');
    if (damping <= 0 || damping >= 1)
        throw new Error('Damping must be in (0,1)');

    let pr = new Array(n).fill(1 / n);
    const base = (1 - damping) / n;

    for (let iter = 0; iter < iterations; iter++) {
        const newPr = new Array(n).fill(base);
        for (let i = 0; i < n; i++) {
            if (graph.outDegree[i] === 0) {
                // висячая вершина: размазываем равномерно
                const contribution = (damping * pr[i]) / n;
                for (let j = 0; j < n; j++) {
                    newPr[j] += contribution;
                }
            } else {
                const contribution = (damping * pr[i]) / graph.outDegree[i];
                for (const j of graph.outLinks[i]) {
                    newPr[j] += contribution;
                }
            }
        }
        pr = newPr;
    }
    return pr;
}

/**
 * Плотная версия PageRank.
 */
export function pagerankDense(
    graph: GraphDense,
    damping: number,
    iterations: number,
    n: number,
): number[] {
    if (iterations < 1) throw new Error('Iterations must be >= 1');
    if (damping <= 0 || damping >= 1)
        throw new Error('Damping must be in (0,1)');

    // Вычисляем исходящие степени
    const outDegree = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            outDegree[i] += graph.matrix[i][j];
        }
    }

    let pr = new Array(n).fill(1 / n);
    const base = (1 - damping) / n;

    for (let iter = 0; iter < iterations; iter++) {
        const newPr = new Array(n).fill(base);
        for (let i = 0; i < n; i++) {
            if (outDegree[i] === 0) {
                const contribution = (damping * pr[i]) / n;
                for (let j = 0; j < n; j++) {
                    newPr[j] += contribution;
                }
            } else {
                const contribution = (damping * pr[i]) / outDegree[i];
                for (let j = 0; j < n; j++) {
                    if (graph.matrix[i][j] > 0) {
                        newPr[j] += contribution;
                    }
                }
            }
        }
        pr = newPr;
    }
    return pr;
}
