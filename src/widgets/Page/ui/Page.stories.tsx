import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Page } from './Page';

export default {
    title: 'widgets/Page',
    component: Page,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: 'Text',
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Text',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
