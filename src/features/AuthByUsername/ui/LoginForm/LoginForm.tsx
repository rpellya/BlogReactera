import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    loginByUsername,
} from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './LoginForm.module.scss';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlice';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, isLoading, error,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Auth form')} />
            {error && (
                <Text
                    text={t('You introduced a wrong login or password')}
                    theme={TextTheme.ERROR}
                />
            )}
            <Input
                autofocus
                type="text"
                value={username}
                className={cls.input}
                onChange={onChangeUsername}
                placeholder={t('Enter username')}
            />
            <Input
                type="text"
                value={password}
                className={cls.input}
                onChange={onChangePassword}
                placeholder={t('Enter password')}
            />
            <Button
                disabled={isLoading}
                onClick={onLoginClick}
                className={cls.loginBtn}
                theme={ButtonVariant.OUTLINE}
            >
                {t('Login')}
            </Button>
        </div>
    );
};
