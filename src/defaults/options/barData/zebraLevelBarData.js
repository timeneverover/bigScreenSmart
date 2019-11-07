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
	legend: {
		show: true,
		orient: 'horizontal',
		x: 'center', //图例布局位置
		y: 'bottom',
		itemGap: 5, //图例布局左右间距
		padding: [0, 8], //图例布局上下间距
		itemWidth: 10,
		itemHeight: 10,
		textStyle: { //图例文本样式
			color: '#ffffff',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontSize: 10,
		},
	},
	tooltip: { //提示框配置
		show: true,
		trigger: 'item', //默认数据项item  可选 axis --坐标轴
		axisPointer: { //坐标轴指示器axis才有效
			tpye: 'line',
			lineStyle: {
				color: "#e4393c",
				width: "1",
				type: "solid",
			}
		},
		triggerOn: "mousemove", //触发方式，'mousemove' | 'click'
		hideDelay: 100, //消失延迟时间
		backgroundColor: "#333", //背景色
		padding: 5, // 内边距
		borderColor: '#fff',
		borderWidth: 0,
		textStyle: {
			color: '#fff',
			fontFamily: 'normal',
			fontSize: 14,
			fontWeight: 'normal'
		},
		extraCssText: 'width:100px;height:30px',
		formatter: function(params) {
			return params;
		},
		position: function(pos, params, dom, rect, size) {

			return [pos[0], pos[1]];
		},
	},
	xAxis: {},
	yAxis: {},
	series: [{
		name: '',
		data: [],
		type: 'pictorialBar',
		symbol: 'rect',
		symbolSize: ['100%', '100%'],
		symbolPosition: 'start',
		symbolOffset: [0, 0],
		symbolRepeat: true,
		symbolMargin: '5%',
		symbolClip: true,
		symbolSize: ['100%', 30],
		label: {
			normal: {
				show: true,
				position: 'top',
				distance: 2,
				textStyle: {
					fontSize: 16,
					fontWeight: "normal",
					color: '#e54035'
				}
			}
		},
		itemStyle: {
			color: '#00BAFF',
		},
//		barCategoryGap: '20%', // 同一系列的柱间距离，默认为类目间距的20%，可设固定值

	}],
	//动画
	animation: true,
	animationDuration: 1000, //初始动画时长
	animationEasing: 'cubicInOut ', //初始动画的缓动效果
	animationDurationUpdate: 1000, // 数据更新动画的时长

	animationDelayUpdate: function(idx) { //数据更新动画的延迟
		return idx * 2;
	}
}

export let axix1 = {
	show: true,
	type: 'category',
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
	splitLine: {
		show: false,
		lineStyle: {
			color: '#eee'
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
		margin: 15, // 刻度标签与轴线之间的距离
		fontWeight: 'normal',
		color: '#fff',
		fontStyle: 'normal',
		fontSize: 12
	},
	splitNumber: 5, //坐标轴的分割段数
}

export let axix2 = {
	type: 'value',
	name: '单位',
	show: true,
	nameTextStyle: {
		fontWeight: 'normal',
		color: '#fff',
		fontSize: 12
	},
	splitLine: {
		show: false,
		lineStyle: {
			color: '#eee'
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
	nameTextStyle: {
		fontWeight: 'normal',
		color: '#fff',
		fontSize: 12
	},
	axisTick: {
		show: false,
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
}