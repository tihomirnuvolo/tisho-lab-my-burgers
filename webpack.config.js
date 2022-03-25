const path = require("path");
const {
  genDevServer,
  getPlugins,
  getEnv,
  getTSConfig,
  getOutputConfig,
} = require("./webpackDeps");

function init() {
  const DIST = path.resolve(__dirname, "./dist/");
  const mode = process.env.NODE_ENV || "development";
  const prodMode = mode === "production";
  const devtool = prodMode ? "nosources-source-map" : "eval-source-map";
  const envVariables = getEnv();
  const devServerConfig = genDevServer(envVariables);

  return {
    mode,
    devtool,
    devServer: { contentBase: DIST, ...devServerConfig },
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".svg", ".png"],
      alias: {
        "@hooks": path.resolve(__dirname, "src/hooks/"),
        "@components": path.resolve(__dirname, "src/components/"),
        "@routes": path.resolve(__dirname, "src/routes/"),
        "@views": path.resolve(__dirname, "src/views/"),
        src: path.resolve(__dirname, "src/"),
        "@utils": path.resolve(__dirname, "src/utils/"),
      },
    },
    output: getOutputConfig(prodMode, DIST, envVariables),
    plugins: getPlugins(prodMode),
    optimization: {
      sideEffects: false,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: getTSConfig(prodMode),
        },
        {
          test: /\.css/,
          exclude: /\.module\.css/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.(svg|woff|woff2|eot|ttf|png|jpe?g|gif)$/i,
          loader: "file-loader",
        },
      ],
    },
  };
}

module.exports = init();
