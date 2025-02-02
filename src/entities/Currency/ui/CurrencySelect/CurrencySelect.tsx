import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options: SelectOptions[] = [
    { value: Currency.RUB, label: Currency.RUB },
    { value: Currency.USD, label: Currency.USD },
    { value: Currency.EUR, label: Currency.EUR },
    { value: Currency.GBP, label: Currency.GBP },
];

export const CurrencySelect = ({
    className,
    value,
    onChange,
    readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            if (onChange) {
                onChange(value as Currency);
            }
        },
        [onChange],
    );

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Select currency')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
};
