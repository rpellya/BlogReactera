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
    const codeBabelLoader = babelLoaders({...options, isTsx: false});
    const tsxCodeBabelLoader = babelLoaders({...options, isTsx: true});

    const cssLoader = buildCssLoader(isDev);

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
        codeBabelLoader,
        tsxCodeBabelLoader,
        cssLoader,
        fontLoader,
    ];
}
