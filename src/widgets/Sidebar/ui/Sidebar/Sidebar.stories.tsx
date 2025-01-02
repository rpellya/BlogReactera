import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Sidebar } from './Sidebar';

export default {
    title: 'widget/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({
        user: { authData: {} },
    })],
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const NoAuthLight = Template.bind({});
NoAuthLight.args = {};
NoAuthLight.decorators = [StoreDecorator({ user: {} })];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const NoAuthDark = Template.bind({});
NoAuthDark.args = {};
NoAuthDark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({ user: {} }),
];
