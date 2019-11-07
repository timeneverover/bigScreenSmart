export default {
  //标注对比饼图
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
  //图例设置
  legend: {
    orient: 'horizontal', //水平
   // orient:'vertical',   //图例列表的布局朝向垂直。
    x: 'center',         //图例布局位置
    y: 'bottom',
    itemGap: 5,        //图例布局左右间 距图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
    padding: 10,       //图例布局上下间距
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { //图例文本样式
      color: '#ffffff',
      fontStyle: 'normal',
      fontSize: 10,
      lineHeight: 150
    },
  },
  //装饰色 边框色
  itemStyle: {
    borderColor:"red",
    borderWidth:"1"
  },
  series: [
    {
    name: '标注对比饼图',
    type: 'pie',
    hoverAnimation: false,
    radius: ['0', '50%'], //饼图半径，内/外
    startAngle:0, //旋转角度
    avoidLabelOverlap: true, //防止标签重叠策略
    label: {
      show: true,
      position: 'inner', //标签显示在图里面
      // formatter: '{dStyle|{d}%}\n{aStyle|{b}}',
      //只显示百分比 
      formatter: function(params) {
        let str = '{dStyle|' + params.percent.toFixed(1) + '%}'
        return str
      },
      fontFamily: 'sans-serif',
      //data.name 样式 影藏了
      rich: {
        aStyle: {
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        },
        //显示百分比的样式
        dStyle: {
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        }
      },
      markLine: {
        lineStyle: {
          color: 'red',
          width: 1,
          style: 'dashed'
        }
      },
      emphasis: { //iitem hover之后标签的样式
        show: true,
        textStyle: {
          fontSize: '12',
          fontWeight: 'bold'
        }
      }
    },
    labelLine: {
      show: true,
      length: 0, //辅轴距中心
      length2: 30, //标签距中心
      lineStyle: {
        width: 2
      }
    },
    data: [{
        name: '设备',
        value: 14
      },
      {
        name: '建材',
        value: 12
      },
    ]
  }],
  //颜色
  color: ['#00BAFF', '#3DE7C9',],
  //动画
  animation: true,
  animationDuration: 1000, //初始动画时长
  animationDurationUpdate: 1000, // 数据更新动画的时长
  animationEasing: 'cubicInOut ', //初始动画的缓动效果
  animationDelayUpdate: function(idx) { //数据更新动画的延迟
    return idx * 0;
  }
}
