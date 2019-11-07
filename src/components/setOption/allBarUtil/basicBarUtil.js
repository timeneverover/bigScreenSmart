import verticalOption, {
	option1,
	option2,
	option3,
	serBar,
	bgBar
} from '@/defaults/options/barData/verticalBasicBarData.js'
import basicUtil from '@/components/setOption/basicUtil.js'
export default {
	setOption(attrs, barType, datas,series0, arrID, arr, mapped) {
		let options = verticalOption
		let axixData=datas.xdata
		let xoption = JSON.parse(JSON.stringify(option2)),
			yoption = JSON.parse(JSON.stringify(option1)),
			xdata = '',
			ydata = ''
		let bgBarColor = '',
			outerFreamColor = '',
			innerFreamColor = '',
			interSpace = '',
			outerFreamWidth = '',
			borderRadius = '',
			borderRadius1 = ''
		let axixLength = axixData.length
		let axixPadding = '',
			axixWidth = ''
			///////动态获取borderRadius,柱宽/////////
		let a = attrs[1].properties[1].fieldData[0].value;
		let serBgWidth = (1 - a) * 100
		let serBarWidth = (1 - a) * 100
		if(barType === 'level' || barType == 'lcapsule') {
			xdata = attrs[2]
			ydata = attrs[3]
			axixWidth = parseInt(attrs[0].properties[0].fieldData[1].value)
			axixPadding = parseInt(attrs[1].properties[2].fieldData[0].value) + parseInt(attrs[1].properties[2].fieldData[1].value)
		} else if(barType === 'vertical' || barType == 'vcapsule') {
			xdata = attrs[3]
			ydata = attrs[2]
			axixWidth = attrs[0].properties[0].fieldData[0].value
			axixPadding = parseInt(attrs[1].properties[2].fieldData[0].value) + parseInt(attrs[1].properties[2].fieldData[1].value)
		}
		if(barType === 'level' || barType == 'vertical') {
			bgBarColor = attrs[1].properties[1].fieldData[2].value
			outerFreamColor = 'transparent'
			innerFreamColor = 'transparent'
			interSpace = 0
			outerFreamWidth = 0
			borderRadius = 0
			borderRadius1 = 0
		} else if(barType === 'lcapsule' || barType == 'vcapsule') {
			bgBarColor = 'transparent'
			outerFreamColor = attrs[1].properties[1].fieldData[3].value
			innerFreamColor = attrs[1].properties[1].fieldData[5].value
			interSpace = attrs[1].properties[1].fieldData[2].value
			outerFreamWidth = attrs[1].properties[1].fieldData[4].value
			serBgWidth = (1 - a) * 100 + parseInt(interSpace)
			borderRadius = parseInt(((axixWidth - axixPadding) / axixLength) * serBarWidth / 200)
			borderRadius1 = parseInt(((axixWidth - axixPadding) / axixLength) * serBgWidth / 200)
		}
		//////////将data转为name,value对象类型，如果一组中不是每一项都有数据，为其赋值为空，防止其位置错位///////////
		let lenArr = [],arrData = []
		let len1 = datas.rData.length
		let len3 = datas.xdata.length
		let xmapped='',ymapped=''
		xmapped=mapped[0].value==''?mapped[0].name:mapped[0].value
		ymapped=mapped[1].value==''?mapped[1].name:mapped[1].value
		for(let i = 0; i < len1; i++) {
			let len2 = datas.rData[i].length
			let arr2 = []
			for(let j = 0; j < len3; j++) {
				let item = {},
					flag = false
				item.name = datas.xdata[j]
				for(let k = 0; k < len2; k++) {
					if(datas.rData[i][k][xmapped] == datas.xdata[j]) {
						item.value = datas.rData[i][k][ymapped]
						flag = true
						break
					}
				}
				if(!flag) {
					item.value = ''
				}
				arr2.push(item)
			}
			arrData.push(arr2)
		}
		/////////category轴每个轴对应的个数，用于在胶囊柱图中 最后一项添加borderRadius//////
		let len4 = arr.length
		let name = mapped[0].value == '' ? mapped[0].name : mapped[0].value
		for(let k = 0; k < len3; k++) {
			let count = 0
			for(let l = 0; l < len4; l++) {
				if(datas.xdata[k] == arr[l][name]) {
					count++
				}
			}
			lenArr.push(count)
		}
		options.textStyle.fontFamily = attrs[1].properties[0].value
		options.grid.top = attrs[1].properties[2].fieldData[0].value
		options.grid.bottom = attrs[1].properties[2].fieldData[1].value
		options.grid.left = attrs[1].properties[2].fieldData[2].value
		options.grid.right = attrs[1].properties[2].fieldData[3].value

		xoption.show = xdata.editable == "1" ? true : false

		xoption.axisLabel.fontSize = xdata.properties[0].fieldData[0].value; 
		xoption.nameTextStyle.fontSize = xdata.properties[0].fieldData[0].value; 

		xoption.axisLabel.color = xdata.properties[0].fieldData[1].value; 
		xoption.nameTextStyle.color = xdata.properties[0].fieldData[1].value; 

		xoption.axisLabel.fontWeight = xdata.properties[0].fieldData[2].value; 
		xoption.nameTextStyle.fontWeight = xdata.properties[0].fieldData[2].value; 

		xoption.axisLabel.show = xdata.properties[1].editable == "1" ? true : false
		
		xoption.max = xdata.properties[1].fieldData[0].value == "数据最大值"?'dataMax':null
		xoption.splitNumber = xdata.properties[1].fieldData[1].value;
		xoption.axisLabel.formatter = basicUtil.getFormatMethod(xdata.properties[1].fieldData[2].value)
			if(xdata.properties[1].fieldData[3].value == "水平") {
			xoption.axisLabel.rotate = 0;
		} else if(xdata.properties[1].fieldData[3].value== "垂直") {
			xoption.axisLabel.rotate = 90;
		} else {
			xoption.axisLabel.rotate = 45;
		}
		xoption.name=xdata.properties[2].editable == "1"?xdata.properties[2].fieldData[0].value:''
		xoption.axisLine.show = xdata.properties[3].editable == "1"?true:false
		xoption.splitLine.show = xdata.properties[4].editable == "1"?true:false
		xoption.axisTick.show = xdata.properties[3].editable == "1" ? true : false
		xoption.axisLine.lineStyle.color = xdata.properties[3].fieldData[0].value;
		xoption.axisTick.lineStyle.color = xdata.properties[3].fieldData[0].value;
		xoption.splitLine.lineStyle.color = xdata.properties[4].fieldData[0].value;

		//y轴
		yoption.show = ydata.editable == "1"?true:false
		yoption.axisLabel.show = ydata.properties[1].editable == "1"?true:false
		yoption.axisLine.show=ydata.properties[2].editable == "1"?true:false
		yoption.splitLine.show = ydata.properties[3].editable == "1"?true:false
		yoption.axisLabel.fontSize = ydata.properties[0].fieldData[0].value; 
		yoption.axisLabel.color = ydata.properties[0].fieldData[1].value;
		yoption.axisLabel.fontWeight = ydata.properties[0].fieldData[2].value;
		if(ydata.properties[1].fieldData[0].value == "水平") {
			yoption.axisLabel.rotate = 0;
		} else if(ydata.properties[1].fieldData[0].value == "垂直") {
			yoption.axisLabel.rotate = 90;
		} else {
			yoption.axisLabel.rotate = 45;
		}
		yoption.axisLine.lineStyle.color = ydata.properties[2].fieldData[0].value;
		yoption.splitLine.lineStyle.color = ydata.properties[3].fieldData[0].value;
		
		let legendeditable = attrs[4].editable == "1"?true:false
		let tooltipeditable = attrs[5].editable == "1"?true:false
		options.legend=basicUtil.getLegend(attrs[4].properties, legendeditable)
		options.tooltip = basicUtil.getTooltip(attrs[5].properties, tooltipeditable, '柱图')
		if(options.tooltip.trigger=='item'){
				options.tooltip.formatter=function(params){
				if(params.componentIndex !== 0){
					return params.seriesName+'<br>'+params.marker+params.name+"："+params.value
				}
			}
		}else{
				options.tooltip.formatter=function(params){
				let len=params.length
				let item=''
				for(let i=0;i<len;i++){
					if(item==''){
						item=params[i].name
					}
					if(params[i].value!=''){
						item+='<br>'+params[i].marker+params[i].seriesName+"："+params[i].value
					}
				}
				return item
			}
		}
	
		options.series = []
		options.series.push(JSON.parse(JSON.stringify(bgBar)))
		options.series[0].barWidth = serBgWidth + '%'
		options.series[0].itemStyle.normal.color = bgBarColor;
		options.series[0].itemStyle.normal.borderColor = outerFreamColor
		options.series[0].itemStyle.normal.borderWidth = outerFreamWidth
		options.series[0].itemStyle.normal.barBorderRadius = borderRadius1
		options.series[0].data =series0
		let biao = attrs[1].properties[3].editable == '2' ? false : true;
		let position = attrs[1].properties[3].fieldData[1].value;
		let posValue = 'inside'
		if(position == "中间") {
			posValue = 'inside'
		} else if(position == "左侧") {
			posValue = 'insideLeft'
		} else if(position == "右侧") {
			posValue = 'insideRight'
		} else if(position == "右侧外部") {
			posValue = 'right'
		} else if(position == "顶部") {
			posValue = 'insideTop'
		} else if(position == "底部") {
			posValue = 'insideBottom'
		}
		//系列数据
		let dataLen = arrData.length
		let seriesNum = attrs[6].properties.length;
		let actuLen = dataLen > seriesNum ? seriesNum : dataLen
		let boradius1 = '',boradius2 = ''
		if(barType === 'lcapsule') {
			boradius1 = [0, borderRadius, borderRadius, 0]
			boradius2 = [borderRadius, 0, 0, borderRadius]
		} else if(barType === 'vcapsule') {
			boradius1 = [borderRadius, borderRadius, 0, 0]
			boradius2 = [0, 0, borderRadius, borderRadius]
		} else {
			boradius1 = 0
			boradius2 = 0
		}
		for(let n = 0; n < actuLen; n++) {
			var sitem = JSON.parse(JSON.stringify(serBar))
			sitem.data = arrData[n]
			sitem.stack = arrID
			sitem.barWidth = serBarWidth + '%'
			sitem.label.position = posValue;
			sitem.label.fontSize = attrs[1].properties[3].fieldData[0].fieldData[0].value;
			sitem.label.color = attrs[1].properties[3].fieldData[0].fieldData[1].value;
			sitem.label.fontWeight = attrs[1].properties[3].fieldData[0].fieldData[2].value;
			sitem.label.show = biao;
			if(n == (actuLen - 1)) {
				sitem.itemStyle.barBorderRadius = boradius1
			} else if(n === 0) {
				sitem.itemStyle.barBorderRadius = boradius2
			}
			if(barType == 'lcapsule' || barType === 'vcapsule') {
				if(actuLen == 1) {
					sitem.itemStyle.barBorderRadius = borderRadius
				}
				let index = n + 1
				for(let i = 0; i < len3; i++) {
					sitem.data[i].itemStyle = {}
					if(lenArr[i] == 1) {
						sitem.data[i].itemStyle.barBorderRadius = borderRadius
					} else if(index == lenArr[i]) {
						sitem.data[i].itemStyle.barBorderRadius = boradius1
					}
				}
			}
			sitem.itemStyle.borderColor = innerFreamColor
			sitem.name = attrs[6].properties[n].fieldData[0].value;
			sitem.itemStyle.color=basicUtil.setColor(attrs[6].properties[n].fieldData[1])
			options.series.push(JSON.parse(JSON.stringify(sitem)))
		}
		//动画
		options.animation = attrs[7].editable != '2'
		options.animationDuration = attrs[7].properties[0].value;
		options.animationEasing = attrs[7].properties[1].value;
		options.animationDurationUpdate = attrs[7].properties[2].value;

		options.xAxis = []
		options.yAxis = []
		if(barType === 'level') {
			options.xAxis.push(xoption)
			options.yAxis.push(yoption)
			options.series[0].yAxisIndex = 0
			options.series[0].xAxisIndex = 0
			options.yAxis[0].data = axixData;
		} else if(barType === 'vertical') {
			options.xAxis.push(yoption)
			options.yAxis.push(xoption)
			options.series[0].yAxisIndex = 0
			options.series[0].xAxisIndex = 0
			options.xAxis[0].data = axixData;
		} else if(barType === 'lcapsule') {
			options.xAxis.push(xoption)
			options.yAxis.push(yoption)
			options.yAxis.push(option3)
			options.series[0].yAxisIndex = 1
			options.series[0].xAxisIndex = 0
			options.yAxis[0].data = axixData;
		} else if(barType === 'vcapsule') {
			options.xAxis.push(yoption)
			options.yAxis.push(xoption)
			options.xAxis.push(option3)
			options.series[0].yAxisIndex = 0
			options.series[0].xAxisIndex = 1
			options.xAxis[0].data = axixData;
		}
		console.log(JSON.stringify(options))
		console.log(JSON.stringify(datas))
		return options
	}
}