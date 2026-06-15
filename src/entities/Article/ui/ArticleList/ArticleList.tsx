import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, useEffect, useRef, useState } from 'react';
import { List, WindowScroller, ListRowProps } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/ui/Page';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

const CARD_WIDTH = 250;

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.TILE ? 9 : 3)
        .fill(0)
        .map((_, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={String(index)}
                view={view}
            />
        ));

export const ArticleList = ({
    className,
    articles = [],
    isLoading,
    view = ArticleView.LIST,
    target,
}: ArticleListProps) => {
    const { t } = useTranslation('article');
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const isBig = view === ArticleView.LIST;

    let itemsPerRow = 1;
    if (!isBig && containerWidth > 0) {
        // Вычисляем, сколько плиток гарантированно поместится
        itemsPerRow = Math.floor(containerWidth / CARD_WIDTH) || 1;
    }

    const rowCount = isBig
        ? articles.length
        : Math.ceil(articles.length / itemsPerRow);

    useEffect(() => {
        const element = containerRef.current;
        if (!element || isBig) return;

        const observer = new ResizeObserver((entries) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const entry of entries) {
                // Записываем чистую ширину контента внутри контейнера
                setContainerWidth(entry.contentRect.width);
            }
        });

        observer.observe(element);
        // eslint-disable-next-line consistent-return
        return () => observer.disconnect();
    }, [isBig]);

    const rowRendererArticle = ({ key, index, style }: ListRowProps) => {
        const items = [];
        const fromIndex = index * itemsPerRow;
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    key={i}
                    article={articles[i]}
                    view={view}
                    className={cls.card}
                    target={target}
                />,
            );
        }

        return (
            <div key={key} style={style} className={cls.row}>
                {items}
            </div>
        );
    };

    if (!isLoading && !articles?.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('Articles not found')} />
            </div>
        );
    }

    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({
                width,
                height,
                registerChild,
                isScrolling,
                scrollTop,
                onChildScroll,
            }) => {
                // Функция-колбэк для объединения рефов WindowScroller и ResizeObserver
                const setRefs = (node: HTMLDivElement | null) => {
                    registerChild(node); // Нужен для WindowScroller
                    containerRef.current = node; // Нужен для отслеживания ширины
                };
                return (
                    <div
                        ref={setRefs}
                        className={classNames(cls.ArticleList, {}, [
                            className,
                            cls[view],
                        ])}
                    >
                        <List
                            key={itemsPerRow}
                            autoHeight
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                            onScroll={onChildScroll}
                            height={height ?? 700}
                            rowCount={rowCount}
                            rowHeight={isBig ? 700 : 330}
                            rowRenderer={rowRendererArticle}
                            width={width ? width - 80 : 700}
                        />
                        {isLoading && getSkeletons(view)}
                    </div>
                );
            }}
        </WindowScroller>
    );
};
