import commonUtil from '@/publicService/commonUtls.js'

export default{
	setOption(sourceDiv,arrData,attrs,mapped,isPreview){
		let title='',numValue='',prefix='',suffix=''
		let newData=[] // 【标题，数字，前缀，后缀】
		for(let i=0;i<4;i++){
			let type=mapped[i].value==''?mapped[i].name:mapped[i].value
			newData[i]=arrData[0][type]?arrData[0][type]:''
		}
		console.log(JSON.stringify(newData))
		////标题////
		let titleContent=newData[0]!=''?newData[0]:attrs[1].properties[0].value
		let titleAlign=attrs[1].properties[1].value
		let titleDistance=attrs[1].properties[2].value
		let titleFamily=attrs[1].properties[3].fieldData[0].value
		let titleSize=attrs[1].properties[3].fieldData[1].value
		let titleColor=attrs[1].properties[3].fieldData[2].value
		let titleWeight=attrs[1].properties[3].fieldData[3].value
		let margin=''
		if(titleAlign=='在上'){
			margin='margin-bottom:'+titleDistance+'px;'
		}else{
			margin='margin-top:'+titleDistance+'px;'
		}
		let titleStyle=margin+'font-size:'+titleSize+'px;font-family:'+titleFamily+';color:'+titleColor+';font-weight:'+titleWeight+';'
		let titleDiv='<div class="title_num_div" style="'+titleStyle+'">'+titleContent+'</div>'
		
		let alignText=attrs[2].properties[0].value
		let textStyle='flex-start'
		if(alignText=='左对齐'){
			textStyle='flex-start'
		}else if(alignText=='右对齐'){
			textStyle='flex-end'
		}else{
			textStyle='center '
		}
		
		let numTextDiv='<div class="num_text_div" style="width:100%;display:flex;align-items:center;justify-content:'+textStyle+'">'
		////添加前缀//////
		let preContent=newData[2]!=''?newData[2]:attrs[2].properties[1].fieldData[0].value
		let preFamily=attrs[2].properties[1].fieldData[1].fieldData[0].value
		let preSize=attrs[2].properties[1].fieldData[1].fieldData[1].value
		let preColor=attrs[2].properties[1].fieldData[1].fieldData[2].value
		let preWeight=attrs[2].properties[1].fieldData[1].fieldData[3].value
		let preStyle='font-size:'+preSize+'px;font-family:'+preFamily+';color:'+preColor+';font-weight:'+preWeight+';'
		console.log(attrs[2].properties[1].fieldData[0].value)
		let preDiv='<div class="pre_num_div" style="'+preStyle+'">'+preContent+'</div>'
		
//		$('.num_text_div').append(preDiv)
//		numTextDiv+=preDiv+'</div>'
		/////添加后缀/////
		
		let sufContent=newData[3]!=''?newData[3]:attrs[2].properties[3].fieldData[0].value
		let sufFamily=attrs[2].properties[3].fieldData[1].fieldData[0].value
		let sufSize=attrs[2].properties[3].fieldData[1].fieldData[1].value
		let sufColor=attrs[2].properties[3].fieldData[1].fieldData[2].value
		let sufWeight=attrs[2].properties[3].fieldData[1].fieldData[3].value
		let sufStyle='font-size:'+sufSize+'px;font-family:'+sufFamily+';color:'+sufColor+';font-weight:'+sufWeight+';'
		
		let sufDiv='<div class="suf_num_div" style="margin-left:3px;white-space:nowrap;'+sufStyle+'">'+sufContent+'</div>'
		
		/////////////// 设置数字及其样式  /////////////////
		let showData2=newData[1]
		let anTime=attrs[2].properties[2].fieldData[13].value
		let anSpeed=''
		
		
		let bitNum1=parseInt(attrs[2].properties[2].fieldData[5].value) // 默认位数
		let isFormatNum=attrs[2].properties[2].fieldData[6].fieldData[0].value // 是否四舍五入
		let decimalNum=parseInt(attrs[2].properties[2].fieldData[7].value) // 小数点位数
		let hasDelimiter=attrs[2].properties[2].fieldData[8].fieldData[0].value // 是否有千分位分隔符
		let delimiter1=hasDelimiter?attrs[2].properties[2].fieldData[9].value:''  // 千分位分隔符
		let delimiter2=attrs[2].properties[2].fieldData[10].value // 小数分隔符
		
		let fontFamily=attrs[2].properties[2].fieldData[0].fieldData[0].value
		let fontSize=attrs[2].properties[2].fieldData[0].fieldData[1].value
		let fontColor=attrs[2].properties[2].fieldData[0].fieldData[2].value
		let fontWeight=attrs[2].properties[2].fieldData[0].fieldData[3].value
		let baseStyle='font-size:'+fontSize+'px;font-family:'+fontFamily+';color:'+fontColor+';font-weight:'+fontWeight+';'
		
		let bgColor=attrs[2].properties[2].fieldData[2].value
		let bgRadius=attrs[2].properties[2].fieldData[3].value
		let bgRadius2=bgRadius
		let decimalColor=attrs[2].properties[2].fieldData[4].fieldData[0].value?bgColor:'transparent'  // 分隔符背景
		let fixedWidth=attrs[2].properties[2].fieldData[11].value // 定宽
		let numInterval=attrs[2].properties[2].fieldData[1].value*10 //间隔
		let width=''
		if(fixedWidth==0){
			if(bgRadius>fontSize/2){
				bgRadius=fontSize/2
			}
			width=''
			fixedWidth=fontSize
		}else{
			if(bgRadius>fixedWidth/2){
				bgRadius=fixedWidth/2
			}
			width='width:'+fixedWidth+'px;'
		}
		if(bgRadius2>fontSize/2){
			bgRadius2=fontSize/2
		}
		let style1=baseStyle+'text-align:center;border-radius:'+bgRadius+'px;background:'+bgColor+';'+width+'margin-right:'+numInterval+'px;' // 数字
		let style2=baseStyle+'border-radius:'+bgRadius2+'px;background:'+decimalColor+';' //分隔符
		
		////添加动画/////
		if(isFormatNum||decimalNum==0){
			if(anTime>showData2){
				anSpeed=parseFloat(anTime/showData2).toFixed(decimalNum)
			}else{
				anSpeed=parseInt(showData2/anTime)
			}
		}else{
			if(anTime>showData2){
				anSpeed=parseFloat(anTime/showData2).toFixed(decimalNum)
			}else{
				anSpeed=parseFloat(showData2/anTime).toFixed(decimalNum)
			}
		}
		let numCalculation=function(showData){
			let integArr=[],decimalArr=[],newArr=[]
			let bitNum=0
			if(isFormatNum||decimalNum==0){ // 获取整数部分数组和小数部分数组
				if(bitNum1==0){
					bitNum=(showData+'').split('').length
				}else{
					bitNum=bitNum1
				}
//				showData=parseInt(showData)
				integArr=(Array(bitNum).join(0) + showData).slice(-bitNum).split('').reverse()
			}else{
				showData=parseFloat(showData).toFixed(decimalNum)  // 设置小数个数
				let arr=showData.split('.')
				if(bitNum1==0){
					bitNum=arr[0].split('').length+arr[1].split('').length
				}else{
					bitNum=bitNum1
				}
				if(bitNum>decimalNum){ // 含有整数部分
					let num=bitNum-decimalNum
					decimalArr=(delimiter2+arr[1]).split('')
					integArr=(Array(num).join(0) + arr[0]).slice(-num).split('').reverse()
				}else{
					decimalArr=arr[1].substring(0,bitNum).split('')
				}
			}
			let len=integArr.length
			for(let i=0;i<len;i++){  // 整数部分千分位添加分隔符
				if(i%3==0&&i!=0){
					newArr.push(delimiter1)
				}
				newArr.push(integArr[i])
			}
			newArr=newArr.reverse()
			let allLen=newArr.length+decimalArr.length
			let numDiv='<div style="display:flex;font-size:0px;">'
			for(let j=0;j<allLen;j++){ // 设置数组div
				let item=''
				let index=j-newArr.length
				let data=index>=0?decimalArr[index]:newArr[j]
				if(data==delimiter1){ // 分隔符
					let dis=''
					if(delimiter1==''){
						dis='display:none;'
					}else{
						dis='margin-right:'+numInterval+'px;'
					}
					item='<div style="'+dis+style2+'">'+delimiter1+'</div>'
				}else{
					item='<div style="'+style1+'">'+data+'</div>'
				}
				
				numDiv+=item
			}
			numDiv+='</div>'
			if(titleAlign=='在上'){
				sourceDiv.html(titleDiv+numTextDiv+preDiv+numDiv+sufDiv+'</div>')
			}else{
				sourceDiv.html(numTextDiv+preDiv+numDiv+sufDiv+'</div>'+titleDiv)
			}
		}
		sourceDiv.html('')
		let showData1=0,endNum=showData2
		let golb = '';
		function setAnimation(){
			 showData1=commonUtil.addFloat(showData1,anSpeed);
	         if (showData1 < endNum) {
	         	numCalculation(showData1)
	         	golb=requestAnimationFrame(setAnimation);
	         }else{
	         	numCalculation(endNum)
	         	cancelAnimationFrame(golb);
	         }
		}
		let isAnimate=attrs[2].properties[2].fieldData[12].fieldData[0].value
		if(isAnimate||isPreview){
			setAnimation()
		}else{
			numCalculation(endNum)
		}
	}
}
