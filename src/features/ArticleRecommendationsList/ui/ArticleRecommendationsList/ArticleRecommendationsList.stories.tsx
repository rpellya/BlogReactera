import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import withMock from 'storybook-addon-mock';
import { articleData } from 'entities/Article/mocks/data';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
    title: 'features/ArticleRecommendationsList',
    component: ArticleRecommendationsList,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
    <ArticleRecommendationsList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: 'http://example.ru/articles?_limit=4',
            method: 'GET',
            status: 200,
            response: [
                { ...articleData, id: '1' },
                { ...articleData, id: '2' },
                { ...articleData, id: '3' },
                { ...articleData, id: '4' },
            ],
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
Dark.parameters = {
    mockData: [
        {
            url: 'http://example.ru/articles?_limit=4',
            method: 'GET',
            status: 200,
            response: [
                { ...articleData, id: '1' },
                { ...articleData, id: '2' },
                { ...articleData, id: '3' },
                { ...articleData, id: '4' },
            ],
        },
    ],
};
