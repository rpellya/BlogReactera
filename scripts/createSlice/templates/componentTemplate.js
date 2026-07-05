module.exports = (
    componentName,
) => `import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './${componentName}.module.scss';

interface ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo(( { className }: ${componentName}Props) => {
    const { t } = useTranslation();
    
    return (
        <div className={classNames(cls.${componentName}, {}, [className])}>
           
        </div>
    );
});`;
