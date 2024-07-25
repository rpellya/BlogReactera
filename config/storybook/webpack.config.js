// Этот файд можно сделать и .ts, но проблема в типе при .map(rule: RuleSetRule) => ...
// Не нашел другого решения, как изменить файл на js

import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }) => {
    const paths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');

    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module?.rules?.map((rule) => {
        if (/svg/.test(rule.test)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });
    config.module?.rules?.push(buildCssLoader(true));

    return config;
};
