

export default{
	setOption(sourceDiv,arrData,attrs,mapped){
		let isOneLine=attrs[1].properties[0].fieldData[0].value
		let dataLen=arrData.length
		let lineHasNum=attrs[1].properties[1].value
		let lineNum=1
		if(isOneLine){
			lineNum=1
			lineHasNum=dataLen
		}else{
			lineNum=Math.ceil(dataLen/lineHasNum)
		}
		let serLen=attrs[4].properties.length
		let statusSize=attrs[3].properties[1].value
		let radiusSize=attrs[5].properties[1].value*statusSize/2
		let newDatas=[]
		for(let k=0;k<dataLen;k++){
			let type=(arrData[k] instanceof Array)
			let item={}
			let series='',series2='',name='',style='' 
			if(type){
				name=0
				series=1
			}else{
				name=mapped[0].value==''?'name':mapped[0].value
				series=mapped[1].value==''?'value':mapped[1].value
			}
			item.name=arrData[k][name]
			series2=arrData[k][series]
			for(let i=0;i<serLen;i++){
				if(series2==attrs[4].properties[i].fieldData[0].value){
					let color=attrs[4].properties[i].fieldData[1].value
					style='style="width:'+statusSize+'px;height:'+statusSize+'px;border-radius:'+radiusSize+'px;background-color:'+color+'"'
					break
				}
			}
			item.style=style
			item.series=series2
			newDatas.push(item)
		}
		let circlePos=attrs[5].properties[0].value
		let marginRight=attrs[2].properties[0].value
		let marginBottom=attrs[2].properties[1].value
		let fontStyle='style="margin:0px 5px;font-size:'+statusSize+'px;font-family:'+attrs[3].properties[0].value+';color:'+attrs[3].properties[2].value+';font-weight:'+attrs[3].properties[3].value+'"'
		let index=0
		sourceDiv.html('')
		for(let i=0;i<lineNum;i++){
			let item='<div class="status_line_div" style="display:flex;margin-bottom:'+marginBottom+'px">'
			for(let j=0;j<lineHasNum;j++){
				if(index==dataLen){
					break
				}else{
					if(circlePos=='在前'){
						item+='<div class="status_line_item" attr-id="'+newDatas[index].series+'" style="display:flex;white-space:nowrap;align-items:center;margin-right:'+marginRight+'px"><div class="item_status" '+newDatas[index].style+'></div><div class="item_content" '+fontStyle+'>'+newDatas[index].name+'</div></div>'
					}else{
						item+='<div class="status_line_item" attr-id="'+newDatas[index].series+'" style="display:flex;white-space:nowrap;align-items:center;margin-right:'+marginRight+'px"><div class="item_content" '+fontStyle+'>'+newDatas[index].name+'</div><div class="item_status" '+newDatas[index].style+'></div></div>'
					}

				}
				index++
			}
			item+='</div>'
			sourceDiv.append(item)
		}
	}
}
