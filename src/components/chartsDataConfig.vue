<template>
	<div class="data-center-scrollable-wp overflow-thumb">
		<div v-if="chartType=='isSource'" class="empty-api-editor">
			<div class="data-icon-box">
				<i class="fa fa-heart-o"></i>
			</div>
			<p>该组件不需要配置数据</p>
		</div>

		<div v-else class="config-api-editor">
			<div v-if="!mapComponentShow">
				<!-- 地图子组件管理 -->
				<div class="gui" v-if="chartName=='基础平面地图'||chartName=='3D平面中国地图'">
					<div class="gui-group-controller">
						<div class="gui-group-name fa-plus-box">
							<span>
								<i class="fa fa-plus"></i>
								子组件管理
							</span>
							<div class="map-default-components map-default-components-data overflow-thumb">
								<div v-show="chartName=='基础平面地图'" class="component" v-for="(sub,subIndex) in mapSubProperties" @click="mapComponentAdd(sub)">
									<img :src="sub.imgUrl" alt="">
									<span>{{sub.name}}</span>
								</div>
								<div v-show="chartName=='3D平面中国地图'" class="component" v-for="(sub,subIndex) in mapSubProperties3D" @click="mapComponentAdd(sub)">
									<img :src="sub.imgUrl" alt="">
									<span>{{sub.name}}</span>
								</div>
							</div>
						</div>

						<div class="map-components overflow-thumb">
							<div v-for="(com,comIndex) in mapComponents" class="gui-field-controller" @click="mapComponentClick(comIndex,com.attr_descr.name)">
								<span>{{com.attr_descr.name+comIndex}}</span>
								<i class="fa fa-trash-o" title="删除子组件" v-if="com!='区域热力层'" @click.stop="mapComponentDel(comIndex,com.attr_id,com.parent_id)"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="api-editor-title">
					<span class="api-desc ellipsis-2">接口描述</span>
					<span class="api-status" v-if="!matching">
						<span class="status-display" v-if="allMatching">
							<i class="status-icon --completed"></i>
							配置完成
						</span>
						<span class="status-display " v-if="!allMatching">
							<i class="status-icon" style="background: #e7b13d;"></i>
							未配置完成
						</span>
					</span>
					<span v-if="matching">
						<i class="attr-status-icon validating"></i>
						<i class="attr-status-icon validating"></i>
						<i class="attr-status-icon validating"></i>
						匹配中
					</span>
				</div>
				<div class="attr-source-wp api-editor-wrapper-enter-done">
				<div class="data-attr-table-container">
					<table class="data-attr-table">
						<thead class="table-head">
							<tr class="table-head-row">
								<th class="th-item column-item attr-name">字段</th>
								<th class="th-item column-item attr-value">映射</th>
								<th class="th-item column-item attr-status">状态</th>
							</tr>
						</thead>
						<tbody class="table-body">
							<tr class="table-body-row" v-if="chartName=='轮播列表'">
								<td class="column-item attr-name">
									<span class="c-pointer ellipsis-2">任意</span>
								</td>
								<td class="column-item attr-value"></td>
								<td class="column-item attr-status">
									<div>
										<i class="attr-status-icon --success"></i>
										<span class="status-text">配置完成</span>
									</div>
								</td>
							</tr>
							<tr class="table-body-row" v-else v-for="(match,ii) in mappedData" >
								<td class="column-item attr-name">
									<span class="c-pointer ellipsis-2">{{match.name}}</span>
								</td>
								<td class="column-item attr-value">
									<input v-model="match.value" type="text" class="input attr-input" @blur="changeMapping" placeholder="可自定义">
								</td>
								<td class="column-item attr-status">
									<div>
										<i class="attr-status-icon validating" v-if="matching"></i>
										<i class="attr-status-icon validating" v-if="matching"></i>
										<i class="attr-status-icon validating" v-if="matching"></i>
										<i class="attr-status-icon" v-if="!matching&&(match.name!='s')" :class="match.state?'--success':'matchfailed'"></i>
										<i class="attr-status-icon --success" v-if="!matching&&(match.name=='s')"></i>
										<span class="status-text" v-if="match.state&&!matching&&(match.name!='s')">匹配成功</span>
										<span class="status-text" v-if="!matching&&(match.name=='s')">可选</span>
										<span class="status-text" v-if="!match.state&&!matching&&(match.name!='s')">未匹配成功</span>
										<span class="status-text" v-if="matching">匹配中</span>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="data-source">
					<div class="data-source-selector">
						<label class="prefix-label">数据源类型</label>
						<div class="gui-component-select">
							<div class="select-input">
								<select class="select-input" v-model="dataResource" @change="dataReChange">
									<option value="静态数据">静态数据</option>
									<option value="mysql">mysql</option>
									<option value="oracle">oracle</option>
									<option value="sqlserver">sqlserver</option>
									<option value="excel">excel</option>
									<option value="http">http</option>
									<option value="ws">ws</option>
									<option value="elasticsearch">es</option>
								</select>
							</div>
						</div>
					</div>
					<div class="ds-wrapper ds-static" v-if="dataResource=='静态数据'">
						<div class="datav-ds-editor">
							<textarea name="静态数据" rows="" cols="" class="txtArea">{{staticData}}</textarea>
						</div>
					</div>
					<div class="ds-database" v-else><!--dbObj-->
						<div class="storage-select-wp">
							<label class="prefix-label">选择已有数据源</label>
							<div class="nowide-select-div">
								<div class="nowide-select-input">
									<select v-model="resourceData.datas.database" >
										<option v-for="(db,ii) in dataList" :value="db.data_name">{{db.data_name}}</option>
									</select>
								</div>
							</div>
						</div>
						<div class="storage-select-wp"  v-if="dataResource=='elasticsearch'">
							<label class="prefix-label">查询类型</label>
							<div class="nowide-select-div">
								<div class="nowide-select-input">
									<select v-model="search_type">
										<option v-for="select in selectTypes" :value="select.selectClass">{{select.selectName}}</option>
									</select>
								</div>
							</div>
						</div>
						<div v-if="dataResource=='mysql'||dataResource=='oracle'||dataResource=='sqlserver'||dataResource=='elasticsearch'" style="width:100%;">
							<label v-if="dataResource=='elasticsearch'" class="prefix-label">查询语句:</label>
							<label v-else class="prefix-label">SQL:</label>
							<div class="datav-ds-editor">
								<textarea name="数据库" rows="" cols="" v-model="sqlData"></textarea>
							</div>
						</div>

					</div>
					<div class="auto-update-config">
						<label class="datav-checkbox auto-update-checkbox">
                            <label for="autoUpdate" class="datav-checkbox-input-wp" :class="updateState?'checked':''" >
                                <input type="checkbox" class="datav-checkbox-input" value="" v-model="updateState" id="autoUpdate">
                            </label>
						<span class="datav-checkbox-label">自动更新请求</span>
						</label>
						<input v-model="resourceData.datas.autoUpdateTime" type="number" :disabled="!resourceData.datas.autoUpdate" class="input update-interval-input datav-input--disabled" style="width:32px;margin-left:10px;" min="1"> 秒一次
					</div>
					<dataFilter :filterData="resourceData.filterdata" :isFilter="resourceData.filterflag" @filterChange="filterChange"></dataFilter>
					<button type="button" class="btn-normal btn-md api-preview-btn" @click="responseResult">
                    	<span>查看数据响应结果</span>
                	</button>
				</div>
			</div>
			</div>
			<!-- 子组件数据传递渲染 -->
			<!-- 地图子组件 -->
			<mapComDataConfig v-else ref="dataModuleMapCom" @mapComponentHide="mapComponentChange" :chartId="chartId" :mapComIndex="mapComIndex"
			:chartName="mapComName"></mapComDataConfig>

		</div>

	</div>

