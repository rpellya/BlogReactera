import { ComponentStory, ComponentMeta } from '@storybook/react';
import avatar from 'shared/assets/tests/storybook.jpg';
import { Avatar } from './Avatar';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    src: avatar,
};

export const Small = Template.bind({});
Small.args = {
    src: avatar,
    size: 40,
};
