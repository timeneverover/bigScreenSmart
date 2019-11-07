import chartbarOption, {
	serOption1,
	serOption2,
	serOption3
} from '@/defaults/options/barData/chartBarData.js'

import basicUtil from '@/components/setOption/basicUtil.js'
export default {
	setOption(attrStyle, arrData) {
		let options = chartbarOption
		let axixPadding = '',
			axixWidth = ''

		let attrs = basicUtil.getAttrArr(attrStyle)
		let globalStyle = attrs.globalStyle,
			xdata = attrs.x,
			ydata = attrs.y,
			ydata2 = attrs.y2,
			legend = attrs.legend,
			tooltip = attrs.tooltip,
			serData = attrs.serdata,
			andata = attrs.animate

		let legendeditable = attrs.legendeditable,
			tooltipeditable = attrs.tooltipeditable,
			animateeditable = attrs.animateeditable,
			xeditable = attrs.xeditable,
			yeditable = attrs.yeditable,
			yeditable2 = attrs.yeditable2

		options.xAxis.show = xeditable != "2" ? true : false
		options.yAxis[0].show = yeditable != "2" ? true : false
		options.yAxis[1].show = yeditable2 != "2" ? true : false
		options.legend.show = legendeditable != "2" ? true : false
		options.tooltip.show = tooltipeditable != "2" ? true : false
		//柱外间距
	/*	axixWidth = parseInt(attrStyle[0].properties[0].fieldData[0].value)
		axixPadding = parseInt(globalStyle[2].fieldData[2].value) + parseInt(globalStyle[2].fieldData[3].value)
		options.grid.width = (axixWidth - axixPadding) - (axixWidth - axixPadding) * globalStyle[1].fieldData[1].value / 5
		options.grid.height = 'auto'*/
		
		options.tooltip = basicUtil.getTooltip(tooltip, tooltipeditable, '柱图')
		options.legend = basicUtil.getLegend(legend, legendeditable)

		options.textStyle.fontFamily = globalStyle[0].value
		options.grid.top = globalStyle[2].fieldData[0].value
		options.grid.bottom = globalStyle[2].fieldData[1].value
		options.grid.left = globalStyle[2].fieldData[2].value
		options.grid.right = globalStyle[2].fieldData[3].value
		options.xAxis.axisLabel.show = xdata[1].editable != "2" ? true : false;
		options.xAxis.axisLine.show = xdata[2].editable != "2" ? true : false;
		options.xAxis.splitLine.show = xdata[3].editable != "2" ? true : false;

		options.xAxis.axisLabel.fontSize = xdata[0].fieldData[0].value; //轴文本
		options.xAxis.axisLabel.color = xdata[0].fieldData[1].value;
		options.xAxis.axisLabel.fontWeight = xdata[0].fieldData[2].value;

		if(xdata[1].fieldData[0].value == "水平") {
			options.xAxis.axisLabel.rotate = 0;
		} else if(xdata[1].fieldData[0].value == "垂直") {
			options.xAxis.axisLabel.rotate = 90;
		} else {
			options.xAxis.axisLabel.rotate = 45;
		}
		let num = parseInt(xdata[1].fieldData[1].value)
		let allNum = arrData.xdata.length
		options.xAxis.axisLabel.interval = parseInt(allNum / num - 1)
		options.xAxis.axisLine.lineStyle.color = xdata[2].fieldData[0].value;
		options.xAxis.splitLine.lineStyle.color = xdata[3].fieldData[0].value;
		options.xAxis.data=arrData.xdata
		for(let i = 0; i < 2; i++) {
			let yDatas = ''
			if(i == 0) {
				yDatas = ydata
			} else {
				yDatas = ydata2
			}
			options.yAxis[i].axisLabel.show = yDatas[1].editable == "1" ? true : false
			options.yAxis[i].name = yDatas[2].editable != "2" ? yDatas[2].fieldData[0].value : '';
			options.yAxis[i].axisLine.show = yDatas[3].editable != "2" ? true : false;
			options.yAxis[i].splitLine.show = yDatas[4].editable != "2" ? true : false;

			options.yAxis[i].axisLabel.fontSize = yDatas[0].fieldData[0].value; //轴文本字号
			options.yAxis[i].nameTextStyle.fontSize = yDatas[0].fieldData[0].value; //轴名称文本
			options.yAxis[i].axisLabel.color = yDatas[0].fieldData[1].value; //轴文本眼色
			options.yAxis[i].nameTextStyle.color = yDatas[0].fieldData[1].value; //轴名称文本
			options.yAxis[i].axisLabel.fontWeight = yDatas[0].fieldData[2].value; //轴文本粗细
			options.yAxis[i].nameTextStyle.fontWeight = yDatas[0].fieldData[2].value; //轴名称粗细
			let ymin = yDatas[1].fieldData[0].value
			let ymax = yDatas[1].fieldData[1].value
			if(ymin == 0) {
				options.yAxis[i].min = 0
			} else if(ymin == '自动取整') { //最小值
				options.yAxis[i].min = null
			} else if(ymin == '数据最小值') {
				options.yAxis[i].min = 'dataMin'
			}
			if(ymax == '自动取整') { //最大值
				options.yAxis[i].max = null
			} else if(ymax == '数据最大值') {
				options.yAxis[i].max = 'dataMax'
			}
			options.yAxis[i].splitNumber = yDatas[1].fieldData[2].value;
			options.yAxis[i].axisLabel.formatter = basicUtil.getFormatMethod(yDatas[1].fieldData[3].value)
			options.yAxis[i].axisLine.lineStyle.color = yDatas[3].fieldData[0].value;
			options.yAxis[i].splitLine.lineStyle.color = yDatas[4].fieldData[0].value;
		}

		let bgBarColor = globalStyle[1].fieldData[2].value // 柱子背景
		let betweenBarWidth = globalStyle[1].fieldData[0].value * 100 + '%'
		options.series = []
		let slen = serData.length
		let clen = arrData.stypes.length
		let serids = []
		let option1 = JSON.parse(JSON.stringify(serOption1))
		option1.itemStyle.color = bgBarColor
		option1.barCategoryGap = betweenBarWidth
		 let ynum=arrData.xdata.length
		let smax=0,sarrs=[]
		for(let k=0;k<clen;k++){
			let mmax=Math.max.apply(null, arrData.ydata[k])
			if(mmax>smax){
				smax=mmax
			}
		}
		for(let j=0;j<ynum;j++){
			sarrs.push(smax)
		}
		option1.data=[].concat(sarrs)
		options.series.push(option1)
		for(let i = 0; i< slen; i++) {
			let option2 = JSON.parse(JSON.stringify(serOption2))
			let option3 = JSON.parse(JSON.stringify(serOption3))
			let sname = getSersid(arrData.stypes, serData[i].fieldData[0].value, serids)
			console.log('sname:'+sname)
			option2.barCategoryGap = betweenBarWidth
			option2.name = serData[i].fieldData[1].fieldData[0].value
			option3.name = serData[i].fieldData[2].fieldData[0].value

			let barColorType = serData[i].fieldData[1].fieldData[1].value
			if(barColorType == "颜色填充") {
				option2.itemStyle.color = serData[i].fieldData[1].fieldData[1].fieldData[0].value
			} else {
				let c1 = serData[i].fieldData[1].fieldData[1].fieldData[1].fieldData[0].value
				let c2 = serData[i].fieldData[1].fieldData[1].fieldData[1].fieldData[1].value
				let rr = serData[i].fieldData[1].fieldData[1].fieldData[1].fieldData[2].value
				option2.itemStyle.color = setChartStyle(rr, c1, c2)
			}
			option2.label.show = serData[i].fieldData[1].fieldData[2].editable != '2' ? true : false
			option2.label.fontSize = serData[i].fieldData[1].fieldData[2].fieldData[0].value
			option2.label.color = serData[i].fieldData[1].fieldData[2].fieldData[1].value
			option2.label.fontWeight = serData[i].fieldData[1].fieldData[2].fieldData[2].value
			let pos = serData[i].fieldData[1].fieldData[2].fieldData[3].value
			if(pos == '中间') {
				pos = 'inside'
			} else if(pos == '顶部') {
				pos = 'top'
			} else if(pos == '底部') {
				pos = 'insideBottom'
			}
			option2.label.position = pos
			//折线
			option3.itemStyle.color = serData[i].fieldData[2].fieldData[1].value
			option3.lineStyle.color = serData[i].fieldData[2].fieldData[1].value
			option3.lineStyle.type = serData[i].fieldData[2].fieldData[2].value == '实线' ? 'solid' : 'dotted'
			option3.lineStyle.width = serData[i].fieldData[2].fieldData[3].value
			option3.smooth = serData[i].fieldData[2].fieldData[4].fieldData[0].value

			option3.showSymbol = serData[i].fieldData[2].fieldData[5].editable != '2' ? true : false
			option3.symbolSize = serData[i].fieldData[2].fieldData[5].fieldData[0].value
			option3.label.show = serData[i].fieldData[2].fieldData[6].editable != '2' ? true : false
			option3.label.fontSize = serData[i].fieldData[2].fieldData[6].fieldData[0].value
			option3.label.color = serData[i].fieldData[2].fieldData[6].fieldData[1].value
			option3.label.fontWeight = serData[i].fieldData[2].fieldData[6].fieldData[2].value

			if(sname == null) {
				option2.data = []
				option3.data = []
			} else {
				if(serData[i].fieldData[1].editable == '2') {
					option2.data = []
				}else{
					option2.data=arrData.ydata[sname]
				}
				if(serData[i].fieldData[2].editable == '2') {
					option3.data = []
				}else{
					option3.data=arrData.zdata[sname]
				}
				serids.push(sname)
			}
			options.series.push(option2)
			options.series.push(option3)
		}
		return options
	}
	
}
function getSersid(arrs, name, arrs2) {
		let len = arrs.length
		let len2=arrs2.length
		for(let i = 0; i < len; i++) {
			if(arrs[i] == name) {
				let flag=false
				for(let j=0;j<len2;j++){
					if(arrs2[j]==name){
						flag=true
						break
					}
				}
				if(flag){
					return null
				}else{
					return i
				}
			}
		}
		return null
	}
	function setChartStyle(rang, color1, color2) {
		let xVal = 0;
		let yVal = 0;
		if(rang >= 180) {
			yVal = 1
			xVal = (rang - 180) / 180;
		} else {
			xVal = 1
			yVal = rang / 180;
		}
		return {
			type: 'linear',
			x: 0,
			y: 0,
			x2: xVal,
			y2: yVal,
			colorStops: [{
				offset: 0,
				color: color1
			}, {
				offset: 1,
				color: color2
			}],
			globalCoord: false // 缺省为 false
		}
	}