</template>

<script>
	import mapComDataConfig from './mapComDataConfig.vue'
	import TipBoxService from '../publicService/TipBoxService.js'
	import Urls from '../publicService/urls.js'
	import dataFilter from './dataFilter.vue'
	export default {
		name: 'chartsDataConfig',
		data() {
			return {
				search_type: this.resourceData.datas.search_type,
				mapComponentShow: false,
				mapComIndex: 0,
				mapComName: '',
				dataResource: '静态数据',
				dbObj: '',
				sqlData:'',
				staticData:'',
				matching:false,
				allMatching:true,
				mappedData:'',
				updateState:'',
				sqlValidate:['delete','insert','update','create table','insert into','delete from','drop table','alter table','truncate table'],
				selectTypes: [{
					selectName: '列表查询',
					selectClass: 'list'
				},{
					selectName: '聚合求值',
					selectClass: 'aggr_value'
				},{
					selectName: '聚合列表',
					selectClass: 'aggr_list'
				}],
				mapSubProperties: [{
		          id: "chart1234567892122",
		          name: "区域热力层",
				  imgUrl: require('../assets/map/thermodynamic.png')
		        }, {
		          id: "chart1234567892123",
		          name: "呼吸气泡层",
				  imgUrl: require('../assets/map/bubble.png')
		        }, {
		          id: "chart1234567892124",
		          name: "飞线层",
				  imgUrl: require('../assets/map/flyLine.png')
			    }],
				mapSubProperties3D: [{
		          id: "chart1234567892128",
		          name: "柱状图层",
				  imgUrl: require('../assets/map/3DChinaBar.png')
		        }, {
		          id: "chart1234567892129",
		          name: "飞线层",
				  imgUrl: require('../assets/map/3DChinaFlyLine.png')
		        }, {
		          id: "chart1234567892130",
		          name: "气泡层",
				  imgUrl: require('../assets/map/3DChinaBubble.png')
			    }]
			}
		},
		props: ['chartName','chartType','resourceData', 'chartId','staticData2','attrID'],
		components: {
			'mapComDataConfig': mapComDataConfig,
			'dataFilter':dataFilter
		},
		computed: {
			dataList() {//已有数据源
				let arr1 = this.$store.state.myDataList
				let arr2 = []
				if(arr1[this.dataResource] != null) {
					arr2 = arr1[this.dataResource]
				}
				return arr2
			},
			mapComponents(){
				let allList = this.$store.state.leftEditMainData
				let arr = allList.filter(data => data.attr_id === this.chartId)[0].attrArr
				if(arr){
					return arr
				}else{
					return {}
				}
			}
		},
		watch:{
			updateState(newvalue, oldvalue){
				if(newvalue){
					this.resourceData.datas.autoUpdate='Y'
				}else{
					this.resourceData.datas.autoUpdate='N'
				}
			},
			sqlData(newvalue, oldvalue){ // 监听sql语句变化
				console.log(this.dataResource);
				console.log(this.resourceData);
				if(this.dataResource != '静态数据'){
					console.log(666);
					this.resourceData.datas.data=newvalue
				}
			},
			dataResource(newvalue,oldvalue){
				if(newvalue=='静态数据'){
					this.resourceData.datas.type='static'
					this.resourceData.types='静态数据'
				}else if(newvalue=='excel'){
					this.resourceData.datas.type='excel'
					this.resourceData.types='excel'
				}else if(newvalue=='http'){
					this.resourceData.datas.type='http'
					this.resourceData.types='http'
				}else if(newvalue=='ws'){
					this.resourceData.datas.type='ws'
					this.resourceData.types='ws'
				}else if(newvalue=='elasticsearch'){
					this.resourceData.datas.type='elasticsearch'
					this.resourceData.types='elasticsearch'
				}else{
					this.resourceData.datas.type=newvalue
					this.resourceData.types='数据库'
				}
			},
			resourceData:{
				handler(newValue, oldValue) {　　
					this.getMappedData(this.resourceData.mapped)
					if(this.dataResource=='static'){
						this.staticData=this.resourceData.datas.data
					}
				},
				deep: true
			}
		},
		created() {},
		mounted() {
			if(this.chartType!='isSource'){
				this.updateState=this.resourceData.datas.autoUpdate=='Y'
				this.staticData=this.staticData2
				if(this.resourceData.datas.type=='static'){
					this.sqlData= 'SELECT * FROM '
					this.dataResource='静态数据'
					this.staticData=this.resourceData.datas.data
				}else{
					this.sqlData= this.resourceData.datas.data
					this.dataResource=this.resourceData.datas.type
				}
				let arr=[].concat(this.resourceData.mapped)
				this.getMappedData(arr)
			}
		},
		methods: {
			filterChange(val){
				this.resourceData.filterflag=val+''
			},
			dataReChange(){
				if(this.dataResource=="elasticsearch"){
					this.sqlData = "{}";
				}else{
					this.sqlData= 'SELECT * FROM '
				}
			},
			mapComponentChange(value){
				this.mapComponentShow = false;
			},
			//地图添加子组件
			mapComponentAdd(sub){
				let data = {
					mo_name: this.$route.query.tempName,
					mo_id: this.$route.query.tempId,
					attr_id: this.attrID,
					chart_id: sub.id
				}
				this.$store.dispatch('addMapComponent',data);
			},
			//地图删除子组件
			mapComponentDel(index, attrId, parentId){
				let data = {
					attr_id: attrId,
					index: index,
					parentId: parentId,
					mo_id: this.$route.query.tempId,
				}
				this.$store.dispatch('delMapComponent',data);
			},
			//地图子组件点击
			mapComponentClick(index,name){
				this.mapComIndex = index;
				this.mapComName = name;
				this.mapComponentShow = true;
			},
			changeMapping(){ // 映射匹配
				this.matching=true
				this.getMappedData([].concat(this.mappedData))
				this.matching=false
			},
			getMappedData(arr){ // 数据映射配置
				let arr2=[].concat(this.resourceData.datas.data_value)
				let len=arr.length
				this.mappedData=[]
				let allState=true
				for(let i=0;i<len;i++){
					let item={}
					item.name=arr[i].name
					item.value=arr[i].value
					let data=item.value
					if(data==''){
						data=item.name
					}
					this.resourceData.mapped[i].value = item.value
					if(item.name!= 's') {
						if(arr2.length>0&&arr2[0].hasOwnProperty(data)) {
							item.state = true
						} else if(this.chartName=='轮播列表'){//轮播列表任意匹配，若无匹配显示--
							item.state = true
						} else if(this.chartName=='基础平面地图'){
							item.state = true
						}else {
							item.state = false
							allState=false
						}
					}
					this.mappedData.push(item)
				}
				this.allMatching=allState
			},
			dataForm() {
				let arr = this.chartData
				let data = arr.datas.data
				let mapp = arr.mapped
				arr.datas.data = JSON.parse(data)
				return arr
			},
			validatSql(value){ // sql验证
				let arr=this.sqlValidate
				for(let i=0;i<7;i++){
					let aa=arr[i].toUpperCase()
					if(value.indexOf(arr[i])>-1||value.indexOf(aa)>-1){
						return false
					}
				}
				return true
			},
			saveDataConfig() { // 保存数配置
				let item = {}
				if(this.mapComponentShow){
					item = this.$refs.dataModuleMapCom.saveDataConfigMapCom()
				}else{
					item.flag=true
					item.rate = this.resourceData.datas.autoUpdateTime
					item.attr_id = this.chartId
					item.mapped=this.resourceData.mapped
					item.state = this.resourceData.datas.autoUpdate
					item.filterflag = this.resourceData.filterflag
					item.filterdata = this.resourceData.filterdata
					if(this.dataResource == "静态数据") {
						let txt=document.getElementsByClassName('txtArea')
						item.type = "static"
						item.data_descr = JSON.parse($('.txtArea').val())
						item.static_data = "static"
					}else{ // 数据库
						item.type = this.dataResource;
						item.data_descr = this.sqlData;
						if(this.dataResource == "elasticsearch"){
							item.search_type = this.search_type;
							if(!this.ifJson(item.data_descr)){
								TipBoxService.open('error','查询语句不是json类型');
								return;
							}
						}
						if(this.dataResource=='mysql'||this.dataResource=='oracle'||this.dataResource=='sqlserver'){
							item.flag = this.validatSql(this.sqlData)
						}
						let len = this.dataList.length
						for(let i = 0; i < len; i++) {
							if(this.dataList[i].data_name == this.resourceData.datas.database) {
								item.data_id = this.dataList[i].data_id
								item.database=this.resourceData.datas.database
								break
							}
						}
					}
				}
				return item
			},
			responseResult() { // 查看响应结果
				let flag=true; // 判断sql语句中是否含有操作性词语
				let data = {};
				data.attr_id = this.chartId;
				data.mapped = this.resourceData.mapped;
				data.filterflag = this.resourceData.filterflag
				data.filterdata = this.resourceData.filterdata
				if(this.dataResource == '静态数据') {
					let txt=$('.txtArea').val();
					data.data_descr =$('.txtArea').val();
					data.type = 'static';
				} else{ // 数据库类型
					data.data_descr = this.sqlData;
					data.type = this.dataResource;
					if(this.dataResource == "elasticsearch"){
						data.search_type = this.search_type;
						if(!this.ifJson(data.data_descr)){
							TipBoxService.open('error','查询语句不是json类型');
							return;
						}
					}
					if(this.dataResource=='mysql'||this.dataResource=='oracle'||this.dataResource=='sqlserver'){
						if(!this.validatSql(this.sqlData)){ // 含有敏感词
							TipBoxService.open('error','非法操作数据库');
							return
						}
					}
					let len = this.dataList.length;
					for(let i = 0; i < len; i++) { // 获取数据源id
						if(this.dataList[i].data_name == this.resourceData.datas.database) {
							data.data_id = this.dataList[i].data_id;
							break;
						}
					}
				}
				this.$store.dispatch('dataRespondResult', data);
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'responseData',
					popType: 'data',
					popTitle: '数据响应结果',
				});
			},
			ifJson(content){//判断json格式是否正确
				if(typeof content == 'string'){
					try{
						let obj = JSON.parse(content);
						if(typeof obj == 'object' && obj){
							return true;
						}else{
							return false;
						}
					}catch(e){
						return false;
					}
				}else{
					return false;
				}
			}
		}
	}
</script>

<style>

</style>
