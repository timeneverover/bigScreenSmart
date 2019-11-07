export default {
	grid: {
		left: '20', //左边距
		right: '20',
		top: 60,
		bottom: 60,
		zlevel: 0,
		backgroundColor: 'transparent' //图表背景色
	},
	textStyle: {
		fontFamily: 'sans-serif'
	},
	tooltip:{},
	legend: {
		show:true,
		textStyle: {
			color: '#333',
			fontWeight: 'normal',
			fontSize: 12
		},
		itemGap: 10, // 图例之间的间距（左右间距）
		orient: 'horizontal', // 设置图例位置
		top: 'top',
		right: 'auto',
		bottom: 'auto',
		left: 'center',
		padding: 5, // 设置上下左右间距（距容器）
	},
	xAxis: {
		type: 'category',
		show:true,
		data: ['2010/01/01 00:00:00', '2010/02/01 00:00:00', '2010/03/01 00:00:00', '2010/04/01 00:00:00', '2010/05/01 00:00:00'],
		nameTextStyle: {
			fontWeight: 'normal',
			color: '#fff',
			fontSize: 12
		},
		min: null,
		max: null,
		name: '',
		splitNumber: 5,
		offset: 0, // X 轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用
		nameGap: 15, // 坐标轴名称与轴线之间的距离
		nameRotate: null, //坐标轴名字旋转，角度值
		axisLine: {
			show: true, //是否显示坐标轴轴线
			lineStyle: {
				color: '#fff'
			}
		},
		axisTick: {
			show: false,
			length: 5, //坐标轴刻度的长度(指标点长度)
			lineStyle: {
				color: '#fff'
			}
		},
		axisLabel: {
			show:true,
			margin: 8, // 刻度标签与轴线之间的距离
			fontWeight: 'normal',
			color: '#fff',
			fontStyle: 'normal',
			fontSize: 12,
			rotate: 0,
			formatter: null,
			interval: '',
		},
		splitLine: {
			show: true,
			lineStyle: {
				color: '#ccc',
				type:'dotted'
			}
		},
		boundaryGap :false
	},
	yAxis: {
		type: 'value',
		show:true,
		name: '单位',
		nameTextStyle: {
			fontWeight: 'normal',
			color: '#fff',
			fontSize: 12
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: '#ccc',
				type:'dotted'
			}
		},
		offset: 0, // Y 轴相对于默认位置的偏移，在相同的 position 上有多个 Y 轴的时候有用。
		nameGap: 15, // 坐标轴名称与轴线之间的距离
		nameRotate: null, //坐标轴名字旋转，角度值
		axisLine: {
			show: true, //是否显示坐标轴轴线
			lineStyle: {
				color: '#fff'
			}
		},
		axisTick: {
			length: 5, //坐标轴刻度的长度(指标点长度)
			lineStyle: {
				color: '#fff'
			}
		},
		axisLabel: {
			show:true,
			margin: 8, // 刻度标签与轴线之间的距离
			fontWeight: 'normal',
			color: '#fff',
			fontStyle: 'normal',
			fontSize: 12,
			rotate: 0,
			formatter: null,
		},
		min: null,
		max: null,
		splitNumber: 5, //坐标轴的分割段数
		scale:true
	},
	series: [{
		data: [120, 200, 150, 80, 70, 110, 130],
		type: 'scatter',
		name:'',
		connectNulls: false,
		itemStyle: {
			  normal: {
			  	borderWidth :1,
                borderColor :'#000',
                shadowBlur: 1,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                color: ''
            }
		},
		symbolSize: 10, //标记大小
	}],
	animation: true,
	animationDuration: 1000, //初始动画时长
	animationDurationUpdate: 300, // 数据更新动画的时长
	animationEasing: 'linear ', //初始动画的缓动效果
}