const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolveLocal = (...paths) => resolve(process.cwd(), ...paths)
const output = resolveLocal('build')

// The path to where the installed modules for racket can be found.
//
// When a user tries to use racket somewhere, webpack can't locate the path
// to the loaders, because they were installed as dependencies of racket, not
// in the project itself.
const racketModules = resolve(require.resolve('webpack'), '..', '..', '..')

const babelOptions = {
  plugins: [require.resolve('babel-plugin-transform-react-jsx')],
}

const rules = [
  {
    test: /\.(js|jsx|mjs)$/,
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        ...babelOptions,
      },
    },
  },
  {
    test: /\.css$/,
    use: [
      { loader: require.resolve('style-loader') },
      { loader: require.resolve('css-loader') },
    ],
  },
]

const webpackConfig = (entry) => ({
  mode: 'development',
  devtool: 'module-source-map',
  entry,

  output: {
    filename: 'racket-[name]-[hash].js',

    // Not really existent on the filesystem because this tool is simply a thin
    // wrapper around webpack-serve.
    path: output,
  },

  module: {
    rules,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'racket app',
      template: resolve(__dirname, 'template.html'),
    }),
  ],

  resolve: {
    modules: [racketModules, 'node_modules'],
  },
})

module.exports = (entry) => ({
  content: output,
  config: webpackConfig(entry),
})
