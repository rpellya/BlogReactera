import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

/**
 * Profile card component for disp user profile information
 * This component isn't depended on any other state
 */
export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonly = false,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    text={t('Try to update the page')}
                    theme={TextTheme.ERROR}
                    title={t('There was an error')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }
    const onKeyPress = (event: React.KeyboardEvent) => {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
        }
    };

    return (
        <VStack
            max
            gap="12"
            className={classNames(cls.ProfileCard, {}, [className])}
        >
            {data?.avatar && (
                <HStack max justify="center" className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} alt={data?.username} />
                </HStack>
            )}
            <Input
                value={data?.firstname || ''}
                placeholder={t('Your name')}
                readOnly={readonly}
                onChange={onChangeFirstname}
            />
            <Input
                value={data?.lastname || ''}
                placeholder={t('Your lastname')}
                readOnly={readonly}
                onChange={onChangeLastname}
            />
            <Input
                value={data?.age}
                placeholder={t('Your age')}
                readOnly={readonly}
                onChange={onChangeAge}
                onKeyPress={onKeyPress}
            />
            <Input
                value={data?.city || ''}
                placeholder={t('City')}
                readOnly={readonly}
                onChange={onChangeCity}
            />
            <Input
                value={data?.username || ''}
                placeholder={t('Enter username')}
                readOnly={readonly}
                onChange={onChangeUsername}
            />
            <Input
                value={data?.avatar || ''}
                placeholder={t('Enter link to avatar')}
                readOnly={readonly}
                onChange={onChangeAvatar}
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};
