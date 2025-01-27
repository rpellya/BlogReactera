/* eslint-disable max-len */
import avatar from 'shared/assets/tests/storybook.jpg';
import { Article } from '../model/types/article';

export const articleData = {
    id: '1',
    title: 'React',
    subtitle: 'Что нового в React 19',
    img: 'https://habrastorage.org/r/w1560/webt/jc/hw/st/jchwst6a3nwlxlscnmuw5tdhmry.png',
    createdAt: '07.01.2025',
    user: {
        id: '1',
        username: 'Pellya',
        avatar,
    },
    views: 99999,
    type: ['IT'],
    blocks: [
        {
            id: '1',
            type: 'TEXT',
            title: '❯ Серверные компоненты',
            paragraphs: [
                'Серверные компоненты позволяют создавать сложные веб-приложения с помощью языка программирования JavaScript. Серверные компоненты позволяют создавать сложные веб-приложения с помощью языка программирования JavaScript.',
            ],
        },
        {
            id: '2',
            type: 'CODE',
            code: "<!DOCTYPE html>\n<html>\n<body>\n<div id='root'></div>\n<script src='/static/js/bundle.js'></script>\n</body></html>",
        },
        {
            id: '3',
            type: 'TEXT',
            paragraphs: [
                "Чтобы скрыть этот некрасивый 'пустой' период, разработчики стали применять 'скелетоны' — временные визуальные заглушки, которые отображались до загрузки и рендеринга реальных данных.",
            ],
        },
        {
            id: '4',
            type: 'IMAGE',
            src: 'https://habrastorage.org/webt/ef/fp/oc/effpocn_jas3pmtxbcthcdzrlim.png',
            title: 'Изображение 1',
        },
        {
            id: '5',
            type: 'TEXT',
            paragraphs: [
                'React усовершенствовался благодаря серверному рендерингу (Server-Side Rendering — SSR). Этот подход предполагает, что первоначальный рендеринг происходит на сервере, а не на клиенте, что позволяет отправлять пользователю HTML-код с готовым начальным интерфейсом, ускоряя его отображение. Однако даже в этом случае для показа реального содержимого страницы требуется дополнительная загрузка данных с сервера.',
            ],
        },
        {
            id: '6',
            type: 'IMAGE',
            src: 'https://habrastorage.org/r/w1560/webt/gx/tu/ho/gxtuho0dyyqmkoookmig25onde0.png',
            title: 'Изображение 2',
        },
        {
            id: '7',
            type: 'TEXT',
            paragraphs: [
                'Фреймворки React расширили свои возможности, чтобы улучшить пользовательский опыт, внедрив такие концепции, как генерация статического контента (Static-Site Generation — SSG) и его инкрементная регенерация (Incremental Static Regeneration — ISR).',
            ],
        },
        {
            id: '8',
            type: 'TEXT',
            paragraphs: [
                'SSG предполагает предварительную сборку и кэширование динамических данных во время генерации сайта. ISR дает возможность обновлять этот кэш по мере необходимости, без полной перезагрузки страницы.',
            ],
        },
    ],
} as Article;
