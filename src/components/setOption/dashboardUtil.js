/**
 * 仪表盘
 */

import dashBoardData from '@/defaults/options/circleData/dashboardData.js'
let echarts = require('echarts/lib/echarts')
export default {
	setOption(dashData, attrs, mapped) {
		let options = dashBoardData
		let mm = 'value'
		let data = []
		let mapp = mapped[0].value
		if(mapp != '') {
			mm = mapp
		}
		if(dashData[0]) { // 后台是否传值
			if(dashData[0].hasOwnProperty(mm)) {
				data.push(dashData[0][mm])
			}
		}
		options.series[0].data = data
		options.series[0].detail.formatter=function(value){
			return value+attrs[2].properties[0].fieldData[3].value
		}
		options.series[0].detail.fontFamily = attrs[1].value
		options.series[0].detail.show = attrs[2].properties[0].editable !== "2" ? true : false
		options.series[0].detail.fontSize = attrs[2].properties[0].fieldData[0].value
		options.series[0].detail.color = attrs[2].properties[0].fieldData[1].value
		options.series[0].detail.fontWeight = attrs[2].properties[0].fieldData[2].value

		options.series[0].radius = attrs[2].properties[1].fieldData[0].value*100+'%'
		options.series[0].startAngle = attrs[2].properties[1].fieldData[1].value
		options.series[0].endAngle = attrs[2].properties[1].fieldData[2].value
		options.series[0].min = attrs[2].properties[1].fieldData[3].value
		options.series[0].max = attrs[2].properties[1].fieldData[4].value
		options.series[0].clockwise = attrs[2].properties[1].fieldData[5].value == "顺时针" ? true : false
		options.series[0].splitNumber = attrs[2].properties[1].fieldData[6].value

		options.series[0].axisLine.show = attrs[2].properties[2].editable !== "2" ? true : false
		options.series[0].axisLine.lineStyle.width = attrs[2].properties[2].fieldData[1].value

		let circolor = ''
		if(attrs[2].properties[2].fieldData[0].value == '颜色填充') {
			circolor = [[1,attrs[2].properties[2].fieldData[0].fieldData[0].value]]
		} else {
			let num = attrs[2].properties[2].fieldData[0].fieldData[1].fieldData[2].value
			let lin1 = 0,
				lin2 = 0,
				lin3 = 0,
				lin4 = 0
			let off = ''
			if(num < 90) {
				lin3 = 1
				off = num / 90
			} else if(num < 180) {
				lin1 = 1
				off = num / 180
			} else if(num < 270) {
				lin2 = 1
				off = num / 270
			} else {
				lin4 = 1
				off = num / 360
			}
			let c1 = attrs[2].properties[2].fieldData[0].fieldData[1].fieldData[0].value
			let c2 = attrs[2].properties[2].fieldData[0].fieldData[1].fieldData[1].value
			let lincolor = new echarts.graphic.LinearGradient(lin1, lin2, lin3, lin4, [{
				offset: 0,
				color: c2
			}, {
				offset: off,
				color: c1
			}], false)
			circolor = [[1, lincolor]]
		}
		options.series[0].axisLine.lineStyle.color =circolor
		
		options.series[0].splitLine.show=attrs[2].properties[3].editable !== "2" ? true : false
		options.series[0].splitLine.length=attrs[2].properties[3].fieldData[0].value
		options.series[0].splitLine.lineStyle.width=attrs[2].properties[3].fieldData[1].value
		options.series[0].splitLine.lineStyle.color=attrs[2].properties[3].fieldData[2].value
		
		options.series[0].axisTick.show=attrs[2].properties[4].editable !== "2" ? true : false
		options.series[0].axisTick.splitNumber=attrs[2].properties[4].fieldData[0].value
		options.series[0].axisTick.length=attrs[2].properties[4].fieldData[1].value
		options.series[0].axisTick.lineStyle.color=attrs[2].properties[4].fieldData[2].value
	
		options.series[0].axisLabel.show=attrs[2].properties[5].editable !== "2" ? true : false
		options.series[0].axisLabel.fontSize=attrs[2].properties[5].fieldData[0].fieldData[0].value
		options.series[0].axisLabel.color=attrs[2].properties[5].fieldData[0].fieldData[1].value
		options.series[0].axisLabel.fontWeight=attrs[2].properties[5].fieldData[0].fieldData[2].value
		options.series[0].axisLabel.distance=attrs[2].properties[5].fieldData[1].value
		
		options.series[0].pointer.show=attrs[3].editable !== "2" ? true : false
		options.series[0].pointer.length=attrs[3].properties[0].value*100+'%'
		options.series[0].pointer.width=attrs[3].properties[1].value
		options.series[0].itemStyle.color=attrs[3].properties[2].value
		
		options.animation = attrs[4].editable != '2'
		options.animationDuration = attrs[4].properties[0].value
		options.animationDurationUpdate = attrs[4].properties[2].value
		options.animationEasing = attrs[4].properties[1].value
		options.animationDelayUpdate = attrs[4].properties[3].value 
		
		return options
	}
}