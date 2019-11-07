<!--
	作者：2585061200@qq.com
	时间：2018-12-20
	描述：设计页面组件渲染
-->
<template>
	<div :id='chartAttr.attr_id' v-if="chartAttr.attr_descr.type=='isSource'" class="sourceDiv datav-wraper" :class="chartAttr.attr_descr.id">
		<div class="center-wrapper" v-if="chartAttr.tipBoxContent=='时间器'" style="text-align: center;">
			<i class="time-icon fa fa-clock-o"></i><span class="timeDiv"></span>
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='轮播图'" class="center-wrapper" style="position:relative;">
			<div class="wheel_parent" style="position:relative;width:100%;height:100%;overflow: hidden;"><div class="wheel_img"></div></div>
			<div class="wheel_dot"></div>
		</div>
		<div class="bg-inner" v-else></div>
	</div>

	<div :id='chartAttr.attr_id' v-else-if="chartAttr.attr_descr.type=='isDiv'" class="datav-wraper">
		<div class="center-wrapper horseDiv" v-if="chartAttr.tipBoxContent=='跑马灯'">
			<div class="horseContent">
				<a></a>
				<a></a>
				<a></a>
			</div>
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='视频'" class="center-wrapper" >
			<video controls="controls"></video>
			<p class="videop"></p>
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='状态卡片'" class="center-wrapper">
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='数字翻牌器'" class="center-wrapper">
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='文字标签'" class="center-wrapper">
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='时间选择器'" class="center-wrapper">
			<div class="time_pickr">
				<flat-pickr v-model="configPickr.defaultStart" :config="configPickr.config" @on-close="selectStart" class="date_pickr"></flat-pickr>
				<span class="time_delimiter">至</span>
				<flat-pickr v-model="configPickr.defaultEnd" :config="configPickr.config" @on-close="selectStart" class="date_pickr"></flat-pickr>
			</div>
		</div>
		<div v-else-if="chartAttr.tipBoxContent=='下拉选择器'" class="center-wrapper" style="display: flex;justify-content: center;align-items: center;" >
			<selectionView :config="selectionConfig" :config2="imgConfig" :dataList="selectList" v-model="selectTarget"></selectionView>
		</div>
		<div v-else class="center-wrapper"><a></a></div>
	</div>

	<div :id='chartAttr.attr_id' v-else-if="chartAttr.attr_descr.type=='isList'" class="datav-wraper" :class="chartAttr.attr_descr.id">
		<div v-if="chartAttr.tipBoxContent=='轮播列表'" class="list-box">
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
	<div :id='chartAttr.attr_id' v-else-if="chartAttr.attr_descr.type=='isImage'" style="width:100%;height:100%;" class="datav-wraper">
		<a style="width:100%;height:100%;" ><img style="width:100%;height:100%;" /></a>
	</div>
	<div :id='chartAttr.attr_id' v-else-if="chartAttr.attr_descr.type=='isIfream'" style="width:100%;height:100%;position:relative;" class="datav-wraper">
		<i style="position:absolute;top:5px;right:5px; font-size:35px;display:none;" class="fa fa-times-circle-o"></i>
		<iframe class="ifream_div" style="width:100%;height:100%;" frameborder="0" ></iframe>
	</div>
	<div :id='chartAttr.attr_id' v-else-if="chartAttr.attr_descr.type=='isDashboard'" class="datav-wraper" style="width:100%;height:100%;"></div>
	<div :id='chartAttr.attr_id' v-else-if="chartAttr.attr_descr.type=='iswordcloud'" class="datav-wraper" style="width:100%;height:100%;"></div>
	<div :id='chartAttr.attr_id' v-else class="datav-wraper" style="width:100%;height:100%;"></div>

