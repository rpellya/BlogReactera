import { useTranslation } from 'react-i18next';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { AddCommentForm } from 'features/AddCommentForm';
import { CommentList } from 'entities/Comment';
import { useCallback } from 'react';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';

interface ArticleDetailsCommentsProps {
    id?: string;
    className?: string;
}

export const ArticleDetailsComments = ({
    className,
    id,
}: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation('article-details');
    const dispatch = useAppDispatch();

    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title={t('Comments')} />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
    );
};
