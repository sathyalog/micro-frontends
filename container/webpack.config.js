/* this plugin is useful to amend all javascript files in public/index.html file */
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* module federation plugin to expose any files we wanted to send from remote */
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  /* enable hot reloading and provide dev server on custom port */
  devServer: {
    port: 8080,
  },
  plugins: [
    /* Fetch products index.js from remote(products app) */
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        products: "products@http://localhost:8081/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
