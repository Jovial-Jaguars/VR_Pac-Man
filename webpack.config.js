// //var path = require('path');
// //var webpack = require('webpack');
// //var assetsPath = path.join(__dirname, 'components');


// const webpack = require('webpack');
const path = require('path');
// module.exports = {
//   entry: './client/components/router.jsx',
//   devtool: 'inline-source-map',
//   output: {
//     path: path.join(__dirname, 'client', 'compiled'),
//     publicPath: '/compiled/',
//     filename: 'bundle.js'
//   },
// // module.exports = {
// //     entry :  {
// //         bundle :  ['webpack-dev-server/client?http://0.0.0.0:3000',
// //             'webpack/hot/only-dev-server',
// //            path.resolve(assetsPath,'router.jsx')],
// //     },

// //     output: {
// //         chunkFilename: '[name].js',
// //         filename: 'bundle.js', //
// //         path: path.join(assetsPath ,"dist/js/"),
// //         publicPath: '/compiled/'
// //     },

// module: {
//     rules: [
//       {
//         test: /\.jsx?/,
//         exclude: /node_modules/,
//         use: 'babel-loader'
//       },
//       {
//         test: /\.json$/,
//         use: 'json-loader'
//       }
//     ]
//   },
//     // module: {
//     //     loaders: [
//     //         {
//     //             //tell webpack to use jsx-loader for all *.jsx files
//     //             test: /.jsx?$/,
//     //             loaders: ['react-hot-loader/webpack','babel'],
//     //             include: [path.resolve(assetsPath)],
//     //        }
//     //     ]
//     // },
//     resolve: {
//         extensions: ['.js', '.jsx']
//     },
//     devtool : '#source-map',

//     plugins: [
//      new webpack.DefinePlugin({
//       'process.env': {
//         'NODE_ENV': '"development"'
//       }
//     }),
//     new webpack.HotModuleReplacementPlugin()
//     ]
// };


module.exports = {
  entry: './client/components/router.jsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'client', 'compiled'),
    publicPath: '/compiled/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
   resolve: {
        extensions: ['.js', '.jsx']
    },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: "./client/index.html",
  //     filename: "./index.html"
  //   })
  // ]
};