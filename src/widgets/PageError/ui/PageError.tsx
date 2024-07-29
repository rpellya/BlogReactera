import { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();
    // eslint-disable-next-line no-restricted-globals
    const reloadPage = useCallback(() => location.reload(), []);
    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>{t('An unforeseen mistake occurred')}</p>
            <Button onClick={reloadPage}>{t('Refresh the page')}</Button>
        </div>
    );
};
