import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../Button/Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <Button>Open</Button>,
    items: [
        {
            content: 'first href',
            href: 'first',
        },
        {
            content: 'second',
        },
        {
            content: 'third',
        },
    ],
};
