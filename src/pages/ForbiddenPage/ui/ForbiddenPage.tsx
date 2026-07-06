import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

interface ForbiddenPageProps {}

export const ForbiddenPage: React.FC<ForbiddenPageProps> = () => {
    const { t } = useTranslation();
    return <Page>{t('Forbidden access')}</Page>;
};
