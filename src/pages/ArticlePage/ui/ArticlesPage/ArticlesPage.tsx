import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { ArticleView, ArticleViewSelector } from 'entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
} from 'pages/ArticlePage/model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    articlesPageAction,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlePageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlePageProps {
    className?: string;
}

const reducerList: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    // const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);

    const onChangeView = useCallback((newView: ArticleView) => {
        dispatch(articlesPageAction.setView(newView));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlesPageAction.initState());
    });

    return (
        <DynamicModuleLoader reducers={reducerList}>
            <div className={classNames(cls.ArticlePage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList isLoading={isLoading} view={view} articles={articles} />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
