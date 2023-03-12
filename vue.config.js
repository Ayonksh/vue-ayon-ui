const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    open: true,
    port: 8000,
  },
  chainWebpack: (config) => {
    // 添加新的 svg-sprite-loader 处理 svgIcon
    config.module
      .rule("svgIcon")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/svgIcon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    // 原有的 svg 图像处理 loader 添加 exclude
    config.module.rule("svg").exclude.add(resolve("src/assets/svgIcon")).end();
  },
};
