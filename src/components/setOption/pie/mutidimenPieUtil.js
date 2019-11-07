import option from '@/defaults/options/mutidimenPieData.js'
import basicUtil from '@/components/setOption/basicUtil.js'
export default {
  setOption(attrs, sourceDiv, dataArr, xData) {
    let options = option
    //----字体----
    options.textStyle.fontFamily = attrs[1].value;
    //删除options中除了前两个数据的所有数据
    let seriesLength = options.series.length - 2;
    options.series = options.series.slice(0, 2);

    //公用option
    let length2 = attrs[3].properties[0].value * 50;
    let length = attrs[3].properties[1].value * 50;
    if (length == 60) { //负数，反方向
      length = 0
    } else if (length < 30) {
      length = -length
    }

    //----外环颜色----
    options.series[0].color = attrs[2].value;
    options.series[1].color = attrs[2].value;
    //----极轴----外环饼图
    let radiusOutside1 = Math.round(attrs[4].properties[0].value * 100) + "%";
    let radiusInside1 = Math.round(attrs[4].properties[0].value * 100) - 2 + "%";
    let radiusOutside2 = Math.round(attrs[4].properties[0].value * 100) - 5 + "%";
    let radiusInside2 = Math.round(attrs[4].properties[0].value * 100) - 6 + "%";

    options.series[0].radius = [radiusInside1, radiusOutside1];
    options.series[1].radius = [radiusInside2, radiusOutside2];

    //----图例----
    options.legend = basicUtil.getLegend(attrs[5].properties, attrs[5].editable)
    options.legend.data=xData
    //----提示框----
    let attrItems = basicUtil.getAttrArr(attrs);
    basicUtil.getTooltip(attrItems.tooltip, '饼图')

    //----数据系列----
    let seriesNum = attrs[7].properties.length;

    for (let n = 0; n < seriesNum; n++) {
      //内环的大小是在外环大小的基础上设置的
      let insideRadius = (attrs[4].properties[0].value * attrs[7].properties[n].fieldData[1].value).toFixed(2);
      let outsideRadius = (attrs[4].properties[0].value * attrs[7].properties[n].fieldData[2].value).toFixed(2);
      //防止地址引用导致远对象更改
      let datas = JSON.parse(JSON.stringify(dataArr));
      //series中索引为n值的数据加工
      if (attrs[7].properties[n].fieldData[0].value == "颜色填充") {
        datas[n].itemStyle.normal.color = attrs[7].properties[n].fieldData[0].fieldData[0].value;
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
        datas[n].itemStyle.normal.color = {
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
      datas[n].name = xData[n];
      datas[n].label = {
        show: attrs[3].editable == '1' ? true : false,
        position: 'outside',
        formatter: function(params) {
          let pointNum = attrs[3].properties[3].fieldData[3].value;
          let realNumShow = attrs[3].properties[3].fieldData[4].fieldData[0].value;
          let str = '';
          if (realNumShow) {
            str = '{aStyle|' + params.name + '}' + '\n{dStyle|' + parseInt(params.value).toFixed(pointNum) + '}'
          } else {
            str = '{aStyle|' + params.name + '}' + '\n{dStyle|' + params.percent.toFixed(pointNum) + '%}'
          }
          return str
        },
        fontFamily: 'sans-serif',
        rich: {
          aStyle: {
            fontSize: attrs[3].properties[2].fieldData[0].value,
            color: attrs[3].properties[2].fieldData[1].value,
            fontWeight: attrs[3].properties[2].fieldData[2].value
          },
          dStyle: {
            fontSize: attrs[3].properties[3].fieldData[0].value,
            color: attrs[3].properties[3].fieldData[1].value,
            fontWeight: attrs[3].properties[3].fieldData[2].value
          }
        },
        emphasis: { //item hover之后标签的样式
          show: true
        }
      };
      datas[n].labelLine = {
        show: true,
        length: length, //辅轴距中心
        length2: length2, //标签距中心
        lineStyle: {
          width: 2
        },
        emphasis: {
          show: true
        }
      }
      let pieOption = {
        zlevel: 1,
        name: "内圈饼图",
        type: 'pie',
        roseType: 'radius',
        hoverAnimation: false,
        avoidLabelOverlap: true,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: datas,
        radius: [insideRadius * 100 + '%', outsideRadius * 100 + '%']
      }
      options.series.push(pieOption);
    }

    //----动画----
    options.animation = attrs[8].editable != '2'
    options.animationDuration = attrs[8].properties[0].value;
    options.animationEasing = attrs[8].properties[1].value;
    options.animationDurationUpdate = attrs[8].properties[2].value;
    return options
  }
}
