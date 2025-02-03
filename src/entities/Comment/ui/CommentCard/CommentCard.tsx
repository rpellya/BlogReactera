import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment: Comment;
}

export const CommentCard = memo(({ className, comment }: CommentCardProps) => {
    if (!comment) {
        return null;
    }
    return (
        <div className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink
                className={cls.header}
                to={`${RoutePath.profile}${comment.user.id}`}
            >
                {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text className={cls.username} title={comment.user.username} />
            </AppLink>
            <Text className={cls.text} title={comment.text} />
        </div>
    );
});
