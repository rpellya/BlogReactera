import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './LangSwitcher.module.scss';
import { Button, ButtonVariant } from '../Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggleTranslate = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };
    return (
        <Button
            onClick={toggleTranslate}
            theme={ButtonVariant.CLEAR}
            className={classNames(cls.LangSwitcher, {}, [className])}
        >
            {t(short ? 'Short language' : 'Language')}
        </Button>
    );
});
