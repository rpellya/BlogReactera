import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ArticleSortSelector } from './ArticleSortSelector';

export default {
    title: 'entities/Article/ArticleSortSelector',
    component: ArticleSortSelector,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ArticleSortSelector>;

const Template: ComponentStory<typeof ArticleSortSelector> = (
    args,
) => <ArticleSortSelector {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};
Normal.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {
};
Dark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)];
