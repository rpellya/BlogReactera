import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'enteties/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const PrimaryDefault = Template.bind({});
PrimaryDefault.args = {
    data: {
        firstname: 'Roman',
        lastname: 'Pellya',
        age: 20,
        currency: Currency.EUR,
        country: Country.Russia,
        city: 'Saint-P.',
        username: 'admin',
        avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
    },
};

export const PrimaryError = Template.bind({});
PrimaryError.args = {
    error: 'true',
};

export const PrimaryLoading = Template.bind({});
PrimaryLoading.args = {
    isLoading: true,
};

export const DarkDefault = Template.bind({});
DarkDefault.args = {
    data: {
        firstname: 'Roman',
        lastname: 'Pellya',
        age: 20,
        currency: Currency.EUR,
        country: Country.Russia,
        city: 'Saint-P.',
        username: 'admin',
        avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
    },
};
DarkDefault.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkError = Template.bind({});
DarkError.args = {
    error: 'true',
};
DarkError.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkLoading = Template.bind({});
DarkLoading.args = {
    isLoading: true,
};
DarkLoading.decorators = [ThemeDecorator(Theme.DARK)];
