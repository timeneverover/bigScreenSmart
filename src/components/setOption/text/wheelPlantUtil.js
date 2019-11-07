import '@/publicService/velocity.js'
export default {
	setOption(_this,sourceDiv, arrData, attrs, mapped,attrId) {
		let interval = _this.$store.state.interval;
	    for (let h = 0; h < interval.length; h++) {
	      if (interval[h].indexOf(attrId) > 0) {
	        clearInterval(interval[h].replace(attrId, ''));
	        interval.splice(h, 1);
	      }
	    }
	    sourceDiv.find('.wheel_img').css({'left':0,'top':0})
		let imageUrl = window.g.ApiUrl
		let defaultImg = attrs[3].properties[0].value
		let fontFamily = attrs[1].properties[0].value
		let fontSize = attrs[1].properties[1].value
		let fontColor = attrs[5].properties[1].value
		let fontWeight = attrs[5].properties[2].value
		let textWidth = attrs[5].properties[3].value
		let textHeight = attrs[5].properties[4].value
		let textTop = attrs[5].properties[5].value
		let textLeft = attrs[5].properties[6].value
		let textAlign = attrs[5].properties[7].value
		let bgStyle = attrs[5].properties[0].fieldData[0].value
		if(bgStyle == '单色') {
			bgStyle = attrs[5].properties[0].fieldData[1].value
		} else {
			let begin = attrs[5].properties[0].fieldData[2].value
			let end = attrs[5].properties[0].fieldData[3].value
			let rang = attrs[5].properties[0].fieldData[4].value
			bgStyle = 'linear-gradient(' + rang + 'deg, ' + begin + ', ' + end + ')'
		}
		if(textAlign=='向左'){
			textAlign='flex-start'
		}else if(textAlign=='居中'){
			textAlign='center'
		}else{
			textAlign='flex-end'
		}
			
		let titleStyle='top:'+ textTop + 'px;left:'+ textLeft + 'px;color:'+ fontColor+';font-family:'
						+ fontFamily+';font-size:'+ fontSize + 'px;font-weight:'+ fontWeight+';width:'
						+ textWidth + '%;height:'+ textHeight + '%;justify-content:'+ textAlign+';background:'+ bgStyle+';'
						
		let dotStyle='background:'+attrs[6].properties[0].value
		let dotStyle2='background:'+attrs[6].properties[1].value
		let serData=attrs[4].properties
		let dataLen = serData.length
		let bgImageStyle=''  // 图片样式
		let imgType=attrs[3].properties[1].value
		if(imgType=='拉伸以充满容器'){
			bgImageStyle+='background-size:100% 100%;'
		}else if(imgType=='充满容器'){
			bgImageStyle='background-size:cover;'
		}else{
			bgImageStyle='background-position: center center;'
		}
		bgImageStyle+='background-repeat:no-repeat;'
		
		let divWidth=attrs[0].properties[0].fieldData[0].value // 框宽
		let divHeight=attrs[0].properties[0].fieldData[1].value // 框高
		
		let imageStyle="width:"+divWidth+'px;height:'+divHeight+'px;position:relative;' // 图片父div样式
		let url = mapped[0].value == '' ? mapped[0].name : mapped[0].value // 图片地址
		let description = mapped[1].value == '' ? mapped[1].name : mapped[1].value //图片描述
		titleStyle+=attrs[5].editable!=2?'display:flex;':'display:none;'
		
		let content1 = '',content2 = '',itemFirst=''
		for(let i = 0; i < dataLen; i++) {
			let img =serData[i].fieldData[1].value != '' ? (imageUrl + serData[i].fieldData[1].value): (imageUrl + defaultImg)
			let des =serData[i].fieldData[0].value
			let dotColor=i==0?dotStyle2:dotStyle
			let item1 = '<div class="wheel_content" style="'+imageStyle+'"><div class="wheel_img_div" style="background:url(' + img + ');'+bgImageStyle+'" ></div><div class="wheel_title" style="'+titleStyle+'">' + des + '</div></div>'
			let item2 = '<div style="'+dotColor+'"></div>'
			content1 += item1
			content2 += item2
			if(i==0){ // 多加第一个，防止滚动出现跳转
				itemFirst=item1
			}else if(i==(dataLen-1)){
				content1+=itemFirst
			}
		}
		 sourceDiv.find('.wheel_parent').find('.wheel_img').html(content1)
		sourceDiv.find('.wheel_dot').html(content2)
		let isShowDot=attrs[6].editable!=2?'block':'none'
		sourceDiv.find('.wheel_dot').css('display',isShowDot)
		
		let stopTime=parseFloat(attrs[2].properties[0].value)
		let speedTime=parseFloat(attrs[2].properties[1].value)
		let effect=attrs[2].properties[2].value
		let allTime=stopTime+speedTime
		
		let effectCss='',effectData='',allDistance='',effectType='',density=''
		if(effect=='水平滚动'){
			effectCss='left'
			effectData=divWidth
			sourceDiv.find('.wheel_img').css('width',divWidth*(dataLen+1)+'px')
			sourceDiv.find('.wheel_img').css('height',divHeight+'px')
			sourceDiv.find('.wheel_img').css('flex-direction','row')
			effectType=0
		}else if(effect=='垂直滚动'){
			effectCss='top'
			effectData=divHeight
			sourceDiv.find('.wheel_img').css('width',divWidth+'px')
			sourceDiv.find('.wheel_img').css('height',divHeight*(dataLen+1)+'px')
			sourceDiv.find('.wheel_img').css('flex-direction','column')
			effectType=0
		}else{
			sourceDiv.find('.wheel_img').css('width',divWidth+'px')
			sourceDiv.find('.wheel_img').css('height',divHeight+'px')
			
			if(effect=='淡入淡出'){
				sourceDiv.find('.wheel_content').css({
					position:'absolute',
					float:'left',
					opacity:0
				})
				sourceDiv.find('.wheel_content:nth-child(1)').css('opacity',1)
				effectType=1
			}else{
				if(effect=='竖向条纹'){
					effectType=2
				}else{
					effectType=3
				}
				density=attrs[2].properties[3].value
				sourceDiv.find('.wheel_content').css({
						position:'absolute',
						left:0,
						top:0
					})
			}
		}
		
//	    sourceDiv.find('.wheel_img').css({'left':0,'top':0})
//		sourceDiv.find('.wheel_img').css('top',0)
		let flag=0
		// 动画定时器
		let intervalNow=setInterval(function(){
				let index=flag%dataLen+1 // 适用于1开始的
				let index2=(flag+1)%dataLen+1
				let index3=flag%dataLen  // 适用于0开始的
				let index4=index==dataLen?0:index
				if(effectType==0){ // 水平，垂直滚动
					let data=-effectData*index
					let item={}
					item[effectCss]=data
					sourceDiv.find('.wheel_img').animate(item,speedTime,function(){
						var that = $(this);
						if(!$(this).is(":animated")) { //第一个li的动画结束时
							if(data==-(effectData*dataLen)){
								that.css(effectCss,'0px')
							}
						}
					})
				}else if(effectType==1){ // 淡入淡出
					sourceDiv.find('.wheel_img').find('.wheel_content:nth-child('+index+')').animate({opacity:0},speedTime)
					sourceDiv.find('.wheel_img').find('.wheel_content:nth-child('+index2+')').animate({opacity:1},speedTime)
				}else if(effectType==2){ // 竖向条纹
					animatMethod(sourceDiv.find('.wheel_content'),divWidth,divHeight,textHeight,index3,index4,speedTime,'top',density)
				}else if(effectType==3){ // 横向条纹
					animatMethod(sourceDiv.find('.wheel_content'),divWidth,divHeight,textHeight,index3,index4,speedTime,'left',density)
				}
			
				sourceDiv.find('.wheel_dot').find('div').attr('style',dotStyle) // 当前圆点改变
				sourceDiv.find('.wheel_dot').find('div:nth-child('+index2+')').attr('style',dotStyle2)
				flag++
		},allTime);
	  interval.push(intervalNow + attrId);
      _this.$store.state.interval = interval;
	}
}
/**
 * 条纹效果实现
 * @param {Object} shutterItem 图片的上一级div
 * @param {Object} shutterW div的宽
 * @param {Object} shutterH div的高
 * @param {Object} textHeight 文字块高度
 * @param {Object} index 当前图片位置（0开始）
 * @param {Object} nextIndex 下一张
 * @param {Object} speedTime 图片小时速度
 * @param {Object} type top:竖向条纹 left：横向条纹
 * @param {Object} density 密度
 */
