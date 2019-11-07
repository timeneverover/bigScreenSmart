let echarts = require('echarts/lib/echarts')
export default {
	grid: {
		show:false,
		left: '20', //左边距
		right: '20',
		bottom: 5,
		height:'auto',
		//top:5,
		zlevel: 0,
		backgroundColor: 'transparent' //图表背景色
	},
	textStyle: {
		fontFamily: 'sans-serif'
	},
	xAxis: {
		splitLine: {
			show: false
		},
		axisLabel: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLine: {
			show: false
		}
	},
	yAxis: {
		data:[''],
		inverse: true,
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			margin: 30,
			textStyle: {
				fontSize: 14,
				color: '#fff'
			}
		},
		axisPointer: {
			label: {
				show: true,
				margin: 30,
			}
		}
	},
	series: [{
		type: 'bar',
		symbolRepeat: true,
		barWidth: 46,
		data: [0.2],
		legendHoverLink: false,
		silent: true,
		itemStyle: {
			normal: {
				color: '#00BAFF',
				barBorderRadius: 5
			}
		},
		markPoint: {
			data: [{
				type: 'max',
				value:''				
			}],
			itemStyle:{
				color:'',
			},
			symbolOffset: [0, -25],
			 label: {
                normal: {
                    show: true, 
                    formatter:'',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                        fontWeight :'normal'
                    },
                }
            },
		},
		z: 1
	},
	{
		type: 'bar',
		barWidth: 50,
		barGap: '-101%',
		data: [1],
		itemStyle: {
			borderColor: 'grey',
			borderWidth :1,
			color: 'transparent',
			barBorderRadius: 5
		},
		z: 1
	}
]
}

