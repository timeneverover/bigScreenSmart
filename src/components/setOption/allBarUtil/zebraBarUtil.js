/**
 * 斑马柱图
 */
//import zebraOption from '@/defaults/options/barData/zebraBarData.js'
import zebraOption,{axix1,axix2} from '@/defaults/options/barData/zebraLevelBarData.js'
import basicUtil from '@/components/setOption/basicUtil.js'

export default {
  setOption(attrStyle,type) {
    let options = zebraOption
    let attrs = basicUtil.getAttrArr(attrStyle)
    let globalStyle = attrs.globalStyle
    let legend = attrs.legend,
      tooltip = attrs.tooltip,
      serData = attrs.serdata,
      andata = attrs.animate,
      legendeditable=attrs.legendeditable,
      tooltipeditable=attrs.tooltipeditable,
      animateeditable=attrs.animateeditable
	options.tooltip=basicUtil.getTooltip(tooltip,tooltipeditable,'柱图')
	options.legend=basicUtil.getLegend(legend,legendeditable)
	
    options.textStyle.fontFamily = globalStyle[0].value
    options.grid.top = globalStyle[2].fieldData[0].value
    options.grid.bottom = globalStyle[2].fieldData[1].value
    options.grid.left = globalStyle[2].fieldData[2].value
    options.grid.right = globalStyle[2].fieldData[3].value
    let xdata='',ydata='',xeditable='',yeditable=''
	if(type=='vertical'){
      xdata = attrs.x
      ydata = attrs.y
      xeditable=attrs.xeditable
      yeditable=attrs.yeditable
	}else{
		 xdata = attrs.y
      	ydata = attrs.x
      	xeditable=attrs.yeditable
      yeditable=attrs.xeditable
	}
    axix2.show = yeditable != "2" ? true : false

    axix2.nameTextStyle.fontSize = ydata[0].fieldData[0].value;
    axix2.nameTextStyle.color = ydata[0].fieldData[1].value;
    axix2.nameTextStyle.fontWeight = ydata[0].fieldData[2].value;

    axix2.axisLabel.fontSize = ydata[0].fieldData[0].value;
    axix2.axisLabel.color = ydata[0].fieldData[1].value;
    axix2.axisLabel.fontWeight = ydata[0].fieldData[2].value;

    axix2.axisLabel.show = ydata[1].editable != "2" ? true : false
    let ymin = ydata[1].fieldData[0].value
    let ymax = ydata[1].fieldData[1].value
    if (ymin == 0){
    	axix2.min = 0
    } else if(ymin == '自动取整') { //最小值
      axix2.min = null
    } else if (ymin == '数据最小值') {
      axix2.min = 'dataMin'
    }
    if (ymax == '自动取整') { //最大值
      axix2.max = null
    } else if (ymax == '数据最大值') {
      axix2.max = 'dataMax'
    }
    axix2.splitNumber = parseInt(ydata[1].fieldData[2].value);
    let formatters = ydata[1].fieldData[3].value
    axix2.axisLabel.formatter = basicUtil.getFormatMethod(formatters)

    axix2.name =ydata[2].editable != "2" ? ydata[2].fieldData[0].value:'';
    axix2.axisLine.show = ydata[3].editable != "2" ? true : false
    axix2.axisLine.lineStyle.color = ydata[3].fieldData[0].value;
    axix2.splitLine.show = ydata[4].editable != "2" ? true : false
    axix2.splitLine.lineStyle.color = ydata[4].fieldData[0].value;

    axix1.show = xeditable != "2" ? true : false
    axix1.axisLabel.fontSize = xdata[0].fieldData[0].value; //轴文本
    axix1.axisLabel.color = xdata[0].fieldData[1].value;
    axix1.axisLabel.fontWeight = xdata[0].fieldData[2].value;
    axix1.axisLabel.show = xdata[1].editable != "2" ? true : false
    if (xdata[1].fieldData[0].value == "水平") {
      axix1.axisLabel.rotate = 0;
    } else if (xdata[1].fieldData[0].value == "垂直") {
      axix1.axisLabel.rotate = 90;
    } else {
      axix1.axisLabel.rotate = 45;
    }
    axix1.splitNumber = parseInt(xdata[1].fieldData[1].value);
    axix1.axisLine.show = xdata[2].editable != "2" ? true : false
    axix1.axisLine.lineStyle.color = xdata[2].fieldData[0].value;
    axix1.splitLine.show = xdata[3].editable != "2" ? true : false
    axix1.splitLine.lineStyle.color = xdata[3].fieldData[0].value;

	let labelPosition='top',symbolSize=[],symbolRepeat=true
	if(type=='vertical'){
		options.xAxis=JSON.parse(JSON.stringify(axix1))
		options.yAxis=JSON.parse(JSON.stringify(axix2))
		symbolSize=['100%',globalStyle[1].fieldData[2].value]
	}else{
		options.xAxis=JSON.parse(JSON.stringify(axix2))
		options.yAxis=JSON.parse(JSON.stringify(axix1))
		labelPosition='right'
		symbolSize=[globalStyle[1].fieldData[2].value,'100%']
		if(globalStyle[3].fieldData[3].value=='居右'){
			symbolRepeat=true
		}else{
			symbolRepeat='fixed'
		}
	}
	let slen=serData.length
	let iii=options.series[0]
	options.series=[]
	for(let i=0;i<slen;i++){
		let item=JSON.parse(JSON.stringify(iii))
		item.barCategoryGap= globalStyle[1].fieldData[0].value*100+'%'
		item.label.normal.show= globalStyle[3].editable != "2" ? true : false
		item.label.normal.position= labelPosition
		item.label.normal.textStyle.fontSize= globalStyle[3].fieldData[0].value
		item.label.normal.textStyle.color= globalStyle[3].fieldData[1].value
		item.label.normal.textStyle.fontWeight= globalStyle[3].fieldData[2].value
		item.symbolSize= symbolSize
		item.symbolRepeat= symbolRepeat
		item.symbolMargin= globalStyle[1].fieldData[3].value
		item.name=serData[i].fieldData[0].value
		item.itemStyle.color=serData[i].fieldData[1].value
		options.series.push(item)
	}
	options.animation=animateeditable!= "2" ? true : false
	options.animationDuration=andata[0].value
	options.animationEasing=andata[1].value
	options.animationDurationUpdate=andata[2].value
	
	
	return options
	
  }
}
