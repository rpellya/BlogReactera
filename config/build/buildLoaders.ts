import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader.cjs';
import { babelLoaders } from './loaders/babelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    const svgLoader = {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
    };

    // So far I have disconnected this Lowder because of Extractranslations creating files each time
    const babelLoader = babelLoaders(options);

    const cssLoader = buildCssLoader(isDev);

    // Если не используется typeScript - нужен babel-loader
    const typescirptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const fontLoader = {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        svgLoader,
        babelLoader,
        typescirptLoader,
        cssLoader,
        fontLoader,
    ];
}
