import doublChartOption, {yoption,soption} from '@/defaults/options/doublChartData.js'
import basicUtil from '@/components/setOption/basicUtil.js'
import commonUtil from '@/publicService/commonUtls.js'
let echarts = require('echarts/lib/echarts')
export default {
	setOption(attrs, arrData) {
		let chartOption = doublChartOption
		let xdata=arrData.xdata
		let newData=[]
		newData.push(arrData.ydata[0])
		newData.push(arrData.zdata[0])

		let attrData2 = basicUtil.getAttrArr(attrs)
		chartOption.tooltip = basicUtil.getTooltip(attrData2.tooltip, attrData2.tooltipeditable, '柱图')
		chartOption.legend = JSON.parse(JSON.stringify(basicUtil.getLegend(attrData2.legend, attrData2.legendeditable)))

		//动画
		chartOption.animation = attrs[9].editable != '2'
		chartOption.animationDuration = attrs[9].properties[0].value
		chartOption.animationDurationUpdate = attrs[9].properties[2].value
		chartOption.animationEasing = attrs[9].properties[1].value
		chartOption.animationDelayUpdate = attrs[9].properties[3].value //?从之前位置开始
		//全局样式
		chartOption.grid.top = attrs[1].properties[1].fieldData[0].value
		chartOption.grid.bottom = attrs[1].properties[1].fieldData[1].value
		chartOption.grid.left = attrs[1].properties[1].fieldData[2].value
		chartOption.grid.right = attrs[1].properties[1].fieldData[3].value
		chartOption.textStyle.fontFamily = attrs[1].properties[0].value
		//x轴文本
		chartOption.xAxis.axisLabel.fontWeight = attrs[2].properties[0].fieldData[2].value
		chartOption.xAxis.axisLabel.color = attrs[2].properties[0].fieldData[1].value
		chartOption.xAxis.axisLabel.fontSize = attrs[2].properties[0].fieldData[0].value
		//x轴标签
		let xtype = attrs[2].properties[1].fieldData[0].value //数据种类
		let status = true
		let tt = ''
		let geshi = attrs[2].properties[1].fieldData[4].value
		if(xtype == '类目型') {
			chartOption.xAxis.axisLabel.formatter=null
			chartOption.xAxis.boundaryGap = false
			chartOption.xAxis.max = null
			chartOption.xAxis.min = null
			chartOption.xAxis.name=''
		} else {
			if(xtype == '时间型') {
				tt = attrs[2].properties[1].fieldData[3].value //数据格式
				if(xdata.length>0){
					status = this.setDataType(tt, xdata[0])
				}
			}
			let this_ = this
			chartOption.xAxis.axisLabel.formatter = function(value, index) {
				if(xtype == '时间型' && !status) {
					return 0
				} else {
					return this_.getLabel(geshi, tt, value, xtype)
				}
			}
			let isLiubai = attrs[2].properties[1].fieldData[5].fieldData[0].value
			if(isLiubai) { // 留白
				chartOption.xAxis.boundaryGap = true
			} else {
				chartOption.xAxis.boundaryGap = false
			}
			if(attrs[2].properties[1].fieldData[7].value != 'auto') {
				if(attrs[2].properties[1].fieldData[7].value == '') {
					chartOption.xAxis.max = null
				} else {
					chartOption.xAxis.max =attrs[2].properties[1].fieldData[7].value
				}
			} else {
				chartOption.xAxis.max = null
			}
			if(attrs[2].properties[1].fieldData[8].value != 'auto') {
				if(attrs[2].properties[1].fieldData[8].value == '') {
					chartOption.xAxis.min = null
				} else {
					chartOption.xAxis.min =attrs[2].properties[1].fieldData[8].value
				}
			} else {
				chartOption.xAxis.min = null
			}

			chartOption.xAxis.name = attrs[2].properties[1].fieldData[9].value
		}
		let num = parseInt(attrs[2].properties[1].fieldData[10].value)
		let allNum = xdata.length
		chartOption.xAxis.axisLabel.interval = parseInt(allNum / num - 1)
//		chartOption.xAxis.splitNumber = attrs[2].properties[1].fieldData[10].value // 分隔数量
		let xrotate = attrs[2].properties[1].fieldData[11].value
		if(xrotate == '水平' || xrotate == '') {
			chartOption.xAxis.axisLabel.rotate = 0
		} else if(xrotate == '斜角') {
			chartOption.xAxis.axisLabel.rotate = 315
		} else if(xrotate == '垂直') {
			chartOption.xAxis.axisLabel.rotate = 270
		}
		chartOption.xAxis.data = [].concat(xdata)
		//x轴线
		chartOption.xAxis.axisLine.lineStyle.color = attrs[2].properties[2].fieldData[0].value
		//x网格线
		chartOption.xAxis.splitLine.lineStyle.color = attrs[2].properties[3].fieldData[0].value
		chartOption.xAxis.show = attrs[2].editable != '2' ? true : false
		chartOption.xAxis.axisLabel.show = attrs[2].properties[1].editable != '2' ? true : false //x轴标签
		chartOption.xAxis.axisLine.show = attrs[2].properties[2].editable != '2' ? true : false //x轴线
		chartOption.xAxis.splitLine.show = attrs[2].properties[3].editable != '2' ? true : false //x网格线

		chartOption.yAxis=[]
		chartOption.series=[]
		for(let k=0;k<2;k++){
			let eoption=JSON.parse(JSON.stringify(yoption))  // y轴
			let eoption2=JSON.parse(JSON.stringify(soption))  // 数据系列轴
			eoption.show=attrs[k+3].editable != '2' ? true : false
			eoption.name = attrs[k+3].properties[2].fieldData[0].value
			eoption.axisLabel.show = attrs[k+3].properties[1].editable != '2' ? true : false //y轴标签
		    eoption.axisLine.show = attrs[k+3].properties[3].editable != '2' ? true : false //y轴线
		    eoption.splitLine.show = attrs[k+3].properties[4].editable != '2' ? true : false //y网格线
			eoption.axisLabel.fontWeight = attrs[k+3].properties[0].fieldData[2].value
			eoption.axisLabel.color = attrs[k+3].properties[0].fieldData[1].value
			eoption.axisLabel.fontSize = attrs[k+3].properties[0].fieldData[0].value
			eoption.nameTextStyle.fontWeight = attrs[k+3].properties[0].fieldData[2].value
			eoption.nameTextStyle.color = attrs[k+3].properties[0].fieldData[1].value
			eoption.nameTextStyle.fontSize = attrs[k+3].properties[0].fieldData[0].value
			let ymin = attrs[k+3].properties[1].fieldData[0].value
			let ymax = attrs[k+3].properties[1].fieldData[1].value
			if(ymin == 0 || ymin == '自动取整') { //最小值
				eoption.min = null
			} else if(ymin == '数据最小值') {
				eoption.min = 'dataMin'
			}
			if(ymax == '自动取整') { //最大值
				eoption.max = null
			} else if(ymax == '数据最大值') {
				eoption.max = 'dataMax'
			}
			eoption.splitNumber = parseInt(attrs[k+3].properties[1].fieldData[2].value) // 分隔数量
			eoption.axisLabel.formatter =  basicUtil.getFormatMethod(attrs[k+3].properties[1].fieldData[3].value)
			let yrotate = attrs[k+3].properties[1].fieldData[4].value // 角度
			if(yrotate == '水平' || yrotate == '') {
				eoption.axisLabel.rotate = 0
			} else if(yrotate == '斜角') {
				eoption.axisLabel.rotate = 315
			} else if(yrotate == '垂直') {
				eoption.axisLabel.rotate = 270
			}
			eoption.axisLine.lineStyle.color = attrs[k+3].properties[3].fieldData[0].value
			eoption.splitLine.lineStyle.color = attrs[k+3].properties[4].fieldData[0].value

			eoption2.name = attrs[k+7].properties[0].value // 系列名称

			eoption2.connectNulls = attrs[1].properties[2].fieldData[0].value // 空值数据
			//圆点
			eoption2.itemStyle.color = attrs[k+7].properties[2].fieldData[0].value
			eoption2.symbolSize = attrs[k+7].properties[2].fieldData[1].value * 2
			//折线
			eoption2.lineStyle.color = attrs[k+7].properties[1].fieldData[0].value
			eoption2.lineStyle.type = attrs[k+7].properties[1].fieldData[1].value == '实线' ? 'solid' : 'dotted'
			eoption2.lineStyle.width = attrs[k+7].properties[1].fieldData[2].value
			eoption2.smooth = attrs[k+7].properties[1].fieldData[3].fieldData[0].value
			console.log(k+' smoth:'+attrs[k+7].properties[1].fieldData[3].fieldData[0].value)
			//标签
			eoption2.label.show = attrs[k+7].properties[4].editable != '2' ? true : false
			eoption2.label.color = attrs[k+7].properties[4].fieldData[1].value
			eoption2.label.fontSize = attrs[k+7].properties[4].fieldData[0].value
			eoption2.label.fontWeight = attrs[k+7].properties[4].fieldData[2].value

			let isSymbolShow = attrs[k+7].properties[2].editable != '2' ? true : false
			let isAreaShow = attrs[k+7].properties[3].editable != '2' ? true : false
			if(isSymbolShow) {
				eoption2.showSymbol = true
			} else {
				eoption2.showSymbol = false
			}
			if(isAreaShow) {
				let seitype = attrs[k+7].properties[3].fieldData[0].value
				if(seitype == '颜色填充') {
					eoption2.areaStyle.color = attrs[k+7].properties[3].fieldData[0].fieldData[0].value
				} else {
					let num = attrs[k+7].properties[3].fieldData[0].fieldData[1].fieldData[2].value
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
					let c1 = attrs[k+7].properties[3].fieldData[0].fieldData[1].fieldData[0].value
					let c2 = attrs[k+7].properties[3].fieldData[0].fieldData[1].fieldData[1].value
					let lincolor = new echarts.graphic.LinearGradient(lin1, lin2, lin3, lin4, [{
						offset: 0,
						color: c1
					}, {
						offset: off,
						color: c2
					}], false)
					eoption2.areaStyle.color = lincolor
				}
			} else {
				eoption2.areaStyle.color = 'transparent'
			}
			eoption2.data=newData[k]
			eoption2.yAxisIndex=k
			chartOption.yAxis.push(eoption)
			chartOption.series.push(eoption2)
		}
//		console.log(JSON.stringify(chartOption))
		return chartOption

	},
	getLabel(geshi, dataType, value, xtype) { // 显示格式
		if(geshi == '11(整数)') {
			return parseInt(value)
		} else if(geshi == '11.1(浮点数)') {
			return parseFloat(value).toFixed(1)
		} else if(geshi == '11.11(浮点数)') {
			return parseFloat(value).toFixed(2)
		} else {
			//					console.log('time chuo:' + commonUtil.DateToUnix(value))
			if(xtype == '数值型') {
				return 0
			} else {
				let data = this.setDataByType(value, dataType)
				//					console.log('x label:' + JSON.stringify(data))
				if(geshi == '2016年') {
					return data[0] + '年'
				} else if(geshi == '2016(年份)') {
					return data[0]
				} else if(geshi == '01月01日') {
					return data[1] + '月' + data[2] + '日'
				} else if(geshi == '01/01(月/日)') {
					return data[1] + '/' + data[2]
				} else if(geshi == '02:30:00') {
					return data[3] + ':' + data[4] + ':' + data[5]
				} else if(geshi == '02:30(时:分)') {
					return data[3] + ':' + data[4]
				} else if(geshi == '1月') {
					return data[1] + '月'
				} else if(geshi == '2日') {
					return data[2] + '日'
				} else if(geshi == '02h') {
					return data[3] + 'h'
				} else if(geshi == '02(时)') {
					return data[3]
				} else if(geshi == '01-01') {
					return data[1] + '-' + data[2]
				} else if(geshi == '01.01') {
					return data[1] + '.' + data[2]
				}
			}
		}
	},
	setDataByType(value, tt) {
		let arr = []
		//console.log('value:'+value);
		if(tt == '2016') {
			arr = commonUtil.DateToArr(value, 'year')
		} else if(tt == '02') {
			arr = commonUtil.DateToArr(value, 'hour')
		} else if(tt == '01/01' || tt == '01-01' || tt == '01.01') {
			arr = commonUtil.DateToArr(value, 'month')
		} else {
			arr = commonUtil.DateToArr(value, 'normal')
		}
		//console.log('vv:'+arr)
		return arr
	},
	setDataType(value, data) {
		//时间型，先判断数据格式是否一样，若一样
		let len1 = '',
			len2 = ''
		let flag = true
//		len1 = value.split(' ').length
//		len2 = data.split(' ').length
		if(value.indexOf(' ') > -1) {
			len1 = value.split(' ').length
			len2 = data.split(' ').length
		}else{
			len1 =0
			len2 =0
		}
		/*if(data.indexOf(' ') > -1) {
			len2 = data.split(' ').length
		}else{
			len2 =0
		}*/
		if(len1 == len2) {
			let len3 = '',
				len4 = '',
				len5 = '',
				len6 = ''

			if(value.indexOf('/') > -1) { // 含有年月日
				len3 = value.split('/').length
				len4 = data.split('/').length
			} else if(value.indexOf('.') > -1) {
				len3 = value.split('.').length
				len4 = data.split('.').length
			} else if(value.indexOf('-') > -1) {
				len3 = value.split('-').length
				len4 = data.split('-').length
			}
			if(value.indexOf(':') > -1) {
				len5 = value.split(':').length
				len6 = data.split(':').length
			}
			//					console.log('len3:' + len3 + ' len4:' + len4 + ' len5:' + len5 + ' len6:' + len6)
			if(len3 != len4 || len5 != len6) {
				return false
			} else {
				return true
			}
		} else { // 格式不等
			return false
		}

	}
}
