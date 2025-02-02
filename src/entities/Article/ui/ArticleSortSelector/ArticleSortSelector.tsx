import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { ArticleSortField } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types';
import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeSort: (newSort: ArticleSortField) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        onChangeOrder,
        onChangeSort,
        sort,
        order,
    } = props;
    const { t } = useTranslation('article');

    const sortFieldOprtions = useMemo<SelectOptions<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED_AT,
            label: t('created at'),
        },
        {
            value: ArticleSortField.TITLE,
            label: t('title'),
        },
        {
            value: ArticleSortField.VIEWS,
            label: t('views'),
        },
    ], [t]);

    const orderOprtions = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: 'asc',
            label: t('ascending'),
        },
        {
            value: 'desc',
            label: t('descending'),
        },
    ], [t]);

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select<ArticleSortField>
                value={sort}
                onChange={onChangeSort}
                label={t('Sort by')}
                options={sortFieldOprtions}
            />
            <Select<SortOrder>
                value={order}
                onChange={onChangeOrder}
                label={t('by')}
                options={orderOprtions}
            />
        </div>
    );
});
