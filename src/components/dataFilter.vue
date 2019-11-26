<!--
	作者：2585061200@qq.com
	时间：2019-09-25
	描述： 数据过滤配置
-->
<template>
	<div class="data-filter-config" id="dataFilter">
		<div class="data-filter-field">
			<label class="data-filter-checkbox" :class="ifFilter?'checked':''">
                <input type="checkbox" value="" v-model="ifFilter">
            </label>
			<span class="data-filter-title">数据过滤器</span>
			<i class="fa fa-plus add-filter" v-show="ifFilter" @click="addFilters"></i>
			</div>
		<div class="data-filter-body" v-show="ifFilter" >
			<div class="data-filter-item" v-for="(fdata,index) in filterData">
				<span class="data-filter-txt">参数：</span>
				<input type="text" class="data-filter-input" v-model="fdata.key" />
				<span class="data-filter-txt second-value">数值：</span>
				<input type="text" class="data-filter-input" v-model="fdata.value" />
				<i class="fa fa-trash-o delete-filter" @click="deleteFilter(index)"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'dataFilter',
		props:['filterData','isFilter'],
		data(){
			return{
				ifFilter:true
			}
		},
		watch:{
			ifFilter(newvalue,value){
				 this.$emit('filterChange', newvalue)
			}
		},
		mounted(){
			this.ifFilter=this.isFilter==='true'||this.isFilter===true?true:false
		},
		methods:{
			addFilters(){
				let item={
					key:'',
					value:''
				}
				this.filterData.push(item)
			},
			deleteFilter(index){
				this.filterData.splice(index,1)
			}
		}
	}
</script>

<style scoped="scoped">
.data-filter-config{
	width: 100%;
}
.data-filter-field{
	position: relative;
	padding: 3px 0px;
	margin-top:10px;
	border-top: 1px solid #282f3a;
	/*border-bottom: 1px solid #282f3a;*/
	color: #BCC9D4;
	display: flex;
	align-items: center;
	height: 30px;
}
.data-filter-checkbox{
	display: inline-block;
	width: 14px;
	height: 14px;
	border: 1px solid #3A4659;
	position: relative;
	cursor: pointer;
	margin-right: 10px;
	vertical-align: middle;
	top:2px;
}
.data-filter-checkbox.checked:after{
	content: '';
	width: 8px;
	height: 4px;
	position: absolute;
	top:3.5px;
	left: 3px;
	border: 1px solid #00BAFF;
	border-top: none;
	border-right: none;
	background: transparent;
	transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
}
.data-filter-checkbox input[type=checkbox]{
	visibility: hidden;
	background:transparent ;
}
.data-filter-title{
	font-size: 14px;
	font-weight: bold;
}
.add-filter{
	font-weight: lighter;
	font-size: 15px;
	margin-right: 10px;
	position: absolute;
	cursor: pointer;
	width: 15px;
	right: 0px;
}
.delete-filter{
	font-weight: lighter;
	font-size: 15px;
	cursor: pointer;
	/*width: 15px;*/
	margin-left: 4px;
}
.data-filter-item{
	display: inline-block;
	margin-top:10px;
	vertical-align: middle;
	width: 100%;
}
.data-filter-input{
	position: relative;
	width: 73px;
	height: 24px;
	background: #0e1013;
	border: 1px solid #282F3A;
	border-top: none;
	border-left: none;
	border-right: none;
	padding-left: 5px;
	box-sizing: border-box;
}
.second-value{
	margin-left: 5px;
}
</style>
