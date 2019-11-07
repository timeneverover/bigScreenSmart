import waterPoloData from '@/defaults/options/circleData/waterPoloData.js'
import basicUtil from '../basicUtil.js'

export default {
	setOption(attrs,arrData) {
		let options= waterPoloData
		options.textStyle.fontFamily=attrs[1].value
		options.series[0].backgroundStyle.color=attrs[2].properties[0].value
		options.series[0].radius=attrs[2].properties[1].value*100+'%'
		options.series[0].waveLength=attrs[2].properties[2].value*100+'%'
		options.series[0].amplitude=attrs[2].properties[3].value*100+'%'
		let shape=attrs[2].properties[4].value
		let direction=attrs[2].properties[5].value
		if(shape=='圆形'){
			shape='circle'
		}else if(shape=='矩形'){
			shape='rect'
		}else if(shape=='菱形'){
			shape='diamond'
		}else if(shape=='圆矩形'){
			shape='roundRect'
		}else if(shape=='三角形'){
			shape='triangle'
		}else if(shape=='气球'){
			shape='pin'
		}else if(shape=='箭头'){
			shape='arrow'
		}
		
		if(direction=='向右'){
			direction='right'
		}else{
			direction='left'
		}
		options.series[0].shape=shape
		options.series[0].direction=direction
		
		options.series[0].outline.show=attrs[2].properties[6].editable!='2'?true:false
		options.series[0].outline.itemStyle.borderWidth=attrs[2].properties[6].fieldData[0].value
		options.series[0].outline.itemStyle.borderColor=attrs[2].properties[6].fieldData[2].value
		options.series[0].outline.borderDistance=attrs[2].properties[6].fieldData[1].value
		
		options.series[0].label.show=attrs[3].editable!='2'?true:false
		options.series[0].label.fontSize=attrs[3].properties[0].value
		options.series[0].label.color=attrs[3].properties[2].value
		options.series[0].label.insideColor=attrs[3].properties[1].value
		options.series[0].label.fontWeight=attrs[3].properties[3].value
		options.series[0].label.formatter=function(param) {
                return param.value*100+'%'
            }
		
		options.series[0].waveAnimation=attrs[5].editable!='2'?true:false
		options.series[0].animationEasing=attrs[5].properties[1].value
		options.series[0].animationEasingUpdate=attrs[5].properties[1].value
		options.series[0].animationDuration=attrs[5].properties[0].value
		options.series[0].animationDurationUpdate=attrs[5].properties[2].value
		options.series[0].data=[]
		let slen=attrs[4].properties.length
		for(let i=0;i<slen;i++){
			let item={}
			if(arrData[i].value){
				item.value=arrData[i].value
				if(attrs[4].properties[i].fieldData[0].value==''){
					item.name=arrData[i].name
				}else{
					item.name=attrs[4].properties[i].fieldData[0].value
				}
			}else{
				item.value=0
			}
			item.itemStyle={}
			item.itemStyle.color=attrs[4].properties[i].fieldData[1].value
			options.series[0].data.push(item)
		}
		options.tooltip.formatter=function(res){
			let marker="<span style=\"display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:"+res.data.itemStyle.color+";\"></span>"
			return marker+res.data.name+' : '+res.data.value
		}
		return options
	}
}