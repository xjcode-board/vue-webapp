module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-pxtorem")({
      rootValue: 75,
      propList:['*'],
      minPixelValue: 1,
      exclude: /node_modules/i
    })
  ]
};