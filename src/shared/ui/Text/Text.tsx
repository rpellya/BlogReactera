import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

type HeaderTagType = 'h2' | 'h3' | 'h4';

const mapSizesToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h4',
    [TextSize.M]: 'h3',
    [TextSize.L]: 'h2',
};

export const Text = memo(
    ({
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    }: TextProps) => {
        const mods: Mods = {
            [cls[theme]]: true,
            [cls[align]]: true,
            [cls[size]]: true,
        };

        const HeaderTag = mapSizesToHeaderTag[size];

        return (
            <div className={classNames(cls.Text, mods, [className])}>
                {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
                {text && <p className={cls.text}>{text}</p>}
            </div>
        );
    },
);
