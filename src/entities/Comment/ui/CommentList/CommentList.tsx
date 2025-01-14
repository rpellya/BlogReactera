import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?: string;
    comments: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
    const { t } = useTranslation('comments');
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentCard, {}, [className])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={20} width={100} className={cls.username} />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </div>

        );
    }
    return (
        <div className={classNames('', {}, [className])}>
            {comments.length
                ? comments.map((comment) => (
                    <CommentCard
                        className={cls.comment}
                        comment={comment}
                        key={comment.id}
                    />
                ))
                : <Text text={t('No comments')} />}
        </div>

    );
});
