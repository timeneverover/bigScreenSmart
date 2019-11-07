<template>
	<div class="my-data">
		<div class="data-title">
			<div class="search-drop">
				<div class="drop-bar">
					<div class="drop-bar-header" style="width: 100px;margin-right:10px">
						<span class="search-data sort-type" style="font-size:14px;">{{currentSearch}}</span>
						<i class="fa fa-chevron-down"></i>
						<i class="fa fa-chevron-up"></i>
					</div>
					<div class="drop-bar-main">
						<a class="content" target="_blank" @click="clickTypeSelect(type.name)" v-for="(type,index) in selectTypes"><span>{{type.name}}</span></a>
					</div>
				</div>
			</div>
			<div class="title-drop">
				<div class="drop-bar">
					<div class="drop-bar-header" style="width: 100px;"><span style="font-size:14px;" class="sort-type">{{currentSort}}</span><i class="fa fa-chevron-down"></i>
						<i class="fa fa-chevron-up"></i></div>
					<div class="drop-bar-main">
						<a class="content" target="_blank" @click="clickSortSelect(sort.name)" v-for="(sort,index) in sortTypes"><span>{{sort.name}}</span></a>
					</div>
				</div>
			</div>
			<div class="title-add">
				<div class="add-data">
					<div class="add-text" @click="addData">+ 添加数据</div>
				</div>
				<div class="data-border"></div>
			</div>
		</div>
		<div class="data-main">
			<div class="main-storage" v-for="(data,index) in dataList">
				<div class="storage-type" :class="data.data_type"></div>
				<div class="storage-operate">
					<!--<div class="storage-search" @click="searchData(data)" ><i class="fa fa-search storage-icon"></i></div>-->
					<div class="storage-edit" @click="editData(data)" v-show="data.data_type!='excel'"><i class="fa fa-edit storage-icon" style="padding-left: 16px;"></i></div>
					<div class="storage-delete" @click="delData(data)"><i class="fa fa-trash-o storage-icon" style="padding-left: 16px;"></i></div>

				</div>
				<div class="storage-info">
					<div class="info-name">{{data.data_name}}</div>
					<div class="info-time">{{data.create_Time}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentSort: '按名称排序',
				currentSearch: '全部数据源',
				selectTypes: [{
					name: "全部数据源"
				}, {
					name: "MySQL数据库"
				}, {
					name: "ORACLE数据库"
				}],
				sortTypes: [{
					name: "按名称排序"
				}, {
					name: "按创建时间排序"
				}/*, {
					name: "按修改时间排序"
				}*/]
			}
		},
		computed: {
			 dataList() {
				 var dList = this.$store.state.myDataList;
				var searchTxt = this.currentSearch;
				var sortTxt = this.currentSort;
				var searchList = [],
					sortList = [];
				//根据类型搜索
				if(searchTxt == "全部数据源") {
					for(var index in dList) {
						var item = dList[index];
						searchList = searchList.concat(item);
					}
				} else if(searchTxt == "MySQL数据库") {
					var baseType = "mysql";
					if(dList.hasOwnProperty(baseType)){
						searchList = dList[baseType];
					}

				} else if(searchTxt == "ORACLE数据库") {
					var baseType = "oracle";
					if(dList.hasOwnProperty(baseType)){
						searchList = dList[baseType];
					}
				}
				//根据类型排序
				if(sortTxt == '' || sortTxt == "按名称排序") {
					sortList = searchList.sort(function(x, y) {
						var aName = x.data_name;
						var bName = y.data_name;
						return aName.localeCompare(bName, 'zh-Hans-CN', {
							sensitivity: 'accent'
						});
					});
				} else if(sortTxt == "按创建时间排序") {
					sortList = searchList.sort(function(x, y) { //降序
						var aTime = new Date(x.create_Time).getTime();
						var bTime = new Date(y.create_Time).getTime();
						return bTime - aTime;
					});
				} else if(sortTxt == "按修改时间排序") {
					sortList = searchList.sort(function(x, y) { //降序
						var aTime = new Date(x.createTime).getTime();
						var bTime = new Date(y.createTime).getTime();
						return bTime - aTime;
					});
				}
				return sortList;
			 },

		},
		mounted () {
			this.$store.dispatch('getDataList')
		},
		methods: {
			searchData(sdata){
				let arr=[].concat(data)
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'searchData',
					popType: 'data',
					data: ["类型", "名称", "域名", "用户名", "密码", "端口", "数据库"],
					data2: data,
					popTitle: '编辑数据',
					button: ['测试连接','修改'],
				});
			},
			addData: function() {
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'createData',
					popType: 'data',
					data: ["类型", "名称", "域名", "用户名", "密码", "端口", "数据库"],
					popTitle: '添加数据',
					button: ['测试连接','创建'],
				});
			},
			clickTypeSelect: function(sel) { //选择类型搜索
				this.currentSearch = sel;
			},
			clickSortSelect: function(sel) { //选择排序类型
				this.currentSort = sel;
			},
			editData: function(data) { //编辑数据
				let dataText = [];
				if(data.data_type=='http'){
					dataText = ["类型", "名称", "url",'post/get','param'];
				}else if(data.data_type=='ws'){
					dataText = ["类型", "名称", "url",'方法名','param','命名空间'];
				}else{
					dataText = ["类型", "名称", "域名", "用户名", "密码", "端口", "数据库"];
				}
				let arr=[].concat(data)
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'editData',
					popType: 'data',
					data: dataText,
					data2: data,
					popTitle: '编辑数据',
					button: ['测试连接','修改'],
				});
			},
			delData: function(data) { //删除数据
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'delete',
					popId: data.data_id,
					popType: 'data',
					popKey: data.data_type,
					contentMsg: "确定删除该数据吗？",
					popTitle: '删除提示',
					button: ['确定']
				});
			}
		}
	}
</script>

<style>
	@import '../css/myDataPager.css';

</style>
