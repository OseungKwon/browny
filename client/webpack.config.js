const path = require('path'); // core nodejs 모듈 중 하나, 파일 경로 설정할 때 사용
const HtmlWebpackPlugin = require('html-webpack-plugin'); // index.html 파일을 build 폴더에 index_bundle.js 파일과 함께 자동으로 생성.

module.exports = {
  entry: './src/index.js', // 리액트 파일이 시작하는 곳
  output: {
    // bundled compiled 파일
    path: path.join(__dirname, '/public'), //__dirname : 현재 디렉토리, build 폴더에 모든 컴파일된 하나의 번들파일을 넣을 예정
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    // javascript 모듈을 생성할 규칙을 지정 (node_module을 제외한.js 파일을 babel-loader로 불러와 모듈을 생성
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.js$/, // .js 로 끝나는 babel이 컴파일하게 할 모든 파일
        exclude: /node_modules/, // node module 폴더는 babel 컴파일에서 제외
        use: {
          loader: 'babel-loader', // babel loader가 파이프를 통해 js 코드를 불러옴
        },
      },
      {
        test: /\.css|.s[ac]ss$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|svg|jpe?g|png|ico|woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 생성한 템플릿 파일
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/',
    overlay: true,
    port: 3000,
    stats: 'errors-only',
    historyApiFallback: {
      index: 'http://localhost:3000',
    },
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
};
