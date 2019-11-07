<template>
	<div class="gui-field-component gui-field-text-component">
		<input type="text" class="gui-input-text" v-model="inputs">
	</div>
</template>

<script>
	export default {
		props: ['inputData'],
		data() {
			return {
			}
		},
		computed: {
			inputs:{
				get(){
              	  return this.inputData.value
	            },
	            set(val){
	                this.inputData.value = val
	            }
			}
		},
		mounted() {
		},
		watch:{
			inputs(value, newValue){
				/*if(value=='+'){
					this.$set(this.inputData,'value',encodeURI(value))
				}else{
				}*/
				this.$set(this.inputData,'value',value)
			}
		},
		methods: {
			
		}
		
	}
</script>

<style>

</style>