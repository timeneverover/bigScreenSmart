/**
 * 图片渲染方法
 */
export default {
  setSingleImage(sourceDiv, imgData, imgAttrs, mapped) { // 单张图片
    let data = '',
      uu = ''
    let mm = 'img'
    let mapp = mapped[0].value
    if (mapp != '') {
      mm = mapp
    }
    if (imgData[0]) { // 后台是否传值
      if (imgData[0].hasOwnProperty(mm)) {
        data = imgData[0][mm]
      }
      if (imgData[0].hasOwnProperty('url')) {
        uu = imgData[0]['url']
      }
    }
    let imageUrl = window.g.ApiUrl
    //设置背景图片
    if (data != '') { // 数据配置中设置有内容
      sourceDiv.find('img').attr('src', imageUrl + data)
    } else {
      sourceDiv.find('img').attr('src', imageUrl + imgAttrs[1].value)
    }
    if (uu != '') {
      sourceDiv.find('a').attr('href', uu)
    } else {
      // sourceDiv.find('a').attr('href', imgAttrs[2].properties[0].value)
      sourceDiv.find('a').attr('href', 'javascript:void(0);')
    }
    let isNewWin = imgAttrs[2].properties[1].fieldData[0].value
    if (isNewWin) { // 打开新窗口
      sourceDiv.find('a').attr('target', '_blank')
    } else {
      sourceDiv.find('a').attr('target', '_self')
    }
  },
  setIfreamConfig(sourceDiv, data, attrs, mapped, type) {
    let mm = 'url',
      dd = ''
    let mapp = mapped[0].value
    if (mapp != '') {
      mm = mapp
    }
    if (data[0]) { // 后台是否传值
      if (data[0].hasOwnProperty(mm)) {
        dd = data[0][mm]
      }
    }
    if (dd == '') {
      sourceDiv.find('iframe').attr('src', attrs[1].value)
    } else {
      sourceDiv.find('iframe').attr('src', dd)
    }
    let isClose = attrs[2].fieldData[0].value
    if (type == 'preview') { // 预览可用
      if (isClose) { // 可以关闭
        sourceDiv.addClass('freamDiv')
      } else {
        if (sourceDiv.hasClass('freamDiv')) {
          sourceDiv.remove('freamDiv')
        }
      }
    }

  }
}
