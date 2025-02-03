import { ArtciclesDetailsCommentsSchema } from './ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

/**
 * Reducers group.
 * Ideally, it should not be!
 * Each isolated reducer for a good place in a separate feature/entites
 *
 * For test example
 */

export interface ArticleDetailsPageSchema {
    comments: ArtciclesDetailsCommentsSchema;
    recomendations: ArticleDetailsRecommendationsSchema;
}
