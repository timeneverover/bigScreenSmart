/**
 * 标题 渲染方法
 */
import commonUtil from '@/publicService/commonUtls.js'
import progressOption from '@/defaults/options/progressJson.js'
export default {
  setCommonTitle(sourceDiv, titleData, titleAttrs, mapped) {
    let data = '',
      uu = ''
    let mm = 'value'
    let mapp = mapped[0].value
    if (mapp != '') {
      mm = mapp
    }
    if (titleData[0]) { // 后台是否传值
      if (titleData[0].hasOwnProperty(mm)) {
        data = titleData[0][mm]
      }
      if (titleData[0].hasOwnProperty('url')) {
        uu = titleData[0]['url']
      }
    }
    //设置标题名
    if (data != '' || data==0) { // 数据配置中设置有内容
      sourceDiv.find('a').text(data)
    } else {
      sourceDiv.find('a').text(titleAttrs[1].value)
    }
    sourceDiv.find('a').css('font-family', titleAttrs[2].properties[0].value)
    sourceDiv.find('a').css('font-size', titleAttrs[2].properties[1].value + 'px')
    sourceDiv.find('a').css('color', titleAttrs[2].properties[2].value)
    sourceDiv.find('a').css('font-weight', titleAttrs[2].properties[3].value)
    let align = titleAttrs[3].value
    let alignReponse = ''
    if (align == '居中对齐') {
      alignReponse = 'center'
    } else if (align == '左对齐') {
      alignReponse = 'flex-start'
    } else {
      alignReponse = 'flex-end'
    }
    sourceDiv.find('.center-wrapper').css('justify-content', alignReponse)
    if (uu != '') {
      sourceDiv.find('a').attr('href', uu)
    } else {
      // sourceDiv.find('a').attr('href', titleAttrs[4].properties[0].value)
      sourceDiv.find('a').attr('href', 'javascript:void(0);')
    }
    let isNewWin = titleAttrs[4].properties[1].fieldData[0].value
    if (isNewWin) { // 打开新窗口
      sourceDiv.find('a').attr('target', '_blank')
    } else {
      sourceDiv.find('a').attr('target', '_self')
    }
  },
  setHorseLamp(sourceDiv, arrData, arrAttrs, mapped) { // 跑马灯
    let mm = 'value',
      data = ''
    let mapp = mapped[0].value
    if (mapp != '') {
      mm = mapp
    }
    if (arrData[0]) { // 后台是否传值
      if (arrData[0].hasOwnProperty(mm)) {
        data = arrData[0][mm]
      }
    }
    sourceDiv.find('a').css('direction', 'none')
    sourceDiv.find('a').text(data)
    // 文本样式设置
    sourceDiv.find('a').css('color', arrAttrs[1].properties[0].value)
    sourceDiv.find('a').css('font-family', arrAttrs[1].properties[1].value)
    sourceDiv.find('a').css('font-size', arrAttrs[1].properties[2].value + 'px')
    sourceDiv.find('a').css('font-weight', arrAttrs[1].properties[3].value)
    let isWheel = arrAttrs[2].fieldData[0].value // 是否轮播
    let isFixed = arrAttrs[3].fieldData[0].value // 是否定速播放
    let animationInterval = arrAttrs[4].fieldData[0].value // 动画间隔
    let animationTime = arrAttrs[5].fieldData[0].value // 动画时间
    let animationDelay = arrAttrs[6].fieldData[0].value // 前期停留
    let width = sourceDiv.find('.horseContent a:first').width()
    let speed = animationTime * 3
    if (isWheel) {
      sourceDiv.find('.horseContent').css('animation-iteration-count', 'infinite')
    } else {
      sourceDiv.find('.horseContent').css('animation-iteration-count', '1')
    }
    if (isFixed) { // 定速播放，设置每100 的速度是
      speed = (width / 100) * animationInterval
    }
    sourceDiv.find('.horseContent').css('animation-duration', speed + 'ms')
    sourceDiv.find('.horseContent').css('animation-delay', animationDelay + 'ms')
  },
  setTimeContainer(arrAttrs, sourceDiv, _this, attrId) { // 时间器
    sourceDiv.find('.time-icon').css('font-size', arrAttrs[1].properties[0].value + 'px')
    sourceDiv.find('.time-icon').css('color', arrAttrs[1].properties[1].value)
    let iconWidth = sourceDiv.find('.time-icon').width()
    let timeWidth = sourceDiv.find('.timeDiv').width()
    let allWidth = sourceDiv.width() - timeWidth - iconWidth
    let right = (arrAttrs[1].properties[2].value / 100) * allWidth
    sourceDiv.find('.time-icon').css('margin-right', right)
    let tt = ''
    let formater = arrAttrs[2].properties[1].value
    let timeInterval = _this.$store.state.timeInterval
    let intervalLen = timeInterval.length
    for (let h = 0; h < intervalLen; h++) {
      if (timeInterval[h].indexOf(attrId) > 0) {
        //在全局数组中删除
        clearInterval(timeInterval[h].replace(attrId, ''));
        timeInterval.splice(h, 1);
      }
    }
    let interval = ''
    let that = this
    let span = sourceDiv.find('.timeDiv')
    let intervalTime = arrAttrs[2].properties[2].fieldData[0].value
    let stopTime = arrAttrs[2].properties[3].value
    let stopShowTime = arrAttrs[2].properties[4].value
    interval = setInterval(function() { // 定时修改时间
      tt = commonUtil.dateFtt(new Date(), formater)
      if (tt == stopTime) {
        let timeInterval1 = _this.$store.state.timeInterval
        let len2 = timeInterval.length
        let flag = ''
        for (let h = 0; h < len2; h++) {
          if (timeInterval1[h].indexOf(attrId) > 0) {
            flag = h
            break
          }
        }
        if (flag != '') {
          clearInterval(timeInterval1[flag].replace(attrId, ''));
          timeInterval1.splice(flag, 1);
          _this.$store.state.timeInterval = timeInterval1
        } else {
          clearInterval(interval);
        }
        if (stopShowTime != '') {
          tt = stopShowTime
        }
      }
      span.text(tt)
    }, intervalTime)
    _this.$store.state.timeInterval.push(interval + attrId);
    span.css('font-size', arrAttrs[2].properties[0].fieldData[0].value + 'px')
    span.css('color', arrAttrs[2].properties[0].fieldData[1].value)
    span.css('font-weight', arrAttrs[2].properties[0].fieldData[2].value)
    span.css('font-family', arrAttrs[2].properties[0].fieldData[3].value)
  },
  setProgressOption(arrAttrs) { // 进度条设置
    return progressOption
  },
  setTimePickr(sourceDiv,attrs,arr,mapped){ // 时间选择器
  	sourceDiv.find('.time_pickr').css({
  		"font-family":attrs[1].properties[0].fieldData[0].value,
  		"font-size":attrs[1].properties[0].fieldData[1].value+'px',
  		"color":attrs[1].properties[0].fieldData[2].value,
  		"font-weight":attrs[1].properties[0].fieldData[3].value,
  	})
  	sourceDiv.find('.date_pickr').css({
  		"border-color":attrs[1].properties[1].fieldData[0].value,
  		"border-width":attrs[1].properties[1].fieldData[1].value+'px',
  		"background":attrs[1].properties[2].value,
  		"font-family":attrs[1].properties[0].fieldData[0].value,
  		"font-size":attrs[1].properties[0].fieldData[1].value+'px',
  		"color":attrs[1].properties[0].fieldData[2].value,
  		"font-weight":attrs[1].properties[0].fieldData[3].value,
  	})

  	sourceDiv.find('.time_delimiter').text(attrs[1].properties[3].value)

  	let stime=mapped[0].value==''?mapped[0].name:mapped[0].value
	let etime=mapped[1].value==''?mapped[1].name:mapped[1].value
	let options={}
	options.defaultStart=arr[0][stime]
	options.defaultEnd=arr[0][etime]
	let configStart= {
					dateFormat: 'Y-m-d H:i',
					altFormat: 'Y-m-d H:i',
					enableTime: true,
					enableSeconds:true,
					hourIncrement:1,
					minuteIncrement: 1,
					allowInput: true,
					minDate: '',
					maxDate: '',
					time_24hr: true
				}
	configStart.dateFormat=attrs[2].properties[0].value
	configStart.altFormat=attrs[2].properties[0].value
	configStart.minDate=attrs[2].properties[1].value==''?null:new Date(attrs[2].properties[1].value.replace(/-/g, "/"))
	configStart.maxDate=attrs[2].properties[2].value==''?null:new Date(attrs[2].properties[2].value.replace(/-/g, "/"))
	options.config=configStart
	return options
  },
  setSelectView(attrs,arr,mapped){ // 下拉选择器
  	let fontFamily=attrs[1].properties[0].fieldData[0].value
  	let fontSize=attrs[1].properties[0].fieldData[1].value
  	let fontColor=attrs[1].properties[0].fieldData[2].value
  	let fontWeight=attrs[1].properties[0].fieldData[3].value
  	let borderColor=attrs[1].properties[1].fieldData[0].value
  	let borderWeight=attrs[1].properties[1].fieldData[1].value
  	let selectHeight=attrs[1].properties[3].value
  	let backColor=attrs[1].properties[4].value
  	let imgColor=attrs[1].properties[2].fieldData[0].value
  	let imgSize=attrs[1].properties[2].fieldData[1].value
  	if(typeof(imgSize)=='string'){
  		imgSize=parseInt(imgSize)
  	}
  	let leftSize=-(imgSize+8)
  	let svalue=mapped[0].value==''?mapped[0].name:mapped[0].value
  	let newArr=[]
  	let len=arr.length
  	for(let i=0;i<len;i++){
  		newArr.push(arr[i][svalue])
  	}
  	let dropHeight=selectHeight*len+2
  /*	if(len>10){
  		dropHeight=selectHeight
  	}*/
  	let config={
  		height:selectHeight+'px',
  		fontFamily:fontFamily,
  		fontSize:fontSize+'px',
  		color:fontColor,
  		fontWeight:fontWeight,
  		borderColor:borderColor,
  		borderWidth:borderWeight,
  		backgroundColor:backColor
  	}
  	let config22={
  		fontSize:imgSize+'px',
  		color:imgColor,
  		marginLeft:leftSize+'px'
  	}
  	let config23={
  		height:dropHeight+'px',
  		fontFamily:fontFamily,
  		fontSize:fontSize+'px',
  		color:fontColor,
  		fontWeight:fontWeight,
  		borderColor:borderColor,
  		borderWidth:borderWeight,
  		backgroundColor:backColor
  	}
  	console.log(config)
  	let config2={}
  	config2.imgconfig=config22
  	config2.dropconfig=config23
  	let item={}
  	item.config=config
  	item.config2=config2
  	item.data=newArr
  	item.selected=newArr[0]
  	return item
  }
}
