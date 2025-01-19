import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleView } from 'entities/Article/model/types/article';
import { ArticleList } from './ArticleList';
import { articleData } from '../../mocks/data';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => <ArticleList {...args} />;

export const List = Template.bind({});
List.args = {
    articles: new Array(3).fill(0).map((_, index) => ({
        ...articleData,
        id: String(index),
    })),
    view: ArticleView.LIST,
};
List.decorators = [];

export const LoadingList = Template.bind({});
LoadingList.args = {
    isLoading: true,
    view: ArticleView.LIST,
};

export const ListDark = Template.bind({});
ListDark.args = {
    articles: new Array(3).fill(0).map((_, index) => ({
        ...articleData,
        id: String(index),
    })),
    view: ArticleView.LIST,
};
ListDark.decorators = [];
ListDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Tile = Template.bind({});
Tile.args = {
    articles: new Array(12).fill(0).map((_, index) => ({
        ...articleData,
        id: String(index),
    })),
    view: ArticleView.TILE,
};
Tile.decorators = [];

export const LoadingTile = Template.bind({});
LoadingTile.args = {
    isLoading: true,
    view: ArticleView.TILE,
};

export const TileDark = Template.bind({});
TileDark.args = {
    articles: new Array(12).fill(0).map((_, index) => ({
        ...articleData,
        id: String(index),
    })),
    view: ArticleView.TILE,
};
TileDark.decorators = [];
TileDark.decorators = [ThemeDecorator(Theme.DARK)];
