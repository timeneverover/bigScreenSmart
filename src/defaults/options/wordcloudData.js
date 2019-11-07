export default {
	grid: {
		left: '20', //左边距
		right: '20',
		top: 60,
		bottom: 60,
		zlevel: 0,
		backgroundColor: 'transparent' //图表背景色
	},
	backgroundColor: 'transparent',
	tooltip: {
		show: true
	},
	series: [{
		type: 'wordCloud',
//		size: ['9%', '99%'],
		sizeRange: [16, 26],
		shape: 'rect',
		 gridSize: 0, //词云间隔大小
//       rotationRange: [-45, 90],//词云倾斜旋转范围
		textPadding: 1,
		autoSize: {
			enable: true,
			minSize: 12
		},
		width: '100%',
        height: '100%',
		drawOutOfBound:false,
		textStyle: {
			normal: {
				color: '#00BAFF',
				fontFamily: 'sans-serif'
			},
			emphasis: {
				shadowBlur: 10,
				shadowColor: '#333'
			}
		},
		data: []
	}]
}