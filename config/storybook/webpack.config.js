// Этот файд можно сделать и .ts, но проблема в типе при .map(rule: RuleSetRule) => ...
// Не нашел другого решения, как изменить файл на js

const path = require('path');
const { DefinePlugin } = require('webpack');
const { buildCssLoader } = require('../build/loaders/buildCssLoader.cjs');

module.exports = ({ config }) => {
    const paths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };
    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push('.ts', '.tsx');

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

    config.plugins.push(new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
    }));

    return config;
};
