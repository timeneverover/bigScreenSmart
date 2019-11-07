import option from '@/defaults/options/pie/onlyPercentPieData.js'
export default {
  setOption(attrs, datas) {
    let options = option
    //饼图属性
    let insideRadius = Math.round(attrs[1].properties[0].value * 100) + "%";
    let outsideRadius = Math.round(attrs[1].properties[1].value * 100) + "%";
    options.series[0].radius = [insideRadius, outsideRadius];
    options.series[1].radius = [insideRadius, outsideRadius];
    options.series[0].color = [attrs[1].properties[2].value];
    //扇形配置
    let color = {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [{
        offset: 0,
        color: attrs[2].properties[0].value
      }, {
        offset: 1,
        color: attrs[2].properties[1].value
      }],
      globalCoord: false // 缺省为 false
    }
    options.series[1].color = [color, 'transparent'];
    options.animationDuration = attrs[2].properties[2].value;
    //中间百分比部分
    options.series[1].label.rich.dStyle.fontSize = attrs[3].properties[0].fieldData[0].value;
    options.series[1].label.rich.dStyle.color = attrs[3].properties[0].fieldData[1].value;
    options.series[1].label.rich.aStyle.color = attrs[3].properties[0].fieldData[1].value;
    options.series[1].label.rich.dStyle.fontWeight = attrs[3].properties[0].fieldData[2].value;
    options.series[1].label.rich.aStyle.fontWeight = attrs[3].properties[0].fieldData[2].value;
    options.series[1].label.rich.dStyle.fontFamily = attrs[3].properties[0].fieldData[3].value;
    options.series[1].label.rich.aStyle.fontFamily = attrs[3].properties[0].fieldData[3].value;
    options.series[1].label.rich.dStyle.width = attrs[3].properties[0].fieldData[0].value + attrs[3].properties[4].value * 2;
    options.series[1].label.rich.aStyle.fontSize = attrs[3].properties[2].value;
    let sign = attrs[3].properties[1].value;
    options.series[1].label.formatter = function(params) {
      let str = '';
      if (attrs[3].properties[3].value == "前置") {
        str = '{aStyle|' + sign + '}{dStyle|' + params.percent.toFixed(0) + '}';
      } else { //后置
        str = '{dStyle|' + params.percent.toFixed(0) + '}' + '{aStyle|' + sign + '}';
      }
      return str
    }
    //数据
    options.series[1].data = [{
      name: "pie",
      value: datas.toFixed(2)
    }, {
      name: "",
      value: 1 - datas.toFixed(2),
      label: {
        show: false
      }
    }];

    return options
  }
}
