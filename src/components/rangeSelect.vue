<!--
	作者：hqj
	时间：2018-10-18
	描述：范围选择组件
-->
<template>
	<div class="gui-field-component gui-field-range-component">
		<input type="range" :step="rangObj.step" :min="rangObj.minValue" :max="rangObj.maxValue" class="gui-input-range" v-model="rangObj.value" :style="colorStyle">
		<div class="range-value-text-container">
			<div class="range-value-text"><input type="number" :value="rangObj.minValue" readonly class="gui-input-number"><span>最小值</span></div>
			<div class="range-value-text"><input type="text" class="gui-input-number" v-model="rangObj.value"></div>
			<div class="range-value-text"><input type="number" :value="rangObj.maxValue" readonly class="gui-input-number"><span>最大值</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			chartId: '',
			rangObj: {
				name: '',
				value: 0,
				minValue: 0,
				maxValue: 40,
				step: 0.5
			}
		},
		data() {
			return {}
		},
		computed: {
			colorStyle() { // 拖动条拖动，已选的颜色更改
				let item = {}
				let min = this.rangObj.minValue
				let max = this.rangObj.maxValue
				let value = this.rangObj.value - min
				let sum = max - min
				let data = Math.round(value / sum * 10000) / 100.00 + "%"
				let bg = 'linear-gradient(to right, rgb(0, 251, 255), rgb(0, 176, 255) ' + data + ', rgb(38, 42, 53) ' + data + ', rgb(38, 42, 53))'
				item.background = bg
				return item
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>