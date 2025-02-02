import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './ArticleListItem.module.scss';
import {
    Article,
    ArticleBlockType,
    ArticleTextBlock,
    ArticleView,
} from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const { className, article, view } = props;
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id);
    }, [article.id, navigate]);

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const image = (
        <img src={article.img} alt={article.title} className={cls.img} />
    );
    const views = (
        <div className={cls.viewsBlock}>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </div>
    );
    if (view === ArticleView.TILE) {
        return (
            <div className={classNames(cls.TILE, {}, [className, cls[view]])}>
                <Card className={cls.card} onClick={onOpenArticle}>
                    <div className={cls.imageWrapper}>
                        {image}
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </div>
        );
    }
    const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
        <div className={classNames(cls.LIST, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.header}>
                    <Avatar size={30} src={article.user.avatar} />
                    <Text
                        text={article.user.username}
                        className={cls.username}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <Text text={article.title} className={cls.title} />
                {types}
                {image}
                {textBlock && (
                    <ArticleTextBlockComponent
                        block={textBlock}
                        className={cls.textBlock}
                    />
                )}
                <div className={cls.footer}>
                    <Button
                        onClick={onOpenArticle}
                        theme={ButtonVariant.OUTLINE}
                    >
                        {t('Read more')}
                    </Button>
                    {views}
                </div>
            </Card>
        </div>
    );
};
