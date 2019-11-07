/**
 * 弧形柱图
 */
import arcBarOption from '@/defaults/options/barData/arcBarData.js'
import basicUtil from '@/components/setOption/basicUtil.js'

export default {
	setOption(attrs,arrData) {
		let options=arcBarOption
		
		options.polar.radius=attrs[1].properties[1].value*100+'%'
		options.series[0].barCategoryGap=attrs[1].properties[3].value
		let barNum=attrs[1].properties[2].value
		let xdata=arrData.xdata.slice(0,barNum)
		let ydata=arrData.ydata[0].slice(0,barNum)
		options.radiusAxis.data=[].concat(xdata).reverse()
		options.series[0].data=[].concat(ydata).reverse()
		
		let max = Math.max.apply(null,ydata)
		options.angleAxis.max=max * 360/attrs[1].properties[4].value
		options.radiusAxis.axisLabel.margin=attrs[1].properties[5].value
		options.radiusAxis.axisLabel.fontFamily=attrs[3].properties[0].value
		options.radiusAxis.axisLabel.fontSize=attrs[3].properties[1].value
		options.radiusAxis.axisLabel.color=attrs[3].properties[2].value
		options.radiusAxis.axisLabel.fontWeight=attrs[3].properties[3].value
		options.series[0].itemStyle.color.colorStops[0].color=attrs[2].properties[0].value
		options.series[0].itemStyle.color.colorStops[1].color=attrs[2].properties[1].value
		options.series[0].animation=attrs[4].editable != "2" ? true : false
		options.series[0].animationDuration=attrs[4].properties[0].value
		options.series[0].animationEasing=attrs[4].properties[1].value
		if(attrs[4].properties[2].fieldData[0].value){
			options.series[0].animationDelay=function (idx) {
			    return idx * 100;
			}
		}else{
			options.series[0].animationDelay=0
		}
		options.series[0].animationDurationUpdate=attrs[4].properties[3].value
		
		return options
	}
}