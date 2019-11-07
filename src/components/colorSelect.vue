<!--
	作者：hqj
	时间：2018-10-18
	描述：颜色选择组件
-->
<template>
	<div class="gui-field-component gui-field-color-component">
		<div class="gui-field-color">
			<div class="gui-field-color-picker" title="设置为透明色">
				<!-- <input v-model="colorData.value" type="color"> -->
				<input v-model="colorData.value" type="text" @click="colorData.value='transparent'">
			</div>
			<div class="gui-field-color-block-border">
				<input v-model="colorData.value" type="color" :class="colorData.value=='transparent'?'transparent':''">
			</div>
			<input v-model="colorData.value" @blur="colorChangeBlur()" type="text" class="gui-field-color-value" maxlength="7">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['chartId', 'colorData'],
		data() {
			return {
				dataType: true
			}
		},
		computed: {
			colorStyle() {
				let item = {}
				item.backgroundColor = this.colorData.value
				return item
			}
		},
		mounted() {
		},
		methods: {
			colorChangeBlur() {
				console.log('bgColor:' + this.colorData.value)
				let bgColor = this.colorData.value
				if(bgColor != 'transparent' && bgColor != '') {
					//判断颜色值
					let reg = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");
					if(bgColor.match(reg)) {
						if(bgColor.length == 4) {
							let str = bgColor.substr(-3, 3);
							//改变全局中temp背景颜色属性
							this.colorData.value = bgColor + str;
						}
					} else {
						this.tips.open('error', '请输入正确的颜色值')
					}
				}
			},
		}
	}
</script>

<style>

</style>
