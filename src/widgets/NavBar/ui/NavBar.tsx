import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './NavBar.module.scss';

interface NavBarProps {
    className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
    const { t } = useTranslation('about');
    return (
        <div className={classNames(cls.NavBar, {}, [className])}>
            <div className={cls.links}>
                <AppLink
                    to="/"
                    className={cls.mainLink}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('Main')}
                </AppLink>
                <AppLink
                    // eslint-disable-next-line i18next/no-literal-string
                    to="/about"
                    className={cls.mainLink}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('About us')}
                </AppLink>
            </div>
        </div>
    );
};
