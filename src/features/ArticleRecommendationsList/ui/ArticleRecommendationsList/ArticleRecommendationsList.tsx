import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleList, ArticleView } from 'entities/Article';
import { VStack } from 'shared/ui/Stack';
import { Loader } from 'shared/ui/Loader/Loader';
import { getArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
}

export const ArticleRecommendationsList = memo(
    ({ className }: ArticleRecommendationsListProps) => {
        const { t } = useTranslation('article-details');

        const {
            data: articles,
            isLoading,
            error,
        } = getArticleRecommendationsList(getRandomNumber());

        if (isLoading) {
            <Loader />;
        }

        if (error) {
            <Text text={t('Error')} />;
        }

        return (
            <VStack gap="8" className={classNames('', {}, [className])}>
                <Text size={TextSize.L} title={t('Recommendations')} />
                <ArticleList
                    view={ArticleView.TILE}
                    articles={articles}
                    isLoading={isLoading}
                    target="_blank"
                />
            </VStack>
        );
    },
);
