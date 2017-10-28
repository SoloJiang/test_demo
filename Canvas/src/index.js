(function () {
  const canvas = document.getElementById('myCanvas')
  let ctx = null
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
  }
  let image = new Image()
  image.src = require('./assets/test.png')
  image.onload = function () {
    ctx.drawImage(image, 100, 100)
    let imageData = ctx.getImageData(0, 0, 300, 300)
  }
})()

const calculate = (image) => {
// 指定坐标系100行，100列
  const cols = 100
  const rows = 100
// 获取每个单元格的宽高
  const s_width = ~~(image.imageData.width / cols)
  const s_height = ~~(image.imageData.height / rows)
  let pos = 0, par_x, par_y
  const data = image.imageData.data //像素值数组
  for (let i = 1; i <= cols; i++) {
    for (let j = 1; j <= rows; j++) {
      pos = [(j * s_height - 1) * imgage.w]
    }
  }
}
