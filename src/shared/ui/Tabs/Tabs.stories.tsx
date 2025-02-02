import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    value: 'tab 2',
    onTabClick: action('onTabClick'),
    tabs: [
        {
            value: 'tab 1',
            content: 'Text 1',
        },
        {
            value: 'tab 2',
            content: 'Text 2',
        },
        {
            value: 'tab 3',
            content: 'Text 3',
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    value: 'tab 3',
    onTabClick: action('onTabClick'),
    tabs: [
        {
            value: 'tab 1',
            content: 'Text 1',
        },
        {
            value: 'tab 2',
            content: 'Text 2',
        },
        {
            value: 'tab 3',
            content: 'Text 3',
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
