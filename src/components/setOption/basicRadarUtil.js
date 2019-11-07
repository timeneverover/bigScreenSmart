import option from '@/defaults/options/radarData.js'
export default {
  setOption(attrs, datas) {
    let options = option;
    //全局样式
    //字体
    options.textStyle.fontFamily = attrs[1].properties[0].value;
    options.radar.name.textStyle.fontFamily = attrs[1].properties[0].value;
    //值标签
    if (attrs[1].properties[1].editable == "1") {
      options.series[0].label.normal.show = true;
      options.series[0].label.normal.fontSize = attrs[1].properties[1].fieldData[0].fieldData[0].value;
      options.series[0].label.normal.color = attrs[1].properties[1].fieldData[0].fieldData[1].value;
      options.series[0].label.normal.fontWeight = attrs[1].properties[1].fieldData[0].fieldData[2].value;
    } else {
      options.series[0].label.normal.show = false;
    }
    //角度轴
    options.radar.name.textStyle.fontSize = attrs[2].properties[0].fieldData[0].value;
    options.radar.name.textStyle.color = attrs[2].properties[0].fieldData[1].value;
    options.radar.name.textStyle.fontWeight = attrs[2].properties[0].fieldData[2].value;
    options.radar.startAngle = attrs[2].properties[1].value;
    //极轴
    if (attrs[3].editable == '1') {
      if (attrs[3].properties[0].editable == '1') {
        options.radar.axisLine.lineStyle.color = attrs[3].properties[0].fieldData[0].value;
        options.radar.axisLine.lineStyle.type = attrs[3].properties[0].fieldData[1].value;
      } else {
        options.radar.axisLine.show = false;
      }
      if (attrs[3].properties[1].editable == '1') {
        options.radar.splitLine.lineStyle.color = attrs[3].properties[1].fieldData[0].value;
        options.radar.splitLine.lineStyle.type = attrs[3].properties[1].fieldData[1].value;
      } else {
        options.radar.splitLine.show = false;
      }
    } else {
      options.radar.axisLine.show = false;
      options.radar.splitLine.show = false;
    }
    //图例
    if (attrs[4].editable == '1') {
      options.legend.show = true;
      options.legend.textStyle.fontSize = attrs[4].properties[0].fieldData[0].value;
      options.legend.textStyle.color = attrs[4].properties[0].fieldData[1].value;
      options.legend.textStyle.fontWeight = attrs[4].properties[0].fieldData[2].value;
      options.legend.itemGap = parseInt(attrs[4].properties[1].fieldData[0].fieldData[0].value);
      options.legend.padding = parseInt(attrs[4].properties[1].fieldData[0].fieldData[1].value);
      let positionWay = attrs[4].properties[1].fieldData[1].value;
      if (positionWay.indexOf('顶部') > -1) {
        options.legend.top = 'top';
      } else if (positionWay.indexOf('底部') > -1) {
        options.legend.top = 'bottom';
      }
      if (positionWay.indexOf('居中') > -1) {
        options.legend.left = 'center';
      } else if (positionWay.indexOf('居左') > -1) {
        options.legend.left = 'left';
      } else if (positionWay.indexOf('居右') > -1) {
        options.legend.left = 'right';
      }
    } else {
      options.legend.show = false;
    }
    //数据系列
    let seriesNum = attrs[5].properties.length;
    for (let num = 0; num < seriesNum; num++) {
      option.series[0].data[num].name = attrs[5].properties[num].fieldData[1].value;
      option.series[0].data[num].lineStyle.color = attrs[5].properties[num].fieldData[2].value;
      option.series[0].data[num].lineStyle.width = attrs[5].properties[num].fieldData[3].value;
      option.series[0].data[num].areaStyle.color = attrs[5].properties[num].fieldData[4].value;
    }

    //动画
    options.animation = attrs[6].editable != '2'
    options.animationDuration = attrs[6].properties[0].value;
    options.animationEasing = attrs[6].properties[1].value;
    options.animationDurationUpdate = attrs[6].properties[2].value;
    //数据
    //系列值1，2
    let yData = datas.ydata;
    let xData = datas.xdata;
    let rData = datas.rData;
    let r = [];
    let y = [];
    let x = [];
    let realData = [];
    let i, j, k;
    //找出y中的最大值
    for (i = 0; i < yData.length; i++) {
      y = y.concat(yData[i]);
      r = r.concat(rData[i]);
    }
    //把各个系列中的数据渲染起来
    for (i = 0; i < yData.length; i++) {
      options.series[0].data[i].value = [];
      for (k = 0; k < r.length; k++) {
        if (attrs[5].properties[i].fieldData[0].value == r[k].s) {
          options.series[0].data[i].value.push(parseInt(r[k].y));
        }
      }
    }

    //设置indicator数据

    let max = Math.max.apply(null, y);
    for (j = 0; j < xData.length; j++) {
      x.push({
        name: xData[j],
        max: max
      })
    }
    options.radar.indicator = x;

    return options;
  }
}
