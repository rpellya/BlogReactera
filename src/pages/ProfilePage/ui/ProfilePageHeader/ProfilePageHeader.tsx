import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getProfileData,
    getProfileReadOnly,
    profileActions,
    updateProfileData,
} from 'entities/Profile';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Profile')} />
            {canEdit && (
                <div className={cls.btnsWrapper}>
                    {readOnly ? (
                        <Button
                            className={cls.editBtn}
                            theme={ButtonVariant.OUTLINE}
                            onClick={onEditClick}
                        >
                            {t('Edit')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                className={cls.saveBtn}
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
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
