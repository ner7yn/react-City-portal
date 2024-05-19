// webpack.config.js
module.exports = {
    // ...
    module: {
      rules: [
        // ...
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {// В этом случае мы устанавливаем лимит в 8 КБ
                name: '[name].[ext]',
                outputPath: 'images/', // Выходной путь для изображений
              },
            },
          ],
        },
        // ...
      ],
    },
    // ...
  };