import option from '@/defaults/options/barData/basicBarData.js'
export default {
  setOption(attrs) {
    let options = option
    options.grid.top = attrs[1].properties[2].fieldData[0].value
    options.grid.bottom = attrs[1].properties[2].fieldData[1].value
    options.grid.left = attrs[1].properties[2].fieldData[2].value
    options.grid.right = attrs[1].properties[2].fieldData[3].value
    options.textStyle.fontFamily = attrs[1].properties[0].value
    options.xAxis.offset = parseInt(attrs[1].properties[3].fieldData[2].value)
    options.yAxis.offset = parseInt(attrs[1].properties[3].fieldData[1].value)
    options.xAxis.axisLabel.margin = attrs[2].properties[2].value
    options.xAxis.axisLabel.fontWeight = attrs[2].properties[0].fieldData[2].value
    options.xAxis.axisLabel.color = attrs[2].properties[0].fieldData[0].value
    options.xAxis.axisLabel.fontSize = attrs[2].properties[0].fieldData[1].value
    options.xAxis.axisLine.show = attrs[2].properties[3].fieldData[0].value
    options.xAxis.axisLine.lineStyle.color = attrs[2].properties[0].fieldData[0].value
    options.xAxis.axisTick.lineStyle.color = attrs[2].properties[0].fieldData[0].value
    options.xAxis.axisTick.length = attrs[2].properties[1].value
    options.yAxis.name = attrs[3].properties[1].value
    options.yAxis.axisLine.show = attrs[3].properties[7].fieldData[0].value
    options.yAxis.axisTick.length = parseInt(attrs[3].properties[5].value)
    options.yAxis.axisLine.lineStyle.color = attrs[3].properties[0].fieldData[0].value
    options.yAxis.axisTick.lineStyle.color = attrs[3].properties[0].fieldData[0].value
    // options.yAxis.nameTextStyle.fontWeight = attrs[1].properties[3].fieldData[0].fieldData[2].value
    // options.yAxis.nameTextStyle.color = attrs[1].properties[3].fieldData[0].fieldData[1].value
    // options.yAxis.nameTextStyle.fontSize = attrs[1].properties[3].fieldData[0].fieldData[0].value
    // options.xAxis.nameTextStyle.fontWeight = attrs[1].properties[3].fieldData[0].fieldData[2].value
    // options.xAxis.nameTextStyle.color = attrs[1].properties[3].fieldData[0].fieldData[1].value
    // options.xAxis.nameTextStyle.fontSize = attrs[1].properties[3].fieldData[0].fieldData[0].value
    //值标签
    if (attrs[1].properties[3].editable == "1") {
      for (let i = 1; i < options.series.length; i++) {
        options.series[i].label.show = true;
      }
    } else {
      for (let i = 1; i < options.series.length; i++) {
        options.series[i].label.show = false;
      }
    }
    //值标签字号
    for (let i = 1; i < options.series.length; i++) {
      options.series[i].label.fontSize = attrs[1].properties[3].fieldData[0].fieldData[0].value;
    }
    //值标签颜色
    for (let i = 1; i < options.series.length; i++) {
      options.series[i].label.color = attrs[1].properties[3].fieldData[0].fieldData[1].value;
    }
    //值标签字体粗细
    for (let i = 1; i < options.series.length; i++) {
      options.series[i].label.fontWeight = attrs[1].properties[3].fieldData[0].fieldData[2].value;
    }
    //值标签y轴偏移
    //  let offy=attrs[1].properties[3].fieldData[1].value;
    //  let offx=attrs[1].properties[3].fieldData[2].value;
    // for(let i=1;i<options.series.length;i++){
    // 	options.series[i].label.offset[1]=offy;
    // //	options.series[i].label.offset[1]=attrs[1].properties[3].fieldData[2].value;
    // }
    //值标签x轴偏移
    // for(let i=1;i<options.series.length;i++){
    // 	options.series[i].label.offset[1]=attrs[1].properties[3].fieldData[2].value;
    // //	options.series[i].label.offset[1]=attrs[1].properties[3].fieldData[2].value;
    // }

    let ymin = attrs[3].properties[2].value
    let ymax = attrs[3].properties[3].value
    if (ymin == '自动取值') {
      options.yAxis.min = null
    } else if (ymin == '数据最小值') {
      options.yAxis.min = 'dataMin'
    } else if (ymin == "0") {
      options.yAxis.min = 0
    }
    if (ymax == 0 || ymax == '自动取值') {
      options.yAxis.max = null
    } else if (ymax == '数据最大值') {
      options.yAxis.max = 'dataMax'
    }
    //options.yAxis.min = attrs[3].properties[2].value
    //options.yAxis.max = attrs[3].properties[3].value
    options.yAxis.splitNumber = parseInt(attrs[3].properties[4].fieldData[0].value)
    options.yAxis.axisLabel.margin = parseInt(attrs[3].properties[6].value)
    options.yAxis.axisLabel.fontWeight = attrs[3].properties[0].fieldData[2].value
    options.yAxis.axisLabel.color = attrs[3].properties[0].fieldData[0].value
    options.yAxis.axisLabel.fontSize = attrs[3].properties[0].fieldData[1].value
    let bgColor = attrs[1].properties[1].fieldData[2].value
    if (bgColor == '') {
      bgColor = 'transparent'
    }
    options.series[0].itemStyle.normal.color = bgColor
    options.series[0].barCategoryGap = attrs[1].properties[1].fieldData[0].value * 100 + '%'
    options.series[1].barCategoryGap = attrs[1].properties[1].fieldData[0].value * 100 + '%'
    options.series[1].itemStyle.color = attrs[4].properties[0].fieldData[0].value

    return options
  }
}
