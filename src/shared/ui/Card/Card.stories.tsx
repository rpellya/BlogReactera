import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Card } from './Card';
import { Text } from '../Text/Text';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    // eslint-disable-next-line i18next/no-literal-string
    children: <Text title="Test" text="Test test" />,
};
Normal.decorators = [];

export const Dark = Template.bind({});
Dark.args = {
    // eslint-disable-next-line i18next/no-literal-string
    children: <Text title="Test" text="Test test" />,
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
