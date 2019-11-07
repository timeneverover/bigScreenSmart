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
    show: false
  },
  series: [{
    name: '底层饼图',
    type: 'pie',
    roseType: 'radius',
    hoverAnimation: false,
    animation: false,
    legendHoverLink: false,
    radius: ['62%', '80%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: false,
    },
    labelLine: {
      show: false
    },
    emphasis: {
      label: {
        show: false
      }
    },
    tooltip: {
      show: false
    },
    zlevel: 0,
    data: [{
      name: '',
      value: 1
    }],
    color: ['#333333']
  }, {
    name: '外层饼图',
    type: 'pie',
    roseType: 'radius',
    hoverAnimation: false,
    radius: ['62%', '80%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: true,
      position: 'center',
      fontFamily: 'sans-serif',
      rich: {
        aStyle: {
          fontSize: 20,
          color: '#ffffff',
          fontWeight: 'normal',
          verticalAlign: 'bottom'
        },
        dStyle: {
          fontSize: 30,
          color: '#ffffff',
          fontWeight: 'normal',
          verticalAlign: 'bottom',
          width: 35
        }
      },
      formatter: function(params) {
        let str = '';
        str = '{dStyle|' + params.percent.toFixed(0) + '}' + '{aStyle|' + '%}';
        return str
      },
    },
    labelLine: {
      show: false
    },
    zlevel: 1,
    data: [{
      name: 'pie',
      value: 0.83
    }, {
      name: '',
      value: 0.17,
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
