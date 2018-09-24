const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
  pluginOptions: {
    quasar: {
      theme: "mat"
    }
  },
  transpileDependencies: [/[\\/]node_modules[\\/]quasar-framework[\\/]/],
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugin("sw-precache-webpack-plugin").use(SWPrecacheWebpackPlugin, [
        {
          cacheId: "cocolsillo-vue",
          filename: "service-worker.js",
          staticFileGlobs: ["dist/**/*.{js,html,css}"],
          minify: true,
          stripPrefix: "dist/"
        }
      ]);
    }
  }
};
