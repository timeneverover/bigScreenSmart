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
    padding: 10, //图例布局上下间距
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { //图例文本样式
      color: '#ffffff',
      fontStyle: 'normal',
      fontSize: 10,
      lineHeight: 150
    }
  },
  color: ['red', 'yellow'],
  series: [{
    name: '外圈饼图1',
    type: 'pie',
    roseType: 'radius',
    hoverAnimation: false,
    radius: ['78%', '80%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: false,
    },
    labelLine: {
      show: false
    },
    data: [{
      name: '',
      value: 1
    }],
    color: ['#246078']
  }, {
    name: '外圈饼图2',
    type: 'pie',
    roseType: 'radius',
    hoverAnimation: false,
    radius: ['74%', '75%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: false,
    },
    labelLine: {
      show: false
    },
    data: [{
      name: '',
      value: 1
    }],
    color: ['#246078']
  }],
  //动画
  animation: true,
  animationDuration: 1000, //初始动画时长
  animationDurationUpdate: 1000, // 数据更新动画的时长
  animationEasing: 'cubicInOut ', //初始动画的缓动效果
  animationDelayUpdate: function(idx) { //数据更新动画的延迟
    return idx * 0;
  }
}
