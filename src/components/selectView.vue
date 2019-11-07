<template>
	<div class="gui-field-component">
		<div class="gui-component-select">
			<div class="select-input">
				<select v-model="selectedValue" @change="selectXType">
					<option v-for="data in selectList" :value="data">{{data}}</option>
				</select>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['chartId', 'selectData'],
		data() {
			return {
			}
		},
		computed: {
			selectList(){
				if(this.selectData.name=='字体'||this.selectData.name=='文本字体'){
					let arr=['微软雅黑','宋体','黑体','隶书','幼圆','arial','sans-serif','digital']
					return arr
				}else{
					return this.selectData.selectData
				}
			},
			selectedValue:{
				get(){
              	  return this.selectData.value
	            },
	            set(val){
	                this.selectData.value = val
	            }
			}
		},
		mounted() {
		},
		watch:{
			selectedValue(value, newValue){
				this.selectData.value=value
			}
		},
		methods: {
			selectXType(){
				this.$emit('selectChanged',this.selectedValue)
			}
		}
		
	}
</script>

<style>

</style>