function animatMethod(shutterItem,shutterW,shutterH,textHeight,index, nextIndex,speedTime,type,density) {
				let curElem = shutterItem.eq(index);
				let targetElem = shutterItem.eq(nextIndex);
				var backup = curElem.html();

				curElem.find('.wheel_img_div').fadeOut();
				curElem.find('.wheel_title').fadeOut();
				targetElem.css('zIndex', 19);
				
				let leftData='',topData='',widthData='',hightData='',valData='',titleItem={},veloStyle={}
				if(type=='top'){
					leftData=shutterW / density
					topData=0
					widthData=shutterW / density
					hightData=shutterH
					valData=shutterH
					titleItem.width=shutterW
				}else{
					leftData=0
					topData=shutterH / density
					widthData=shutterW
					hightData=shutterH / density
					valData=shutterW
					titleItem.height=textHeight*shutterH*0.01
				}
				for(var i = 0; i < density; i++) {
					var $createElem = $('<div class="created"></div>');

					$createElem.html(backup).css({
						position: 'absolute',
						zIndex: 20,
						left: leftData * i,
						top: topData * i,
						overflow: 'hidden',
						width: widthData,
						height: hightData
					});
					curElem.append($createElem);
					$createElem.find('.wheel_img_div').css({
						display: 'block',
						width: shutterW,
						height: shutterH,
						marginLeft: -leftData * i,
						marginTop:-topData * i
					});
					$createElem.find('.wheel_title').css({
						display: 'block',
						marginLeft: -leftData * i,
						marginTop:-topData * i
					});
					$createElem.find('.wheel_title').css(titleItem)
				}
				var movingVal = 0;
				let item={}
				curElem.find('.created').each(function(i) {
					if(i % 2 === 0) {
						movingVal = valData;
					} else {
						movingVal = -valData;
					}
					
					item[type]=movingVal
					$(this).velocity(item, {
						duration: speedTime
					});
				});
				setTimeout(function() {
					targetElem.css('zIndex', 20);
					curElem.css('zIndex', nextIndex).html(backup);
				}, speedTime);
			}