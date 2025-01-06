import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { Country } from '../../model/types/country';

interface CurrencySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options: SelectOptions[] = [
    { value: Country.Belarus, label: Country.Belarus },
    { value: Country.Finland, label: Country.Finland },
    { value: Country.Italy, label: Country.Italy },
    { value: Country.Kazakhstan, label: Country.Kazakhstan },
    { value: Country.Russia, label: Country.Russia },
    { value: Country.Turkey, label: Country.Turkey },

];

export const CountrySelect = ({
    className,
    value,
    onChange,
    readonly,
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        if (onChange) {
            onChange(value as Country);
        }
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Select country')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
};