</template>
<script>
	import chartCommon from '@/publicService/chartCommon.js'
	import basicUtil from '@/components/setOption/basicUtil.js'
	import sourceUtil from '@/components/setOption/div/sourceUtil.js'
	import barUtil from '@/components/setOption/allBarUtil/barUtil.js'
	import chartUtil from '@/components/setOption/chartUtil.js'
	import pieUtil from '@/components/setOption/pie/pieUtil.js'
	import indexComparPieUtil from '@/components/setOption/pie/indexComparPieUtil.js'
	import markpieUtil from '@/components/setOption/pie/markpieUtil.js'
	import pieWithImgUtil from '@/components/setOption/pie/pieWithImgUtil.js'
	import mutidimenPieUtil from '@/components/setOption/pie/mutidimenPieUtil.js'
	import onlyPercentPieUtil from '@/components/setOption/pie/onlyPercentPieUtil.js'
	import carouselPieUtil from '@/components/setOption/pie/carouselPieUtil.js'
	import proportionPieUtil from '@/components/setOption/pie/proportionPieUtil.js'
	import scatterUtil from '@/components/setOption/scatterUtil.js'
	import bubbleUtil from '@/components/setOption/bubbleUtil.js'
	import titleUtil from '@/components/setOption/titleUtil.js'
	import moveListUtil from '@/components/setOption/div/moveListUtil.js'
	import moveListBarUtil from '@/components/setOption/div/moveListBarUtil.js'
	import imgUtil from '@/components/setOption/div/imageUtil.js'
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
	import selectionView from '@/components/selections.vue'
	export default {
		props: ['chartAttr', 'chartIndex'],
		components: {
			'selectionView':selectionView
		},
		data() {
			return {
				basicChart: '',
				lastOption: '',
				configPickr:{
					defaultStart:'2019-08-25 18:00:00',
					defaultEnd:'2019-08-26 18:00:00',
					config: {
						dateFormat: 'Y-m-d H:i',
						altFormat: 'Y-m-d H:i',
						enableTime: true,
						hourIncrement:1,
						minuteIncrement: 1,
						allowInput: true,
						minDate: '',
						maxDate: '',
						time_24hr: true
					}
				},
				selectTarget:'',
				selectionConfig:{},
				imgConfig:{},
				selectList:[]
			}
		},
		computed: {
			moveListData(){
				return this.chartAttr.data_descr.datas.data_value
			},
			moveListBarData(){
				let moveListBarData = [];
				let datas = this.chartAttr.data_descr.datas.data_value;
				let mapped = this.chartAttr.data_descr.mapped;
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
				let attrs = this.chartAttr.attr_descr.properties;
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
					let css = "width:"+width+";text-align:"+titleTextAlignObj[fontStyle.fieldData[0].value]+
					";word-break:"+wordBreak+";white-space:"+whiteSpace+";font-size:"+fontStyle.fieldData[1].value+"px;;color:"+
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
				return this.chartAttr.attr_descr.properties[1].properties[6].editable==1;
			},
			isListIndexShow(){
				return this.chartAttr.attr_descr.properties[3].editable==1;
			},
			isListBarShow(){
				return this.chartAttr.attr_descr.properties[4].editable==1;
			},
			isListLightShow(){
				return this.chartAttr.attr_descr.properties[5].editable==1;
			},
			isHeadShow(){
				return this.chartAttr.attr_descr.properties[2].editable==1;
			},
			isNumShow(){
				return this.chartAttr.attr_descr.properties[4].editable==1;
			}
		},
		watch: {
			chartAttr: {
				handler(newValue, oldValue) {
					this.setChartOption()
					if(this.basicChart != '') { //图形属性改变，图形动态改变
						this.basicChart.resize()
					}　
				},
				　deep: true
			}
		},
		created() {
		},
		mounted() {
			this.setChartOption()
			let that = this
			window.addEventListener('resize', () => { // 页面resize 事件，图形动态改变
				if(that.basicChart != '') {
					that.basicChart.resize();
				}
			})
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
			initChart() {
				if(this.chartAttr.attr_descr.type=='isMap'){
					this.$echarts.registerMap('china', chinaJson);
				}
				this.basicChart = this.$echarts.init(document.getElementById(this.chartAttr.attr_id))
			},
			selectStart(){
				
			},
			// 图形渲染
			setChartOption() {
				let type = this.chartAttr.tipBoxContent
				let attrs = this.chartAttr.attr_descr.properties
				let arr = this.chartAttr.data_descr.datas.data_value
				let mapped = this.chartAttr.data_descr.mapped
				let sourceDiv = $('#'+this.chartAttr.attr_id)
				let type2='类目型'
				if(type == '基本折线图'||type == '散点图'||type == '气泡图'){
					type2=attrs[2].properties[1].fieldData[0].value
				}
				let _this = this;
				console.log('type:'+type)
				if(this.chartAttr.attr_descr.type=='isSource'){
					if(type=="边框"){
                        let sourceVal = attrs[1].properties[0].value;
						sourceUtil.borderSwitch(sourceVal,sourceDiv)
					}else if(type=="装饰"){
                        let sourceVal = attrs[1].properties[0].value;
						sourceDiv.css({"opacity":attrs[1].properties[1].value})
						let positions = attrs[1].properties[0].backgroundPosition;
						sourceUtil.decorateSwitch(sourceVal,sourceDiv,positions)
					}else if(type=="自定义背景块"){
						let imageUrl = this.imageUrl;
						backgroundUtil.setOption(attrs,sourceDiv,imageUrl);
                    }else if(type=="时间器"){
						titleUtil.setTimeContainer(attrs,sourceDiv,_this,this.chartAttr.attr_id);
                    }else if(type=='轮播图'){
						wheelPlantUtil.setOption(_this,sourceDiv,arr,attrs,mapped,_this.chartAttr.attr_id);
					}
				}else if(this.chartAttr.attr_descr.type=='isDiv'){
					if(type=='跑马灯'){
						titleUtil.setHorseLamp(sourceDiv,arr,attrs,mapped)
					}else if(type=='通用标题'){
						titleUtil.setCommonTitle(sourceDiv,arr,attrs,mapped)
					}else if(type=='视频'){
						videoUtil.videoSet(sourceDiv,arr,attrs,mapped);
					}else if(type=='状态卡片'){
						statusUtil.setOption(sourceDiv,arr,attrs,mapped);
					}else if(type=='数字翻牌器'){
						numDoublerUtil.setOption(sourceDiv,arr,attrs,mapped,false);
					}else if(type=='文字标签'){
						textLabelUtil.setOption(sourceDiv,arr,attrs,mapped);
					}else if(type=='时间选择器'){
						let options=titleUtil.setTimePickr(sourceDiv,attrs,arr,mapped);
						_this.configPickr=JSON.parse(JSON.stringify(options))
					}else if(type=='下拉选择器'){
						let options=titleUtil.setSelectView(attrs,arr,mapped);
						console.log(JSON.stringify(options))
						_this.selectionConfig=options.config
						_this.imgConfig=options.config2
						_this.selectList=options.data
						_this.selectTarget=options.selected
					}
				}else if(this.chartAttr.attr_descr.type=='isList'){//列表
					if(type=='轮播列表'){
						moveListUtil.setOption(_this,attrs,sourceDiv,arr,this.chartAttr.attr_id)
					}else if(type=='轮播柱状列表'){
						moveListBarUtil.setOption(_this,attrs,sourceDiv,arr,this.chartAttr.attr_id)
					}
				}else if(this.chartAttr.attr_descr.type=='isImage'){
					imgUtil.setSingleImage(sourceDiv,arr,attrs,mapped)
				}else if(this.chartAttr.attr_descr.type=='isIfream'){
					imgUtil.setIfreamConfig(sourceDiv,arr,attrs,mapped,'notPreview')
				}else if(this.chartAttr.attr_descr.type=='iswordcloud'){
					this.initChart()
					let datas = chartCommon.getMappedData(arr, mapped,type2)
					let leval=this.chartAttr.sort
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
						options.series[0].maskImage=maskImage;
						options.grid.zlevel = leval;

					let that=this;
					maskImage.onload = function() {
						that.basicChart.clear();
						that.basicChart.setOption(options);
					}
				}else if(this.chartAttr.attr_descr.type=='isDashboard'){
					let options=''
					if(type == '基础仪表盘'){
						options=dashboardUtil.setOption(arr,attrs,mapped)
					}else if(type == '基础水球图'){
						let datas = chartCommon.getMappedData(arr, mapped,type2)
						options=waterPoloUtil.setOption(attrs,datas.rData[0])
					}
					options.grid.zlevel = this.chartAttr.sort
					this.initChart()
					this.basicChart.clear();
					this.basicChart.setOption(options, true)
				}else{
					this.initChart()
					let datas = chartCommon.getMappedData(arr, mapped,type2)
					let xdata = [].concat(datas.xdata)
					let yDatas = datas.sdata
					let options = ''
					if(type == '基本柱状图'){
						options = barUtil.setOption(attrs)
						options.series[1].data = datas.ydata[0]
						let s1 = []
						let maxY = Math.max.apply(null, datas.ydata[0])
						let len2 = datas.ydata[0].length
						for(let i = 0; i < len2; i++) {
							s1.push(maxY)
						}
						options.series[0].data = s1
						options.xAxis.data = xdata
					}else if(type == '水平基本柱图'|| type == '垂直基本柱图'||type == '水平胶囊柱图'|| type == '垂直胶囊柱图'){
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
						let newArr1=[]
						newArr1.push(series0)
						var btype=''
						if(type == '水平基本柱图'){
							btype='level'
						}else if(type == '垂直基本柱图'){
							btype='vertical'
						}else if(type == '水平胶囊柱图'){
							btype='lcapsule'
						}else if(type == '垂直胶囊柱图'){
							btype='vcapsule'
						}
						options = basicBarUtil.setOption(attrs,btype,datas,series0,this.chartAttr.attr_id,arr,mapped)
					}else if(type == '水平分组柱图'||type == '垂直分组柱图'){
						options = groupBarUtil.setOption(attrs,type,datas)
					}else if(type == '基本饼图'){
						options = pieUtil.setOption(attrs);
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
					}else if(type == '指标对比饼图'){
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
					}else if(type == '带图饼图'){
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
					}else if(type == '多维度饼图'){
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
								}
							}
							dataArray.push(obj)
						}
						options = mutidimenPieUtil.setOption(attrs, sourceDiv, dataArray, xData);
					}else if(type == '单值百分比饼图'){
						options = onlyPercentPieUtil.setOption(attrs, datas.xdata[0]);
					}else if(type == '轮播饼图'){
						let rData = [];
						for(let r=0;r<datas.rData.length;r++){
							rData.push(datas.rData[r][0])
						}
						options = carouselPieUtil.setOption(attrs, this.basicChart,rData,mapped,sourceDiv,this.chartAttr.attr_id,_this);
					}else if(type == '占比饼图'){
						options = proportionPieUtil.setOption(attrs,datas.rData[0],mapped,sourceDiv);
					}else if(type=='进度条'){
						options=progressUtil.setOption(attrs,xdata)
					}else if(type == '基础平面地图'){
						let attrArr = this.chartAttr.attrArr;
						options = basicMapUtil.setOption(attrs,attrArr,sourceDiv);
						console.log(JSON.stringify(options))
					}else if(type == '3D平面中国地图'){
						let datas = chartCommon.getMappedData(arr, mapped,type2)
						let attrArr = this.chartAttr.attrArr;
						options = chinaMapThreeDUtil.setOption(attrs,attrArr,datas);
					}else if(type=="标注对比饼图"){
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
					}else if(type=="基本雷达图"){
						options = basicRadarUtil.setOption(attrs,datas);
					}else if(type=="弧形柱图"){
						options = arcBarUtil.setOption(attrs,datas);
					}else if(type=="折线柱图"){
						options = chartBarUtil.setOption(attrs,datas);
					}else if(type=="双轴折线图"){
						options = doublChartUtil.setOption(attrs,datas);
					}else{//x轴有日期格式
						let seriesLength=''
						if(type == '基本折线图') {
							options = chartUtil.setOption(attrs, xdata)
							seriesLength= attrs[5].properties.length
						} else if(type == '散点图') {
							options = scatterUtil.setOption(attrs, xdata)
							seriesLength= attrs[5].properties.length
						} else if(type == '气泡图') {
							options = bubbleUtil.setOption(attrs, xdata,datas.ydata)
							seriesLength= attrs[6].properties.length
						}else if(type == '斑马柱图') {
							options = zebraBarUtil.setOption(attrs,'vertical')
							seriesLength= attrs[6].properties.length
						}else if(type == '水平斑马柱图') {
							options = zebraBarUtil.setOption(attrs,'level')
							seriesLength= attrs[6].properties.length
						}
						if(type=='水平斑马柱图'){
							options.yAxis.data = xdata
							yDatas=datas.ydata
						}else{
							options.xAxis.data = xdata
						}
						console.log(JSON.stringify(datas))
						let stypes=datas.stypes // 数据系列编号s
						let sortArr=[]
						let typeLen=stypes.length
						for(let i = 0; i < seriesLength; i++) {
							if(yDatas[i]) {
								options.series[i].data = yDatas[i]
								if(options.series[i].name==''){ // 如果系列名称为空，则显示编号s值
									options.series[i].name=stypes[i]
								}
								if(type == '基本折线图'||type == '散点图') {
									this.$store.state.leftEditMainData[this.chartIndex].attr_descr.properties[5].properties[i].sid=stypes[i]
								} else if(type == '气泡图'||type=='斑马柱图') {
									this.$store.state.leftEditMainData[this.chartIndex].attr_descr.properties[6].properties[i].sid=stypes[i]
								}
							} else {
								options.series[i].data = []
							}
						}
						/*let ydataLen = yDatas.length
						if(ydataLen > seriesLength) {
							for(let yl = seriesLength; yl < ydataLen; yl++) {
								let index = yl % seriesLength
								let series = JSON.parse(JSON.stringify(options.series[index]))
								series.data = yDatas[yl]
								series.name=stypes[y1]
								options.series.push(series)
							}
						}*/
					}
					options.grid.zlevel = this.chartAttr.sort;
					let ifOptionSame = $.trim(this.lastOption)==$.trim(JSON.stringify(options));
					if(!ifOptionSame){
						this.basicChart.clear();
						this.basicChart.setOption(options, true);
					}
					this.lastOption = JSON.stringify(options);//上一次的options
				}
			},
		}
	}
</script>

<style>
@import url("../../css/wheel.css");
@import url("../../css/componentStyle.css");
</style>
