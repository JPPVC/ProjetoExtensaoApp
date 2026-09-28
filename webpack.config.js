

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

const TerserPlugin = require( 'terser-webpack-plugin' )

const path = require( 'node:path' )

module.exports = {
  // Webpack configuration goes here
    mode: 'development',   //define o modo , no caso aqui de desenvolvimento
    optimization: {
      minimize: false,
      minimizer: [new TerserPlugin()]
    },
    entry: './src/index.jsx',
    output: {
        filename: 'bundle.[hash].js',
        clean: true,
        path: path.resolve( __dirname, 'dist' )
    },
    module: {   //tipo de modules a ser incluido
    rules: [    //como cada module é handled 

      // First Rule
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader:'babel-loader',
            options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
         }
      },

      // Second Rule
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ],
    devServer: {
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true
    }

};
