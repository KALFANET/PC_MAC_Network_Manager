module.exports = {
    mode: 'development',  // Change to 'production' for optimized builds
    entry: './src/main.ts', // Adjust based on your main entry file
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  };