<!--
	作者：hqj
	时间：2018-12-20
	描述：预览组件渲染
-->
<template>
	<div :id='chartData.attr_id' v-if="chartData.chartType=='isSource'" class="sourceDiv datav-wraper" :class="chartData.id">
		<div class="center-wrapper" v-if="chartData.name=='时间器'" style="text-align: center;">
			<i class="time-icon fa fa-clock-o"></i><span class="timeDiv"></span>
		</div>
		<div v-else-if="chartData.name=='轮播图'" class="center-wrapper" style="position:relative;">
			<div class="wheel_parent" style="position:relative;width:100%;height:100%;overflow: hidden;"><div class="wheel_img"></div></div>
			<div class="wheel_dot"></div>
		</div>
		<div class="bg-inner" v-else></div>
	</div>
	<div :id='chartData.attr_id' v-else-if="chartData.chartType=='isDiv'" style="width:100%;height:100%;" class="datav-wraper">
		<div v-if="chartData.name=='跑马灯'" class="center-wrapper horseDiv">
			<div class="horseContent">
				<a></a>
				<a></a>
				<a></a>
			</div>
		</div>
		<div v-else-if="chartData.name=='视频'" class="center-wrapper">
			<video controls="controls" autoplay="autoplay"></video>
			<p class="videop"></p>
		</div>
		<div v-else-if="chartData.name=='状态卡片'" class="center-wrapper">
		</div>
		<div v-else-if="chartData.name=='数字翻牌器'" class="center-wrapper">
		</div>
		<div v-else-if="chartData.name=='文字标签'" class="center-wrapper">
		</div>
		<div v-else-if="chartData.name=='时间选择器'" class="center-wrapper">
			<div class="time_pickr">
				<flat-pickr v-model="defaultStart" :config="{enableTime: true,dateFormat:dateFormat,hourIncrement:hourIncrement,minuteIncrement:minuteIncrement,allowInput:allowInput,minDate:minDate,maxDate:maxDate,time_24hr:true}" @on-close="selectStart" class="form-control date_pickr"></flat-pickr>
				<span class="time_delimiter">至</span>
				<flat-pickr v-model="defaultEnd" :config.sync="configPickr" @on-close="selectStart" class="form-control date_pickr"></flat-pickr>
			</div>
		</div>
		<div v-else-if="chartData.name=='下拉选择器'" style="width:100%;position:relative;display: flex;justify-content: center;align-items: center;" >
			<selectionView :config="selectionConfig" :config2="imgConfig" :dataList="selectList" @change="selectChanged" v-model="selectTarget"></selectionView>
		</div>
		<div v-else class="center-wrapper"><a></a></div>
	</div>
	<div v-else-if="chartData.chartType=='isList'" :id='chartData.attr_id' style="width:100%;height:100%;" class="datav-wraper" :class="chartData.id">
	    <div v-if="chartData.name=='轮播列表'" class="list-box">
			<!-- 列表头部 -->
			<div class="list-header" v-show="isHeadShow">
				<div class="list-index column-index" v-show="isNumShow"></div>
				<div class="column column-title" v-for="listTitle in listTitleData" :style="'width:'+listTitle.width+';'">
					{{listTitle.name}}
					<div class="marquee-text">
	        			<span class="marquee-text-span"></span>
						<i class="whiteSpace"></i>
	      			</div>
				</div>
			</div>
			<!-- 列表内容 -->
			<div class="list-content-box">
				<div class="list-content" v-for="(listData,listIndex) in moveListData">
					<div class="content-index column-index" v-show="isNumShow">
						<div class="index-bg">{{listIndex+1}}</div>
					</div>
					<div class="column column-content" v-for="fieldData in listTitleData" :style="fieldData.css">
						<img v-if="fieldData.type=='图片'" :src="imageUrl+listData[fieldData.fieldValue]" :style="fieldData.imageStyle">
						<span v-else>{{listData[fieldData.fieldValue]?listData[fieldData.fieldValue]:'-'}}</span>
						<div class="marquee-text">
							<span class="marquee-text-span"></span>
							<i class="whiteSpace"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="list-box">
			<!-- 列表内容 -->
			<div class="list-content-box">
				<div v-for="(listData,listIndex) in moveListBarData" class="list-content-wrap">
					<div class="list-content">
						<div class="content-index column-index" v-show="isListIndexShow">
							<div class="index-bg">NO.{{listIndex+1}}</div>
						</div>
						<div class="column column-content column-name">
							<span>{{listData.content}}</span>
						</div>
						<div class="column column-content column-value" v-show="isListNumShow">
							<span>{{listData.value}}</span>
						</div>
					</div>
					<div class="barBox">
						<div class="bar" :style="listData.width" v-show="isListBarShow"></div>
						<div class="light" v-show="isListLightShow"></div>
					</div>
				</div>
			</div>
		</div>

	</div>
	<div v-else-if="chartData.chartType=='isImage'" :id='chartData.attr_id' style="width:100%;height:100%;" class="datav-wraper">
		<a style="width:100%;height:100%;" ><img style="width:100%;height:100%;" /></a>
	</div>
	<div v-else-if="chartData.chartType=='isIfream'" :id='chartData.attr_id' style="width:100%;height:100%;position:relative;" class="datav-wraper" @mouseover="overFream" @mouseout="outFream">
		<i style="position:absolute;top:5px;right:5px; font-size:35px; cursor:pointer;display:none;" class="fa fa-times-circle-o" @click="closeFream"></i>
		<iframe style="width:100%;height:100%;" frameborder="0"></iframe>
	</div>
	<div :id='chartData.attr_id' v-else-if="chartData.chartType=='isDashboard'" style="width:100%;height:100%;"></div>
	<div :id='chartData.attr_id' v-else-if="chartData.chartType=='iswordcloud'" style="width:100%;height:100%;"></div>

	<div v-else :id="chartData.attr_id" style="width:100%;height: 100%;"></div>
