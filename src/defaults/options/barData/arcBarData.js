export default {
	grid: {
		zlevel: 0,
		backgroundColor: 'transparent' //图表背景色
	},
	textStyle: {
		fontFamily: 'sans-serif'
	},
	tooltip: {},
	 polar: {
	 	radius :['30%','90%']  // 外半径
	 },
	angleAxis: {
        show: false,
        min: function(value) {
            return value.min >= 1 ? value.min - value.max / 3 : 0
        },
        max: function(value) {
            return value.max * 4 / 3; // 4/3  360/最大弧度  
        },
        interval :3
    },
	 radiusAxis: {
        type: 'category',
        axisLabel: {  //文本样式
            interval: 0,
            color: "#ffffff",
            fontSize: 16,
            fontWeight :'normal',
            fontFamily :'sans-serif',
            margin :20  // 图文距离
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: "rgba(17, 51, 68, 0.8)"
            }
        },
        data:['周一', '周二', '周三', '周四', '周五'],
    },
	series: [{
            type: 'bar',
            coordinateSystem: 'polar',
            itemStyle: {
                color:  {
                    type: 'linear',
                    x: 0, y: 1, x2: 0, y2: 0,
                    colorStops: [
                      {offset: 1, color: '#00BAFF'},  // 起点色值
                      {offset: 0, color: "#3DE7C9"}   // 末端色值
                    ]
                },
                barBorderRadius: 10,
                shadowBlur: 1,
                shadowColor: "rgba(255, 255, 255, 0.3)",
            },
            emphasis: {
                itemStyle: {
                    shadowColor: "rgba(255, 255, 255, 1)",
                }
            },
            barCategoryGap :'15', // 柱间距离
            data: [20,40,80,50,100] , // 柱子数量决定个数
            animation :true,
            animationEasing :'cubicOut' ,
            animationDuration :1000,
            animationDelay : function (idx) {
			    // 越往后的数据延迟越大
			    return idx * 100;
			},
			animationDurationUpdate :300
        }]
}