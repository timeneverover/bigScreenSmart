
export default{
	setOption(sourceDiv,arrData,attrs,mapped){
		let len=arrData.length
		let divWidth=attrs[0].properties[0].fieldData[0].value
		let divHeight=attrs[0].properties[0].fieldData[1].value
		let isAtuoLayout= attrs[1].properties[0].fieldData[0].value  // 自动布局 宽度自适应
		let rowNum=parseInt(attrs[1].properties[1].value) 
		let columnNum=parseInt(attrs[1].properties[2].value) 
		let columnDistance=attrs[1].properties[3].value 
		let rowDistance=attrs[1].properties[4].value 
		
		let fontFamily=attrs[1].properties[5].fieldData[0].value 
		let contentMargin=attrs[2].properties[0].value 
		let roundRadius=attrs[2].properties[1].value 
		let bgColor=attrs[2].properties[2].value 
		
		let defaultSize=attrs[2].properties[3].fieldData[0].value 
		let defaultColor=attrs[2].properties[3].fieldData[1].value 
		let defaultWeight=attrs[2].properties[3].fieldData[2].value 
		let defaultStyle='font-size:'+defaultSize+'px;color:'+defaultColor+';font-weight:'+defaultWeight+';'
		
		let paddingStyle=''
		let itemHeight='',itemWidth=''
		let baseStyle='display:flex;justify-content:center;align-items:center;box-sizing:border-box;border-radius:'+roundRadius+'px;font-family:'+fontFamily+';'
		if(!isAtuoLayout){
			itemWidth=parseFloat(divWidth/columnNum).toFixed(2)-columnDistance
			itemHeight=parseFloat(divHeight/rowNum).toFixed(2)-rowDistance
			paddingStyle='padding-top:'
			if(contentMargin<(itemHeight-defaultSize)/2){
				paddingStyle=''
			}else{
				paddingStyle+=contentMargin-parseFloat((itemHeight-defaultSize)/2).toFixed(1)+'px;'
			}
			baseStyle+='width:'+itemWidth+'px;height:'+itemHeight+'px;margin-right:'+columnDistance+'px;margin-bottom:'+rowDistance+'px;'
		}else{
			paddingStyle='padding:'+contentMargin+'px;'
			baseStyle+='margin-right:5px;margin-bottom:5px;'
		}
		
		let contentDiv='<div style="display:flex;flex-wrap: wrap;">'
		let contentMap=mapped[0].value!=''?mapped[0].value:mapped[0].name
		let typeMap=mapped[1].value!=''?mapped[1].value:mapped[1].name
		let slen=attrs[3].properties.length
		for(let i=0;i<len;i++){
			let item='',data='',type='',itemStyle='',itemBgColor='',seriesType=''
			data=arrData[i][contentMap]?arrData[i][contentMap]:arrData[i].content
			type=arrData[i][typeMap]?arrData[i][typeMap]:arrData[i].type
			if(type){
				let flag=false
				for(let j=0;j<slen;j++){
					if(type==attrs[3].properties[j].fieldData[0].value){
						itemBgColor=attrs[3].properties[j].fieldData[1].value
						let itemSize=attrs[3].properties[j].fieldData[2].fieldData[0].value
						let itemColor=attrs[3].properties[j].fieldData[2].fieldData[1].value
						let itemWeight=attrs[3].properties[j].fieldData[2].fieldData[2].value
						if(!isAtuoLayout){
							paddingStyle='padding-top:'
							if(contentMargin<(itemHeight-itemSize)/2){
								paddingStyle=''
							}else{
								paddingStyle+=contentMargin-parseFloat((itemHeight-itemSize)/2).toFixed(1)+'px;'
							}
						}
						itemStyle='font-size:'+itemSize+'px;color:'+itemColor+';font-weight:'+itemWeight+';background:'+itemBgColor+';'+paddingStyle
						
						flag=true
						break
					}
				}
				seriesType=type
				if(!flag){
					itemBgColor=bgColor
					itemStyle='background:'+itemBgColor+';'+defaultStyle+paddingStyle
				}
			}else{
				seriesType=''
				itemBgColor=bgColor
				itemStyle='background:'+itemBgColor+';'+defaultStyle+paddingStyle
			}
			let bgStyle='',borderStyle=''
			if(!isAtuoLayout){
				bgStyle='background:'+itemBgColor+';'
			}else{
				borderStyle='border-radius:'+roundRadius+'px;'
			}
			item='<div class="text_tab" attr-id="'+seriesType+'" style="overflow:hidden;'+baseStyle+bgStyle+'"><span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'+itemStyle+borderStyle+'">'+data+'</span></div>'
			
			contentDiv+=item
		}
			contentDiv+='</div>'
		
		sourceDiv.html(contentDiv)
	}
}
