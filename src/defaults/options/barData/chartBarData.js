export default {
	grid: {
		left: 'center', //左边距
		right: 20,
		top: 60,
		bottom: 60,
		zlevel: 0,
		backgroundColor: 'transparent' //图表背景色
	},
	textStyle: {
		fontFamily: 'sans-serif'
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
			},
			z:222
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
	xAxis: {
		type: 'category',
		name: "", //x轴名称
		show: true, //是否显示坐标轴轴线
		axisLabel: {
			show: true,
			margin: 15, // 刻度标签与轴线之间的距离
			fontWeight: 'normal',
			color: '#000000',
			fontStyle: 'normal',
			fontSize: 12,
			rotate: 0, //y轴旋转角度
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#000000',
			},
			z: 12
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: 'transparent'
			}
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: "#dddddd",
				type: 'dotted'
			}
		},
		offset: 0, // X 轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用
		nameGap: 0, // 坐标轴名称与轴线之间的距离
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		//x轴 网络线
		min: 0,
		max: null, //null自动  dataMax最大
		nameGap: 5, // 坐标轴名称与轴线之间的距离
		nameRotate: null, //坐标轴名字旋转，角度值
		splitNumber: 5, //坐标轴的分割段数
	},
	yAxis: [{
		type: 'value',
		name: '柱子',
		show: true, //是否显示坐标轴轴线
		nameTextStyle: {
			fontWeight: 'normal',
			color: '#fff',
			fontSize: 12,
			lineHeight: 30
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			margin: 5, // 刻度标签与轴线之间的距离
			fontWeight: 'normal',
			color: '#ffffff',
			fontStyle: 'normal',
			fontSize: 12,
			rotate: 0, //y轴旋转角度
			show: true, /////
			formatter: function(value) {
				return value;
			},
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#ffffff'
			},
			z: 12
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: "#dddddd",
				type: 'dotted',
			}
		},
		min: 0,
		max: null, //null自动  dataMax最大
		nameGap: 5, // 坐标轴名称与轴线之间的距离
		nameRotate: null, //坐标轴名字旋转，角度值
		splitNumber: 5, //坐标轴的分割段数
	}, {
		type: 'value',
		name: '折线',
		show: true,
		nameTextStyle: {
			fontWeight: 'normal',
			color: '#fff',
			fontSize: 12,
			lineHeight: 30
		},
		axisTick: {
			show: false
		},
		axisLabel: {
			margin: 5,
			fontWeight: 'normal',
			color: '#ffffff',
			fontStyle: 'normal',
			fontSize: 12,
			rotate: 0,
			show: true,
			formatter: function(value) {
				return value;
			},
		},
		axisLine: {
			show: true,
			lineStyle: {
				color: '#ffffff'
			},
			z: 12
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: "#dddddd",
				type: 'dotted',
			}
		},
		min: 0,
		max: null, //null自动  dataMax最大
		nameGap: 5, // 坐标轴名称与轴线之间的距离
		nameRotate: null, //坐标轴名字旋转，角度值
		splitNumber: 5, //坐标轴的分割段数

	}],
	series: [],
	//动画
	animation: true,
	animationDuration: 1000, //初始动画时长
	animationEasing: 'cubicInOut ', //初始动画的缓动效果
	animationDurationUpdate: 1000, // 数据更新动画的时长

	animationDelayUpdate: function(idx) { //数据更新动画的延迟
		return idx * 2;
	}

}

export let serOption1={
	name: '',
	type: 'bar',
	barGap: '-100%',
	barCategoryGap: '20%',
	label: { //柱子上的字样式
		show: false,
		position: 'inside',
		fontSize: 12,
		color: "#000",
		fontWeight: "normal"
	},
	itemStyle: {
		color: 'transparent' //柱体背景色
	},
	z: 0,
	yAxisIndex: 0,
	data: []
}
export let serOption2={
		name: '图例一',
		type: 'bar',
		barCategoryGap: '20%',
		label: { //柱子上的字样式
			show: false,
			position: 'inside',
			fontSize: 12,
			color: "#000",
			fontWeight: "normal"
		},
		itemStyle: {
			borderWidth :0,
			barBorderRadius: 0,
			color: "#00BAFF",
			borderColor: '#4DCEF8'
		},
		z: 10,
		yAxisIndex: 0,
		data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
}
export let serOption3={
		name: '图例一',
		type: 'line',
		connectNulls: false,
		itemStyle: {
			color: '#00BAFF', //标记样式
		},
		lineStyle: {
			color: '#000',
			type: 'solid', // dashed,dotted
			width: 2
		},
		label: {
			show: false,
			color: '#fff',
			fontSize: 12,
			fontWeight: 'normal'
		},
		areaStyle:{
			color:'transparent'
		},
		smooth: false, //是否平滑曲线显示
		showSymbol :true,
		symbol :'circle',
		symbolSize: 6, //标记大小
		showAllSymbol:true,
		yAxisIndex: 1,
		z: 12,
		data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
}
