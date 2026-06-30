import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { forwardRef, Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink, AppLinkProps } from '../AppLink/AppLink';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottomLeft: cls.optionsBottomLeft,
    bottomRight: cls.optionsBottomRight,
    topLeft: cls.optionsTopLeft,
    topRight: cls.optionsTopRight,
};

const DropDownAppLink = forwardRef<HTMLDivElement, AppLinkProps>(
    (props, ref) => (
        <div ref={ref}>
            <AppLink {...props} />
        </div>
    ),
);

export const Dropdown = ({
    className,
    items,
    trigger,
    direction = 'bottomRight',
}: DropdownProps) => {
    const menuClasses = mapDirectionClass[direction];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.button}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [menuClasses])}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={index}
                                disabled={item.disabled}
                                to={item.href}
                                as={DropDownAppLink}
                            >
                                {item.content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={index}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
};
