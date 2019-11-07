<template>
	<div class="gui-field-component">
		<label :for="fieldData.name" class="gui-for-checkbox" :class="fieldData.value?'checked':''" v-for="fieldData in radioData">
            <input type="checkbox" value="" :id="fieldData.name" @change="radioChange(fieldData)" v-model="fieldData.value">
        </label>
	</div>
</template>

<script>
	export default{
		props: ['chartId', 'radioData'],
		data() {
			return {
				dataType: true
			}
		},
		computed: {},
		mounted() {
			// console.log(this.radioData);
		},
		methods: {
			radioChange(data){
				if(data.name=='rmap'){ // 按y轴映射
					let data2 =  data.value?'show':'notShow';
					this.$emit('ymapChanged',data2)//子组件向父组件通信
				}else if(data.name=='自定义样式'){//自定义背景块
					let data2 =  data.value?'defined':'undefined';
					this.$emit('ymapChanged',data2)
				}else if(data.name=='轮播'){
					let data2 =  data.value?'animation':'stop';
					this.$emit('ymapChanged',data2)
				}else if(data.name=='自动轮播'){
					let data2 =  data.value?'animation':'stop';
					this.$emit('ymapChanged',data2)
				}else if(data.name=='定速播放'){
					let data2 =  data.value?'isFixed':'notFixed';
					this.$emit('ymapChanged',data2)
				}else if(data.name=='显示真实值'){
					let data2 =  data.value?'isTrue':'notTrue';
					this.$emit('ymapChanged',data2)
				}else if(data.name=='需要小数点'){
					let data2 =  data.value?'hasPoint':'notHasPoint';
					this.$emit('ymapChanged',data2)
				}
			}
		}
	}
</script>

<style>

</style>
