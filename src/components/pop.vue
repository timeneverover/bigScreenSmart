<template>
	<div class="pop-wrap" v-show="popShow">
		<div class="pop-mask" @click="popWindowClose"></div>
		<div class="pop-window" :class="popObj.popName=='create'?'create-pop':''">
			<div class="pop-title">
				<div class="pop-title-text">
					{{popObj.popTitle}}
				</div>
				<div class="close-btn" @click="popWindowClose">
					<i class="icon pop-icon fa fa-times"></i>
				</div>
			</div>
			<div class="pop-content">
				<label v-if="popObj.popName=='create'" for="screen-name" class="pop-label">
                     <span class="pop-label-name">{{popObj.contentTitle}}</span>
                     <input type="text" class="input screen-name-input" name="screen-name" @keyup.enter="createScreen"
                     :placeholder="popObj.contentInput" v-model="screenName">
                </label>
				<!--删除、发送提示-->
				<label v-else-if="popObj.popName=='delete'||popObj.popName=='send'" for="screen-name" class="pop-label">
					 <span class="pop-label-name">{{popObj.contentMsg}}</span>
                 </label>
				 <!--创建组件/编辑组件-->
				 <div v-else-if="popObj.popName=='createCompent'">
					<label class="pop-label2 compent-pop">
                      	<span class="pop-label-name2"><i class="required">*</i>组件名称</span>
                     	<input type="text" class="input screen-name-input2" placeholder="请输入组件名称" v-model="compentTempList.com_name">
 					</label>
					<label class="pop-label2">
                     	<span class="pop-label-name2"><i class="required">*</i>组件描述</span>
                    	<input type="text" class="input screen-name-input2"  placeholder="请输入组件描述" v-model="compentTempList.com_descr">
					</label>
					<label class="pop-label2">
                     	<span class="pop-label-name2">
							<i class="required">*</i>
							组件嵌套模板
							<i class="addPage fa fa-plus" title="新增关联模板" @click="addCompentTemp"></i>
						</span>
					</label>
					<label class="pop-label2">
						<div class="pop-div-pages" v-for="(comTemp,index) in compentTempList.com_data">
							<div class="pop-div-name">
								<span>模板名称</span>
								<select class="select" v-model="comTemp.mo_id">
								   <option :value="temp.mo_id" v-for="temp in allComTempList">{{temp.mo_name}}</option>
							    </select>
							</div>
							<div class="pop-div-time">
								<span>时间</span>
								<input type="text" class="input" placeholder="请填写Cron表达式,例:0 0 1 1 * ?" v-model="comTemp.tri_time">
								<a class="fa fa-question-circle-o" href="http://cron.qqe2.com" title="详情点击访问 http://cron.qqe2.com 在线生成" target="_blank"></a>
							</div>
							<div class="pop-div-del" @click="delCompentTemp(index)">
								<span title="删除模板">删除</span>
							</div>
						</div>
					</label>
				 </div>
				<!--组创建/修改-->
			   <div v-else-if="popObj.popName=='createGroup'||popObj.popName=='editGroup'">
				   <label class="pop-label" for="group-name">
					   <span class="pop-label-name"><i class="required">*</i>{{popObj.data[0].contentTitle}}</span>
					   <input v-if="popObj.popName=='createGroup'" type="text" class="input screen-name-input" name="group-name" :placeholder="popObj.data[0].contentInput" v-model="groupInfo.group_name">
					   <input v-else type="text" class="input screen-name-input" name="group-name"  v-model="popObj.data[0].contentValue">
				   </label>
				   <label class="pop-label" for="group-describe">
					   <span class="pop-label-name">{{ popObj.data[1].contentTitle}}</span>
					   <input v-if="popObj.popName=='createGroup'" type="text" class="input screen-name-input" name="group-describe" :placeholder="popObj.data[1].contentInput" v-model="groupInfo.group_descr">
					   <input v-else type="text" class="input screen-name-input" name="group-describe" v-model="popObj.data[1].contentValue">
				   </label>
			   </div>
				<!--数据源添加/修改-->
				<div v-else-if="popObj.popName=='createData'||popObj.popName=='editData'">
					<label class="pop-label2" for="data-key">
                     	<span class="pop-label-name2"><i class="required">*</i>{{popObj.data[0]}}</span>
                		 <select v-if="popObj.popName=='createData'" class="input screen-name-input2" v-model="dataList.data_type" @change="changeDataType(dataList.data_type)">
                		 	<option>mysql</option>
                		 	<option>oracle</option>
							<option>sqlserver</option>
							 <option>excel</option>
							 <option>http</option>
							 <option>ws</option>
							 <option>elasticsearch</option>
                		 </select>
						 <input v-else type="text" class="input screen-name-input2" disabled="disabled"  v-model="popObj.data2.data_type">
					</label>
					<label class="pop-label2">
                     	<span class="pop-label-name2"><i class="required">*</i>名称</span>
                    	<input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataName">
						<input v-else type="text" class="input screen-name-input2" v-model="dataName">
					</label>
					<!-- http start -->
					<div v-if="popObj.data2?popObj.data2.data_type=='http' :dataList.data_type=='http'" class="label-wrap">
						<label class="pop-label2">
						    <span class="pop-label-name2"><i class="required">*</i>{{popObj.data[2]}} <em>例：http://ultrapower.com.cm</em></span>
						    <input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2"  value="" v-model="dataList.url">
							<input v-else type="text" class="input screen-name-input2"  v-model="popObj.data2.url">
					    </label>
					   <label class="pop-label2">
							<span class="pop-label-name2"><i class="required">*</i>{{popObj.data[3]}}</span>
							<select v-if="popObj.popName=='createData'" class="input screen-name-input2" v-model="dataList.type" @change="changerequest()">
								<option>get</option>
								<option>post</option>
							</select>
							<select v-else class="httpselect" v-model="popObj.data2.type">
								<option>get</option>
								<option>post</option>
							</select>
					   </label>
					   <label class="pop-label2">
							<span class="pop-label-name2">{{popObj.data[4]}}</span>
						    <input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataList.paramdata">
						    <input v-else type="text" class="input screen-name-input2"  v-model="popObj.data2.paramdata">
					   </label>
					</div>
					<!-- ws start -->
					<div v-else-if="popObj.data2?popObj.data2.data_type=='ws':dataList.data_type=='ws'" class="label-wrap">
						   <label class="pop-label2">
							    <span class="pop-label-name2"><i class="required">*</i>{{popObj.data[2]}}</span>
							    <input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataList.wsurl">
								<input v-else type="text" class="input screen-name-input2"  v-model="popObj.data2.wsurl">
						   </label>
						   <label class="pop-label2">
								<span class="pop-label-name2"><i class="required">*</i>{{popObj.data[3]}}</span>
								<input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" value="" v-model="dataList.funcname">
								<input v-else type="text" class="input screen-name-input2" v-model="popObj.data2.funcname">
						   </label>
						   <label class="pop-label2">
								<span class="pop-label-name2">{{popObj.data[4]}}</span>
							    <input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2"  value="" v-model="dataList.paramdata">
							    <input v-else type="text" class="input screen-name-input2"  v-model="popObj.data2.paramdata">
						   </label>
						   <label class="pop-label2">
							   <span class="pop-label-name2"><i class="required">*</i>{{popObj.data[5]}}</span>
						       <input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataList.wsnamespace">
							   <input v-else type="text" class="input screen-name-input2"  v-model="popObj.data2.wsnamespace">
						  </label>
					</div>
					<!-- mysql/oracle/sqlserver start -->
					<div v-else-if="dataList.data_type=='mysql'||dataList.data_type=='oracle'||dataList.data_type=='sqlserver'||dataList.data_type=='elasticsearch'" class="label-wrap">
						<label class="pop-label2">
	                     	<span class="pop-label-name2"><i class="required">*</i>{{popObj.data[2]}}</span>
	                    	<input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataList.url">
							<input v-else type="text" class="input screen-name-input2" v-model="popObj.data2.url">
						</label>
						<label class="pop-label2">
	                     	<span class="pop-label-name2">
								<i v-show="dataList.data_type!='elasticsearch'" class="required">*</i>
								{{popObj.data[3]}}
							</span>
	                    	<input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataList.username">
							<input v-else type="text" class="input screen-name-input2"  v-model="popObj.data2.username">
						</label>
						<label class="pop-label2">
	                     	<span class="pop-label-name2">
								<i v-show="dataList.data_type!='elasticsearch'" class="required">*</i>
								{{popObj.data[4]}}
							</span>
	                    	<input v-if="popObj.popName=='createData'" type="password" class="input screen-name-input2" v-model="dataList.password">
							<input v-else type="password" class="input screen-name-input2"  v-model="popObj.data2.password">
						</label>
						<label class="pop-label2">
	                     	<span class="pop-label-name2"><i class="required">*</i>{{popObj.data[5]}}</span>
	                    	<input v-if="popObj.popName=='createData'" type="text" class="input screen-name-input2" v-model="dataList.port">
							<input v-else type="text" class="input screen-name-input2" v-model="popObj.data2.port">
						</label>
						<label class="pop-label2">
	                     	<span class="pop-label-name2"><i class="required">*</i>{{popObj.data[6]}}</span>
							<div v-if="popObj.popName=='createData'">
								<div class="pop-div" v-if="dataList.data_type=='mysql'">
	                       		 	<input type="button" class="btn-normal-pop" value="获取数据列表" @click="getDatabases(dataList)" />
	   								<select class="pop-select" v-model="selectBaseName">
	                       		 		<option v-for="(database,index) in dbList" :value="database">{{database}}</option>
	                       		 	</select>
	                       		 </div>
								<input v-else-if="dataList.data_type=='elasticsearch'" type="text" class="input screen-name-input2 index-name-input" v-model="selectBaseName">
								<div class="pop-div" v-else>
	                    		 	<input type="button" class="btn-normal-span" value="数据库名称" />
	                    		 	<input type="text" class="input database-name-input" v-model="selectBaseName" />
	                    		</div>
							</div>
							<div v-else>
								 <div class="pop-div" v-if="popObj.data2.data_type==='mysql'">
	   								<input type="button" class="btn-normal-pop" value="获取数据列表" @click="getDatabases(popObj.data2)" />
	   								<select class="pop-select" v-model="selectBaseName">
	                       		 		<option v-for="(database,index) in dbList" :value="database">{{database}}</option>
	                       		 	</select>
	                       		 </div>
								 <input v-else-if="popObj.data2.data_type=='elasticsearch'" type="text" class="input screen-name-input2 index-name-input" v-model="selectBaseName">
	   							 <div class="pop-div" v-else>
	                       		 	<input type="button" class="btn-normal-span" value="数据库名称" />
	                       		 	<input type="text" class="input database-name-input" v-model="selectBaseName" />
	                       		 </div>
							</div>

						</label>
					</div>
					<!-- excel start -->
					<div v-else-if="dataList.data_type=='excel'&&popObj.popName=='createData'" class="label-wrap">
						<label class="pop-label2">
							<span class="pop-label-name2"><i class="required">*</i>上传文件</span>
							<div class="datav-field">
								<div class="upload-csv">
									<div for="upload-file-csv" class="upload-csv-main">
										<i class="fa fa-tags"></i>
										<span class="upload-span">{{fileName}}</span>
									</div>
									<input type="file" class="input-file csvFile" @change="csvFileChange" name="extra[file]" multiple="" accept=".xls,.xlsx" id="upload-file-csv">
								</div>
							</div>
						</label>
					</div>

				</div>
				<!--查看数据响应结果-->
				<div v-else-if="popObj.popName=='responseData'">
					<div class="response-data-div">
						<label class="">数据响应结果</label>
						<div class="response-content">
							<textarea name="数据响应" rows="" cols="">{{mappingResponse}}</textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="pop-footer">
				<button class="btn-normal btn-md" v-for="btnName in popObj.button" v-show="!(btnName=='测试连接'&&dataList.data_type=='excel')" @click="popBtnClick(btnName)">
                     <span>{{btnName}}</span>
                 </button>
			</div>
		</div>
	</div>
