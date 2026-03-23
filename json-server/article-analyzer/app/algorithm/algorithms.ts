// АЛГОРИТМЫ  (встроены в CLI — не требуют сборки TypeScript)

import path from 'path';
import fs from 'fs';

export function normalizeArticles(raw: any[]) {
    return raw.map((a) => {
        if (!a.id) throw new Error('[103] Missing required field: id');
        if (!a.title) throw new Error('[103] Missing required field: title');
        const year =
            a.year !== undefined && a.year !== null
                ? a.year
                : new Date().getFullYear();
        if (typeof year !== 'number' || year < 1900)
            throw new Error(`[104] Invalid year: ${year}`);
        if (a.citations !== undefined && !Array.isArray(a.citations))
            throw new Error('[104] citations must be an array');
        return {
            id: String(a.id),
            title: String(a.title),
            year,
            authors: Array.isArray(a.authors) ? a.authors : [],
            citations: Array.isArray(a.citations) ? a.citations : [],
        };
    });
}

export function loadArticles(filePath: string) {
    const abs = path.resolve(filePath);
    if (!fs.existsSync(abs))
        throw new Error(`[101] File not found: ${filePath}`);
    let raw;
    try {
        raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
    } catch {
        throw new Error(`[102] Invalid JSON: ${filePath}`);
    }
    if (!Array.isArray(raw)) throw new Error('[102] JSON must be an array');
    return normalizeArticles(raw);
}
export function pagerankSparse(
    graph: any,
    damping: number,
    iterations: number,
) {
    if (iterations < 1) throw new Error('Iterations must be >= 1');
    if (damping <= 0 || damping >= 1)
        throw new Error('Damping must be in (0,1)');
    const { n, outDegree, outLinks } = graph;
    let pr = Array(n).fill(1 / n);
    for (let k = 0; k < iterations; k += 1) {
        const np = Array(n).fill((1 - damping) / n);
        for (let v = 0; v < n; v += 1) {
            if (outDegree[v] > 0) {
                // ветка true
                const c = (damping * pr[v]) / outDegree[v];
                // eslint-disable-next-line no-restricted-syntax
                for (const j of outLinks[v]) np[j] += c;
            } else {
                // висячая вершина
                const c = (damping * pr[v]) / n;
                for (let j = 0; j < n; j += 1) np[j] += c;
            }
        }
        pr = np;
    }
    return pr;
}

export function pagerankDense(graph: any, damping: number, iterations: number) {
    if (iterations < 1) throw new Error('Iterations must be >= 1');
    if (damping <= 0 || damping >= 1)
        throw new Error('Damping must be in (0,1)');
    const { n, matrix } = graph;
    const M = Array.from({ length: n }, (_, i) => {
        const deg = matrix[i].reduce((s: any, v: any) => s + v, 0);
        return Array.from({ length: n }, (_, j) =>
            deg > 0 ? matrix[i][j] / deg : 1 / n,
        );
    });
    let pr = Array(n).fill(1 / n);
    for (let k = 0; k < iterations; k += 1) {
        const np = Array(n).fill((1 - damping) / n);
        for (let j = 0; j < n; j += 1)
            for (let i = 0; i < n; i += 1) np[j] += damping * M[i][j] * pr[i];
        pr = np;
    }
    return pr;
}

export function buildSparse(articles: any[]) {
    const n = articles.length;
    const idx = new Map(articles.map((a, i) => [a.id, i]));
    const outLinks = Array.from({ length: n }, () => []);
    const inLinks = Array.from({ length: n }, () => []);
    const outDegree = Array(n).fill(0);
    articles.forEach((a, i) => {
        (a.citations || []).forEach((cid: any) => {
            const j = idx.get(cid);
            if (j === undefined) return; // ignoreMissing
            outLinks[i].push(j);
            inLinks[j].push(i);
            outDegree[i] += 1;
        });
    });
    return { outLinks, inLinks, outDegree, n };
}

export function buildDense(articles: any[]) {
    const n = articles.length;
    const idx = new Map(articles.map((a, i) => [a.id, i]));
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    articles.forEach((a, i) =>
        (a.citations || []).forEach((cid: any) => {
            const j = idx.get(cid);
            if (j !== undefined) matrix[i][j] = 1;
        }),
    );
    return { matrix, n };
}
