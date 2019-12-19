import commonUtil from '@/publicService/chartCommon.js'
import scatterOptions from '@/defaults/options/scatterData.js'
let echarts = require('echarts/lib/echarts')
export default {
  setOption(attrs, xdata) {
    let chartOption = scatterOptions
    //动画
    chartOption.animation = attrs[6].editable != '2'
    chartOption.animationDuration = attrs[6].properties[0].value
    chartOption.animationDurationUpdate = attrs[6].properties[2].value
    chartOption.animationEasing = attrs[6].properties[1].value
    //全局样式
    chartOption.grid.top = attrs[1].properties[1].fieldData[0].value
    chartOption.grid.bottom = attrs[1].properties[1].fieldData[1].value
    chartOption.grid.left = attrs[1].properties[1].fieldData[2].value
    chartOption.grid.right = attrs[1].properties[1].fieldData[3].value
    chartOption.textStyle.fontFamily = attrs[1].properties[0].value

    //x轴文本
    chartOption.xAxis.axisLabel.fontWeight = attrs[2].properties[0].fieldData[2].value
    chartOption.xAxis.axisLabel.color = attrs[2].properties[0].fieldData[1].value
    chartOption.xAxis.axisLabel.fontSize = attrs[2].properties[0].fieldData[0].value

    //x轴标签
    let xtype = attrs[2].properties[1].fieldData[0].value //数据种类

    let status = true
    let tt = ''
    let geshi = attrs[2].properties[1].fieldData[4].value
    if (xtype == '类目型') {
      chartOption.xAxis.axisLabel.formatter = null
      chartOption.xAxis.max = null
      chartOption.xAxis.min = null
      chartOption.xAxis.name = ''
    } else {
      if (xtype == '时间型') {
        tt = attrs[2].properties[1].fieldData[3].value //数据格式
        if(xdata.length>0) {
            status = commonUtil.setDataType(tt, xdata[0])
        }
      }
      chartOption.xAxis.axisLabel.formatter = function(value, index) {
        if (xtype == '时间型' && !status) {
          return geshi
        } else {
          //console.log('geshi:'+geshi+' tt:'+tt+' value:'+value+' xtype:'+xtype)
          return commonUtil.getLabel(geshi, tt, value, xtype)
        }
      }

      if (attrs[2].properties[1].fieldData[5].value != 'auto') {
        if (attrs[2].properties[1].fieldData[5].value == '') {
          chartOption.xAxis.max = null
        } else {
          chartOption.xAxis.max = attrs[2].properties[1].fieldData[5].value
        }
      } else {
        chartOption.xAxis.max = null
      }
      if (attrs[2].properties[1].fieldData[6].value != 'auto') {
        if (attrs[2].properties[1].fieldData[6].value == '') {
          chartOption.xAxis.min = null
        } else {
          chartOption.xAxis.min = attrs[2].properties[1].fieldData[6].value
        }
      } else {
        chartOption.xAxis.min = null
      }

      chartOption.xAxis.name = attrs[2].properties[1].fieldData[7].value
    }
    let num = parseInt(attrs[2].properties[1].fieldData[8].value)
    let allNum = xdata.length
    chartOption.xAxis.axisLabel.interval = parseInt(allNum / num - 1)
    chartOption.xAxis.splitNumber = attrs[2].properties[1].fieldData[8].value // 分隔数量
    let xrotate = attrs[2].properties[1].fieldData[9].value
    if (xrotate == '水平' || xrotate == '') {
      chartOption.xAxis.axisLabel.rotate = 0
    } else if (xrotate == '斜角') {
      chartOption.xAxis.axisLabel.rotate = 315
    } else if (xrotate == '垂直') {
      chartOption.xAxis.axisLabel.rotate = 270
    }
    //x轴线
    chartOption.xAxis.axisLine.lineStyle.color = attrs[2].properties[2].fieldData[0].value
    //x网格线
    chartOption.xAxis.splitLine.lineStyle.color = attrs[2].properties[3].fieldData[0].value
    //x data

    //y轴文本
    chartOption.yAxis.axisLabel.fontWeight = attrs[3].properties[0].fieldData[2].value
    chartOption.yAxis.axisLabel.color = attrs[3].properties[0].fieldData[1].value
    chartOption.yAxis.axisLabel.fontSize = attrs[3].properties[0].fieldData[0].value

    //y轴标签
    let ymin = attrs[3].properties[1].fieldData[0].value
    let ymax = attrs[3].properties[1].fieldData[1].value
    if (ymin == 0 || ymin == '自动取整') { //最小值
      chartOption.yAxis.min = null
    } else if (ymin == '数据最小值') {
      chartOption.yAxis.min = 'dataMin'
    }
    if (ymax == '自动取整') { //最大值
      chartOption.yAxis.max = null
    } else if (ymax == '数据最大值') {
      chartOption.yAxis.max = 'dataMax'
    }
    chartOption.yAxis.splitNumber = parseInt(attrs[3].properties[1].fieldData[2].value) // 分隔数量
    let ytype = attrs[3].properties[1].fieldData[3].value
    //y 数据格式
    chartOption.yAxis.axisLabel.formatter = function(value, index) {
      if (ytype == '11（整数') {
        return parseInt(value)
      } else if (ytype == '11.1(浮点数)') {
        return parseFloat(value).toFixed(1)
      } else if (ytype == '11.11(浮点数)') {
        return parseFloat(value).toFixed(2)
      } else {
        return value
      }
    }
    let yrotate = attrs[3].properties[1].fieldData[4].value // 角度
    if (yrotate == '水平' || yrotate == '') {
      chartOption.yAxis.axisLabel.rotate = 0
    } else if (yrotate == '斜角') {
      chartOption.yAxis.axisLabel.rotate = 315
    } else if (yrotate == '垂直') {
      chartOption.yAxis.axisLabel.rotate = 270
    }
    //y 轴线
    chartOption.yAxis.axisLine.lineStyle.color = attrs[3].properties[3].fieldData[0].value
    //y 网格线
    chartOption.yAxis.splitLine.lineStyle.color = attrs[3].properties[4].fieldData[0].value

    //------图例----------
    //文本
    chartOption.legend.textStyle.fontWeight = attrs[4].properties[0].fieldData[2].value
    chartOption.legend.textStyle.color = attrs[4].properties[0].fieldData[1].value
    chartOption.legend.textStyle.fontSize = attrs[4].properties[0].fieldData[0].value
    //布局
    //间距
    chartOption.legend.itemGap = parseInt(attrs[4].properties[1].fieldData[0].fieldData[0].value) //左右间距
    chartOption.legend.padding = [parseInt(attrs[4].properties[1].fieldData[0].fieldData[1].value), 5] // 上下间距

    //位置
    let legType = attrs[4].properties[1].fieldData[1].value
    if (legType == '底部居中') {
      chartOption.legend.top = 'bottom'
      chartOption.legend.left = 'center'
    } else if (legType == '底部居左') {
      chartOption.legend.top = 'bottom'
      chartOption.legend.left = 'left'
    } else if (legType == '底部居右') {
      chartOption.legend.top = 'bottom'
      chartOption.legend.left = 'right'
    } else if (legType == '顶部居中') {
      chartOption.legend.top = 'top'
      chartOption.legend.left = 'center'
    } else if (legType == '顶部居左') {
      chartOption.legend.top = 'top'
      chartOption.legend.left = 'left'
    } else if (legType == '顶部居右') {
      chartOption.legend.top = 'top'
      chartOption.legend.left = 'right'
    }
    //数据系列

    let seriesArr = []
    let iseries = chartOption.series[0]
    chartOption.series = []
    let seriesLength = attrs[5].properties.length
    for (let i = 0; i < seriesLength; i++) {
      chartOption.series.push(JSON.parse(JSON.stringify(iseries)))
    }
    for (let i = 0; i < seriesLength; i++) {
      chartOption.series[i].name = attrs[5].properties[i].fieldData[0].value // 系列名称
      let seitype = attrs[5].properties[i].fieldData[1].value
      if (seitype == '颜色填充') {
        chartOption.series[i].itemStyle.normal.color = attrs[5].properties[i].fieldData[1].fieldData[0].value
      } else {
        let num = attrs[5].properties[i].fieldData[1].fieldData[1].fieldData[2].value
        let lin1 = 0,
          lin2 = 0,
          lin3 = 0,
          lin4 = 0
        let off = ''
        if (num < 90) {
          lin3 = 1
          off = num / 90
        } else if (num < 180) {
          lin1 = 1
          off = num / 180
        } else if (num < 270) {
          lin2 = 1
          off = num / 270
        } else {
          lin4 = 1
          off = num / 360
        }
        let c1 = attrs[5].properties[i].fieldData[1].fieldData[1].fieldData[0].value
        let c2 = attrs[5].properties[i].fieldData[1].fieldData[1].fieldData[1].value
        let lincolor = new echarts.graphic.LinearGradient(lin1, lin2, lin3, lin4, [{
          offset: 0,
          color: c1
        }, {
          offset: off,
          color: c2
        }], false)
        chartOption.series[i].itemStyle.normal.color = lincolor
      }
      chartOption.series[i].itemStyle.normal.borderColor = attrs[5].properties[i].fieldData[2].value
    }
    //判断是否显示 （editable)
    chartOption.xAxis.show = attrs[2].editable != '2' ? true : false
    chartOption.yAxis.show = attrs[3].editable != '2' ? true : false
    chartOption.legend.show = attrs[4].editable != '2' ? true : false
    chartOption.animation = attrs[6].editable != '2' ? true : false
    chartOption.xAxis.axisLabel.show = attrs[2].properties[1].editable != '2' ? true : false //x轴标签
    chartOption.xAxis.axisLine.show = attrs[2].properties[2].editable != '2' ? true : false //x轴线
    chartOption.xAxis.splitLine.show = attrs[2].properties[3].editable != '2' ? true : false //x网格线
    chartOption.yAxis.axisLabel.show = attrs[3].properties[1].editable != '2' ? true : false //y轴标签
    chartOption.yAxis.axisLine.show = attrs[3].properties[3].editable != '2' ? true : false //y轴线
    chartOption.yAxis.splitLine.show = attrs[3].properties[4].editable != '2' ? true : false //y网格线
    let yname = attrs[3].properties[2].editable != '2' ? true : false //y轴单位
    let xname = attrs[2].properties[1].editable != '2' ? true : false
    if (yname) { // 可显示
      chartOption.yAxis.name = attrs[3].properties[2].fieldData[0].value
    } else { //y 轴单位
      chartOption.yAxis.name = null
    }
    if (xname) { // 可显示

    } else {
      chartOption.xAxis.name = null
    }
    return chartOption
  },

}
