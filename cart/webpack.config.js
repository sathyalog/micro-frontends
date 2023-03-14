/* this plugin is useful to amend all javascript files in public/index.html file */
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* module federation plugin to expose/fetch any files we wanted to send from remote */
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  /* enable hot reloading and provide dev server on custom port */
  devServer: {
    port: 8082,
  },
  plugins: [
    /* Module Federation Plugin exposing index.js from products(Remote) to container app(Host) */
    new ModuleFederationPlugin({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./CartShow": "./src/index",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
