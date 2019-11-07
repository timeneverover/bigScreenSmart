import option from '@/defaults/options/pie/basicPieData.js'
import basicUtil from '@/components/setOption/basicUtil.js'

export default {
  setOption(attrs) {
    let options = option
    //----字体----
    options.textStyle.fontFamily = attrs[1].value;
    //----标签----
    if (attrs[2].editable == '2') {
      options.series[0].label.show = false;
    } else {
      options.series[0].label.show = true;
    }
    //标签距中心
    options.series[0].labelLine.length = parseInt(attrs[2].properties[0].value);
    //轴距距中心
    options.series[0].labelLine.length2 = parseInt(attrs[2].properties[1].value);
    if (attrs[2].properties[4].fieldData[0].value) {
      options.series[0].labelLine.show = false;
    } else {
      options.series[0].labelLine.show = true;
    }
    //类目
    let astyleName = "";
    options.series[0].label.rich.aStyle.fontSize = attrs[2].properties[2].fieldData[0].value;
    options.series[0].label.rich.aStyle.color = attrs[2].properties[2].fieldData[1].value;
    options.series[0].label.rich.aStyle.fontWeight = attrs[2].properties[2].fieldData[2].value;
    //数值
    options.series[0].label.rich.dStyle.fontSize = attrs[2].properties[3].fieldData[0].value;
    options.series[0].label.rich.dStyle.color = attrs[2].properties[3].fieldData[1].value;
    options.series[0].label.rich.dStyle.fontWeight = attrs[2].properties[3].fieldData[2].value;
    let pointNum = attrs[2].properties[3].fieldData[3].value;
    let realNumShow = attrs[2].properties[3].fieldData[4].fieldData[0].value;
    if (realNumShow) {
      options.series[0].label.formatter = function(params) {
        if (attrs[2].properties[2].editable != '2') {
          astyleName = '\n{aStyle|' + params.name + '}';
        }
        let str = '{dStyle|' + parseInt(params.value).toFixed(pointNum) + '}' + astyleName
        return str
      }
    } else {
      options.series[0].label.formatter = function(params) {
        if (attrs[2].properties[2].editable != '2') {
          astyleName = '\n{aStyle|' + params.name + '}';
        }
        let str = '{dStyle|' + params.percent.toFixed(pointNum) + '%}' + astyleName
        return str
      }
    }

    //----极轴----
    let insideRadius = Math.round(attrs[3].properties[0].value * 100) + '%';
    let outsideRadius = Math.round(attrs[3].properties[1].value * 100) + '%';
    options.series[0].radius = [insideRadius, outsideRadius];
    //边框宽度
    options.series[0].itemStyle.borderWidth = attrs[3].properties[2].value;
    //--待完成 --
    //----图例----
    options.legend = basicUtil.getLegend(attrs[4].properties, attrs[4].editable)

    //----数据系列----
    let seriesNum = attrs[5].properties.length;
    for (let n = 0; n < seriesNum; n++) {
      if (attrs[5].properties[n].fieldData[0].value == "颜色填充") {
        options.color[n] = attrs[5].properties[n].fieldData[0].fieldData[0].value;
      } else { //渐变填充
        let xVal = 0;
        let yVal = 0;
        let val = attrs[5].properties[n].fieldData[0].fieldData[1].fieldData[2].value;
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
            color: attrs[5].properties[n].fieldData[0].fieldData[1].fieldData[0].value
          }, {
            offset: 1,
            color: attrs[5].properties[n].fieldData[0].fieldData[1].fieldData[1].value
          }],
          globalCoord: false // 缺省为 false
        }
      }
    }


    //----动画----
    options.animation = attrs[6].editable != '2'
    options.animationDuration = attrs[6].properties[0].value;
    options.animationEasing = attrs[6].properties[1].value;
    options.animationDurationUpdate = attrs[6].properties[2].value;
    return options
  }
}
