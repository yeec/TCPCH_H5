module.exports = {
  plugins: [
    require('autoprefixer')({browsers: ["iOS >= 7","Android >= 4"] }),
    // 新增 ***** 定义公共 PX 转换 REM （remUnit值根据设计稿定义）
    require('postcss-px2rem')({remUnit: 75})
  ]
}