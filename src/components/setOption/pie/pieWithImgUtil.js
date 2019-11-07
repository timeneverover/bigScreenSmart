import option from '@/defaults/options/pieWithImgData.js'
import basicUtil from '@/components/setOption/basicUtil.js'
export default {
  setOption(attrs, sourceDiv) {
    let options = option
    //----字体----
    options.textStyle.fontFamily = attrs[1].value;
    //----中心图片----
    sourceDiv.css({
      "backgroundImage": "url('" + window.g.ApiUrl + attrs[2].value + "')",
      "background-repeat": "no-repeat",
      "background-position": "center",
      "background-size": '38% 38%'
    })
    //----标签----
    if (attrs[3].editable == '2') {
      options.series[0].label.show = false;
    } else {
      options.series[0].label.show = true;
    }
    //标签距中心
    let length2 = attrs[3].properties[0].value * 50;
    options.series[0].labelLine.length2 = length2;
    //轴距距中心
    let length = attrs[3].properties[1].value * 50;
    if (length == 60) { //负数，反方向
      length = 0
    } else if (length < 30) {
      length = -length
    }
    options.series[0].labelLine.length = length;
    //类目
    let astyleName = "";
    let itemNameShow = attrs[3].properties[2].editable;
    options.series[0].label.rich.aStyle.fontSize = attrs[3].properties[2].fieldData[0].value;
    options.series[0].label.rich.aStyle.color = attrs[3].properties[2].fieldData[1].value;
    options.series[0].label.rich.aStyle.fontWeight = attrs[3].properties[2].fieldData[2].value;
    //数值
    options.series[0].label.rich.dStyle.fontSize = attrs[3].properties[3].fieldData[0].value;
    options.series[0].label.rich.dStyle.color = attrs[3].properties[3].fieldData[1].value;
    options.series[0].label.rich.dStyle.fontWeight = attrs[3].properties[3].fieldData[2].value;
    let pointNum = attrs[3].properties[3].fieldData[3].value;
    let realNumShow = attrs[3].properties[3].fieldData[4].fieldData[0].value;
    if (realNumShow) {
      options.series[0].label.formatter = function(params) {
        if (itemNameShow != 2) {
          astyleName = '{aStyle|' + params.name + '}\n'
        }
        let str = astyleName + '{dStyle|' + parseInt(params.value).toFixed(pointNum) + '}'
        return str
      }
    } else {
      options.series[0].label.formatter = function(params) {
        if (itemNameShow != 2) {
          astyleName = '{aStyle|' + params.name + '}\n'
        }
        let str = astyleName + '{dStyle|' + params.percent.toFixed(pointNum) + '%}'
        return str
      }
    }
    //----极轴----
    let insideRadius = Math.round(attrs[4].properties[0].value * 100) + "%";
    let outsideRadius = Math.round(attrs[4].properties[1].value * 100) + "%";
    options.series[0].radius = [insideRadius, outsideRadius];

    //----图例----
    options.legend = basicUtil.getLegend(attrs[5].properties, attrs[5].editable)

    //----提示框----
    let attrItems = basicUtil.getAttrArr(attrs);
    basicUtil.getTooltip(attrItems.tooltip, '饼图')

    //----数据系列----
    let seriesNum = attrs[7].properties.length;
    for (let n = 0; n < seriesNum; n++) {
      if (attrs[7].properties[n].fieldData[0].value == "颜色填充") {
        options.color[n] = attrs[7].properties[n].fieldData[0].fieldData[0].value;
      } else { //渐变填充
        let xVal = 0;
        let yVal = 0;
        let val = attrs[7].properties[n].fieldData[0].fieldData[1].fieldData[2].value;
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
            color: attrs[7].properties[n].fieldData[0].fieldData[1].fieldData[0].value
          }, {
            offset: 1,
            color: attrs[7].properties[n].fieldData[0].fieldData[1].fieldData[1].value
          }],
          globalCoord: false // 缺省为 false
        }
      }
    }

    //----动画----
    options.animation = attrs[8].editable != '2'
    options.animationDuration = attrs[8].properties[0].value;
    options.animationEasing = attrs[8].properties[1].value;
    options.animationDurationUpdate = attrs[8].properties[2].value;

    return options
  }
}
