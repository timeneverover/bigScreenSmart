export default {
	grid: {
		left: 20, //左边距
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
	 dataset: {
        source: {}
    },
	//x轴
	xAxis: {},
	yAxis: {},
	series: [ {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}],
	//动画
	animation: true,
	animationDuration: 1000, //初始动画时长
	animationEasing: 'cubicInOut ', //初始动画的缓动效果
	animationDurationUpdate: 1000, // 数据更新动画的时长
	animationDelayUpdate: function(idx) { //数据更新动画的延迟
		return idx * 2;
	}

}

export let serBar = {
	type: 'bar',
	barCategoryGap: '20%',
	//	barGap: '-100%',
	label: { //柱子上的字样式
		show: false,
		position: 'inside',
		fontSize: 12,
		color: "#000",
		fontWeight: "normal"
	},
	itemStyle: {
		barBorderRadius: 0,
		color: "#00BAFF",
		borderColor: '#4DCEF8'
	},
	z: 10,
}
export let option1 = {
	type: 'category',
	name: "", //x轴名称
	show: true, //是否显示坐标轴轴线
	//y轴文本样式
	axisLabel: {
		show: true,
		margin: 15, // 刻度标签与轴线之间的距离
		fontWeight: 'normal',
		color: '#000000',
		fontStyle: 'normal',
		fontSize: 12,
		rotate: 0, //y轴旋转角度
	},
	//y轴轴线样式
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
	//y轴 网络线
	splitLine: {
		show: false,
		lineStyle: {
			color: "#dddddd",
			type: 'dotted'
		}
	},
	offset: 0, // X 轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用
	nameGap: 0, // 坐标轴名称与轴线之间的距离
	/*axisTick: {
		length: 5, //坐标轴刻度的长度(指标点长度)
		lineStyle: {
			color: '#000'
		}
	},*/
	//x轴 网络线
	min: 0,
	max: null, //null自动  dataMax最大
	nameGap: 5, // 坐标轴名称与轴线之间的距离
	nameRotate: null, //坐标轴名字旋转，角度值
	splitNumber: 5, //坐标轴的分割段数
}

export let option2 = {
	type: 'value',
	name: '单位',
	show: true, //是否显示坐标轴轴线
	nameTextStyle: { //x轴名称样式
		fontWeight: 'normal',
		color: '#fff',
		fontSize: 12,
		lineHeight: 30
	},
	//x轴文本样式
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
	axisTick: {
		show: false,
		lineStyle: {
			color: 'transparent'
		}
	},
	//x轴轴线样式
	axisLine: {
		show: true,
		lineStyle: {
			color: '#ffffff'
		},
		z: 12
	},
	//x轴 网络线
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
}

