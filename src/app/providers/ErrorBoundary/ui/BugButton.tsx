import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';

/**
 *  Компонент-кнопка для тестирования, отлавливание ошибки
 */
export const BugButton = () => {
    const { t } = useTranslation();
    const [error, setError] = useState<boolean>(false);
    const onThrow = useCallback(() => setError(true), []);
    useEffect(() => {
        if (error) throw new Error();
    }, [error]);

    return <Button onClick={onThrow}>{t('throw error')}</Button>;
};
