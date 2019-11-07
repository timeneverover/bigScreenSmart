export default {
  grid: {
    zlevel: 0,
  },
  textStyle: {
    fontFamily: 'sans-serif'
  },
  tooltip: { //提示框
    show: true,
    triggerOn: 'mousemove', //click
    hideDelay: 1000,
    backgroundColor: 'rgba(50,50,50,0.65)',
    borderColor: '#333',
    borderWidth: 0,
    padding: 10,
    textStyle: {
      color: '#fff',
      fontFamily: '微软雅黑',
      fontSize: 12,
      fontWeight: 'normal',
    },
    extraCssText: 'width:100px;height:170px;'
  },
  color: ['#00BAFF', '#3DE7C9'],
  legend: {
    show: true,
    orient: 'horizontal', // 设置图例布局朝向
    top: 'bottom',
    left: 'center',
    padding: 5, // 设置上下左右间距（距容器）
    itemGap: 10, //每项图例之间的间隔
    textStyle: { //图例字体样式
      color: '#CDCDCD',
      fontWeight: 'normal',
      fontSize: 12
    }
  },
  radar: {
    shape: 'circle',
    name: {
      textStyle: {
        color: '#CDCDCD',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 12,
        padding: [3, 5]
      }
    },
    scale: true,
    nameGap: 15, //指示器名和指示器轴的距离
    splitNumber: 4, //有多少圈
    axisLine: { //极轴
      lineStyle: { //坐标轴轴线样式
        color: '#CDCDCD',
        width: 1,
        type: 'solid',
        opacity: 0.8
      }
    },
    // axisLabel: {
    //   show: true,
    //   color: 'red'
    // },
    splitLine: {
      lineStyle: { //坐标轴分割线样式
        color: '#CDCDCD',
        width: 1,
        type: 'dashed',
        opacity: 0.8
      }
    },
    splitArea: {
      areaStyle: { //坐标轴区域样式
        color: ['transparent'],
      }
    },
    startAngle: '90',
    indicator: [{
        name: '内蒙古',
        max: 420
      },
      {
        name: '浙江',
        max: 420
      },
      {
        name: '辽宁',
        max: 420
      },
      {
        name: '吉林',
        max: 420
      },
      {
        name: '黑龙江',
        max: 420
      },
      {
        name: '安徽',
        max: 420
      },
      {
        name: '福建',
        max: 420
      }
    ],
//			triggerEvent:true
  },
  series: [{
    type: 'radar',
    symbol: 'circle',
    symbolSize: 1,
    label: {
      normal: {
        show: true,
        fontSize: 10,
        color: '#ffffff',
        fontWeight: 'normal',
        formatter: function(params) {
          return params.value;
        }
      }
    },
    data: [{
        value: [375, 200, 25, 190, 90, 240, 420],
        name: '我是图例一',
        lineStyle: {
          color: '#00BAFF',
          width: 2
        },
        areaStyle: {
          color: '#00BAFF',
          opacity: 0.6
        }
      },
      {
        value: [180, 100, 125, 110, 60, 170, 190],
        name: '我是图例二',
        lineStyle: {
          color: '#3DE7C9',
          width: 2
        },
        areaStyle: {
          color: '#3DE7C9',
          opacity: 0.3
        }
      }
    ]
  }],
  animation: true,
  animationDuration: 1000, //初始动画时长
  animationDurationUpdate: 300, // 数据更新动画的时长
  animationEasing: 'linear ', //初始动画的缓动效果
}
