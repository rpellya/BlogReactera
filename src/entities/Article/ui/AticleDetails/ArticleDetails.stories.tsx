import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleDetails } from './ArticleDetails';
import { articleData } from '../../mocks/data';

export default {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
    <ArticleDetails {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        articleDetails: {
            data: articleData,
        },
    }),
];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [
    StoreDecorator({
        articleDetails: {
            error: 'Ошибка при загрузке статьи',
        },
    }),
];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [
    StoreDecorator({
        articleDetails: {
            isLoading: true,
        },
    }),
];