</template>

<script>
	import TipBoxService from '../publicService/TipBoxService.js'
	import httpService from '../publicService/HttpService.js'
	import Urls from '../publicService/urls.js'
	export default {
		name: 'PopItem',
		data() {
			return {
				screenName: '',
				dataName: '',
				connectReponse: '', // 数据库测试连接
				groupInfo: {
					group_name: '',
					group_descr: '',
					group_sort: ''
				},
				dataList: {
					data_type: 'mysql', //标识数据源
					data_name: '', //数据源名称
					url: '', //数据源链接地址
					port: '3306', //:数据源端口
					basename: '', //数据库名称
					username: '', //数据库用户名
					password: '', //数据库密码
					request:"get",
					param:"",
					namekj:"",
					funcname:"",
				},
				httptype:{
					url:"",
					request:"get",
					param:""
				},
				selectBaseName: '',
				csvFile:'', // csv file
				fileName:'未选择文件'
				// originalData: {}
			}
		},
		computed: {
			allComTempList() {
				return this.$store.state.allComTempList
			},
			compentTempList() {
				return this.$store.state.compentTempList
			},
			popShow() {
				return this.$store.state.popShow
			},
			popObj() {
				let obj = this.$store.state.popObj
				return obj
			},
			thumbailItemData() {
				return this.$store.state.thumbailItemData
			},
			dbList() {
				return this.$store.state.allDatabases
			},
			mappingResponse() {
				return this.$store.state.mappingResponse
			}
			/*originalData(){
				console.log('originalData:' + JSON.stringify(this.$store.state.originalData))
				return this.$store.state.originalData
			}*/
		},
		mounted() {},
		watch: {
			popObj: {
				handler(newValue, oldValue) {　　
					let obj = this.$store.state.popObj　　
					if(this.popShow) {
						if(obj.popName == 'editData') {
							this.$store.state.allDatabases = []
							this.selectBaseName = ''
						}
						if(obj.popName == 'createData') { // 如果数据改变，database清空
							this.$store.state.allDatabases = []
							this.selectBaseName = ''
						}
					}　　
				},
				　deep: true
			},
			dataList: {
				handler(newValue, oldValue) {　　
					let obj = this.$store.state.popObj　　
					if(this.popShow) {
						this.$store.state.allDatabases = []
						this.selectBaseName = ''
					}　　
				},
				　deep: true
			},
			popShow(value, val2) {
				if(!value) {
					this.initData()
				} else {
					if(this.$store.state.popObj.popName == 'editData') {
						this.selectBaseName = this.$store.state.popObj.data2.basename
						this.dataName = this.$store.state.popObj.data2.data_name
						let type = this.$store.state.popObj.data2.data_type
						if(type == 'mysql') {
							this.getDatabases(this.$store.state.popObj.data2)
						}
					} else if(this.$store.state.popObj.popName == 'createData') {
						this.dataName = ''
					}
				}
			},
			dbList(value, val2) {
				let len = this.dbList.length
				let obj = this.$store.state.popObj
				if(obj.popName == 'editData') {
					if(this.selectBaseName == '' && len > 0) {
						this.selectBaseName = this.dbList[0]
					}
				} else if(obj.popName == 'createData' && len > 0) {
					this.selectBaseName = this.dbList[0]
				}
			}
		},
		methods: {
			//新增组件关联模板
			addCompentTemp(){
				//往数组中添加数据
				this.$store.state.compentTempList.com_data.push({
					mo_id: '',
			        tri_time: ''
				})
			},
			delCompentTemp(index){
				this.$store.state.compentTempList.com_data.splice(index,1);
			},
			csvFileChange(event) { // 上传csv文件
				this.csvFile=event.target.files[0]
				this.fileName=this.csvFile.name
			},
			changeDataType(data) {
				if(data == 'mysql') {
					this.dataList.port = '3306'
				} else if(data == 'oracle'||data == 'sqlserver') {
					this.dataList.port = '1521'
				}
				if(data=='http'){
					this.popObj.data = ["类型", "名称", "url",'post/get','param'];
				}else if(data=='ws'){
					this.popObj.data = ["类型", "名称", "url",'方法名','param','命名空间'];
				}else if(data=='elasticsearch'){
					this.popObj.data = ["类型", "名称", "域名", "用户名", "密码", "端口", "索引名称"];
					this.dataList.port = '9200'
				}else{
					this.popObj.data = ["类型", "名称", "域名", "用户名", "密码", "端口", "数据库"];
				}
			},
			changerequest(){
				console.log(this.dataList);
			},
			createScreen() { // enter 键创建大屏
				let that = this
				if(this.screenName.length == 0) {
					this.tips.open('error', '名字不能为空');
					return;
				}
				//在分组中创建模板
				let postData = {
					mo_name: this.screenName,
					mo_descr: '',
					group_id: this.popObj.popData.groupId,
					pic_url: '',
					mo_url: '',
					mo_id: this.popObj.popData.tempId
				}
				if(this.popObj.popData.tempIndex==0){//空白
					httpService.postStringLink(Urls.addTempUrl, {
						'param': JSON.stringify(postData)
					}, function(data) {
						that.$router.push({
							path: '/screen',
							query: {
								tempId: data.mo_id,
								tempName: postData.mo_name
							}
						});
					})
				}else{//已有内容的模板信息
					httpService.postStringLink(Urls.addExistTempUrl, {
						'param': JSON.stringify(postData)
					}, function(data) {
						that.$router.push({
							path: '/screen',
							query: {
								tempId: data.mo_id,
								tempName: postData.mo_name
							}
						});
					})
				}
				this.$store.dispatch('savePopShow', false)
			},
			getDatabases(datas) { // 获取数据库列表
				if(datas.data_type == 'mysql') {
					let item = {}
					let data = {}
					item.key = datas.data_type
					data.url = datas.url
					data.port = datas.port
					data.username = datas.username
					data.password = datas.password
					item.data = data
					this.$store.dispatch('getAllDatabases', item)
				} else {
					TipBoxService.open('error', '请输入数据库')
				}
			},
			popWindowClose() {
				this.$store.dispatch('savePopShow', false)
			},
			popBtnClick(name) {
				let that = this;
				let status = false;

				if(name == '创建' || name=="确认修改") {
					if(this.popObj.popName == 'create') { //创建大屏
						if(this.screenName.length == 0) {
							this.tips.open('error', '名字不能为空');
							return;
						}
						let randData = Math.floor(Math.random() * 90000 + 10000);
						//在分组中创建模板
						let postData = {
							mo_name: this.screenName,
							mo_descr: '',
							group_id: this.popObj.popData.groupId,
							pic_url: '',
							mo_url: '',
							mo_id: this.popObj.popData.tempId
						}
						if(this.popObj.popData.tempIndex==0){//空白
							httpService.postStringLink(Urls.addTempUrl, {
								'param': JSON.stringify(postData)
							}, function(data) {
								that.$router.push({
									path: '/screen',
									query: {
										tempId: data.mo_id,
										tempName: postData.mo_name
									}
								});
							})
						}else{//已有内容的模板信息
							httpService.postStringLink(Urls.addExistTempUrl, {
								'param': JSON.stringify(postData)
							}, function(data) {
								that.$router.push({
									path: '/screen',
									query: {
										tempId: data.mo_id,
										tempName: postData.mo_name
									}
								});
							})
						}

					}else if(this.popObj.popName == 'createCompent'){//添加首页组件

						let compentTempList = this.compentTempList;
						let comData = compentTempList.com_data;
						if(compentTempList.com_name==''){
							this.tips.open('error', '组件名称不能为空');
							return;
						}else if(compentTempList.com_descr==''){
							this.tips.open('error', '组件描述不能为空');
							return;
						}else if(comData.length==0){
							this.tips.open('error', '您还没有添加模板');
							return;
						}
						for(let c=0;c<comData.length;c++){
							if(comData[c].mo_id==''||comData[c].tri_time==''){
								this.tips.open('error', '组件嵌套模板信息不能为空');
								return;
							}
						}
						if(this.popObj.popTitle=="新建组件数据"){
							this.$store.dispatch('addCompent', this.compentTempList);
						}else if(this.popObj.popTitle=="修改组件数据"){
							this.$store.dispatch('editCompent', this.compentTempList);
						}

					} else if(this.popObj.popName == 'createGroup') { //添加大屏分组
						if(this.groupInfo.group_name == '') {
							this.tips.open('error', '名字不能为空');
							return;
						}
						this.$store.dispatch('addNewGroup', this.groupInfo)
					} else if(this.popObj.popName == 'createData') { //添加数据库信息
						if(this.dataList.data_type=='excel'){
							if(this.dataName == '') {
								this.tips.open('error', '名称不能为空');
								return;
							}else if(!this.csvFile.name) {
								this.tips.open('error', '请上传excel文件');
								return;
							}else {
								let param = new FormData();
								let file=this.csvFile
								param.append('file', this.csvFile, this.csvFile.name);
								param.append('data_name', this.dataName);
								param.append('key', this.dataList.data_type);
								let data={}
								data.key=this.dataList.data_type
								data.param=param
								this.$store.dispatch('addNewData', data)
							}
						}else if(this.dataList.data_type=='http'){
							//添加http
							if(this.dataList.url==''){
								this.tips.open('error', 'url不能为空');
								return;
							}else{
								var item = {},
									data = {};
								data.key = this.dataList.data_type;
								item.data_type = this.dataList.data_type
								item.data_name = this.dataName;
								item.url = this.dataList.url;
								item.type=this.dataList.type;
								item.paramdata=this.dataList.paramdata;
								data.data = item;
								this.$store.dispatch('HttpConnect', data)
							}
						}else if(this.dataList.data_type=='ws'){
							//添加ws
							if(this.dataName == ''){
								this.tips.open('error', '名称不能为空');return;
							}else if(this.dataList.wsurl==''){
								this.tips.open('error', 'url不能为空'); return;
							}else if(this.dataList.funcname==""){
								this.tips.open('error', '请求方式不能为空'); return;
							}else if(this.dataList.wsnamespace==""){
								this.tips.open('error', '命名不能为空'); return;
							}else{
								var item = {},
									data = {};
								data.key = this.dataList.data_type;
								item.data_type = this.dataList.data_type
								item.data_name = this.dataName;
								item.wsurl = this.dataList.wsurl;
								item.funcname=this.dataList.funcname;
								item.paramdata=this.dataList.paramdata;
								item.wsnamespace=this.dataList.wsnamespace;
								data.data = item;
								this.$store.dispatch('HttpConnect', data)
							}

						}else{
							if(this.dataList.data_type!='elasticsearch'){
								if(this.dataList.username == ''){
									this.tips.open('error', '用户名不能为空');
									return;
								}else if(this.dataList.password == ''){
									this.tips.open('error', '密码不能为空');
									return;
								}
							}
							if(this.dataName == '') {
								this.tips.open('error', '名称不能为空');
								return;
							} else if(this.dataList.url == '') {
								this.tips.open('error', '域名不能为空');
								return;
							} else if(this.dataList.port == '') {
								this.tips.open('error', '端口不能为空');
								return;
							} else if(this.selectBaseName == '') {
								if(this.dataList.data_type=='elasticsearch'){
									this.tips.open('error', '数据库不能为空');
								}else{
									this.tips.open('error', '索引名称不能为空');
								}
								return;
							} else {
								var item = {},
									data = {};
								data.key = this.dataList.data_type;
								item.data_type = this.dataList.data_type
								item.data_name = this.dataName;
								item.url = this.dataList.url;
								item.port = this.dataList.port;
								item.basename = this.selectBaseName;
								item.username = this.dataList.username;
								item.password = this.dataList.password;
								if(this.dataList.data_type=='elasticsearch'){
									data.key = 'elasticsearch';
								}
								data.data = item;
								this.$store.dispatch('addNewData', data)
							}
						}
					}
				} else if(name == '修改') {
					if(this.popObj.popName == 'editGroup') { //添加大屏分组
						let item = this.popObj.popData
						// item.group_id = this.popObj.popId
						// item.moNum = this.popObj.popNum
						item.group_name = this.popObj.data[0].contentValue
						item.group_descr = this.popObj.data[1].contentValue
						if(item.group_name == '') {
							this.tips.open('error', '名字不能为空');
							return;
						}
						this.$store.dispatch('editGroup', item)
					} else if(this.popObj.popName == 'editData') { //修改数据库信息
						if(this.popObj.data2.data_type=='http'){//确认修改http
							if(this.dataName == '') {
								this.tips.open('error', '名称不能为空');
								return;
							}else if(this.popObj.data2.url == '') {
								this.tips.open('error', '域名不能为空');
								return;
							}else if(this.popObj.data2.paramdata==""){
								this.tips.open('error', '域名不能为空');
								return;
							}else{
								var item = {},
								data = {};
								data.key = this.popObj.data2.data_type
								data.data = this.popObj.data2
								data.data.basename = this.selectBaseName
								data.data.data_name = this.dataName;
								this.$store.dispatch('editData', data)
							}
						}else if(this.popObj.data2.data_type=='ws'){
							if(this.dataName == '') {
								this.tips.open('error', '名称不能为空');
								return;
							}else if(this.popObj.data2.wsurl == '') {
								this.tips.open('error', 'url不能为空');
								return;
							}else if(this.popObj.data2.wsnamespace ==""){
								this.tips.open('error', '命名空间不能为空');
							}else if(this.popObj.data2.funcname ==""){
								this.tips.open('error', '请求方式不能为空');
							}else{
								var item = {},
								data = {};
								data.key = "ws"
								data.data = this.popObj.data2
								data.data.basename = this.selectBaseName
								data.data.data_name = this.dataName;
								this.$store.dispatch('editData', data)
							}

						}else{
							if(this.popObj.data2.data_type!='elasticsearch'){
								if(this.popObj.data2.username == ''){
									this.tips.open('error', '用户名不能为空');
									return;
								}else if(this.popObj.data2.password == ''){
									this.tips.open('error', '密码不能为空');
									return;
								}
							}
							if(this.dataName == '') {
								this.tips.open('error', '名称不能为空');
								return;
							} else if(this.popObj.data2.url == '') {
								this.tips.open('error', '域名不能为空');
								return;
							} else if(this.popObj.data2.port == '') {
								this.tips.open('error', '端口不能为空');
								return;
							} else if(this.selectBaseName == '') {
								if(this.popObj.data2.data_type=='elasticsearch'){
									this.tips.open('error', '索引名称不能为空');
								}else{
									this.tips.open('error', '数据库不能为空');
								}
								return;
							} else {
								var item = {},
									data = {};
								data.key = this.popObj.data2.data_type
								data.data = this.popObj.data2
								data.data.basename = this.selectBaseName
								data.data.data_name = this.dataName
								if(this.popObj.data2.data_type=='elasticsearch'){
									data.key = 'elasticsearch';
								}
								this.$store.dispatch('editData', data)
							}
					    }
					}
				} else if(name == '确定') {
					var data = {};
					var id = this.popObj.popId;
					if(this.popObj.popType == 'group') { //删除大屏分组
						data.group_id = id;
						//校验分组下有模板的分组不能删除
						this.$store.dispatch('deleteGroup', data);
					} else if(this.popObj.popType == 'temp') { //“我的数据”页面添加数据
						data.mo_id = this.popObj.tempId;
						data.group_id = id
						this.$store.dispatch('deleteGroupTemlete', data);
					} else if(this.popObj.popType == 'component') { //删除组件(图形)
						var item = {}
						item.mo_id = this.popObj.popId
						item.attr_id = this.popObj.popKey
						item.sort = this.popObj.popIndex
						item.type = this.popObj.popState
						this.$store.dispatch('delLeftEditMain', item);
						// this.$store.dispatch('saveThumbailItemData', {});
						$('.layer-manager-wrap li').removeClass('selected');
					} else if(this.popObj.popType == 'data') { //删除数据数据
						data.key = this.popObj.popKey;
						var item = {};
						item.data_id = id;
						data.data = item;
						this.$store.dispatch('deleteData', data);
					}else if(this.popObj.popType == 'compent'){//删除首页组件数据
						this.$store.dispatch('delCompent', {com_id:this.popObj.comID});
					}
				} else if(name == '测试连接') { // 测试数据库连接
					let obj = {};
					if(this.popObj.popName == 'createData'){//添加数据库信息
						obj = this.dataList;
					}else{
						obj = this.popObj.data2;
					}
					if(obj.data_type=='http'){
						if(obj.url==''){
							this.tips.open('error', 'url不能为空');
							return;
						}else{
							var item = {};
							item.url = obj.url;
							this.$store.dispatch('testHttpConnect', item);
						}
					}else if(obj.data_type=='ws'){
						if(obj.wsurl==''){
							this.tips.open('error', 'url不能为空');
							return;
						}else if(obj.funcname==''){
							this.tips.open('error', '方法名不能为空');
							return;
						}else if(obj.wsnamespace==''){
							this.tips.open('error', '命名空间不能为空');
							return;
						}else{
							var item = {}
							item.data_name= this.dataName;
							item.type = obj.data_type;
							item.wsurl = obj.wsurl;
							item.paramdata= obj.paramdata;
							item.namekj= obj.wsnamespace;
							item.funcname= obj.funcname;
							item.request= obj.request;
							this.$store.dispatch('testWsConnect', item)
						}
					}else {
						if(obj.data_type!='elasticsearch'){
							if(obj.username == ''){
								this.tips.open('error', '用户名不能为空');
								return;
							}else if(obj.password == ''){
								this.tips.open('error', '密码不能为空');
								return;
							}
						}

						if(obj.url == '') {
							this.tips.open('error', '域名不能为空');
							return;
						} else if(obj.port == '') {
							this.tips.open('error', '端口不能为空');
							return;
						} else if(this.selectBaseName == '') {
							if(obj.data_type=='elasticsearch'){
								this.tips.open('error', '索引名称不能为空');
							}else{
								this.tips.open('error', '数据库不能为空');
							}
							return;
						} else {
							var item = {}
							item.type = obj.data_type;
							item.url = obj.url;
							item.port = obj.port;
							item.username = obj.username;
							item.password = obj.password;
							item.basename = this.selectBaseName;
							if(obj.data_type=='elasticsearch'){
								item.key = 'elasticsearch';
							}
							this.$store.dispatch('testDataConnect', item)
						}
					}
					status = true
				}

				this.$store.dispatch('savePopShow', status)
			},
			initData() {
				this.$store.state.popObj = ''
				this.dataList = {
					data_type: 'mysql',
					data_name: '',
					url: '',
					port: '3306',
					basename: '',
					username: '',
					password: ''
				}
				this.groupInfo = {
					group_name: '',
					group_descr: '',
					group_sort: ''
				}
				this.screenName = ''
				this.$store.state.allDatabases = []
				this.csvFile=''
				this.fileName='未选择文件'
				$('.csvFile').val('')
			},
			editHttp(){
				if(this.popObj.data2.url==''){
					this.tips.open('error', 'url不能为空');
					return;
				}else{
					var item = {}
					item.url = this.popObj.data2.url;
					this.$store.dispatch('testHttpConnect', item)
				}
			},
			updatehttp(){
				if(this.popObj.data2.url==''){
					this.tips.open('error', 'url不能为空');
					return;
				}else if(this.popObj.data2.param==''){
					this.tips.open('error', '参数不能为空');
					return;
				}else{
					var item = {},
					data = {};
					data.key = this.popObj.data2.data_type;
					item.data_type = this.popObj.data2.data_type
					item.data_name = this.popObj.data2.data_name;
					item.url = this.popObj.data2.url;
					item.type=this.popObj.data2.type;
					item.paramdata=this.popObj.data2.paramdata;
					item.createTime=this.popObj.data2.createTime;
					item.data_id=this.popObj.data2.data_id;
					item.create_Time=this.popObj.data2.create_Time;
					data.data = item;
					this.$store.dispatch('HttpConnect', data)
				}
			}
		}
	}
</script>
