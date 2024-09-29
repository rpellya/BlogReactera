import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonVariant } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonVariant.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'Text',
    theme: ButtonVariant.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Text',
    theme: ButtonVariant.OUTLINE,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
    children: 'Text',
    theme: ButtonVariant.OUTLINE,
    size: ButtonSize.L,
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
    children: 'Text',
    theme: ButtonVariant.OUTLINE,
    size: ButtonSize.XL,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'Text',
    theme: ButtonVariant.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    children: 'Text',
    theme: ButtonVariant.BACKGOUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
    children: 'Text',
    theme: ButtonVariant.BACKGOUND_INVERTED,
};

export const SqaureSizeM = Template.bind({});
SqaureSizeM.args = {
    children: '>',
    theme: ButtonVariant.BACKGOUND_INVERTED,
    square: true,
    size: ButtonSize.M,
};

export const SqaureSizeL = Template.bind({});
SqaureSizeL.args = {
    children: '>',
    theme: ButtonVariant.BACKGOUND_INVERTED,
    square: true,
    size: ButtonSize.L,
};

export const SqaureSizeXL = Template.bind({});
SqaureSizeXL.args = {
    children: '>',
    theme: ButtonVariant.BACKGOUND_INVERTED,
    square: true,
    size: ButtonSize.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'text',
    theme: ButtonVariant.OUTLINE,
    disabled: true,
};
