import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { HStack } from 'shared/ui/Stack';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slices/profileSlice';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({
    className,
}: EditableProfileCardHeaderProps) => {
    const { t } = useTranslation('profile');
    const readOnly = useSelector(getProfileReadOnly);
    const profileData = useSelector(getProfileData);
    const authData = useSelector(getUserAuthData);
    const canEdit = profileData?.id === authData?.id;
    const dispatch = useAppDispatch();

    const onEditClick = useCallback(() => {
        dispatch(profileActions.setReadOnly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
        >
            <Text title={t('Profile')} />
            {canEdit && (
                <div>
                    {readOnly ? (
                        <Button
                            theme={ButtonVariant.OUTLINE}
                            onClick={onEditClick}
                        >
                            {t('Edit')}
                        </Button>
                    ) : (
                        <HStack>
                            <Button
                                theme={ButtonVariant.OUTLINE}
                                onClick={onSave}
                            >
                                {t('Save')}
                            </Button>
                            <Button
                                theme={ButtonVariant.OUTLINE_RED}
                                onClick={onCancelEdit}
                            >
                                {t('Cancel')}
                            </Button>
                        </HStack>
                    )}
                </div>
            )}
        </HStack>
    );
};
