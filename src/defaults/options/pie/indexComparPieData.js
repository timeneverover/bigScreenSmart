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
    show: false,
    orient: 'horizontal',
    x: 'center', //图例布局位置
    y: 'bottom',
    itemGap: 5, //图例布局左右间距
    padding: -60, //图例布局上下间距
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { //图例文本样式
      color: '#ffffff',
      fontStyle: 'normal',
      fontSize: 10,
      lineHeight: 150
    },
  },
  series: [{
    name: '基本饼图',
    type: 'pie',
    hoverAnimation: false,
    startAngle: 150, //起始角度
    radius: [0, '80%'], //饼图半径，内/外
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: true,
      position: 'inside',
      fontFamily: 'sans-serif',
      rich: {
        aStyle: {
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        },
        dStyle: {
          fontSize: 28,
          color: '#ffffff',
          fontWeight: 'normal',
          height: 140
        }
      },
      formatter: function(params) {
        let str = '';
        if (params.color == 'transparent') {
          str = '{aStyle|' + params.name + ': ' + params.value + '}' + '\n{dStyle|' + params.percent.toFixed(3) + '%}';
        } else {
          str = '{dStyle|' + params.percent.toFixed(3) + '%}' + '\n{aStyle|' + params.name + ': ' + params.value + '}';
        }
        return str
      },
      emphasis: { //item hover之后标签的样式
        itemStyle: {
          borderColor: '#0f2a43'
        }
      }
    },
    labelLine: {
      show: true,
      length: 0, //标签距中心
      length2: 0, //辅轴距中心
      lineStyle: {
        width: 2
      }
    },
    itemStyle: {
      borderWidth: 1.5,
      borderColor: '#2b657d'
    },
    data: [{
        name: '女',
        value: 1000
      },
      {
        name: '男',
        value: 2000
      }
    ]
  }],
  //颜色
  color: ['transparent', '#3DE7C9'],
  //动画
  animation: true,
  animationDuration: 1000, //初始动画时长
  animationDurationUpdate: 1000, // 数据更新动画的时长
  animationEasing: 'cubicInOut ', //初始动画的缓动效果
  animationDelayUpdate: function(idx) { //数据更新动画的延迟
    return idx * 0;
  }
}
