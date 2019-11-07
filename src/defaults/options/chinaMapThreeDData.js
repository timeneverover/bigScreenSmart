export default {
  grid: {
    zlevel: 0
  },
  backgroundColor: 'transparent',
  visualMap: {
    type: 'continuous',
    show: true,
    seriesIndex: 0,
    dimension: 0,
    left: 0,
    bottom: 0,
    zlevel: 100,
    calculable: true,
    max: 900,
    min: 0,
    inRange: { //最小值，最大值背景色
      color: ['#0F8CB4', '#206199']
    },
    textStyle: {
      color: '#ffffff',
      fontSize: 20
    }
  },
  geo3D: {
    geoIndex: 0,
    show: false,
    map: 'china',
    roam: true,
    viewControl: {
      autoRotate: 'autoRotate',
      autoRotateDirection: 'cw',
      alpha: 30,
      beta: 0
    },
    boxHeight: 10, //组件高度
    regionHeight: 1, //模型高度
    label: {
      show: false,
    },
    light: {
      main: { //主光源配置
        color: '#fff', //光照颜色
        intensity: 1, //光照强度
        shadow: true, //是否显示阴影
        alpha: 40, //主光源绕x轴旋转角度
        beta: 40, //主光源绕y轴旋转角度
      },
      ambient: {
        intensity: 0.6
      }
    }
  },
  series: [{
      name: '底图层', //底图层
      map: 'china',
      type: "map3D",
      zlevel: 0,
      viewControl: {
        autoRotate: 'autoRotate',
        autoRotateDirection: 'cw',
        alpha: 30,
        beta: 0
      },
      coordinateSystem: 'geo3D',
      boxHeight: 10,
      regionHeight: 1,
      instancing: false,
      itemStyle: {
        color: "transparent", //无数据背景色
        opacity: 1,
        borderWidth: 0.5,
        borderColor: '#ffffff'
      },
      emphasis: { //当鼠标放上去  地区区域是否显示名称
        label: {
          show: true,
          textStyle: {
            color: 'yellow',
            fontSize: 20,
            backgroundColor: 'rgba(0,23,11,0)'
          }
        },
        itemStyle: {
          areaColor: "yellow",
          opacity: 0.9,
        }
      },
      light: { //光照阴影
        main: {
          color: '#fff', //光照颜色
          intensity: 1, //光照强度
          shadowQuality: 'high', //阴影亮度
          shadow: true, //是否显示阴影
          alpha: 40,
          beta: 40
        }
      },
      shading: 'lambert',
      data: [{
        name: "内蒙古",
        value: [90]
      }, {
        name: "上海",
        value: [200]
      }, {
        name: "吉林",
        value: [20]
      }, {
        name: "新疆",
        value: [300]
      }, {
        name: "河北",
        value: [800]
      }, {
        name: "台湾",
        value: [100]
      }]
    },
    {
      name: "飞线层", //飞线层
      type: "lines3D",
      coordinateSystem: "geo3D",
      geo3DIndex: 0,
      zlevel: 0,
      effect: { //尾迹特效
        show: true,
        period: 3, //周期
        trailWidth: 2, //尾迹宽度
        trailLength: 0.5, //尾迹长度0-1
        trailColor: '#e4df26',
        trailOpacity: 0.8,
      },
      lineStyle: { //线条样式
        color: 'transparent',
        opacity: 0,
        width: 0
      },
      data: [ //注：若有柱状图，海拔坐标为柱状体图最小值，若没有随意0
        [
          [121.4648, 31.2891, 0], // 起点的经纬度和海拔坐标
          [127.9688, 45.368, 0] // 终点的经纬度和海拔坐标
        ],
        [
          [110.3893, 19.8516, 0], // 起点的经纬度和海拔坐标
          [110.3467, 41.4899, 0] // 终点的经纬度和海拔坐标
        ]
      ]
    },
    {
      type: "bar3D", //柱图层
      name: '柱状图',
      coordinateSystem: 'geo3D',
      zlevel: 0,
      geo3DIndex: 0,
      bevelSize: 0.2, //柱体的倒角（0-1），方的/椭圆的
      minHeight: 0, //最小柱子的高度
      itemStyle: { //柱状体样式
        color: '#13e8ef', //填充色
        opacity: 0.7 //透明度
      },
      label: { //标签设置
        show: true,
        distance: 0,
        formatter: function(params) {
          return params.data.name + ':' + params.data.value[2]
        },
        textStyle: { //标签字体
          color: '#fff',
          backgroundColor: 'transparent',
          fontFamily: 'sans-serif',
          fontSize: 20,
          fontWeight: 'normal'
        }
      },
      emphasis: { //柱体选中高亮样式设置
        itemStyle: { //柱体
          color: '#0F8CB4',
          opacity: 1
        },
        label: { //标签
          show: true,
          distance: 0,
          formatter: function(params) {
            return params.data.name + ':' + params.data.value[2]
          },
          textStyle: { //标签字体
            color: '#fff',
            backgroundColor: 'transparent',
            fontFamily: 'sans-serif',
            fontSize: 20,
            fontWeight: 'normal'
          }
        }
      },
      barSize: 1, //柱子粗细
      shading: 'lambert',
      // opacity: 0.2, //透明度
      data: [{ //添加最小值假数据就不会有数据显示不出来
        name: "",
        value: [0, 0, 0]
      }, {
        name: "内蒙古",
        value: [110.3467, 41.4899, 900]
      }, {
        name: "上海",
        value: [121.4648, 31.2891, 800]
      }, {
        name: "吉林",
        value: [125.8134, 44.2584, 400]
      }],
      animation: false
    }, {
      name: "散点层", //3d散点层没有动画属性
      type: "scatter3D",
      coordinateSystem: "geo3D",
      geo3DIndex: 0,
      zlevel: 0,
      symbol: 'circle', //散点得形状
      symbolSize: 16,
      itemStyle: { //散点样式
        color: '#ffffa4',
        opacity: 0.8,
        borderWidth: 0,
      },
      label: { //标签样式
        show: false
      },
      emphasis: { //高亮设置
        itemStyle: { //散点样式
          color: '#ffffa4',
          opacity: 1,
          borderWidth: 0,
        },
        label: { //标签样式
          show: true,
          distance: 0,
          position: 'bottom',
          fomatter: "{b}",
          textStyle: {
            color: "#ffffff",
            fontFamily: 'sans-serif',
            fontSize: 20,
            fontWeight: 'normal',
            backgroundColor: 'transparent'
          }
        }
      },
      data: [{
        name: "内蒙古",
        value: [110.3467, 41.4899, 1000]
      }, {
        name: "上海",
        value: [121.4648, 31.2891, 700]
      }, {
        name: "吉林",
        value: [125.8134, 44.2584, 300]
      }],
      animation: true,
    },
  ]
}
