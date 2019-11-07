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
	xAxis: {
		type: 'category',
		data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		nameTextStyle: {
			fontWeight: 'normal',
			color: '#fff',
			fontSize: 12
		},
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
			length: 5, //坐标轴刻度的长度(指标点长度)
			lineStyle: {
				color: '#fff'
			}
		},
		axisLabel: {
			margin: 8, // 刻度标签与轴线之间的距离
			fontWeight: 'normal',
			color: '#fff',
			fontStyle: 'normal',
			fontSize: 12
		}
	},
	yAxis: {
		type: 'value',
		name: '流量(m^3/s)',
		nameTextStyle: {
			fontWeight: 'normal',
			color: '#fff',
			fontSize: 12
		},
		splitLine: {
			show: false
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
			margin: 8, // 刻度标签与轴线之间的距离
			fontWeight: 'normal',
			color: '#fff',
			fontStyle: 'normal',
			fontSize: 12
		},
		min: null,
		max: null,
		splitNumber: 5, //坐标轴的分割段数
		boundaryGap: ['50%', '40%']
	},
	series: [
		{ // For shadow
			type: 'bar',
			itemStyle: {
				normal: {
					color: 'rgba(0,0,0,0.05)' //柱体背景色
				}
			},
			barGap: '-100%',
			barCategoryGap: '20%',
			data: '', // 高度100%
			animation: false
		},
	{
		data: [120, 200, 150, 80, 70, 110, 130],
		type: 'bar',
		label:{
			show:false,
			fontSize:12,
			color:"#fff",
			fontWeight:"normal",
			// offset:[20,0]
		},
		itemStyle: {
			color: '#00BAFF',
		},
		barCategoryGap: '20%', // 同一系列的柱间距离，默认为类目间距的20%，可设固定值

	}]
}
