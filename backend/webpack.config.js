const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point of your app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js',                 // Output file name
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],    // File extensions to be resolved
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,               // Apply loader to TypeScript and TSX files
        use: 'ts-loader',
        exclude: /node_modules/,           // Exclude node_modules directory
      },
      {
        test: /\.css$/,                    // Apply loader to CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,      // Handle images
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',     // Template file for generating the index.html
    }),
  ],
  devServer: {
    contentBase: './dist',                 // Directory for the development server
    hot: true,                             // Enable Hot Module Replacement
    open: true,                            // Automatically open the browser
  },
};
