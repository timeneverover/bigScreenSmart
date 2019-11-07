export default {
  title: {
    show: true,
    text: '111',
    left: 'center',
    top: '2%',
    textStyle: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'normal',
    }
  },
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
    show: true,
    formatter: 'hahaha',
    textStyle: {
      color: '#ffffff'
    }
  },
  series: [{
    name: '底层饼图',
    type: 'pie',
    roseType: 'radius',
    hoverAnimation: false,
    animation: false,
    radius: ['60%', '70%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: false,
    },
    labelLine: {
      show: false
    },
    data: [{
      name: '',
      value: 0.1
    }],
    color: ['#274055']
  }, {
    name: '外层饼图',
    type: 'pie',
    hoverAnimation: false,
    startAngle: 90,
    radius: ['60%', '80%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: true,
      position: 'center',
      fontFamily: 'sans-serif',
      fontSize: 32,
      color: '#ffffff',
      fontWeight: 'bolder',
      verticalAlign: 'bottom',
      formatter: function(params) {
        return params.percent.toFixed(1) + '%';
      },
    },
    labelLine: {
      show: false
    },
    data: [{
      name: 'pie',
      value: 0.2
    }, {
      name: '',
      value: 0.8,
      label: {
        show: false
      }
    }],
    color: ['#2B80CF', 'transparent']
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
