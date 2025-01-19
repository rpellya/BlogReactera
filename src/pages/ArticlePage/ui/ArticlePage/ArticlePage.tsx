import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { ArticleView } from 'entities/Article';
import cls from './ArticlePage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const ArticlePage = ({ className }: ArticlePageProps) => (
    <div className={classNames(cls.ArticlePage, {}, [className])}>
        <ArticleList view={ArticleView.LIST} articles={[]} />
    </div>
);

export default memo(ArticlePage);
