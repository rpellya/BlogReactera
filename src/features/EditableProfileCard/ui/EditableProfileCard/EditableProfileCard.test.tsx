import { componentRender } from 'shared/lib/tests/componentRouter/componentRouter';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { userEvent } from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slices/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    firstname: 'admin',
    lastname: 'admin',
    age: 22,
    currency: Currency.EUR,
    country: Country.Belarus,
    city: 'Minsk',
    username: 'adminchik',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    beforeEach(() => componentRender(<EditableProfileCard id="1" />, options));

    test('Should be Edit mode form', async () => {
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton'));
    });

    test('Reset data in the form when click cancel button', async () => {
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        // Clear the data in inputs
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.age'));

        // Type the another data in inputs
        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        );
        await userEvent.type(
            screen.getByTestId('ProfileCard.lastname'),
            'user',
        );
        await userEvent.type(screen.getByTestId('ProfileCard.age'), '20');

        // Check the another data in inputs
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.age')).toHaveValue('20');

        // Click the cancel button for reset another data in inputs
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.CancelButton'),
        );

        // And check the initialdatas in inputs
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(
            profile.firstname,
        );
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(
            profile.lastname,
        );
        expect(screen.getByTestId('ProfileCard.age')).toHaveValue(
            String(profile.age),
        );
    });

    test('Should be display error', async () => {
        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('');

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton'),
        );

        expect(
            screen.getByTestId('EditableProfileCard.Error.Paragraph'),
        ).toBeInTheDocument();
    });

    test('Put request method for success data', async () => {
        const mockPutrequest = jest.spyOn($api, 'put');

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.EditButton'),
        );

        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        );

        await userEvent.click(
            screen.getByTestId('EditableProfileCardHeader.SaveButton'),
        );

        expect(mockPutrequest).toHaveBeenCalled();
    });
});
