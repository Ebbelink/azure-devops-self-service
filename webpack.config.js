const path = require('path');
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Webpack entry points. Mapping from resulting bundle name to the source file entry.
const entries = {};

// Loop through subfolders in the "extensions" folder and add an entry for each one
const extensionsDir = path.join(__dirname, "src/extensions");
fs.readdirSync(extensionsDir).filter(dir => {
  if (fs.statSync(path.join(extensionsDir, dir)).isDirectory()) {
    entries[dir] = "./" + path.relative(process.cwd(), path.join(extensionsDir, dir, dir));
  }
});

console.log(entries);

module.exports = {
  entry: entries,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "[name].css",
        },
        use: ["sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ".scss"],
    alias: {
      "azure-devops-extension-sdk": path.resolve("node_modules/azure-devops-extension-sdk")
    },
  },
  output: {
    filename: "[name]/[name].js",
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "**/*.html", context: "src/extensions" }
      ]
    })
  ]
};
