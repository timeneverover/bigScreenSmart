export default {
  grid: {
    zlevel: 0
  },
  textStyle: {
    fontFamily: '微软雅黑'
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: 'horizontal',
    x: 'center', //图例布局位置
    y: 'bottom',
    itemGap: 5, //图例布局左右间距
    padding: -55, //图例布局上下间距
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { //图例文本样式
      color: '#ffffff',
      fontStyle: 'normal',
      fontSize: 10,
      lineHeight: 150
    }
  },
  series: [{
    name: '基本饼图',
    type: 'pie',
    startAngle: -205,
    radius: ['60%', '80%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    selectedOffset: 5,
    label: {
      show: false,
      position: 'center',
      formatter: function(params) {
        let str = '{dStyle|' + params.percent.toFixed(3) + '%}' + '\n{aStyle|' + params.name + '}'
        return str
      },
      fontFamily: 'sans-serif',
      rich: {
        aStyle: {
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        },
        dStyle: {
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        }
      },
      emphasis: { //item hover之后标签的样式
        itemStyle: {
          borderColor: '#0f2a43'
        }
      }
    },
    labelLine: {
      show: false,
    },
    emphasis: {
      itemStyle: {
        shadowColor: '#081f2f',
        shadowBlur: 10,
        shadowOffsetX: 15,
        shadowOffsetY: 10
      }
    },
    data: []
  }],
  //颜色
  color: ['#00BAFF', '#3DE7C9', '#ffffff'],
  //动画
  animation: true,
  animationDuration: 1000, //初始动画时长
  animationDurationUpdate: 1000, // 数据更新动画的时长
  animationEasing: 'cubicInOut ', //初始动画的缓动效果
  animationDelayUpdate: function(idx) { //数据更新动画的延迟
    return idx * 0;
  }
}
