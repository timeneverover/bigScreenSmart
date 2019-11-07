export default {
	grid: {
		zlevel: 0,
		backgroundColor: 'transparent' //图表背景色
	},
	textStyle: {
		fontFamily: 'sans-serif'
	},
	tooltip: {},
	series: [{
		name: '刻度',
		type: 'gauge',
		radius: '75%',
		splitNumber: 10, //刻度数量
		startAngle: 225,
		endAngle: -45,
		clockwise: true,
		min:0,
		max:100,
		axisLine: {
			show: true,
			lineStyle: {
				width: 1,
				color: [
					[0.2, '#91c7ae'],
					[0.8, '#63869e'],
					[1, '#c23531']
				]
			}
		}, //仪表盘轴线
		axisLabel: {
			show: true,
			color: '#4d5bd1',
			distance: 5,
			fontWeight: 'normal',
			fontSize: '12',
			 formatter:function(v){
			 	return parseInt(v)
			 }
		}, //刻度标签。
		axisTick: {
			show: true,
			splitNumber: 5,
			lineStyle: {
				color: '#fff',
			},
			length: 8
		}, //刻度样式
		splitLine: {
			show: true,
			length: 30,
			lineStyle: {
				width: 2,
				color: '#eee'
			}
		}, //分隔线样式
		detail: {
			show: true,
			color: '#ffffff',
			fontWeight: 'normal',
			fontSize: '15',
			formatter: '',
			fontFamily :'sans-serif',
			offsetCenter :[0, '50%'] 
		},
		pointer: {
			show: false,
			length: '80%',
			width: 8
		},
		itemStyle: {
			color: 'auto'
		},
		data: []

	}]
}