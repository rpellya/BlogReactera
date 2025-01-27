import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleView } from 'entities/Article/model/types/article';
import TileIcon from 'shared/assets/icons/tile.svg';
import ListIcon from 'shared/assets/icons/list.svg';
import { Button, ButtonVariant } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [{
    view: ArticleView.LIST,
    icon: ListIcon,
}, {
    view: ArticleView.TILE,
    icon: TileIcon,
}];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, onViewClick, view } = props;
    const onClick = (newView: ArticleView) => () => onViewClick?.(newView);

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                // eslint-disable-next-line react/jsx-key
                <Button
                    theme={ButtonVariant.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={
                            classNames('', { [cls.selected]: viewType.view === view })
                        }
                    />
                </Button>
            ))}
        </div>
    );
});
