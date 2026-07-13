import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Country } from 'entities/Country';
import { ProfileCard } from 'entities/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import {
    profileActions,
    profileReducer,
} from '../../model/slices/profileSlice';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { ValidateProfileError } from '../../model/types/EditableProfileCardSchema';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCard';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const redusers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo(
    ({ className, id }: EditableProfileCardProps) => {
        const { t } = useTranslation('profile');
        const dispatch = useAppDispatch();
        const formData = useSelector(getProfileForm);
        const error = useSelector(getProfileError);
        const isLoading = useSelector(getProfileIsLoading);
        const readOnly = useSelector(getProfileReadOnly);
        const validateErrors = useSelector(getProfileValidateErrors);

        const validateErrorTranslates = {
            [ValidateProfileError.INCORRECT_AGE]: t('errors.incorrectAge'),
            [ValidateProfileError.INCORRECT_COUNTRY]: t(
                'errors.incorrectCountry',
            ),
            [ValidateProfileError.INCORRECT_USER_DATA]: t(
                'errors.incorrectUserData',
            ),
            [ValidateProfileError.NO_DATA]: t('errors.noData'),
            [ValidateProfileError.SERVER_ERROR]: t('errors.serverError'),
        };

        useInitialEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id));
            }
        });

        const onChangeFirstname = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ firstname: value || '' }),
                );
            },
            [dispatch],
        );

        const onChangeLastname = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ lastname: value || '' }),
                );
            },
            [dispatch],
        );

        const onChangeAge = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ age: Number(value || 0) }),
                );
            },
            [dispatch],
        );

        const onChangeCity = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ city: value || '' }));
            },
            [dispatch],
        );

        const onChangeUsername = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ username: value || '' }),
                );
            },
            [dispatch],
        );

        const onChangeAvatar = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({
                        avatar: value || 'picture',
                    }),
                );
            },
            [dispatch],
        );

        const onChangeCurrency = useCallback(
            (currency: Currency) => {
                dispatch(profileActions.updateProfile({ currency }));
            },
            [dispatch],
        );
        const onChangeCountry = useCallback(
            (country: Country) => {
                dispatch(profileActions.updateProfile({ country }));
            },
            [dispatch],
        );

        return (
            <DynamicModuleLoader reducers={redusers} removeAfterUnmount>
                <VStack gap="8" max className={classNames('', {}, [className])}>
                    <EditableProfileCardHeader />
                    {validateErrors?.length &&
                        validateErrors.map((error) => (
                            <Text
                                key={error}
                                theme={TextTheme.ERROR}
                                text={validateErrorTranslates[error]}
                                data-testid="EditableProfileCard.Error"
                            />
                        ))}
                    <ProfileCard
                        data={formData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readOnly}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    />
                </VStack>
            </DynamicModuleLoader>
        );
    },
);
