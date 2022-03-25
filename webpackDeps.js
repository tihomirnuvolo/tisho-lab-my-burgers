const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const DEFAULT_PROXY_ENDPOINTS = [
  "/api",
  "/*.do",
  "/*.jsdbx",
  "/*.cssdbx",
  "/styles/*",
  "/scripts/*",
  "/amb",
];

const genDevServer = (params) => {
  const {
    contentBase,
    targetDevServer,
    user,
    password,
    proxyPaths = DEFAULT_PROXY_ENDPOINTS,
  } = params;

  const proxy = proxyPaths.reduce((result, proxPath) => {
    const proxyConfig = {
      target: `https://${targetDevServer}`,
      auth: `${user}:${password}`,
      changeOrigin: true,
    };
    return { ...result, [proxPath]: proxyConfig };
  }, {});

  const defaults = {
    port: 9000,
    https: true,
    open: true,
    compress: true,
    hot: true,
    proxy,
  };
  return contentBase ? { ...defaults, contentBase } : defaults;
};

function getPlugins(isProd) {
  const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + "/dist/index.html",
    filename: "index.html",
    inject: "body",
  });
  return !isProd
    ? [
        new BundleAnalyzerPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        HTMLWebpackPluginConfig,
      ]
    : [];
}

function getOutputConfig(isProd, path, env) {
  const defaults = { filename: "[name].js", path };
  if (!isProd) {
    return defaults;
  }

  const { CUSTOM_CDN_URL, NUVOLO_CDN_BASE, NUVOLO_RELEASE } = env;
  const defaultCDN =
    NUVOLO_CDN_BASE && NUVOLO_RELEASE
      ? `${NUVOLO_CDN_BASE}/my_burgers-ui-my-burgers/${NUVOLO_RELEASE}/my_burgers/`
      : "";
  const publicPath = CUSTOM_CDN_URL || defaultCDN;

  if (!publicPath) {
    throw Error(
      "No CDN has been configured for production-mode. Please check your Nuvolo Properties for NUVOLO_CDN_BASE as well as NUVOLO_RELEASE  "
    );
  }
  return { ...defaults, publicPath };
}

function getBabelPresets() {
  const [babelConfig] = getTSConfig(true);
  const {
    options: { presets },
  } = babelConfig;

  return presets;
}

function getTSConfig(isProd) {
  const babelConfig = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            targets: ["last 2 versions", "not ie <= 11", "not dead"],
            corejs: { version: 3 },
          },
        ],
      ],
    },
  };
  const tsLoaderConfig = {
    loader: "ts-loader",
    options: { transpileOnly: true },
  };

  return isProd ? [babelConfig, tsLoaderConfig] : [tsLoaderConfig];
}

function getEnv() {
  dotenv.config({
    path: "./.env",
  });
  const { SN_INSTANCE, SN_USER, SN_PASSWORD } = process.env;

  return {
    targetDevServer: SN_INSTANCE,
    user: SN_USER,
    password: SN_PASSWORD,
    ...process.env,
  };
}

module.exports = {
  genDevServer,
  getEnv,
  getTSConfig,
  getPlugins,
  getOutputConfig,
  getBabelPresets,
};
