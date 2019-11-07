import commonUtil from '@/publicService/commonUtls.js'
import chartOptions from '@/defaults/options/progressJson.js'
let echarts = require('echarts/lib/echarts')
export default {
	setOption(attrs,xdata) {
		let chartOption = chartOptions
		//全局样式
		chartOption.textStyle.fontFamily = attrs[1].properties[0].value
		chartOption.grid.left = attrs[1].properties[1].value
		chartOption.grid.right = attrs[1].properties[1].value
		let count=attrs[4].value
		//提示框
		let data1=xdata[0]/count
		let data2=[],data3=[]
		data2.push(data1)
		chartOption.series[0].data=data2
		let isShowTrue=attrs[2].properties[3].fieldData[0].value //是否显示真实值
		let isHideBorder=attrs[2].properties[5].fieldData[0].value // 边框隐藏
		let isShowPoint=attrs[2].properties[6].fieldData[0].fieldData[0].value // 是否显示小数点
		if(isHideBorder){
			chartOption.series[0].markPoint.itemStyle.color='transparent'
		}else{
			chartOption.series[0].markPoint.itemStyle.color=''
		}
		chartOption.series[0].markPoint.label.normal.formatter=function(params){ // label值
			if(isShowTrue){ // 显示真实值
				return xdata[0]+attrs[2].properties[4].value
			}else{
				if(isShowPoint){ // 显示小数点
					let num=commonUtil.judgeString(attrs[2].properties[6].fieldData[1].value)+2
					let dd=parseFloat(xdata[0]/count).toFixed(num)
					return commonUtil.mulFloat(dd,100)+'%'
				}else{
					return parseInt(xdata[0]/count*100)+'%'
				}
			}
		}
		let height=attrs[0].properties[0].fieldData[1].value
		let symbolSize=attrs[2].properties[0].value*4
		let offsize=(height-symbolSize-15)/2
		chartOption.series[0].markPoint.symbolSize=symbolSize
		chartOption.series[0].markPoint.label.normal.textStyle.fontSize=attrs[2].properties[0].value
		chartOption.series[0].markPoint.label.normal.textStyle.color=attrs[2].properties[1].value
		chartOption.series[0].markPoint.label.normal.textStyle.fontWeight=attrs[2].properties[2].value
		chartOption.series[0].barWidth=height-symbolSize-15
		chartOption.series[1].barWidth=height-symbolSize-11
		//提示框底部间距
		chartOption.grid.height = height-symbolSize
		let bottom=-offsize-attrs[1].properties[2].value
		chartOption.series[0].markPoint.symbolOffset=[0,bottom]
		let bargap=-commonUtil.mulFloat(commonUtil.addFloat(parseFloat(1/chartOption.series[0].barWidth).toFixed(3),1),100)+'%'
		chartOption.series[1].barGap=bargap  // 柱间间隔
		//百分比条
		let changeType=attrs[3].properties[0].value
		let startColor=attrs[3].properties[1].value
		let endColor=attrs[3].properties[2].value
		let off=1
		if(changeType=='局部渐变'){
			off=data1
		}
		chartOption.series[0].itemStyle.normal.color =new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
					offset: 0,
					color: startColor
				}, {
					offset: off,
					color: endColor
				}])
		if(attrs[3].properties[4].fieldData[0].value){ // 进度条边框是否隐藏
			chartOption.series[1].itemStyle.borderColor='transparent'
		}else{
			chartOption.series[1].itemStyle.borderColor='grey'
		}
		return chartOption
	}
}