const SentryWebpackPlugin = require("@sentry/webpack-plugin");

console.log(process.env);

module.exports = {
  // other webpack configuration
  devtool: 'source-map',
  plugins: [
    new SentryWebpackPlugin({
      // sentry-cli configuration
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "aller-media-ab-kq",
      project: "abrar-test",
      release: process.env.SENTRY_RELEASE,

      // webpack-specific configuration
      include: "./dist",
      ignore: ["node_modules", "webpack.config.js"],
    }),
  ],
};
