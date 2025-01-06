import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
    profile: {
        form: {
            firstname: 'Roman',
            lastname: 'Pellya',
            age: 20,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Saint-P.',
            username: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
        },
    },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: {
        form: {
            firstname: 'Roman',
            lastname: 'Pellya',
            age: 20,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Saint-P.',
            username: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
        },
    },
})];

export const Blue = Template.bind({});
Blue.args = {};
Blue.decorators = [ThemeDecorator(Theme.BLUE), StoreDecorator({
    profile: {
        form: {
            firstname: 'Roman',
            lastname: 'Pellya',
            age: 20,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Saint-P.',
            username: 'admin',
            avatar: 'https://avatars.githubusercontent.com/u/103450915?v=4',
        },
    },
})];
