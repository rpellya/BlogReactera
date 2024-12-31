import { ComponentStory, ComponentMeta } from '@storybook/react';
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
    src: 'https://avatars.githubusercontent.com/u/103450915?v=4',
};

export const Small = Template.bind({});
Small.args = {
    src: 'https://avatars.githubusercontent.com/u/103450915?v=4',
    size: 40,
};
