/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';
import { state } from './state';
import { CYAN, GRAY, YELLOW } from './tools';
import { cmdLoad } from './commands/cmdLoad';

// const ROOT = path.join(__dirname, '../../../');
// const demo = path.join(
//     ROOT,
//     'json-server',
//     'article-analyzer',
//     'mock',
//     'articles.json',
// );

export function ensureData() {
    if (state.articles) return true;
    const demo = path.join(__dirname, '../mock/articles.json');

    if (fs.existsSync(demo)) {
        console.log(
            GRAY('  → Данные не загружены, используются demo: ') +
                CYAN('../mock/articles.json'),
        );
        cmdLoad(demo, true);
        return true;
    }
    console.log(
        YELLOW('  ⚠  Сначала загрузите данные:  ') + CYAN('load <file>'),
    );
    return false;
}
