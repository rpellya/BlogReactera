/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Article, RawArticle } from './types';

/**
 * Загружает статьи из JSON-файла с поддержкой потоковой обработки.
 * @param filePath - путь к файлу
 * @returns массив статей в нормализованном формате
 */
export async function loadArticlesFromFile(
    filePath: string,
): Promise<Article[]> {
    const stream = createReadStream(filePath, { encoding: 'utf8' });
    const rl = createInterface({ input: stream, crlfDelay: Infinity });

    let buffer = '';
    try {
        for await (const line of rl) {
            buffer += line;
        }
    } catch (err) {
        // Ошибка при чтении файла (например, файл не найден)
        throw new Error('File not found');
    }

    let data;
    try {
        data = JSON.parse(buffer);
    } catch (err) {
        throw new Error('Invalid JSON format');
    }

    const articles = Array.isArray(data) ? data : data.articles;
    // normalizeArticles выбросит собственную ошибку, если данные некорректны
    return normalizeArticles(articles);
}

/**
 * Нормализует сырые данные статей к единому формату.
 */
export function normalizeArticles(rawArticles: RawArticle[]): Article[] {
    return rawArticles.map((raw) => {
        if (!raw.id) throw new Error('Missing required field: id');
        if (!raw.title) throw new Error('Missing required field: title');
        if (raw.year && (typeof raw.year !== 'number' || raw.year < 1900)) {
            throw new Error('Invalid year');
        }
        return {
            id: String(raw.id),
            title: raw.title,
            authors: raw.authors || [],
            year: raw.year || new Date().getFullYear(),
            citations: raw.citations || raw.references || [],
        };
    });
}
