import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Select value',
    options: [{
        value: '1',
        label: 'Option 1',
    }, {
        value: '2',
        label: 'Option 2',
    }, {
        value: '3',
        label: 'Option 3',
    }],
};

export const Dark = Template.bind({});
Dark.args = {
    label: 'Select value',
    options: [{
        value: '1',
        label: 'Option 1',
    }, {
        value: '2',
        label: 'Option 2',
    }, {
        value: '3',
        label: 'Option 3',
    }],
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];
