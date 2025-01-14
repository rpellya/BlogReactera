import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment: Comment
}

export const CommentCard = memo(({ className, comment }: CommentCardProps) => (
    <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
            {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
            <Text className={cls.username} title={comment.user.username} />
        </div>
        <Text className={cls.text} title={comment.text} />
    </div>
));
