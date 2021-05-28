/* eslint no-param-reassign: 0 */
const styledWebpack = require('styled-jsx/webpack');
const nextBuildId = require('next-build-id');
const publickENV = require('./configs/env');
const { i18n } = require('./next-i18next.config.js');

module.exports = {
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });

    config.module.rules.push({
      test: /\.scss$|\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: styledWebpack.loader,
          options: {
            // type: "scoped"
            type: 'global',
          },
        },
        'sass-loader',
      ],
    });

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries;
    };

    return config;
  },

  publicRuntimeConfig: publickENV,
  i18n,
  generateBuildId: () => nextBuildId({ dir: __dirname, describe: true }),
};
