import option from '@/defaults/options/pie/indexComparPieData.js'
export default {
  setOption(attrs) {
    let options = option
    //----字体----
    options.textStyle.fontFamily = attrs[1].value;
    //----饼图大小占比----
    options.series[0].radius = [0, attrs[2].value + '%'];
    //----标签----
    if (attrs[3].editable == '2') {
      options.series[0].label.show = false;
    } else {
      options.series[0].label.show = true;
    }
    options.series[0].label.rich.aStyle.color = attrs[3].properties[0].value;
    options.series[0].label.rich.aStyle.fontSize = attrs[3].properties[1].value;
    options.series[0].label.rich.aStyle.fontWeight = attrs[3].properties[2].value;
    // //----图表----
    options.series[0].label.rich.dStyle.color = attrs[4].properties[0].value;
    options.series[0].label.rich.dStyle.fontSize = attrs[4].properties[1].value;
    options.series[0].label.rich.dStyle.fontWeight = attrs[4].properties[2].value;
    options.series[0].label.rich.dStyle.height = attrs[3].properties[3].value;
    options.series[0].itemStyle.borderColor = attrs[4].properties[3].value;
    options.backgroundColor = attrs[4].properties[4].value;
    options.series[0].startAngle = attrs[4].properties[5].value;

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
    //判断formatter
    options.series[0].label.formatter = function(params) {
      let str = '';
      let str1 = '{aStyle|' + params.name + ': ' + params.value + '}' + '\n{dStyle|' + params.percent.toFixed(3) + '%}';
      let str2 = '{dStyle|' + params.percent.toFixed(3) + '%}' + '\n{aStyle|' + params.name + ': ' + params.value + '}';
      if (params.color == options.color[0]) {
        if (attrs[4].properties[5].value > 250 || attrs[4].properties[5].value < 60) {
          str = str2;
        } else {
          str = str1;
        }
      } else {
        if (attrs[4].properties[5].value > 250 || attrs[4].properties[5].value < 60) {
          str = str1;
        } else {
          str = str2;
        }
      }
      return str
    }

    //----动画----
    options.animation = attrs[6].editable != '2'
    options.animationDuration = attrs[6].properties[0].value;
    options.animationEasing = attrs[6].properties[1].value;
    options.animationDurationUpdate = attrs[6].properties[2].value;
    return options
  }
}