</template>

<script>
	import httpService from '@/publicService/HttpService.js'
	import Urls from '@/publicService/urls.js'
	import opctionData from '@/defaults/options/basicChartData.js'
	import sourceUtil from '@/components/setOption/div/sourceUtil.js'
	import chartUtil from '@/components/setOption/chartUtil.js'
	import barUtil from '@/components/setOption/allBarUtil/barUtil.js'
	import pieUtil from '@/components/setOption/pie/pieUtil.js'
	import indexComparPieUtil from '@/components/setOption/pie/indexComparPieUtil.js'
	import pieWithImgUtil from '@/components/setOption/pie/pieWithImgUtil.js'
	import mutidimenPieUtil from '@/components/setOption/pie/mutidimenPieUtil.js'
	import markpieUtil from '@/components/setOption/pie/markpieUtil.js'
	import onlyPercentPieUtil from '@/components/setOption/pie/onlyPercentPieUtil.js'
	import carouselPieUtil from '@/components/setOption/pie/carouselPieUtil.js'
	import proportionPieUtil from '@/components/setOption/pie/proportionPieUtil.js'
	import scatterUtil from '@/components/setOption/scatterUtil.js'
	import bubbleUtil from '@/components/setOption/bubbleUtil.js'
	import commonUtil from '@/publicService/commonUtls.js'
	import chartCommon from '@/publicService/chartCommon.js'
	import basicUtil from '@/components/setOption/basicUtil.js'
	import titleUtil from '@/components/setOption/titleUtil.js'
	import imgUtil from '@/components/setOption/div/imageUtil.js'
	import moveListUtil from '@/components/setOption/div/moveListUtil.js'
	import moveListBarUtil from '@/components/setOption/div/moveListBarUtil.js'
	import backgroundUtil from '@/components/setOption/div/backgroundUtil.js'
	import progressUtil from '@/components/setOption/progressUtil.js'
	import basicMapUtil from '@/components/setOption/map/basicMapUtil.js'
	import chinaMapThreeDUtil from '@/components/setOption/map/chinaMapThreeDUtil.js'
	import chinaJson from '@/ifreamPager/china.json'//渲染地图所需数据
	import basicRadarUtil from '@/components/setOption/basicRadarUtil.js'
	import videoUtil from '@/components/setOption/div/videoUtil.js'
	import basicBarUtil from '@/components/setOption/allBarUtil/basicBarUtil.js'
	import dashboardUtil from '@/components/setOption/dashboardUtil.js'
	import waterPoloUtil from '@/components/setOption/allCircleUtil/waterPoloUtil.js'
	import zebraBarUtil from '@/components/setOption/allBarUtil/zebraBarUtil.js'
	import arcBarUtil from '@/components/setOption/allBarUtil/arcBarUtil.js'
	import groupBarUtil from '@/components/setOption/allBarUtil/groupBarUtil.js'
	import chartBarUtil from '@/components/setOption/allBarUtil/chartBarUtil.js'
	import doublChartUtil from '@/components/setOption/doublChartUtil.js'
	import wordcloudUtil from '@/components/setOption/wordcloudUtil.js'
	import statusUtil from '@/components/setOption/text/statusUtil.js'
	import numDoublerUtil from '@/components/setOption/text/numDoublerUtil.js'
	import textLabelUtil from '@/components/setOption/text/textLabelUtil.js'
	import wheelPlantUtil from '@/components/setOption/text/wheelPlantUtil.js'
	import mapJson from '@/components/setOption/map/mapJson.js'
	import selectionView from '@/components/selections.vue'
	export default {
		props: ['chartData'],
		components: {
			'selectionView':selectionView
		},
		data() {
			return {
				chartDom: '',
				websockt: '',
				chartOption: opctionData,
				basicColor:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
				mapComIndex: '',
				defaultStart:'2019-08-25 18:00:00',
				defaultEnd:'2019-08-26 18:00:00',
				configPickr:{
						dateFormat: 'Y-m-d H:i',
						altFormat: 'Y-m-d H:i',
						enableTime: true,
						hourIncrement:1,
						minuteIncrement: 5,
						allowInput: false,
						minDate: '',
						maxDate: '',
						time_24hr: true
				},
				dateFormat: 'Y-m-d H:i',
				hourIncrement:1,
				minuteIncrement: 5,
				allowInput: false,
				minDate: '',
				maxDate: '',
				chartIndex:0,
				selectTarget:'',
				selectionConfig:{},
				imgConfig:{},
				selectList:[]
			}
		},
		watch:{
			chartData:{ // 数据监听
				handler(newValue, oldValue) {　
					console.log('chartDom:'+this.chartIndex)
					if(this.chartIndex != 0) { // 初始化的时候不调用该方法，因为在mounted中已渲染
						this.setChartOptionAttr(newValue)
					}　
					this.chartIndex++
				},
				immediate: true, 
				deep: true
			}
		},
		computed:{
			moveListData(){
				return this.chartData.data
			},
			moveListBarData(){
				let moveListBarData = [];
				let datas = this.chartData.data;
				let mapped = this.chartData.mapped;
				let realData = basicUtil.getRealData(datas, mapped);
				let xData = chartCommon.getMappedData(datas, mapped, "类目型").xdata;
				let maxNum = Math.max.apply(null,xData);
				for(let i=0;i<realData.length;i++){
					realData[i].width = 'width: ' + parseInt((realData[i].value/maxNum)*100)+'%'
				}
				return realData;
			},
			listTitleData(){
				let listTitleData = [];
				let attrs = this.chartData.properties;
				let titleDataLen = attrs[5].properties.length;
				let titleTextAlignObj = {
			      "左对齐": "left",
			      "居中对齐": "center",
			      "右对齐": "right"
			    };
				for (let i = 0; i < titleDataLen; i++) {
					let property = attrs[5].properties[i];
					let type = property.fieldData[3].value;
					let width = parseInt(property.fieldData[2].value) + '%';
					let nowrap = property.fieldData[5].fieldData[0].value;
					let wordBreak = nowrap ? 'break-all' : '';
					let whiteSpace = nowrap ? '' : 'nowrap';
					let fontStyle = property.fieldData[6];
					let textAlign=''
					if(fontStyle.fieldData[0].value=='左对齐'){
						textAlign='left'
					}else if(fontStyle.fieldData[0].value=='居中对齐'){
						textAlign='center'
					}else {
						textAlign='right'
					}
					let css = "width:"+width+";text-align:"+textAlign+
					";word-break:"+wordBreak+";white-space:"+whiteSpace+";font-size:"+fontStyle.fieldData[1].value+"px;color:"+
					fontStyle.fieldData[2].value+";font-weight:"+fontStyle.fieldData[3].value+";";
					listTitleData.push({
			            name: attrs[5].properties[i].fieldData[1].value,
			            fieldValue: attrs[5].properties[i].fieldData[0].value,
					    css: css,
						width: width,
						type: type,
						imageStyle: "width:"+property.fieldData[4].value+"%;"
			        })
			    }
				return listTitleData
			},
			isListNumShow(){
				return this.chartData.properties[1].properties[6].editable==1;
			},
			isListIndexShow(){
				return this.chartData.properties[3].editable==1;
			},
			isListBarShow(){
				return this.chartData.properties[4].editable==1;
			},
			isListLightShow(){
				return this.chartData.properties[5].editable==1;
			},
			isHeadShow(){
				return this.chartData.properties[2].editable==1;
			},
			isNumShow(){
				return this.chartData.properties[4].editable==1;
			}
		},
		mounted() {
			if(this.chartData.chartType=='isChart'||this.chartData.chartType=='iswordcloud'||this.chartData.chartType=='isMap'||this.chartData.chartType=='isDashboard'){
				this.initDom()
			}
			this.setChartOptionAttr(this.chartData)
			this.initWebsocket()
			let that = this
			window.addEventListener('resize', () => {
				if(that.chartDom != '') {
					that.chartDom.resize()
				}
			})
		},
		destroyed() {
			// 页面销毁时关闭长连接
			if(this.websock) {
				this.websocketclose()
			}
		},
		methods: {
			//求和
			sum(arr) {
				 var s = 0;
				 for (var i=arr.length-1; i>=0; i--) {
					 s += parseInt(arr[i])
				 }
				 return s;
			},
			initWebsocket() {
				//定时推送静态数据限制
				if(this.chartData.type != 'static' && this.chartData.autoUpdate == 'Y') {
					const wsuri = Urls.websocketUrl // ws地址
					let urls = wsuri + '/' + this.chartData.attr_id
					console.log('socket url :' + urls)
					this.websockt = new WebSocket(urls)
					this.websockt.onopen = this.websocketonopen
					this.websockt.onerror = this.websocketonerror
					this.websockt.onmessage = this.websocketonmessage
					this.websockt.onclose = this.websocketclose
				}

				//地图子组件推送
				if(this.chartData.name=="基础平面地图"){
					let attrArr = this.chartData.attrArr;
					for(let i=0;i<attrArr.length;i++){
						let mapComData = attrArr[i].data_descr.datas;
						if(mapComData.type != 'static' && mapComData.autoUpdate == 'Y'){
							this.mapComIndex = i;
							const wsuri = Urls.websocketUrl // ws地址
							let urls = wsuri + '/' + attrArr[i].attr_id
							console.log('socket url :' + urls)
							this.websockt = new WebSocket(urls)
							this.websockt.onopen = this.websocketonopen
							this.websockt.onerror = this.websocketonerror
							this.websockt.onmessage = this.websocketonmessage
							this.websockt.onclose = this.websocketclose
						}
					}
				}
			},
			websocketonopen() {
				console.log('WebSocket连接成功')
			},
			websocketonerror(e) { // 错误
				console.log('WebSocket连接发生错误')
			},
			websocketonmessage(e) { // 数据接收
//				console.log('socket onmessage:' + e.data)
				if(e.data != "连接成功" && e.data != '') {
					let data = JSON.parse(e.data)
					//添加地图子组件数据限制
					if(this.mapComIndex){
						// console.log('地图子组件')
						this.chartData.attrArr[this.mapComIndex].data_descr.datas.data_value = data
					}else{
						// console.log('其他父组件')
						this.chartData.data = data
					}
					this.setChartOptionAttr(this.chartData)
				}

			},
			websocketclose(e) { // 关闭
				this.websock.close()
				console.log('connection closed ')
			},
			overFream(event){ // 鼠标经过ifream
				let className=event.currentTarget.className
				if(className.indexOf('freamDiv')>-1){ // 可关闭
					 event.currentTarget.firstElementChild.style.display='block'
				}
			},
			outFream(event){ // 鼠标离开ifream
				let className=event.currentTarget.className
				if(className.indexOf('freamDiv')>-1){ // 可关闭
					 event.currentTarget.firstElementChild.style.display='none'
				}
			},
			closeFream(event){ // 关闭fream
				event.currentTarget.nextElementSibling.style.display='none'
			},
			initDom() {
				if(this.chartData.chartType=='isMap'){
					this.$echarts.registerMap('china', chinaJson);
				}
				this.chartDom = this.$echarts.init(document.getElementById(this.chartData.attr_id))
			},
			selectStart(dateObject,dateString){ // 时间选择器选择事件
				// 关联动作
				let item={}
				item[this.chartData.mapped[0].name]=this.configPickr.defaultStart
				item[this.chartData.mapped[1].name]=this.configPickr.defaultEnd
				item.attr_id=this.chartData.attr_id
				console.log(JSON.stringify(item))
				this.postClickToService(item)
			},
			selectChanged(){ // 下拉框选择器选择事件
				let item={}
				item[this.chartData.mapped[0].name]=this.selectTarget
				item.attr_id=this.chartData.attr_id
				console.log(JSON.stringify(item))
				this.postClickToService(item)
			},
			setChartOptionAttr(currentChartData) {
				//判断如果开启数据联动
				let attrs = currentChartData.properties
				let arr = currentChartData.data
				let mapped = currentChartData.mapped
				let chartId=currentChartData.attr_id
				let sourceDiv = $('#'+chartId);
				let openflag=currentChartData.openflag
				let type = '类目型'
				let chartType=currentChartData.chartType
				let cname = currentChartData.name
				if(cname == '基本折线图' || cname == '散点图' || cname == '气泡图') {
					type = attrs[2].properties[1].fieldData[0].value
				}
				console.log(cname)
				let _this = this;
				if(chartType=='isSource'){
					if(cname=="边框"){
						let sourceVal = attrs[1].properties[0].value;
						sourceUtil.borderSwitch(sourceVal,sourceDiv);
					}else if(cname=="装饰"){
						let sourceVal = attrs[1].properties[0].value;
						sourceDiv.css({"opacity":attrs[1].properties[1].value})
						let positions = attrs[1].properties[0].backgroundPosition;
						sourceUtil.decorateSwitch(sourceVal,sourceDiv,positions)
					}else if(cname=="自定义背景块"){
						let imageUrl = this.imageUrl;
						backgroundUtil.setOption(attrs,sourceDiv,imageUrl);
					}else if(cname=="时间器"){
						titleUtil.setTimeContainer(attrs,sourceDiv,_this,chartId);
                    }else if(cname=='轮播图'){
						wheelPlantUtil.setOption(this,sourceDiv,arr,attrs,mapped,chartId);
					}

				}else if(chartType=='isDiv'){
					if(cname=='跑马灯'){
						titleUtil.setHorseLamp(sourceDiv,arr,attrs,mapped)
					}else if(cname=='通用标题'){
						titleUtil.setCommonTitle(sourceDiv,arr,attrs,mapped)
					}else if(cname=='视频'){
						videoUtil.videoSet(sourceDiv,arr,attrs,mapped);
					}else if(cname=='状态卡片'){
						statusUtil.setOption(sourceDiv,arr,attrs,mapped);
					}else if(cname=='数字翻牌器'){
						numDoublerUtil.setOption(sourceDiv,arr,attrs,mapped,true);
					}else if(cname=='文字标签'){
						textLabelUtil.setOption(sourceDiv,arr,attrs,mapped);
					}else if(cname=='时间选择器'){
						let options=titleUtil.setTimePickr(sourceDiv,attrs,arr,mapped);
						this.configPickr=options.config
						_this.defaultStart=options.defaultStart
						_this.defaultEnd=options.defaultEnd
					}else if(cname=='下拉选择器'){
						let options=titleUtil.setSelectView(attrs,arr,mapped);
						_this.selectionConfig=options.config
						_this.imgConfig=options.config2
						_this.selectList=options.data
						_this.selectTarget=options.selected
					}
				}else if(chartType=='isList'){//列表
					//清空全局定时器变量
					if(cname=='轮播列表'){
						moveListUtil.setOption(_this,attrs,sourceDiv,arr,_this.chartData.attr_id)
				    }else if(cname=='轮播柱状列表'){
						moveListBarUtil.setOption(_this,attrs,sourceDiv,arr,_this.chartData.attr_id)
					}
				}else if(chartType=='isImage'){
					imgUtil.setSingleImage(sourceDiv,arr,attrs,mapped)
				}else if(chartType=='isIfream'){
					imgUtil.setIfreamConfig(sourceDiv,arr,attrs,mapped,'preview')
				}else if(chartType=='iswordcloud'){
						let datas = chartCommon.getMappedData(arr, mapped, type)
						let leval=this.chartData.sort
						var maskImage = new Image();
						 maskImage.crossOrigin = "Anonymous";
						  let shape=attrs[1].properties[3].value
						 if(shape=='心形'){
						 	shape='heart'
						 }else if(shape=='圆形'){
						 	shape='circle'
						 }else if(shape=='菱形'){
						 	shape='domain'
						 }else if(shape=='三角形'){
						 	shape='trans'
						 }else if(shape=='水滴'){
						 	shape='water'
						 }else if(shape=='叶子'){
						 	shape='leaft'
						 }else{
						 	shape='rect'
						 }

						maskImage.src = require('@/assets/shape/'+shape+'.png');
						let options = wordcloudUtil.setOption(attrs,datas,mapped);
							options.series[0].maskImage=maskImage
							options.grid.zlevel = leval
						let that=this
						maskImage.onload = function() {
							that.chartDom.clear();
							that.chartDom.setOption(options);
						}
				}else if(chartType=='isDashboard'){
					let options=''
					let mapped2 = mapped
					let liquData=''
					if(cname == '基础仪表盘'){
						options=dashboardUtil.setOption(arr,attrs,mapped)
					}else if(cname == '基础水球图'){
						let datas = chartCommon.getMappedData(arr, mapped,type)
						options=waterPoloUtil.setOption(attrs,datas.rData[0])
						liquData=datas.rData[0]
					}
					options.grid.zlevel = this.chartData.sort
					this.chartDom.setOption(options, true)
				}else{
					let datas = chartCommon.getMappedData(arr, mapped, type)
					let seriesIds=datas.stypes
					let xdata = [].concat(datas.xdata)
					let yDatas = datas.sdata
					let options = ''

					if(cname == '基本柱图' || cname == '基本柱状图') {
						options = barUtil.setOption(attrs)
						options.xAxis.data = xdata
						options.series[1].data = datas.ydata[0]
						let s1 = []
						let maxY = Math.max.apply(null, datas.ydata[0])
						let len2 = datas.ydata[0].length
						for(let i = 0; i < len2; i++) {
							s1.push(maxY)
						}
						options.series[0].data = s1
					}else if(cname == '水平基本柱图'|| cname == '垂直基本柱图'||cname == '水平胶囊柱图'|| cname == '垂直胶囊柱图'){
							var arrs=datas.ydata;
							var val=[];
							for(var i=0;i<arrs.length;i++){
								for(var k=0;k<arrs[i].length;k++){
									if(!val[k]){
										val[k]=[];
									}
									val[k].push(arrs[i][k])
								}
							}
							 var newarrr=[];
							 for(var i=0;i<val.length;i++){
								newarrr.push(this.sum(val[i]));
							 }
								let maxs = Math.max.apply(null, newarrr)
								let leng2=newarrr.length;
								let series0=[];
							for(var i=0;i<leng2;i++){
								series0.push(maxs)
							}
							var btype=''
							if(cname == '水平基本柱图'){
								btype='level'
							}else if(cname == '垂直基本柱图'){
								btype='vertical'
							}else if(cname == '水平胶囊柱图'){
								btype='lcapsule'
							}else if(cname == '垂直胶囊柱图'){
								btype='vcapsule'
							}
							options = basicBarUtil.setOption(attrs,btype,datas,series0,this.chartData.attr_id,arr,mapped)

					}else if(cname == '基本饼图') {
						options = pieUtil.setOption(attrs)
						let dataArray = [];
						let yData = datas.ydata[0];
						let xData = datas.xdata;
						let len = yData.length
						for(let i=0;i<len;i++){
							let obj = {
								name: xData[i],
								value: yData[i]
							}
							dataArray.push(obj)
						}
						options.series[0].data = dataArray;
					}else if(cname == '基本饼图') {
						options = pieUtil.setOption(attrs)
						let dataArray = [];
						let yData = datas.ydata[0];
						let xData = datas.xdata;
						let len = yData.length
						for(let i=0;i<len;i++){
							let obj = {
								name: xData[i],
								value: yData[i]
							}
							dataArray.push(obj)
						}
						options.series[0].data = dataArray;
					}else if(cname == '指标对比饼图') {
						options = indexComparPieUtil.setOption(attrs);
						let dataArray = [];
						let yData = datas.ydata[0];
						let xData = datas.xdata;
						let len = yData.length
						for(let i=0;i<len;i++){
							let obj = {
								name: xData[i],
								value: yData[i]
							}
							dataArray.push(obj)
						}
						options.series[0].data = dataArray;
					}else if(cname == '带图饼图'){
						options = pieWithImgUtil.setOption(attrs, sourceDiv);
						let dataArray = [];
						let yData = datas.ydata[0];
						let xData = datas.xdata;
						let len = yData.length
						for(let i=0;i<len;i++){
							let obj = {
								name: xData[i],
								value: yData[i]
							}
							dataArray.push(obj)
						}
						options.series[0].data = dataArray;
					}else if(cname == '多维度饼图'){
						let dataArray = [];
						let yData = datas.ydata[0];
						let xData = datas.xdata;
						let len = yData.length
						for(let i=0;i<len;i++){
							let obj = {
								name: '11',
								value: yData[i],
								itemStyle: {
									normal: {
										color: 'transparent'
									}
								},
								label: {
									show: false
								}
							}
							dataArray.push(obj)
						}
						options = mutidimenPieUtil.setOption(attrs, sourceDiv, dataArray, xData);
					}else if(cname == '单值百分比饼图'){
						options = onlyPercentPieUtil.setOption(attrs, datas.xdata[0]);
					} else if(cname == '标注对比饼图'){
						options = markpieUtil.setOption(attrs);
						let dataArray = [];
						let yData = datas.ydata[0];
						let xData = datas.xdata;
						let len = yData.length
						for(let i=0;i<len;i++){
							let obj = {
								name: xData[i],
								value: yData[i]
							}
							dataArray.push(obj)
						}
						options.series[0].data = dataArray;
					}else if(cname == '轮播饼图'){
						let rData = [];
						for(let r=0;r<datas.rData.length;r++){
							rData.push(datas.rData[r][0])
						}
						options = carouselPieUtil.setOption(attrs,this.chartDom,rData,mapped,sourceDiv,this.chartData.attr_id,_this);
					}else if(cname == '占比饼图'){
						options = proportionPieUtil.setOption(attrs,datas.rData[0],mapped,sourceDiv);
					}else if(cname=='基本雷达图'){
						options = basicRadarUtil.setOption(attrs,datas);
					}else if(cname=='进度条'){
						options=progressUtil.setOption(attrs,xdata)
					}else if(cname=='基础平面地图'){
						let attrArr = this.chartData.attrArr;
						options = basicMapUtil.setOption(attrs,attrArr,sourceDiv);
					}else if(cname == '3D平面中国地图'){
						let datas = chartCommon.getMappedData(arr, mapped,type);
						let attrArr = this.chartData.attrArr;
						options = chinaMapThreeDUtil.setOption(attrs,attrArr,datas);
					}else if(cname=="弧形柱图"){
						options = arcBarUtil.setOption(attrs,datas);
					}else if(cname == '水平分组柱图'||cname == '垂直分组柱图'){
						options = groupBarUtil.setOption(attrs,cname,datas)
					}else if(cname=="折线柱图"){
						options = chartBarUtil.setOption(attrs,datas);
					}else if(cname=="双轴折线图"){
						options = doublChartUtil.setOption(attrs,datas);
					}else {
						let seriesLength = '',seriesArr=[]
						let yDatas1 = datas.sdata
						if(cname == '基本折线图') {
							options = chartUtil.setOption(attrs, xdata)
							seriesLength = attrs[5].properties.length
							seriesArr=attrs[5].properties
						} else if(cname == '散点图') {
							options = scatterUtil.setOption(attrs, xdata)
							seriesLength = attrs[5].properties.length
							seriesArr=attrs[5].properties
						} else if(cname == '气泡图') {
							options = bubbleUtil.setOption(attrs, xdata,datas.ydata)
							seriesLength = attrs[6].properties.length
							seriesArr=attrs[6].properties
						}else if(cname == '斑马柱图') {
							options = zebraBarUtil.setOption(attrs,'vertical')
							seriesLength= attrs[6].properties.length
							seriesArr=attrs[6].properties
						}else if(cname == '水平斑马柱图') {
							options = zebraBarUtil.setOption(attrs,'level')
							seriesLength= attrs[6].properties.length
							seriesArr=attrs[6].properties
						}
						let yData=''
						if(cname == '水平斑马柱图'){
							options.yAxis.data = xdata
							yDatas=datas.ydata
						}else{
							options.xAxis.data = xdata
							yDatas=datas.sdata
						}

						let types=datas.stypes
						for(let i = 0; i < seriesLength; i++) {
							if(yDatas[i]) {
								options.series[i].data = yDatas[i]
								if(options.series[i].name==''){ // 如果系列名称为空，则显示编号s值
									options.series[i].name=types[i]
								}
							} else {
								options.series[i].data = []
							}
						}
						let ydataLen = yDatas.length
						/*if(ydataLen > seriesLength) {
							for(let yl = seriesLength; yl < ydataLen; yl++) {
								let index = yl % seriesLength
								let series = JSON.parse(JSON.stringify(options.series[0]))
								series.data = yDatas[yl]
								series.name=types[yl]
								let cc=y1%10
								let color=this.basicColor[cc]
								if(cname == '基本折线图') {
									series.areaStyle.color='transparent'
									series.lineStyle.color=color
									series.itemStyle.color=color
								} else if(cname == '散点图'|| cname == '气泡图') {
									series.itemStyle.normal.borderColor=color
									series.itemStyle.normal.color=color
								}
								options.series.push(series)
							}
						}*/
					}
					options.grid.zlevel = this.chartData.sort
					this.chartDom.clear()
					this.chartDom.setOption(options, true)
 				}
				
				if(openflag=='true'){
					this.setChartClick(currentChartData,type,sourceDiv)
				}
			},
			getSelectItem(data,name,pvalue){
				let len=data.length
				for(let i=0;i<len;i++){
					if(data[i][name]==pvalue){
						return data[i]
					}
				}
			},
			getMappedArr(name,mapData){
				let len=mapData.length
				for(let i=0;i<len;i++){
					if(mapData[i].attr_descr.name.indexOf(name)!=-1){
						return JSON.parse(mapData[i].mapped)
					}
				}
			},
			postClickToService(postData){
				this.$store.dispatch('clickToLink',postData)
			},
			setChartClick(currentChartData,ctype,sourceDiv){ // 图表点击事件
				let arr = currentChartData.data
				let data=currentChartData.attrArr
				let mapped = currentChartData.mapped
				let chartId=currentChartData.attr_id
				let type=currentChartData.chartType
				let name = currentChartData.name
				let _this=this
				let item={}
				if(type=='isDiv'){
					if(name=='跑马灯'||name=='通用标题'){
						sourceDiv.find('a').on('click',function(){
							item[mapped[0].name]=$(this).text()
							item.attr_id=chartId
							console.log(JSON.stringify(item))
							_this.postClickToService(item)
						})
					}else if(name=='视频'){
					}else if(name=='状态卡片'){
						sourceDiv.find('.status_line_item').on('click',function(){
							item[mapped[0].name]=$(this).find('.item_content').text()
							item[mapped[1].name]=$(this).attr('attr-id')
							item.attr_id=chartId
							console.log(JSON.stringify(item))
							_this.postClickToService(item)
						})
					}else if(name=='数字翻牌器'){
						sourceDiv.on('click',function(){
							let mvalue=mapped[1].value==''?mapped[1].name:mapped[1].value
							item[mapped[0].name]=$(this).find('.title_num_div').text()
							item[mapped[1].name]=arr[0][mvalue]
							item[mapped[2].name]=$(this).find('.pre_num_div').text()
							item[mapped[3].name]=$(this).find('.suf_num_div').text()
							item.attr_id=chartId
							console.log(JSON.stringify(item))
							_this.postClickToService(item)
						})
					}else if(name=='文字标签'){
						sourceDiv.find('.text_tab').on('click',function(){
							item[mapped[0].name]=$(this).find('span').text()
							item[mapped[1].name]=$(this).attr('attr-id')
							item.attr_id=chartId
							console.log(JSON.stringify(item))
							_this.postClickToService(item)
						})
					}
				}else if(type=='iswordcloud'){
					this.chartDom.on('click',function(params){
						item[mapped[0].name]=params.name
						item[mapped[1].name]=params.value
						item[mapped[2].name]=datas.stypes[params.seriesIndex]
						item.attr_id=chartId
						console.log(JSON.stringify(item))
						_this.postClickToService(item)
					})
				}else if(type=='isDashboard'){
						this.chartDom.on('click',function(params){
							if(name == '基础仪表盘'){
								item[mapped[0].name]=params.value
							}else if(name == '基础水球图'){
								let datas = chartCommon.getMappedData(arr, mapped, ctype)
								let liquData=datas.rData[0]
								let sitem=liquData[params.seriesIndex]
								let len=mapped.length
								for(let i=0;i<len;i++){
									if(mapped[i].value==''){
										item[mapped[i].name]=sitem[mapped[i].name]
									}else{
										item[mapped[i].name]=sitem[mapped[i].value]
									}
								}
							}
						item.attr_id=chartId
						console.log(JSON.stringify(item))
						_this.postClickToService(item)
						})
				}else if(type=='isChart'||type=='isMap'){
					let datas = chartCommon.getMappedData(arr, mapped, ctype)
					this.chartDom.off('click')
					this.chartDom.on('click',function(params){
						console.log(params)
						if(name=='基本折线图'||name=='散点图'||name=='斑马柱图'||name=='水平基本柱图'||name=='垂直基本柱图'||name=='水平胶囊柱图'||name=='垂直胶囊柱图'){
							item[mapped[0].name]=params.name
							item[mapped[1].name]=params.value
							if(name=='水平胶囊柱图'||name=='垂直胶囊柱图'||name=='水平基本柱图'||name=='垂直基本柱图'){
								if(params.seriesIndex==0){
									return
								}else{
									item[mapped[2].name]=datas.stypes[params.seriesIndex-1]
								}
							}else{
								item[mapped[2].name]=datas.stypes[params.seriesIndex]
							}
						}else if(name=='水平分组柱图'||name=='垂直分组柱图'){
							item[mapped[0].name]=params.name
							item[mapped[1].name]=params.value[params.seriesIndex+1]
							item[mapped[2].name]=datas.stypes[params.seriesIndex]
						}else if(name=='双轴折线图'){
							let value=mapped[0].value==''?mapped[0].name:mapped[0].value
							let ditem=_this.getSelectItem(datas.rData[0],value,params.name)
							let mlen=mapped.length
							for(let i=0;i<mlen;i++){
								if(mapped[i].value!=''){
									item[mapped[i].name]=ditem[mapped[i].value]
								}else{
									item[mapped[i].name]=ditem[mapped[i].name]
								}
							}
						}else if(name=='基本柱状图'||name=='弧形柱图'||name=='轮播饼图'||name=='基本饼图'||name=='标注对比饼图'||name=='带图饼图'||name=='指标对比饼图'){
							item[mapped[0].name]=params.name
							item[mapped[1].name]=params.value
						}else if(name=='占比饼图'){
							let gdata=datas.rData[0][0]
							let len=mapped.length
							for(let i=0;i<len;i++){
								if(mapped[i].value!=''){
									item[mapped[i].name]=gdata[mapped[i].value]
								}else{
									item[mapped[i].name]=gdata[mapped[i].name]
								}
							}
							
						}else if(name=='多维度饼图'){
							if(params.name==''){
								return
							}else{
								item[mapped[0].name]=params.name
								item[mapped[1].name]=params.value
							}
						}else if(name=='单值百分比饼图'){
							if(params.seriesIndex==0){
								return
							}else{
								item[mapped[0].name]=params.value
							}
						}else if(name=='折线柱图'){
							if(params.seriesIndex==0){
								return
							}else{
								var index=Math.floor(params.seriesIndex/2)
								let value=mapped[0].value==''?mapped[0].name:mapped[0].value
								let ditem=_this.getSelectItem(datas.rData[index],value,params.name)
								let mlen=mapped.length-1
								for(let i=0;i<mlen;i++){
									if(mapped[i].value!=''){
										item[mapped[i].name]=ditem[mapped[i].value]
									}else{
										item[mapped[i].name]=ditem[mapped[i].name]
									}
								}
								item[mapped[mlen].name]=datas.stypes[index]
							}
						}else if(name=='气泡图'){
							let value=mapped[0].value==''?mapped[0].name:mapped[0].value
							let ditem=_this.getSelectItem(datas.rData[params.seriesIndex],value,params.name)
							let mlen=mapped.length-1
							for(let i=0;i<mlen;i++){
								if(mapped[i].value!=''){
									item[mapped[i].name]=ditem[mapped[i].value]
								}else{
									item[mapped[i].name]=ditem[mapped[i].name]
								}
							}
							item[mapped[mlen].name]=datas.stypes[params.seriesIndex]
						}else if(name=='基本雷达图'){
							item[mapped[0].name]=''
							item[mapped[1].name]=''
							item[mapped[2].name]=datas.stypes[params.dataIndex]
						}else if(name=='进度条'){
							return
						}else if(name=='基础平面地图'){
							if(params.seriesName=='thermodynamic'){
								let mid=mapJson.provinceId[params.name]
								let mapped3=''
								let len=data.length
								for(let i=0;i<len;i++){
									if(data[i].attr_descr.name=='区域热力层'){
										if(data[i].openflag){
											item.attr_id=data[i].attr_id
											mapped3=JSON.parse(data[i].mapped)
											break
										}
									}
								}
								if(params.value){
									item[mapped3[0].name]=mid
									item[mapped3[1].name]=params.value
								}else{
									return 
								}
							}else{
								return
							}
						}else if(name=='3D平面中国地图'){
							let mapType=params.seriesName
							let mid=mapJson.provinceId[params.name]
							let mapped4=_this.getMappedArr(mapType,data)
							
							if(mapType=='底图层'){
								item[mapped[0].name]=mid
								item[mapped[1].name]=params.value[0]
								item.attr_id=chartId
							}else if(mapType=='柱状图'){ // 气泡层 相同
								item[mapped4[0].name]=mid
								item[mapped4[1].name]=params.value[2]
								item.attr_id=params.seriesId
							}else{
								return
							}
						}
						if(name !== '基础平面地图'&&name !== '3D平面中国地图'){
							item.attr_id=chartId
						}
						_this.postClickToService(item)
					})
				}
			
			}
		}
	}
</script>

<style>
@import url("../../css/componentStyle.css");
@import url("../../css/wheel.css");
</style>
