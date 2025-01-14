import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
    className?: string;
}
const ArticlePage = ({ className }: ArticlePageProps) => {
    const { t } = useTranslation('article');
    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            {t('Article page')}
        </div>
    );
};

export default memo(ArticlePage);
