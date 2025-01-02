import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    src: string;
    className?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({
    alt, className, src, size,
}: AvatarProps) => {
    const styles = useMemo<CSSProperties>(() => ({
        width: size || 80,
        height: size || 80,
    }), [size]);

    return (
        <img
            alt={alt || 'picture'}
            src={src}
            className={classNames(cls.Avatar, {}, [className])}
            style={styles}
        />
    );
};
