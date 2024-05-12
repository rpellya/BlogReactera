import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './NavBar.module.scss';

interface NavBarProps {
    className?: string;
}

export const NavBar = ({ className }: NavBarProps) => (
    <div className={classNames(cls.NavBar, {}, [className])}>
        <div className={cls.links}>
            <AppLink
                to="/"
                className={cls.mainLink}
                theme={AppLinkTheme.SECONDARY}
            >
                Main
            </AppLink>
            <AppLink
                to="/about"
                className={cls.mainLink}
                theme={AppLinkTheme.SECONDARY}
            >
                About
            </AppLink>
        </div>
    </div>
);
