import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useCallback, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOptions<T extends string = string> {
    value: T;
    label: string;
}

interface ISelectProps<T extends string> {
    options: SelectOptions<T>[];
    className?: string;
    label?: string;
    value?: string;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

const typedMemo: <T>(c: T) => T = memo;

export const Select = typedMemo(<T extends string>(props: ISelectProps<T>) => {
    const { className, label, options, value, onChange, readonly } = props;

    const onChangeHanlder = useCallback(
        (event: ChangeEvent<HTMLSelectElement>) => {
            if (onChange) {
                onChange(event.target.value as T);
            }
        },
        [onChange],
    );

    const optionsList = useMemo(
        () =>
            options.map((option) => (
                <option
                    className={cls.option}
                    value={option.value}
                    key={option.value}
                >
                    {option.label}
                </option>
            )),
        [options],
    );

    const mods: Mods = {
        [cls.readOnly]: readonly,
    };

    return (
        <div className={classNames(cls.selectWrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label} >`}</span>}
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHanlder}
                className={cls.select}
            >
                {optionsList}
            </select>
        </div>
    );
});
