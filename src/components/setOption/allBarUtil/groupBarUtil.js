import groupbarOption, {
	option1,
	option2,
	serBar
} from '@/defaults/options/barData/groupBarData.js'
import basicUtil from '@/components/setOption/basicUtil.js'
export default {
	setOption(attrStyle, barType, arrData) {
		let options = groupbarOption

		let xoption = JSON.parse(JSON.stringify(option2)),
			yoption = JSON.parse(JSON.stringify(option1)),
			xdata = '',
			ydata = '',
			xeditable = '',
			yeditable = ''
		let attrs = basicUtil.getAttrArr(attrStyle)
		let globalStyle = attrs.globalStyle
		let legend = attrs.legend,
			tooltip = attrs.tooltip,
			serData = attrs.serdata,
			andata = attrs.animate
		let legendeditable = attrs.legendeditable,
			tooltipeditable = attrs.tooltipeditable,
			animateeditable = attrs.animateeditable

		options.tooltip = basicUtil.getTooltip(tooltip, tooltipeditable, '柱图')
		options.legend = basicUtil.getLegend(legend, legendeditable)
		
		let axixPadding = '',axixWidth = ''
		if(barType == '水平分组柱图') {
			xdata = attrs.x
			ydata = attrs.y
			xeditable = attrs.xeditable
			yeditable = attrs.yeditable
			axixWidth=parseInt(attrStyle[0].properties[0].fieldData[1].value)
		    axixPadding = parseInt(globalStyle[2].fieldData[0].value) + parseInt(globalStyle[2].fieldData[1].value)
		    options.grid.height=(axixWidth-axixPadding)-(axixWidth-axixPadding)*globalStyle[1].fieldData[1].value/5
		    options.grid.width='auto'
		} else {
			xdata = attrs.y
			ydata = attrs.x
			xeditable = attrs.yeditable
			yeditable = attrs.xeditable
			axixWidth=parseInt(attrStyle[0].properties[0].fieldData[0].value)
			axixPadding = parseInt(globalStyle[2].fieldData[2].value) + parseInt(globalStyle[2].fieldData[3].value)
			options.grid.width=(axixWidth-axixPadding)-(axixWidth-axixPadding)*globalStyle[1].fieldData[1].value/5
		    options.grid.height='auto'
		}
		
		options.textStyle.fontFamily = globalStyle[0].value
		options.grid.top = globalStyle[2].fieldData[0].value
		options.grid.bottom = globalStyle[2].fieldData[1].value
		options.grid.left = globalStyle[2].fieldData[2].value
		options.grid.right = globalStyle[2].fieldData[3].value
		xoption.show = xeditable != "2" ? true : false

		//value轴文本样式
		xoption.axisLabel.fontSize = xdata[0].fieldData[0].value; //轴文本字号
		xoption.nameTextStyle.fontSize = xdata[0].fieldData[0].value; //轴名称文本

		xoption.axisLabel.color = xdata[0].fieldData[1].value; //轴文本眼色
		xoption.nameTextStyle.color = xdata[0].fieldData[1].value; //轴名称文本

		xoption.axisLabel.fontWeight = xdata[0].fieldData[2].value; //轴文本粗细
		xoption.nameTextStyle.fontWeight = xdata[0].fieldData[2].value; //轴名称粗细

		xoption.axisLabel.show = xdata[1].editable == "1" ? true : false
		let ymin = xdata[1].fieldData[0].value
		let ymax = xdata[1].fieldData[1].value
		if(ymin == 0) {
			xoption.min = 0
		} else if(ymin == '自动取整') { //最小值
			xoption.min = null
		} else if(ymin == '数据最小值') {
			xoption.min = 'dataMin'
		}
		if(ymax == '自动取整') { //最大值
			xoption.max = null
		} else if(ymax == '数据最大值') {
			xoption.max = 'dataMax'
		}
		xoption.splitNumber = xdata[1].fieldData[2].value;
		xoption.axisLabel.formatter = basicUtil.getFormatMethod(xdata[1].fieldData[3].value)

		xoption.name = xdata[2].editable != "2" ? xdata[2].fieldData[0].value : '';
		xoption.axisLine.show = xdata[3].editable != "2" ? true : false;
		xoption.axisLine.lineStyle.color = xdata[3].fieldData[0].value;

		xoption.splitLine.show = xdata[4].editable != "2" ? true : false;
		xoption.splitLine.lineStyle.color = xdata[4].fieldData[0].value;

		yoption.show = yeditable != "2" ? true : false;

		yoption.axisLabel.fontSize = ydata[0].fieldData[0].value; //轴文本
		yoption.axisLabel.color = ydata[0].fieldData[1].value;
		yoption.axisLabel.fontWeight = ydata[0].fieldData[2].value;
		yoption.axisLabel.show = ydata[1].editable != "2" ? true : false;
		yoption.axisLine.show = ydata[2].editable != "2" ? true : false;
		yoption.splitLine.show = ydata[3].editable != "2" ? true : false;

		if(ydata[1].fieldData[0].value == "水平") {
			yoption.axisLabel.rotate = 0;
		} else if(ydata[1].fieldData[0].value == "垂直") {
			yoption.axisLabel.rotate = 90;
		} else {
			yoption.axisLabel.rotate = 45;
		}
		yoption.axisLine.lineStyle.color = ydata[2].fieldData[0].value;
		yoption.splitLine.lineStyle.color = ydata[3].fieldData[0].value;

		options.animation = animateeditable != "2" ? true : false
		options.animationDuration = andata[0].value
		options.animationEasing = andata[1].value
		options.animationDurationUpdate = andata[2].value
		options.series=[]
		let serLen=serData.length
		let clen=arrData.stypes.length  //系列个数
		if(serLen>clen){
			serLen=clen
		}
		let serStyles=[],dataArr=[]
		let labelShow=globalStyle[3].editable!= "2" ? true : false
		let lposition=globalStyle[3].fieldData[1].value
		if(lposition=='中间'){
			lposition='inside'
		}else if(lposition=='左侧'){
			lposition='insideLeft'
		}else if(lposition=='右侧'){
			lposition='right'
		}else if(lposition=='顶部'){
			lposition='top'
		}else if(lposition=='底部'){
			lposition='insideBottom'
		}
		
		for(let k=0;k<serLen;k++){
			let item={}
			item.itemStyle ={},item.label={}
			let colorStatus=serData[k].fieldData[1].value
			item.type='bar'
			item.barCategoryGap =globalStyle[1].fieldData[0].value*100+'%'
			item.label.show=labelShow
			item.label.position=lposition
			item.label.fontSize =globalStyle[3].fieldData[0].fieldData[0].value
			item.label.color =globalStyle[3].fieldData[0].fieldData[1].value
			item.label.fontFamily  =globalStyle[3].fieldData[0].fieldData[2].value
			
			if(colorStatus=='颜色填充'){
				item.itemStyle.color=serData[k].fieldData[1].fieldData[0].value
			}else{
		        let xVal = 0;
		        let yVal = 0;
		        let val = serData[k].fieldData[1].fieldData[1].fieldData[2].value;
		        if (val >= 180) {
		          yVal = 1
		          xVal = (val - 180) / 180;
		        } else {
		          xVal = 1
		          yVal = val / 180;
		        }
		        item.itemStyle.color = {
		          type: 'linear',
		          x: 0,
		          y: 0,
		          x2: xVal,
		          y2: yVal,
		          colorStops: [{
		            offset: 0,
		            color: serData[k].fieldData[1].fieldData[1].fieldData[0].value
		          }, {
		            offset: 1,
		            color:serData[k].fieldData[1].fieldData[1].fieldData[1].value
		          }],
		          globalCoord: false // 缺省为 false
		        }
			}
			if(serData[k].fieldData[0].value==''&&arrData.stypes[k]!=undefined){
				serStyles.push(arrData.stypes[k])
			}else{
				serStyles.push(serData[k].fieldData[0].value)
			}
			options.series.push(item)
		}
		let slen=arrData.xdata.length
		for(let i=0;i<=slen;i++){
			let arr=[]
			if(i==0){
				arr.push('product')
			}else{
				arr.push(arrData.xdata[i-1])
			}
			
			for(let j=0;j<serLen;j++){
				if(i==0){
					arr.push(serStyles[j])
				}else{
					arr.push(arrData.ydata[j][i-1])
				}
			}
			dataArr.push(arr)
		}
		options.dataset={}
		options.dataset.source =JSON.parse(JSON.stringify(dataArr))
		if(barType == '水平分组柱图'){
			options.xAxis = xoption
			options.yAxis = yoption
		}else{
			options.xAxis = yoption
			options.yAxis = xoption
		}
		return options
	}
}