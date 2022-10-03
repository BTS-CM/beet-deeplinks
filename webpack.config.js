import path from 'path';
import webpack from 'webpack';

const config = {
    mode: "production",
    output: {
      path: path.resolve('./dist'),
      filename: 'beet-deeplinks.js',
    },
    optimization: {
      minimize: true,
      minimizer: [() => ({ terserOptions: { mangle: false } })]
    },
    profile: true
};

export default config;
