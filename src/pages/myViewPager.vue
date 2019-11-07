<template>
	<div class="project-main">
		<div class="project-manage">
			<div class="manage-title">
				<div class="my-project project-group"><span><i class="fa fa-bars " style="margin-right:12px;"></i>我的分组</span>
					<span class="group-option">
						<span class="group-delete" style="margin-right:15px;">
							<i class="fa fa-trash-o trash-group" @click="groupDelete" v-show="groupSelect!=0"></i>
							<div class="header-tip-box">
								<p class="tip-box-content">删除</p>
							</div>
						</span>
					<span class="group-delete" style="margin-right:15px;"><i class="fa fa-edit" @click="groupEdit"></i>
						<div class="header-tip-box">
							<p class="tip-box-content">编辑</p>
						</div>
				    </span>
					<span class="group-add">
							<i class="fa fa-plus" @click="groupAdd"></i>
							<div class="header-tip-box">
								<p class="tip-box-content">添加</p>
							</div>
						</span>
					</span>
				</div>
				<div class="my-project project-all" :class="groupSelect==0?'project-checked-color':''" @click="getGroupView(0,-1)">
					<span>全部大屏</span>
					<span class="project-num">{{groupCount}}</span>
				</div>
			</div>
			<div class="manage-main">
				<div v-for="(group,index) in groupList" class="main-project " :class="groupSelect==group.group_id?'project-checked-color':''" @click="getGroupView(group,index)">
					<span class="project-name project-ungrouped ">{{group.group_name}}</span>
					<span class="project-num project-block">{{group.moNum}}</span>
				</div>
			</div>
		</div>
		<div class="project-screen-list">
			<div style="width:100%;height:100%">
				<div class="project-header">
					<div class="project-title">
						<h2>{{currentGroup.group_name}}</h2>
						<span class="color-BCC9D4"><span class="color-00BAFF">{{currentGroup.moNum}}</span>个</span>
					</div>
					<div class="header-manager">
						<div class="search"><input class="search-input" placeholder="搜索" v-model="searchText"></div><i class="fa fa-search" style="padding: 0px 24px 0px 4px; color: rgb(188, 201, 212); cursor: pointer; z-index: 1;"></i>
						<div class="drop-bar" style="width: 120px;">
							<div class="drop-bar-header">
								<span class="sort-type user-name">{{currentSelect}}</span>
								<i class="fa fa-chevron-down"></i>
								<i class="fa fa-chevron-up"></i>
							</div>
							<div class="drop-bar-main">
								<a class="content" target="_blank" @click="clickSelect(sel.name)" v-for="(sel,index) in selectContents"><span>{{sel.name}}</span></a>
							</div>
						</div>
					</div>
				</div>
				<div class="main-screen">
					<div class="my-screen" v-show="groupSelect!==0">
						<div class="new-project">
							<div class="add-new-screen" @click="createNewTemp"><i class="fa fa-plus"></i><span class="span-spacing">新建可视化</span></div>
						</div>
					</div>
					<div v-for="(tem,index) in groupTemps">
						<div draggable="true">
							<div class="my-screen">
								<div class="screen">
									<div class="screen-info"><img class="screen-img" :src="imageUrl+tem.screen_url+'?t='+random+index" alt="模板视图">
										<div class="screen-edit">
											<div class="screen-button">
												<a rel="noopener noreferrer" target="_blank" class="edit-wrap">
													<button class="datav-btn-md datav-btn edit-button" @click="editTemp(tem)"><span>编辑</span></button>
												</a>
												<div class="main-button" v-show="groupSelect!==0">
													<span class="button-span " @click="copyTemp(tem)">
															<i class="fa fa-plus-square-o" style="font-size: 18px;"></i>
															<div class="header-tip-box">
																<p class="tip-box-content">复制</p>
															</div>
														</span>
													<span class="button-span " @click="deleteTemp(tem)">
															<i class="fa fa-trash-o" style="font-size: 18px;"></i>
															<div class="header-tip-box">
																<p class="tip-box-content">删除</p>
															</div>
														</span>
												</div>
											</div>
											<div class="preview" @click="previewTemp(tem)"><i class="fa fa-window-maximize"></i>
												<div class="header-tip-box">
													<p class="tip-box-content">预览</p>
												</div>
											</div>
											<div class="public" @click="sendTempUrl(tem)"><i class="fa fa-send"></i>
												<div class="header-tip-box">
													<p class="tip-box-content">发布</p>
												</div>
											</div>
										</div>
									</div>
									<div class="screen-main">
										<div class="main-name">
											<div class="screen-name-input">
												<i v-if="groupSelect!=0" class="fa fa-pencil input-edit"></i>
												<input v-if="groupSelect!=0" class="input" v-model="tem.mo_name" @focus='editTempNameFocus()' @blur="editTempName(tem)">
												<input v-if="groupSelect==0" class="input" v-model="tem.mo_name" readonly="readonly">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import httpService from '../publicService/HttpService';
	import TipBoxService from '../publicService/TipBoxService.js'
	export default {
		name: 'myViewPager',
		data() {
			return {
				tempNameFocus: true,
				projectNum: 0,
				groupSelect: 0,
				currentTemp: 0,
				searchText: '',
				currentCount: 0,
				currentTemps: [],
				currentGroup: {},
				defaultGroup: {
					group_id: '0',
					group_name: "全部大屏",
					moNum: this.groupCount,
					group_descr: "全部大屏",
					group_sort: '0',
				},
				groupCount: 0,
				currentSelect: "按名称排序",
				selectContents: [{
					name: "按名称排序"
				}, {
					name: "按创建时间排序"
				}],
			}
		},
		computed: {
			random(){
				return Math.random();
			},
			groupList() {
				let list = this.$store.state.groupList;
				let len = list.length
				let num = 0;
					for(let i = 0; i < len; i++) {
						num += list[i].moNum;
					}
					this.groupCount = num;
					this.defaultGroup.moNum = num
					this.currentGroup = this.defaultGroup
				if (this.groupSelect !== 0) {
					let index = list.indexOf(this.currentGroup)
					if(index === -1) { // 删除之后,替换选中值
						let ii = this.currentCount
						if(ii === len) { //最后一个
							this.currentGroup = this.defaultGroup
							this.groupSelect = 0
						} else {
							this.currentGroup = list[ii]
							this.groupSelect = this.currentGroup.group_id
						}
					}
				}
				return list;
			},
			groupTemps() { //模板数组（排序）
				var allList = this.$store.state.groupTempletes; // 所有模板
				var gList = [];
				if(this.groupSelect != 0) {
					var gid = this.currentGroup.group_id;
					if(allList.hasOwnProperty(gid)) {
						gList = allList[gid] // 根据gid,获取当前组下的模板
					} else {
						return gList
					}
				} else {
					for(var index in allList) {
						var item = allList[index]
						gList = gList.concat(item)
					}
				}
				var searchTxt = this.searchText // 搜索框值
				var searchDrop = this.currentSelect // 下拉选择值
				// 查询
				var sList = ''
				if(searchTxt !== '') {
					sList = gList.filter(temp => temp.mo_name.indexOf(searchTxt) !== -1)
				} else {
					sList = gList
				}
				//排序
				var sortList = '';
				if(searchDrop == "按名称排序") {
					if(this.tempNameFocus){
						sortList = sList.sort(function(x, y) {
							var aName = x.mo_name;
							var bName = y.mo_name;
							return aName.localeCompare(bName, 'zh-Hans-CN', {
								sensitivity: 'accent'
							});
						});
					}else{
						sortList = sList
					}
				} else if(searchDrop == "按创建时间排序") {
					sortList = sList.sort(function(x, y) { //降序
						var aTime = new Date(x.create_Time).getTime();
						var bTime = new Date(y.create_Time).getTime();
						return bTime - aTime;
					});
				} else {
					sortList = sList;
				}
				return sortList;
			},
		},
		mounted() {
			this.getAllGroup();
			this.$store.dispatch('getGroupTemletes');
		},
		methods: {
			getAllGroup: function() { //获取所有组信息
				this.$store.dispatch('getGroupList');
			},
			getGroupView: function(group, index) { //根据分组id，获取模板列表
				if(group == 0) { //全部
					this.currentGroup = this.defaultGroup
					this.groupSelect = 0;
				} else {
					this.groupSelect = group.group_id;
					this.currentGroup = group;
				}
				this.currentCount = index
			},
			groupAdd: function() { //添加组
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'createGroup',
					data: [{
							contentTitle: "分组名称",
							contentInput: "请输入分组名称"
						},
						{
							contentTitle: "分组描述",
							contentInput: "请输入分组描述"
						},
						{
							contentTitle: "分组排序",
							contentInput: "请输入分组排序"
						}
					],
					popTitle: '添加大屏分组',
					button: ['创建'],
				});
			},

			groupEdit: function() { //编辑组
				this.$store.dispatch('savePopShow', true);
				let groupData=this.currentGroup
				this.$store.dispatch('savePopObj', {
					popName: 'editGroup',
					popData: groupData,
					data: [{
							contentTitle: "分组名称",
							contentValue: groupData.group_name
						},
						{
							contentTitle: "分组描述",
							contentValue: groupData.group_descr
						}
					],
					popTitle: '修改大屏分组',
					button: ['修改']
				});
			},
			groupDelete: function() { //删除组
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'delete',
					popType: 'group',
					popId: this.currentGroup.group_id,
					contentMsg: "确定删除" + this.currentGroup.group_name + "吗？",
					popTitle: '删除提示',
					button: ['确定']
				});
			},
			clickSelect: function(selectTxt) { //模板条件选择
				this.currentSelect = selectTxt;
			},
			createNewTemp: function() { //创建新的大屏
				let gid = this.groupSelect
				if(gid === 0) { // 全部大屏下不允许创建模板
					TipBoxService.open('success', '请在分组下创建模板');
				} else {
					this.$router.push({
						path: '/chooseTemplate',
						query: {
							groupId: gid
						}
					});
				}
			},
			copyTemp: function(temp) { //复制大屏
				this.$store.dispatch('copyGroupTemlete', temp);
			},
			deleteTemp: function(temp) { //删除大屏
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'delete',
					popId: temp.group_id,
					tempId: temp.mo_id,
					popType: 'temp',
					contentMsg: "确定删除此大屏吗？",
					popTitle: '删除提示',
					button: ['确定']
				});
			},
			previewTemp: function(data) { //预览大屏
				let url=this.publichUrl+'/#/previewPager?moID='+data.mo_id
				window.open(url);
			},
			sendTempUrl: function(data) { //发布大屏
				let url=this.publichUrl+'/#/previewPager?moID='+data.mo_id
				let item={}
				item.mo_id=data.mo_id
				item.pub_url=url
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'send',
					popType: 'sendUrl',
					contentMsg: url,
					data:item,
					popTitle: '发布链接',
					button: ['确定']
				});
			},
			editTemp: function(tem) { //编辑大屏
				this.$router.push({path: '/screen', query: {tempId: tem.mo_id,tempName:tem.mo_name}});
			},
			editTempNameFocus: function() {//避免没修改完大屏名称时就排序导致位置错位
				this.tempNameFocus = false;
			},
			editTempName: function(tem) { //更改大屏名称
				this.tempNameFocus = true;
				this.$store.dispatch('editGroupTemlete', tem);
			}
		}
	}
</script>

<style>
	@import '../css/viewpager.css';
</style>
