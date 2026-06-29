import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ListBox } from './ListBox';

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 150 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;

const mockOptions = [
    {
        value: '1',
        label: 'Option 1',
    },
    {
        value: '2',
        label: 'Option 2',
    },
    {
        value: '3',
        label: 'Option 3',
    },
];

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} onChange={() => ''} />
);

export const TopLeft = Template.bind({});
TopLeft.args = {
    value: 'Option 1',
    direction: 'topLeft',
    label: 'Select value',
    options: mockOptions,
};

export const TopRight = Template.bind({});
TopRight.args = {
    value: 'Option 1',
    direction: 'topRight',
    label: 'Select value',
    options: mockOptions,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
    value: 'Option 1',
    direction: 'bottomLeft',
    label: 'Select value',
    options: mockOptions,
};

export const BottomRight = Template.bind({});
BottomRight.args = {
    value: 'Option 1',
    direction: 'bottomRight',
    label: 'Select value',
    options: mockOptions,
};

export const Light = Template.bind({});
Light.args = {
    value: 'Option 1',
    label: 'Select value',
    options: mockOptions,
};

export const Dark = Template.bind({});
Dark.args = {
    value: 'Option 1',
    label: 'Select value',
    options: mockOptions,
};

Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Blue = Template.bind({});
Blue.args = {
    label: 'Select value',
    value: 'Option 1',
    options: mockOptions,
};

Blue.decorators = [ThemeDecorator(Theme.BLUE)];
