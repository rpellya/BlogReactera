import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleView } from 'entities/Article/model/types/article';
import { articleData } from 'entities/Article/mocks/data';
import { ArticleListItem } from './ArticleListItem';

export default {
    title: 'entities/Article/ArticleListItem',
    component: ArticleListItem,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ArticleListItem>;

const Template: ComponentStory<typeof ArticleListItem> = (args) => (
    <ArticleListItem {...args} />
);

export const Tile = Template.bind({});
Tile.args = {
    view: ArticleView.TILE,
    article: articleData,
};
Tile.decorators = [];

export const TileDark = Template.bind({});
TileDark.args = {
    view: ArticleView.TILE,
    article: articleData,
};
TileDark.decorators = [ThemeDecorator(Theme.DARK)];

export const List = Template.bind({});
List.args = {
    view: ArticleView.LIST,
    article: articleData,
};

export const ListDark = Template.bind({});
ListDark.args = {
    view: ArticleView.LIST,
    article: articleData,
};
ListDark.decorators = [ThemeDecorator(Theme.DARK)];
