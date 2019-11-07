import option from '@/defaults/options/pie/markpieData.js'
import basicUtil from '@/components/setOption/basicUtil.js'

export default {
  setOption(attrs) {
    let options = option
    //----字体---
    options.textStyle.fontFamily = attrs[1].value;
    //装饰色
    options.itemStyle.borderColor = attrs[2].value;
    //数值 --字号
    options.series[0].label.rich.dStyle.fontSize = attrs[3].properties[0].fieldData[0].value;
    //数值 --颜色
    options.series[0].label.rich.dStyle.color = attrs[3].properties[1].value;
    //数值 --字体
    options.series[0].label.rich.dStyle.fontWeight = attrs[3].properties[2].value;
    //数值 --小数点位数
    let num = attrs[3].properties[3].fieldData[0].value;
    //真实值
    let number = 120;
    let realNumShow = attrs[3].properties[4].fieldData[0].value;
    if (realNumShow) {
      options.series[0].label.formatter = function(params) {
        let str = '{dStyle|' + parseFloat(params.value).toFixed(num) + '}'
        return str
      }
    } else {
      options.series[0].label.formatter = function(params) {
        let str = '{dStyle|' + params.percent.toFixed(num) + '%}'
        return str
      }
    }

    //角度轴
    options.series[0].startAngle = attrs[4].properties[0].value;
    options.series[0].radius[1] = attrs[4].properties[1].value * 100 + '%';

    //图列
    options.legend = basicUtil.getLegend(attrs[5].properties, attrs[5].editable)

    //系列
    let seriesNum = attrs[6].properties.length;
    for (let n = 0; n < seriesNum; n++) {
      if (attrs[6].properties[n].fieldData[0].value == "颜色填充") {
        options.color[n] = attrs[6].properties[n].fieldData[0].fieldData[0].value;
      } else { //渐变填充
        let xVal = 0;
        let yVal = 0;
        let val = attrs[6].properties[n].fieldData[0].fieldData[1].fieldData[2].value;
        if (val >= 180) {
          yVal = 1
          xVal = (val - 180) / 180;
        } else {
          xVal = 1
          yVal = val / 180;
        }
        options.color[n] = {
          type: 'linear',
          x: 0,
          y: 0,
          x2: xVal,
          y2: yVal,
          colorStops: [{
            offset: 0,
            color: attrs[6].properties[n].fieldData[0].fieldData[1].fieldData[0].value
          }, {
            offset: 1,
            color: attrs[6].properties[n].fieldData[0].fieldData[1].fieldData[1].value
          }],
          globalCoord: false // 缺省为 false
        }
      }
    }
    //----动画----
    options.animation = attrs[7].editable != '2'
    options.animationDuration = attrs[7].properties[0].value;
    options.animationEasing = attrs[7].properties[1].value;
    options.animationDurationUpdate = attrs[7].properties[2].value;

    return options;
  }
}
