<template>
	<div class="data-center-scrollable-wp overflow-thumb map-com-data">
		<div class="component-title-wp">
            <div class="component-title" title="返回地图基础属性配置" @click="returnToBasic()">
                <div class="title-name ellipsis">
                    <i class="components-font icon fa fa-angle-left"></i>
                    {{chartName}}
                </div>
            </div>
        </div>
		<div class="config-api-editor">
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
							<tr class="table-body-row" v-for="(match,ii) in mappedData" >
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
					<div class="ds-database" v-if="dataResource!='静态数据'">
						<div class="storage-select-wp">
							<label class="prefix-label">选择已有数据源</label>
							<div class="nowide-select-div">
								<div class="nowide-select-input">
									<select v-model="resourceData.datas.database" ><!--dbObj-->
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
	</div>

</template>

<script>
	import TipBoxService from '../publicService/TipBoxService.js'
	import dataFilter from './dataFilter.vue'

	export default {
		name: 'mapComDataConfig',
		data() {
			return {
				search_type: '',
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
			}
		},
		props: ['chartId','mapComIndex','chartName'],
		components: {'dataFilter':dataFilter},
		computed: {
			mapComponents(){
				let allList = this.$store.state.leftEditMainData
				let arr = allList.filter(data => data.attr_id === this.chartId)[0].attrArr[this.mapComIndex]
				console.log('mapComIndex:'+this.mapComIndex+'   content:'+JSON.stringify(arr))
				return arr
			},
			resourceData(){
				return this.mapComponents.data_descr
			},
			dataList() {
				let arr1 = this.$store.state.myDataList
				let arr2 = []
				if(arr1[this.dataResource] != null) {
					arr2 = arr1[this.dataResource]
				}
				return arr2
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
				if(this.dataResource != '静态数据'){
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
		mounted() {
				this.search_type = this.resourceData.datas.search_type;
				this.updateState=this.resourceData.datas.autoUpdate=='Y'
				this.staticData = this.mapComponents.static_data
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

		},
		methods: {
			filterChange(val){
				this.resourceData.filterflag=val+''
			},
			returnToBasic(){
				this.$emit('mapComponentHide', false);
			},
			changeMapping(){ // 映射匹配
				this.matching=true;
				this.getMappedData([].concat(this.mappedData));
				this.matching=false;
			},
			getMappedData(arr){ // 数据映射配置
				let arr2=[].concat(this.resourceData.datas.data_value);
				let len=arr.length;
				this.mappedData=[];
				let allState=true;
				for(let i=0;i<len;i++){
					let item={};
					item.name=arr[i].name;
					item.value=arr[i].value;
					let data=item.value;
					if(data==''){
						data=item.name;
					}
					this.resourceData.mapped[i].value = item.value;
					if(item.name!='s') {
						if(arr2.length>0&&arr2[0].hasOwnProperty(data)) {
							item.state = true;
						}else {
							item.state = false;
							allState=false;
						}
					}
					this.mappedData.push(item);
				}
				this.allMatching=allState;
			},
			dataReChange() {
				if(this.dataResource=="静态数据"){
					this.resourceData.datas.data_value = this.mapComponents.static_data;
				}else if(this.dataResource=="elasticsearch"){
					this.sqlData = "{}";
				}else{
					this.sqlData= 'SELECT * FROM '
				}
			},
			dataForm() {
				let arr = this.chartData;
				let data = arr.datas.data;
				let mapp = arr.mapped;
				arr.datas.data = JSON.parse(data);
				return arr;
			},
			validatSql(value){ // sql验证
				let arr = this.sqlValidate;
				for(let i=0;i<7;i++){
					let aa=arr[i].toUpperCase()
					if(value.indexOf(arr[i])>-1||value.indexOf(aa)>-1){
						return false;
					}
				}
				return true;
			},
			saveDataConfigMapCom() { // 保存数配置
				let item = {};
				item.flag=true;
				item.rate = this.resourceData.datas.autoUpdateTime;
				item.attr_id = this.mapComponents.attr_id;
				item.mapped=this.resourceData.mapped;
				item.state = this.resourceData.datas.autoUpdate;
				item.parent_id = this.chartId;
				item.filterflag = this.resourceData.filterflag
					item.filterdata = this.resourceData.filterdata
				if(this.dataResource == "静态数据") {
					let txt=document.getElementsByClassName('txtArea');
					item.type = "static"
					item.data_descr = JSON.parse($('.txtArea').val());
					item.static_data = "static";
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
						item.flag = this.validatSql(this.sqlData);
					}
					let len = this.dataList.length;
					for(let i = 0; i < len; i++) {
						if(this.dataList[i].data_name == this.resourceData.datas.database) {
							item.data_id = this.dataList[i].data_id;
							break;
						}
					}
				}
				item.chartName = this.chartName;
				item.mapComIndex = this.mapComIndex;
				item.fatherId = this.chartId;
				item.data_value = this.resourceData.datas.data_value;
				return item
			},
			responseResult() { // 查看响应结果
				let flag=true; // 判断sql语句中是否含有操作性词语
				let data = {};
				if(this.dataResource == '静态数据') {
					let txt=$('.txtArea').val();
					data.data_descr =$('.txtArea').val();
					data.type = 'static';
					data.mapped = this.resourceData.mapped;
				} else{ // 数据库类型
					data.type = this.dataResource;
					data.data_descr = this.sqlData;
					data.mapped = this.resourceData.mapped;
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
							return;
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
				data.filterflag = this.resourceData.filterflag
				data.filterdata = this.resourceData.filterdata
				data.mapComIndex = this.mapComIndex;
				data.parent_id = this.chartId;
				data.attr_id = this.mapComponents.attr_id;
				//改变匹配attr_id的attrArr[index]属性
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
