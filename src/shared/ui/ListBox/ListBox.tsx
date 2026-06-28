import { Fragment } from 'react';
import { Listbox as HListBox, Transition } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';
import cls from './ListBox.module.scss';

type DropdownDirection = 'top' | 'bottom';

export interface ListBoxItem {
    value: string;
    label?: string;
    disabled?: boolean;
}

interface ListBoxProps {
    options?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (values: string) => void;
    readonly?: boolean;
    label?: string;
    direction?: DropdownDirection;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
};

export const ListBox = ({
    value,
    onChange,
    defaultValue,
    options,
    className,
    readonly,
    label,
    direction = 'bottom',
}: ListBoxProps) => {
    const optionsClasses = mapDirectionClass[direction];

    return (
        <HStack
            className={classNames(cls.ListBox, { [cls.disabled]: readonly }, [
                className,
            ])}
        >
            {label && <span className={cls.label}>{`${label} >`}</span>}
            <HListBox
                as="div"
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button disabled={readonly} className={cls.trigger}>
                    <Button disabled={readonly} className={cls.buttonTrigger}>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <Transition as={Fragment}>
                    <HListBox.Options
                        className={classNames(cls.options, {}, [
                            optionsClasses,
                        ])}
                    >
                        {options?.map((item) => (
                            <HListBox.Option
                                key={item.value}
                                value={item.value}
                                disabled={item.disabled}
                                as={Fragment}
                            >
                                {({ active, disabled }) => (
                                    <li
                                        className={classNames(cls.item, {
                                            [cls.active]: active,
                                            [cls.disabled]: disabled,
                                        })}
                                    >
                                        <span>{item.label}</span>
                                    </li>
                                )}
                            </HListBox.Option>
                        ))}
                    </HListBox.Options>
                </Transition>
            </HListBox>
        </HStack>
    );
};
