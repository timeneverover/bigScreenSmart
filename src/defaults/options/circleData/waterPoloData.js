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
		 type: 'liquidFill',
		 name:'liquidFill',
		data: [0.6],
		color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
		center: ['50%', '50%'],
		radius: '80%',
		amplitude: '8%',
		waveLength: '70%',
		phase: 'auto',
		period: 'auto',
		direction: 'left',
		shape: 'arrow',
		waveAnimation: true,
		animationEasing: 'linear',
		animationEasingUpdate: 'linear',
		animationDuration: 2000,
		animationDurationUpdate: 1000,

		outline: {
			show: true,
			borderDistance: 8,
			itemStyle: {
				color: 'none',
				borderColor: '#294D99',
				borderWidth: 8,
				shadowBlur: 20,
				shadowColor: 'rgba(0, 0, 0, 0.25)'
			}
		},
		backgroundStyle: {
			color: '#E3F7FF'
		},
		itemStyle: {
			opacity: 1,
			shadowBlur: 50,
			shadowColor: 'rgba(0, 0, 0, 0.4)'
		},
		label: {
			show: true,
			color: '#294D99',
			insideColor: '#fff',
			fontSize: 50,
			fontWeight: 'bold',
			align: 'center',
			baseline: 'middle',
			position: 'inside'
		},
		emphasis: {
			itemStyle: {
				opacity: 0.8
			}
		}
	}]
}