export default {
  grid: {
    zlevel: 0
  },
  backgroundColor: 'transparent',
  visualMap: {
    show: false,
    min: 0,
    max: 1000,
    left: 0,
    bottom: 0,
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: true,
    seriesIndex: [0],
    inRange: { //区域热力层填充颜色
      color: ['#05607D', '#05BDBD']
    },
    textStyle: {
      color: '#fff'
    }
  },
  geo: {
    map: 'china',
    show: true,
    roam: true, //缩放：'scale',拖拽：'move',都开启：'true'
    center: [106.5360, 38.5714],
    zoom: 1, //当前视角缩放比例
    selectedMode: 'single', //选中模式-单选
    label: { //区域热力层标注
      normal: {
        show: true,
        formatter: '{b}', //{c}
        fontFamily: '微软雅黑',
        color: '#ffffff',
        fontSize: 12,
        textShadowColor: 'transform',
        textShadowBlur: 5,
      }
    },
    itemStyle: {
      areaColor: '#4D4D4D',
      borderColor: '#ffffff', //边线选项
      borderType: 'solid',
      borderWidth: 1
    },
    emphasis: { //区域热力层交互配置
      label: {
        show: true,
        formatter: '{c}',
        color: '#fff'
      },
      itemStyle: {
        areaColor: '#FEE619'
      }
    }
  },
  series: []
  // series: [{
  //   name: 'thermodynamic', //setOption指定系列
  //   type: 'map',
  //   mapType: 'china',
  //   geoIndex: 0,
  //   center: [106.5360, 38.5714],
  //   data: []
  // }]
}
