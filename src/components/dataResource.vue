<template>
	<div >
		<label class="pop-label2" for="data-key">
	     	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[0]}}</span>
	    		 <select class="input screen-name-input2" v-model="dataList.data_type" @change="changeDataType(dataList.data_type)">
	    		 	<option>mysql</option>
	    		 	<option>oracle</option>
					 <option>csv</option>
	    		 </select>
		</label>
		<label class="pop-label2">
	     	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[1]}}</span>
	    	<input type="text" class="input screen-name-input2"  value=""
	    		 v-model="dataName">
		</label>
		<div v-if="dataList.data_type=='csv'" style="width:100%;height:100%;">
			<label class="pop-label2">
				<span class="pop-label-name2"><i class="required">*</i>上传文件</span>
				<div class="datav-field">
					<div class="upload-csv">
						<div for="upload-file-csv" class="upload-csv-main">
							<i class="fa fa-tags"></i>
							<span class="upload-span">文件大小不得超过 512KB</span>
						</div>
						<input type="file" class="input-file csvFile" @change="csvFileChange" name="extra[file]" multiple="" accept="text/csv" id="upload-file-csv">
					</div>
				</div>
			</label>
		</div>
		<div v-else style="width:100%;height:100%;">
			<label class="pop-label2">
	         	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[2]}}</span>
	        	<input type="text" class="input screen-name-input2"  value=""
	        		 v-model="dataList.url">
			</label>
			<label class="pop-label2">
	         	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[3]}}</span>
	        	<input type="text" class="input screen-name-input2"  value=""
	        		 v-model="dataList.username">
			</label>
			<label class="pop-label2">
	         	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[4]}}</span>
	        	<input type="password" class="input screen-name-input2"  value=""
	        		 v-model="dataList.password">
			</label>
			<label class="pop-label2">
	         	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[5]}}</span>
	        	<input type="text" class="input screen-name-input2"  value=""
	        		 v-model="dataList.port">
			</label>
			<label class="pop-label2">
	         	<span class="pop-label-name2"><i class="required">*</i>{{ popObj.data[6]}}</span>
	        		 <div class="pop-div">
	        		 	<input type="button" v-if="dataList.data_type=='mysql'" class="btn-normal-pop" value="获取数据列表" @click="getDatabases(dataList)" />
	        		 	<input type="button" v-else-if="dataList.data_type=='oracle'" class="btn-normal-span" value="数据库名称" />
	        		 <input type="text" class="input database-name-input" v-model="selectBaseName" v-if="dataList.data_type=='oracle'"/>
	        		 	<select class="pop-select" v-model="selectBaseName" v-else="dataList.data_type=='mysql'">
	        		 		<option v-for="(database,index) in dbList" :value="database">{{database}}</option>
	        		 	</select>
	        		 </div>
	        		
			</label>
		</div>
	</div>
</template>

<script>
	export default{
		name:'dataResource',
		data(){
			return {}
		},
		props:['popObj','dataList','selectBaseName'],
		computed:{
			dbList() {
				console.log('data list:' + JSON.stringify(this.$store.state.allDatabases))
				return this.$store.state.allDatabases
			},
		},
		methods:{
			getDatabases(datas) { // 获取数据库列表
				console.log('data post info:' + JSON.stringify(this.dataList))
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
		}
	}
</script>

<style>
</style>