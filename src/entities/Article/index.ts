export { ArticleDetails } from './ui/AticleDetails/ArticleDetails';

export type { Article } from './model/types/article';
export { ArticleView } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
export {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from './model/selectors/articleDetails';

export { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector';
