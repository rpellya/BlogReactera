import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: { backgroundColor: { control: 'color' } },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'Test comment 1',
            user: { id: '2', username: 'admin' },
        },
        {
            id: '2',
            text: 'Test comment 2',
            user: { id: '2', username: 'user' },
        },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    comments: [
        {
            id: '1',
            text: 'Test comment 1',
            user: { id: '2', username: 'admin' },
        },
        {
            id: '2',
            text: 'Test comment 2',
            user: { id: '2', username: 'user' },
        },
    ],
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
