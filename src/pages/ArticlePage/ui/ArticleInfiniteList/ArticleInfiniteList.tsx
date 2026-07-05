import { useSelector } from 'react-redux';
import { ArticleList } from 'entities/Article';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlePageSlice';

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = ({
    className,
}: ArticleInfiniteListProps) => {
    const { t } = useTranslation('article');

    const articles = useSelector(getArticles.selectAll);
    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    if (error) {
        return <Text text={t('Error')} />;
    }

    return (
        <ArticleList
            className={className}
            isLoading={isLoading}
            view={view}
            articles={articles}
        />
    );
};
