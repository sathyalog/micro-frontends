const HtmlWebpackPlugin = require("html-webpack-plugin"); /* this plugin is useful to amend all javascript files in public/index.html file */

module.exports = {
  mode: "development",
  /* enable hot reloading and provide dev server on custom port */
  devServer: {
    port: 8081,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
