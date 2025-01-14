import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types/article';
import { ArticleDetails } from './ArticleDetails';

export default {
    title: 'enteties/ArticleDetails',
    component: ArticleDetails,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => <ArticleDetails {...args} />;

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

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    articleDetails: {
        data: articleData,
    },
})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
    articleDetails: {
        error: 'Ошибка при загрузке статьи',
    },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    articleDetails: {
        isLoading: true,
    },
})];
