<template lang="html">
	<div class="edit-wrap">
		<div class="edit-header">
			<router-link class="go-back" to="/">
				<i class="icon fa fa-chevron-left" aria-hidden="true"></i>
				<div class="header-tip-box">
					<p class="tip-box-content">返回</p>
				</div>
			</router-link>
			<ul class="components-menu">
				<li class="components-group" v-for="data in componentsMenuData" :key="data.chart_id" @mouseover="comGroupItemOver(data)">
					<i class="components-font icon fa" :class="data.iconName" aria-hidden="true"></i>
					<div class="header-tip-box">
						<p class="tip-box-content">{{data.tipBoxContent}}</p>
					</div>
					<div class="components-lists-wrap" :class="data.listsWrapName" @mouseover.stop>
						<div class="components-lists">
							<li class="components-group" :class="{'selected':iconData.chart_id==selectchartID}" :key="iconData.chart_id"  v-for="(iconData,index) in data.child" @mouseover="comListItemOver(iconData,index,data.listsWrapName)" @mouseout="comListItemOut(data.listsWrapName,index)">
								<i class="components-font icon fa" :class="iconData.iconName"></i>
								<div class="header-tip-box-in">
									<p class="tip-box-content-in">{{iconData.tipBoxContent}}</p>
								</div>
							</li>
						</div>
						<div class="chart-wrap" v-show="chartWarpShow">
							<div class="chart-box" v-for="chartData in chartDatas" @click="charImgClick(chartData)">
								<div class="chart-img" :title="chartData.tipBoxContent">
									<img :src="imageurl+chartData.chartImgUrl" alt="" >
								</div>
								<p class="chart-content">{{chartData.tipBoxContent}}</p>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div class="loading-indicator"></div>
			<div class="header-others">
				<div class="other-tab icon-width" v-for="data in headerOthersData">
					<i class="icon components-font fa" :class="data.iconName" @click="clickHeadMenu(data.tipBoxContent)"></i>
					<div class="header-tip-box">
						<p class="tip-box-content">{{data.tipBoxContent}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="edit-main">
			<div class="left-edit-main edit-main-child">
				<div class="layer-manager">
					<div class="layer-manager-head">
						图层
						<div class="layer-manager-layout-selector">
							<i class="icon fa fa-th-list" :class="listType=='item'?'selected':''" @click="setListType('item')"></i>
							<i class="icon fa fa-align-justify" :class="listType=='list'?'selected':''" @click="setListType('list')"></i>
						</div>
					</div>
					<div class="layer-toolbar layer-toolbar-top">
						<i class="icon layer-toolbar-icon fa fa-arrow-up" :class="layerToolbarOpacity" @click="move('up')" title="上移一层"></i>
						<i class="icon layer-toolbar-icon fa fa-arrow-down" :class="layerToolbarOpacity" @click="move('down')" title="下移一层"></i>
						<i class="icon layer-toolbar-icon fa fa-upload" :class="layerToolbarOpacity" @click="move('first')" title="置顶"></i>
						<i class="icon layer-toolbar-icon fa fa-download" :class="layerToolbarOpacity" @click="move('last')" title="置底"></i>
					</div>
					<div class="layer-manager-wrap" ref='parant'>
						<!--getCurrentModule(thumbailData.sort)-->
						<li class="layer-manager-item" v-for="(thumbailData,index) in leftMenuList" :key="thumbailData.attr_id" :class="getCurrentModule(thumbailData.sort)" :title="thumbailData.tipBoxContent" draggable="true" @dragstart="dragStart($event)" @dragover="dragOver($event)" @drop="drop($event)" @dragend="dragEnd" @click="thumbailItemClick(index)">
							<img v-if="listType=='item'" :src="imageurl+thumbailData.chartImgUrl" alt="" class="layer-item-thumbail">
							<i class="fa" :class="thumbailData.iconName" v-else></i>
							<div class="layer-manager-thumbail">
								<span class="layer-item-span">{{thumbailData.tipBoxContent}}</span>
								<span class="sort-number">{{thumbailData.sort}}</span>
							</div>
							<div class="layer-thumbail-item"></div>
						</li>
						<div class="layer-move-to-line" :style="{ transform: lineStyle }" v-show="startDrag"></div>
					</div>
					<div class="layer-toolbar layer-toolbar-bottom">
						<i class="icon layer-toolbar-icon fa fa-trash-o" :class="layerToolbarOpacity" title="删除" @click="delIconClick"></i>
					</div>
				</div>
			</div>
			<div class="right-edit-main edit-main-child">
				<div class="canvas-main">
					<div class="canvas-panel-wrap" @click="clickContent($event)" :style="{width:editContentStyle.contentWidth,height:editContentStyle.contentHeight}">
						<div class="screen-shot" :style="{width:editContentStyle.contentWidth,height:editContentStyle.contentHeight}">
							<div class="canvas-panel imageWrapper" ref="imageWrapper" :style="modulAttrs" style="position: absolute;">
								<div class="datav-transform" :class="selectChartID==temp.attr_id?'selected':''" style="cursor: crosshair;" v-for="(temp,tt) in leftEditMainData" :key="temp.attr_id" :style="{width: temp.attr_descr.properties[0].properties[0].fieldData[0].value+'px',
									 height: temp.attr_descr.properties[0].properties[0].fieldData[1].value+'px',
									 opacity:temp.attr_descr.properties[0].properties[2].fieldData[1].value,
									 transform: 'translate('+temp.attr_descr.properties[0].properties[1].fieldData[0].value+'px,'+temp.attr_descr.properties[0].properties[1].fieldData[1].value+'px)'}" @click="selectCurrentChart(temp,tt)">
									<div class="navigator-line" v-if="selectChartID==temp.attr_id">
										<div class="navigator-line-left" :style="{width:temp.attr_descr.properties[0].properties[1].fieldData[0].value+(342.857/zoomIndex)+'px'}"></div>
										<div class="navigator-line-top" :style="{height:temp.attr_descr.properties[0].properties[1].fieldData[1].value+(342.857/zoomIndex)+'px'}"></div>
										<div class="navigator-line-account" :style="linesStyle">{{temp.attr_descr.properties[0].properties[1].fieldData[0].value}}, {{temp.attr_descr.properties[0].properties[1].fieldData[1].value}}
										</div>
									</div>
									<div class="datav-scale">
										<div class="datav-com" :style="{transform:'rotate(' + temp.attr_descr.properties[0].properties[2].fieldData[0].value + 'deg)'}" :class="((hoverChartID==temp.attr_id)&&!(selectChartID==temp.attr_id))?'hovered':''" @mouseover="mouseoverChart(temp)" @mouseout="mouseoutChart">
											<!--<div class="transform-handler" :class="{'hide':!(selectChartID==temp.attr_id)}" draggable="true" @dragstart="dragChartStart($event,tt)" @drag="" @dragend="dragChartEnd($event,tt)">-->
											<div class="transform-handler" @mousedown.stop="chartMove($event,tt)">
												<!-- echarts图组件渲染 -->
												<chartBasic v-if="temp.tipBoxContent" :chartIndex="tt" :chartAttr="temp"></chartBasic>
												<i class="top-handler"><span class="control-point top-center"  style="cursor: ns-resize;"></span></i>
												<i class="top-right-handler"><span class="rotate-handler" ><span class="control-point top-right" style="cursor: nesw-resize;" ></span></span></i>
												<i class="right-handler"><span class="control-point right-center" style="cursor: ew-resize;"></span></i>
												<i class="bottom-right-handler"><span class="rotate-handler"><span class="control-point bottom-right" style="cursor: nwse-resize;"></span></span></i>
												<i class="bottom-handler"><span class="control-point bottom-center" style="cursor: ns-resize;"></span></i>
												<i class="bottom-left-handler"><span class="rotate-handler"><span class="control-point bottom-left" style="cursor: nesw-resize;"></span></span></i>
												<i class="left-handler"><span class="control-point left-center" style="cursor: ew-resize;"></span></i>
												<i class="top-left-handler"><span class="rotate-handler"><span class="control-point top-left" style="cursor: nwse-resize;"></span></span></i>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="edit-slider">
						<div class="slider">
							<i class="icon slider-icon fa fa-minus-square-o" @click="zoomOut"></i>
							<input type="range" min="1" max="10" step="1" class="input-range" v-model="zoomIndex" :style="{background:backgroundColor}">
							<i class="icon slider-icon fa fa-plus-square-o" @click="zoomIn"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="config-manager-container">
				<div class="config-manager">
					<!-- 存在懒加载问题，vue懒加载组件 -->
					<tempProperty v-if="selectChartID=='module'" :templateProperty="templateProperty" :moId="temObject.mo_id" :coverImage="coverImage" @intercept='interceptCover'></tempProperty>
					<barConfig v-else :chartAttrs="selectedChart" :chartId="selectChartID"></barConfig>
				</div>
				<div class="panel-toggler">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TempProperty from '../components/templateProperty.vue';
	import httpService from '../publicService/HttpService';
	import Urls from '../publicService/urls';
	import chartBasic from '../components/chartComponents/chartBasic.vue';
	import barConfig from '../components/barConfig.vue';
	import html2canvas from 'html2canvas'  // 截图插件
	import commonUtil from '../publicService/commonUtls.js'
	export default {
		components: {
			'tempProperty': TempProperty, // 模板配置组件
			'barConfig': barConfig, // 样式数据配置组件
			'chartBasic':chartBasic // 图形渲染组件
		},
		data() {
			return {
				selectChartID: 'module', // 选中图形id
				hoverChartID: 'module', // hover图形id
				selectedChart: '', // 选中图形数据
				selectchartID: '', // 头部菜单中选中的二级菜单图形id
				chartDrag: { // 图形拖拽数据
					dom: '',
					sx: '',
					ex: '',
					sy: '',
					ey: ''
				},
				dragData: {
					'sx': '',
					'ex': '',
					'sy': '',
					'ey': '',

				},
				temObject: {}, // 大屏的id 与name
				startY: 0,
				endY: 0,
				currentModule: null, //列表选中index
				listType: 'item', //列表形式
				startDrag: false,
				chartDatas: '', // 二级菜单数组
				chartWarpShow: false, // 二级菜单是否显示
				lineStyle: '', // 图形列表拖拽过程中显示的标线
				zoomIndex: 4, // 设计板块缩放比例
				componentsMenuData: [], // 头部菜单数组
				coverImage: '', //封面图形url
				headerOthersData: [{ // 菜单操作数组
						iconName: 'fa-desktop',
						tipBoxContent: '预览'
					},
					{
						iconName: 'fa-paper-plane-o',
						tipBoxContent: '发布'
					},
					{
						iconName: 'fa-question-circle-o',
						tipBoxContent: '帮助'
					},
					// {
					// 	iconName: 'fa-exclamation-circle',
					// 	tipBoxContent: '异常'
					// },
				],
				selected: false, // 图形是否选中
				isHover: false, // 是否滑过图形
				imageurl:'', // 图片ip
				winWidth:'', //页面宽
				winHeight:'', //页面高
				temWidth:1920, // 屏幕宽度
			}
		},
		computed: {
			backgroundColor() { // 页脚的页面缩放进度条背景色
				return 'linear-gradient(to right, rgb(0, 251, 255), rgb(0, 176, 255)' + this.zoomIndex + '%, rgb(38, 42, 53)' + this.zoomIndex * 11.11 + '%, rgb(38, 42, 53))'
			},
			layerToolbarOpacity(){ // 图形列表中上下移，置顶置底，是否展示操作，若有图形选中显示
				let data=''
				if(this.selectChartID=='module'){
					data='opacity2'
				}else{
					data='opacity1'
				}
				return data
			},
			leftEditMainData() { // 获取所有图形（正序）
				let arr2 = this.$store.state.leftEditMainData
				let state = this.$store.state.addChartState
				if(state) { // 添加图形而更新元素
					this.currentModule = 0
					this.$store.state.addChartState = false
				}
				if(arr2.length > 0) {
					if(this.currentModule != null) { // 当前选中图形不是空，即删除时
						let ii = arr2.length - this.currentModule - 1
						if(ii < 0) {
							ii = 0
						}
						this.selectChartID = arr2[ii].attr_id
						this.selectedChart = arr2[ii]
					}
				} else {
					this.currentModule = null
					this.selectChartID = 'module'
				}
				return this.$store.state.leftEditMainData
			},
			leftMenuList() { // 获取图形列表 （菜单倒序展示，与层级相关）
				let arr = [].concat(this.$store.state.leftEditMainData)
				let arr3 = arr.reverse()
				return arr3
			},
			modulAttrs() { // 模板背景设置
				let arr = this.$store.state.templateProperty
				let item = {}
				if(JSON.stringify(arr) !== '{}') {
					if(arr.propertyData.length > 0) {
						this.temWidth=arr.propertyData[0].fieldData[0].value
						item.width = arr.propertyData[0].fieldData[0].value + 'px'
						item.height = arr.propertyData[0].fieldData[1].value + 'px'
						if(arr.propertyData[2].fieldData[0].value !== "") {
							let uu = this.imageUrl + arr.propertyData[2].fieldData[0].value
							item.backgroundImage = 'url("' + uu + '")'
							item.backgroundSize = 'cover'
						}
						item.backgroundColor = arr.propertyData[1].fieldData[0].value
						//let cbilv=this.winWidth/arr.propertyData[0].fieldData[0].value
						item.transform = 'scale(' + 0.175 * this.zoomIndex + ') translate(0 , 0 )'
					}
				}
				return item
			},
			templateProperty() { // 获取模板样式
				let arr=this.$store.state.templateProperty
				if(JSON.stringify(arr) !== '{}') {
					if(arr.propertyData.length > 0) {
						this.temWidth=arr.propertyData[0].fieldData[0].value
					}
				}
				return arr
			},
			editContentStyle() { // 模板样式
				let width = this.winWidth
				let height = this.winHeight
				let arr = this.$store.state.templateProperty
				let item = {}
				let ww1 = width + 'px',
					ww2 = width + 'px',
					hh1 = height + 'px',
					hh2 = height + 'px'
				if(JSON.stringify(arr) !== '{}') {
					let w1 = arr.propertyData[0].fieldData[0].value
					let h1 = arr.propertyData[0].fieldData[1].value

					ww1 = width - 485 + 'px'
					hh1 = height - 70 + 'px'

					ww2 = w1 * 0.175 * this.zoomIndex + 'px'
					hh2 = h1 * 0.175 * this.zoomIndex + 'px'
				}
				item.contentWidth = ww1
				item.contentHeight = hh1
				item.editWidth = ww2
				item.editHeight = hh2
				return item
			},
			linesStyle() { // 选中图形标尺线坐标参数
				let item = {}
				let size = 34.2857 / this.zoomIndex
				let font = size * 2
				item.fontSize = font + 'px'
				item.top = -size + 'px'
				item.left = -size + 'px'
				return item
			},
		},
		mounted() {
			this.winWidth=document.body.clientWidth
			this.winHeight=document.body.clientHeight
			this.getZoomindex(this)
			let tempId = this.$route.query.tempId;
			let tempName = this.$route.query.tempName;
			this.temObject.mo_id = tempId
			this.temObject.mo_name = tempName
			let that = this;
			//请求顶部导航数据
			httpService.getLink(Urls.getChartNodes)
				.then(function(res) {
					that.componentsMenuData = res;
				}).catch(function(error) {
					console.log(error);
				})
			let data = {
				mo_id: tempId
			}
			this.$store.dispatch('getLeftEditMain', data)
			this.$store.dispatch('getTemplateBgProperty', data)
			this.$store.dispatch('getDataList') // 获取所有数据源
			this.imageurl=this.imageUrl
			window.addEventListener('resize', () => {  // 页面大小改变监听，改变设计板块大小
				that.winWidth=document.body.clientWidth
				that.winHeight=document.body.clientHeight
				that.getZoomindex(that)
			})
		},
		methods: {
			getZoomindex(that){ // 自适应设计模块大小
				let cwidth=that.winWidth-485-60-144;
				let ss=cwidth/that.temWidth
				that.zoomIndex=ss/0.175
			},
			mouseoverChart(data) { // 鼠标滑过图形
				this.isHover = true
				this.hoverChartID = data.attr_id
			},
			mouseoutChart() { //鼠标滑出图形
				this.isHover = false
				this.hoverChartID = 'module'
			},
			getCurrentModule(data) { // 图形列表中判断当前图形是否是选中状态，以及是图形列表还是文字列表
				let num = this.leftMenuList.length - data
				let isSelected = ''
				let item = {
					'selected': this.currentModule == num,
					'layer-manager-thumbail-wrap': this.listType == 'item'
				}
				return item
			},
			clickHeadMenu(title) { // 点击头部菜单右边操作按钮（预览、发布）
				if(title == '预览') {
					let preObj = this.$router.resolve({
						name: 'previewPager',
						query: {
							'moID': this.temObject.mo_id
						}
					})
					window.open(preObj.href)
				} else if(title == '发布') {
					let url = this.publichUrl + '/#/previewPager?moID=' + this.temObject.mo_id
					let item = {}
					item.mo_id = this.temObject.mo_id
					item.pub_url = url
					this.$store.dispatch('savePopShow', true);
					this.$store.dispatch('savePopObj', {
						popName: 'send',
						popType: 'sendUrl',
						contentMsg: "链接：" + url,
						data: item,
						popTitle: '发布',
						button: ['确定']
					});
				}
			},
			clickContent(e) { // 模板点击事件（需要判断是点击模板还是点击图形）
				let currentDom = e.target
				let currentClass = e.target.className
				let isClick = (currentClass.indexOf('handler') !== -1 || currentClass.indexOf('control-point') !== -1)
				if((currentClass.indexOf('handler') == -1) && (currentClass.indexOf('control-point') == -1)) { //点击图形外
					this.selectChartID = 'module'
					this.currentModule = null
				}
			},
			selectCurrentChart(data, index) { // 点击图形
				this.selectChartID = data.attr_id
				this.selectedChart = data
				this.currentModule = this.leftEditMainData.length - index - 1
			},
			interceptCover() { //截取封面
				let scaleNum=$(".imageWrapper").css('transform')
      			$(".imageWrapper").css('transform','scale(1)')
				let that = this
				html2canvas(that.$refs.imageWrapper, {
					logging: true,
					useCORS: true,
					backgroundColor: null
				}).then(function(canvas) {
					$(".imageWrapper").css('transform',scaleNum)
					let dataUrl = canvas.toDataURL("image/png");
					console.log('image url:' + dataUrl)
					that.coverImage = dataUrl
					let file = that.getBlobBydataURI(dataUrl, 'image/png')
					let timestamp = new Date().getTime();
					let param = new FormData(); //创建form对象
					param.append('file', file, that.temObject.mo_id + '.png'); //通过append向form对象添加数据
					param.append('mo_id', that.temObject.mo_id); //添加form表单中其他数据
					that.$store.dispatch('uploadModuleCover', param)
				})
			},
			getBlobBydataURI(dataURI, type) { // 图形转码
				var binary = atob(dataURI.split(',')[1]);
				var array = [];
				for(var i = 0; i < binary.length; i++) {
					array.push(binary.charCodeAt(i));
				}
				return new Blob([new Uint8Array(array)], {
					type: type
				});
			},
			comListItemOver(chartData) { // 滑过头部菜单
				this.chartWarpShow = true;
				this.chartDatas = chartData;
			},
			//导航栏元素hover事件
			comGroupItemOver(data) { //滑过头部主菜单
				this.chartWarpShow = true;
				let defaultID=''
				if(data.child.length>0){
					defaultID=data.child[0].chart_id
				}
				if(this.selectchartID == '') { // 默认选中第一个
					this.selectchartID = defaultID
					if(data.child.length>0){
						this.chartDatas=data.child[0].child
					}else{
						this.chartDatas=[];
					}
				} else {
					let len = data.child.length
					let flag=false
					for(let i = 0; i < len; i++) {
						if(this.selectchartID==data.child[i].chart_id){
							flag=true   // 选中的为当前下拉内容
							this.chartDatas=data.child[i].child
							break
						}
					}
					if(!flag){
						this.selectchartID = defaultID
						if(data.child[0]){//判空
							this.chartDatas=data.child[0].child
						}
					}
				}
			},
			//下拉框元素over事件
			comListItemOver(data, index, wrapName) {
				this.chartDatas = data.child;
				this.selectchartID = data.chart_id
			},
			//下拉框元素out事件
			comListItemOut(wrapName, index) {
			},
			//下拉框组件图点击事件
			charImgClick(chartData) {
				//去后台请求数据
				let postData = {
					chart_id: chartData.chart_id,
					mo_id: this.temObject.mo_id,
					mo_name: this.temObject.mo_name
				}
				this.$store.dispatch('addLeftEditMain', postData);
				this.layerToolbarUseful();
			},
			//左边列表表现形式点击事件
			setListType(type) {
				this.listType = type;
			},
			leftEditMainDel(chartData) {
				this.$store.dispatch('delLeftEditMain', chartData);
			},
			//左侧缩略图点击事件
			thumbailItemClick(index) {
				this.layerToolbarUseful();
				//把点击的元素存入全局变量
				this.currentModule = index;
				this.selectChartID = this.leftMenuList[index].attr_id
				this.selectedChart = this.leftMenuList[index]
			},
			//有元素被选中时左侧导航栏按钮可用
			layerToolbarUseful() {
				///this.layerToolbarOpacity = 'opacity1';
			},
			//左侧导航栏删除按钮
			delIconClick() {
				let moId = this.temObject.mo_id
				let currentId = this.leftMenuList[this.currentModule].attr_id
				let sort = this.leftMenuList[this.currentModule].sort
				let type = '静态数据'
				if(this.leftMenuList[this.currentModule].data_descr.datas){
					let type=this.leftMenuList[this.currentModule].data_descr.datas.type
				}
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'delete',
					popType: 'component',
					popId: moId,
					popKey: currentId,
					popIndex: sort,
					popState:type,
					popTitle: '删除组件',
					contentMsg: '确定删除选中的组件',
					button: ['确定'],
				});
				this.layerToolbarUseful();
			},
			judgeNumber(obj) {
				var re = /^[1-9]+[0-9]*]*$/
				return re.test(obj)
			},
			//放大与缩小
			zoomIn() {
				if(this.judgeNumber(this.zoomIndex)){
					this.zoomIndex++
				}else{
					this.zoomIndex=Math.ceil(this.zoomIndex)
				}
			},
			zoomOut() {
				if(this.zoomIndex<2){
					return;
				}
				if(this.judgeNumber(this.zoomIndex)){
					this.zoomIndex--
				}else{
					this.zoomIndex=Math.floor(this.zoomIndex)
				}

			},
			// 图形缩放初始化
			dragDataInit() {
				this.dragData.sx = ''
				this.dragData.sy = ''
				this.dragData.ex = ''
				this.dragData.ey = ''
			},
			// 图形拖拽开始
			dragChartStart(event, currentDrag) {
				let dragIndex = this.leftEditMainData.length - this.currentModule - 1
				if(dragIndex == currentDrag) {
					let currentClass = event.target.className
					let isdrag = ($('.control-point').hasClass(currentClass) || $('.rotate-handler').hasClass(currentClass))
					let image = new Image();
					image.src = '';
					event.dataTransfer.setDragImage(image, 0, 0)
					this.chartDrag.sx = event.clientX
					this.chartDrag.sy = event.clientY
					this.dragData.sx = event.clientX
					this.dragData.sy = event.clientY
				}
			},
			//图形移动与缩放
			chartMove(event, index) {
				let that = this
				let dragIndex = this.leftEditMainData.length - this.currentModule - 1
				if(dragIndex == index) { // 只能拖动当前选中的图形
					var event = event || window.event;
					var _target = event.target
					let currentClass = _target.className
					let isdrag = (currentClass.indexOf('control-point') !== -1)
					let arr = that.$store.state.templateProperty
					let size = arr.propertyData[4].fieldData[0].value

					let startx = event.clientX
					let starty = event.clientY
					var sb_bkx = startx - event.target.offsetLeft;
					var sb_bky = starty - event.target.offsetTop;
					var ww = document.documentElement.clientWidth;
					var wh = window.innerHeight;
					if(event.preventDefault) {
						event.preventDefault();
					} else {
						event.returnValue = false;
					};
					let w1=commonUtil.judgeString(that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value)
					let h1=commonUtil.judgeString(that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value)
					let wx=commonUtil.judgeString(that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[0].value)
					let hy=commonUtil.judgeString(that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[1].value)
					that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value=w1
					that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value=h1
					that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[0].value=wx
					that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[1].value=hy
					document.onmousemove = function(ev) {   
						var event = ev || window.event;   
						var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;   
						if(event.clientY < 0 || event.clientX < 0 || event.clientY > wh || event.clientX > ww) {    
							return false;   
						};     
						let size1 = Math.ceil((event.clientX - startx) / size) * size
						let size2 = Math.ceil((event.clientY - starty) / size) * size
						var endx = event.clientX - sb_bkx;   
						var endy = event.clientY - sb_bky;  
						if(isdrag) { // 缩放
							 
							if(currentClass.indexOf('right-center') !== -1) { // 右中 ，加宽
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value += size1
							} else if(currentClass.indexOf('bottom-center') !== -1) { // 下中，加高
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value += size2
							} else if(currentClass.indexOf('top-center') !== -1) { // 上中，减高
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value -= size2
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[1].value += size2
							} else if(currentClass.indexOf('left-center') !== -1) { // 左中，减宽
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value -= size1
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[0].value += size1
							} else if(currentClass.indexOf('bottom-right') !== -1) { //右下 ，加高加宽
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value += size1
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value += size2
							} else if(currentClass.indexOf('top-right') !== -1) { //上右， 加宽减高，加纵坐标
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value += size1
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value -= size2
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[1].value += size2
							} else if(currentClass.indexOf('top-left') !== -1) { //上左， 减宽减高，加横坐标，加纵坐标
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value -= size1
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value -= size2
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[0].value += size1
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[1].value += size2
							} else if(currentClass.indexOf('bottom-left') !== -1) { //下左， 减宽加高，加横坐标
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[0].value -= size1
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[0].fieldData[1].value += size2
								that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[0].value += size1
							}

						} else { //移动
							that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[0].value += size1
							that.$store.state.leftEditMainData[index].attr_descr.properties[0].properties[1].fieldData[1].value += size2
						}
						startx += size1
						starty += size2
					}  
					/*鼠标放开清除事件*/
					document.onmouseup = function(e) {
						document.onmousemove = null;
						document.onmouseup = null;
						this.selectChartID = this.selectChartID
					}
				}
			},
			//停止移动
			chartMoveStop(e) {  
				document.onmousemove = null;  
			},
			//图形列表拖拽改变位置
			dragStart(event) { //选中被拖拽元素
				this.startY = event.clientY
				this.startDrag = true;
				let odiv = event.target;
				event.dataTransfer.setDragImage(odiv, 0, 0); //列表形式使用，鼠标位置在图形的左上角
			},
			dragOver(event) { //拖拽过程显示位置标识
				event.preventDefault();
				this.endY = event.clientY;
				var hh = this.endY - 100;
				var index = '',
					height = '';
				if(this.listType == 'item') {
					index = Math.round(hh / 48);
					height = index * 48;
				} else {
					index = Math.round(hh / 26);
					height = index * 26;
				}
				this.lineStyle = 'translate(0px,' + height + 'px)';
			},
			drop(event) { //拖拽到目标元素处
				event.preventDefault();
				this.endY = event.clientY;
				this.startDrag = false;
				this.lineStyle = '';
				var lType = this.listType;
				var hh = '',
					startIndex = '',
					endIndex = '',
					move = '',
					listHeight = '';
				if(this.listType == 'item') {
					listHeight = 48;
				} else {
					listHeight = 26;
				}

				move = Math.abs(this.endY - this.startY) - (listHeight / 2); //移动了
				if(move < 0) { //不移动
					var ii = Math.floor((this.startY - 100) / listHeight);
					this.currentModule = ii;
				} else {
					hh = this.endY - this.startY;
					if(hh > 0) { //向下移
						endIndex = Math.round((this.endY - 100) / listHeight) - 1;
					} else if(hh < 0) { //向上移
						endIndex = Math.round((this.endY - 100) / listHeight)
					}
					startIndex = Math.floor((this.startY - 100) / listHeight);
					let listLength = this.leftEditMainData.length
					this.currentModule = endIndex;
					startIndex = listLength - startIndex
					endIndex = listLength - endIndex
					var item = {}
					item.mo_id = this.temObject.mo_id
					item.attr_id = this.leftEditMainData[startIndex - 1].attr_id
					item.startP = startIndex
					item.endP = endIndex
					item.startIndex = startIndex
					item.endIndex = endIndex
					this.$store.dispatch('modifyLocationLeftEditMain', item);

				}
			},
			dragEnd() {
				this.startDrag = false;
				this.lineStyle = '';
			},
			move(type) { //移动
				var index = this.currentModule;
				var item = {};
				var selectIndex = index;
				var length = this.leftEditMainData.length - 1;
				if(index != null) { //已选中组件
					if(type == 'up') {
						if(index == 0) { //不为最顶端
							return false;
						} else {
							selectIndex = selectIndex - 1;
						}
					} else if(type == 'down') {
						if(index == length) {
							return false;
						} else {
							selectIndex = selectIndex + 1;
						}
					} else if(type == 'first') {
						if(index == 0) {
							return false;
						} else {
							selectIndex = 0;
						}
					} else if(type == 'last') {
						if(index == length) {
							return false;
						} else {
							selectIndex = this.leftEditMainData.length - 1
						}
					}
					this.currentModule = selectIndex;
					index = this.leftEditMainData.length - index
					selectIndex = this.leftEditMainData.length - selectIndex
					item.mo_id = this.temObject.mo_id
					item.attr_id = this.leftEditMainData[index - 1].attr_id
					item.startP = index
					item.endP = selectIndex
					item.startIndex = index
					item.endIndex = selectIndex
					this.$store.dispatch('modifyLocationLeftEditMain', item);

				}
			},

		}
	}
</script>

<style lang="css">
	@import url("../css/screen.css");
	@import url("../css/chartStyle.css");
</style>
