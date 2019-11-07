<template>
	<div class="project-main">
		<div class="project-manage">
			<div class="manage-title">
				<div class="my-project project-group">
					<span><i class="fa fa-bars " style="margin-right:12px;"></i>我的组件</span>
				</div>
				<div class="my-project project-all project-checked-color">
					<span>全部组件</span>
					<span class="project-num">{{groupCount}}</span>
				</div>
			</div>
		</div>
		<div class="project-screen-list">
			<div style="width:100%;height:100%">
				<div class="project-header">
					<div class="project-title">
						<h2>共有</h2>
						<span class="color-BCC9D4"><span class="color-00BAFF">{{groupCount}}</span>个</span>
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
					<div class="my-screen">
						<div class="new-project">
							<div class="add-new-screen" @click="createNewCompent">
								<i class="fa fa-plus"></i><span class="span-spacing">新建组件</span>
							</div>
						</div>
					</div>
					<div v-for="(com,index) in groupcoms">
						<div draggable="true">
							<div class="my-screen">
								<div class="screen">
									<div class="screen-info"><img class="screen-img" :src="defaultImageUrl" alt="模板视图">
										<div class="screen-edit">
											<div class="screen-button">
												<a rel="noopener noreferrer" target="_blank" class="edit-wrap">
													<button class="datav-btn-md datav-btn edit-button" @click="editCompent(com)"><span>编辑</span></button>
												</a>
												<div class="main-button">
													<span class="button-span " @click="deleteCompent(com)">
														<i class="fa fa-trash-o" style="font-size: 18px;"></i>
														<div class="header-tip-box">
															<p class="tip-box-content">删除</p>
														</div>
													</span>
												</div>
											</div>
											<div class="preview" @click="previewCompent(com)"><i class="fa fa-window-maximize"></i>
												<div class="header-tip-box">
													<p class="tip-box-content">预览</p>
												</div>
											</div>
											<div class="public" @click="sendCompentUrl(com)"><i class="fa fa-send"></i>
												<div class="header-tip-box">
													<p class="tip-box-content">发布</p>
												</div>
											</div>
										</div>
									</div>
									<div class="screen-main">
										<div class="main-name">
											<div class="screen-name-input">
												<span :title="com.com_name">{{com.com_name}}</span>
												<input class="input" :title="com.com_descr" v-model="'：'+com.com_descr" readonly="readonly">
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
	import Urls from '../publicService/urls.js'
	import TipBoxService from '../publicService/TipBoxService.js'
	export default {
		name: 'myViewPager',
		data() {
			return {
				defaultImageUrl: require('../assets/chooseTemplate/emptyTemplate.png'),
				projectNum: 0,
				searchText: '',
				currentSelect: "按名称排序",
				selectContents: [{
					name: "按名称排序"
				}, {
					name: "按创建时间排序"
				}],
			}
		},
		computed: {
			groupCount(){
				return this.$store.state.compentList.comnum
			},
			random(){
				return Math.random()
			},
			groupcoms() { //模板数组（排序）
				let allList = this.$store.state.compentList.data; //所有组件数据
				let gList = [];
				for(let index in allList) {
					let item = allList[index]
					gList = gList.concat(item)
				}
				let searchTxt = this.searchText // 搜索框值
				let searchDrop = this.currentSelect // 下拉选择值
				// 查询
				let sList = ''
				if(searchTxt !== '') {
					sList = gList.filter(temp => temp.com_name.indexOf(searchTxt) !== -1)
				} else {
					sList = gList
				}
				//排序
				let sortList = '';
				if(searchDrop == "按名称排序") {
					sortList = sList.sort(function(x, y) {
						let aName = x.com_name;
						let bName = y.com_name;
						return aName.localeCompare(bName, 'zh-Hans-CN', {
							sensitivity: 'accent'
						});
					});
				} else if(searchDrop == "按创建时间排序") {
					sortList = sList.sort(function(x, y) { //降序
						let aTime = new Date(x.create_time).getTime();
						let bTime = new Date(y.create_time).getTime();
						return bTime - aTime;
					});
				} else {
					sortList = sList;
				}
				return sortList;
			},
		},
		mounted() {
			this.$store.dispatch('getAllCompent');
			this.$store.dispatch('getAllComTempList');
		},
		methods: {
			//0 0 1 1 *  ?
			clickSelect: function(selectTxt) { //模板条件选择
				this.currentSelect = selectTxt;
			},
			createNewCompent: function() { //创建新的组件
				this.$store.state.compentTempList = {
			      com_name: '',
			      com_descr: '',
			      com_data: [{mo_id: '',tri_time: ''}]
			    };
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj',{
	                popName: 'createCompent',
	                popTitle: '新建组件数据',
	                button: ['创建'],
	            });
			},
			editCompent: function(com) { //编辑组件
				//获取单个组件信息
				let data = {};
				data.com_id = com.com_id;
				this.$store.dispatch('getcompentTempList',data);
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj',{
	                popName: 'createCompent',
	                popTitle: '修改组件数据',
	                button: ['确认修改'],
	            });
			},
			deleteCompent: function(com) { //删除大屏
				this.$store.dispatch('savePopShow', true);
				this.$store.dispatch('savePopObj', {
					popName: 'delete',
					comID: com.com_id,
					popType: 'compent',
					contentMsg: "确定删除此组件吗？",
					popTitle: '删除提示',
					button: ['确定']
				});
			},
			previewCompent: function(data) { //预览大屏
				let _this = this;
				//请求第一个要访问的mo_id
				httpService.postLink(Urls.getCurrentUrl,{com_id:data.com_id})
			      .then(function(res) {
					let url=_this.publichUrl+'/#/previewPager?moID='+res+'&isCompent='+true+'&comId='+data.com_id
					window.open(url);
			      })
			      .catch(function(error) {
			        console.log(error);
			      });

			},
			sendCompentUrl: function(data) { //发布大屏
				let _this = this;
				httpService.postLink(Urls.getCurrentUrl,{com_id:data.com_id})
			      .then(function(res) {
					let url=_this.publichUrl+'/#/previewPager?moID='+res+'&isCompent='+true+'&comId='+data.com_id
					let item={}
					item.mo_id=res
					item.pub_url=url
					_this.$store.dispatch('savePopShow', true);
					_this.$store.dispatch('savePopObj', {
						popName: 'send',
						popType: 'sendUrl',
						contentMsg: "链接：" + url,
						data:item,
						popTitle: '发布',
						button: ['确定']
					});
			      })
			      .catch(function(error) {
			        console.log(error);
			      });
			},

		}
	}
</script>

<style>
	@import '../css/viewpager.css';
</style>
