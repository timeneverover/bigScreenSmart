<template>
	<div class="gui-field-component gui-field-multi-color-component">
		<div class="gui-field-multi-color">
			<div style="padding-bottom: 5px;">
				<div class="gui-field-component">
					<div class="gui-component-select">
						<div class="select-input ">
							<select class="" v-model="colorDatas.value">
								<option v-for="data in colorDatas.selectData" :value="data">{{data}}</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div style="padding-bottom: 5px;" v-if="colorDatas.value=='渐变填充'||colorDatas.value=='渐变'">
				<div class="color-gradient-block">
					<div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; " :style="colorStart"></div>
					<div style="position: absolute; width: 100%; height: 100%;" :style="colorEnd"></div>

				</div>
				<div class="color-gradient-components">
					<colorSelect v-if="colorDatas.fieldData[1].fieldData[0].type=='color'" :colorData="colorDatas.fieldData[1].fieldData[0]"></colorSelect>

					<colorSelect v-if="colorDatas.fieldData[1].fieldData[1].type=='color'" :colorData="colorDatas.fieldData[1].fieldData[1]"></colorSelect>

				</div>
			</div>
			<div v-if="colorDatas.value=='渐变填充'||colorDatas.value=='渐变'">
				<rangeSelect v-if="colorDatas.fieldData[1].fieldData[2].type=='range'" :rangObj="colorDatas.fieldData[1].fieldData[2]"></rangeSelect>
				<numberSelect v-else-if="colorDatas.fieldData[1].fieldData[2].type=='number'" :numData="colorDatas.fieldData[1].fieldData[2]"></numberSelect>
			</div>
			<div style="padding-bottom: 5px;" v-if="colorDatas.value=='颜色填充'||colorDatas.value=='单色'">
				<colorSelect v-if="colorDatas.fieldData[0].type=='color'" :colorData="colorDatas.fieldData[0]"></colorSelect>
			</div>
		</div>
	</div>
</template>

<script>
	import rangeSelect from './rangeSelect.vue'
	import colorSelect from './colorSelect.vue'
	import numberSelect from './numberSelect.vue'
	export default {
		name: 'multiColor',
		data() {
			return {}
		},
		props: ['colorDatas'],
		components: {
			'rangeSelect': rangeSelect,
			'colorSelect': colorSelect,
			'numberSelect': numberSelect
		},
		computed: {
			colorStart() {
				let item = {}
				let data = this.colorRgb(this.colorDatas.fieldData[1].fieldData[1].value)
				item.background = 'url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAH0lEQVQoU2NkYGAQYUAFb5C5jPRRgOYEVDeB3EBjBQAoYQRZhW9WNQAAAABJRU5ErkJggg==&quot;) left center ' + data
				return item
			},
			colorEnd() {
				let item = {}
				let data = this.colorRgb(this.colorDatas.fieldData[1].fieldData[0].value)
				let data2=data.replace(')',',0)')
				item.background = '-webkit-linear-gradient(top,' + data + ' 0%, ' + data2 + ' 100%)'
				return item
			}
		},
		mounted() {
			// console.log('colorDatas:' + JSON.stringify(this.colorDatas))
		},
		methods: {
			colorRgb(value) {
				//十六进制颜色值的正则表达式
				var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
				var sColor = value.toLowerCase();
				if(sColor && reg.test(sColor)) {
					if(sColor.length === 4) {
						var sColorNew = "#";
						for(var i = 1; i < 4; i += 1) {
							sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
						}
						sColor = sColorNew;
					}
					//处理六位的颜色值
					var sColorChange = [];
					for(var i = 1; i < 7; i += 2) {
						sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
					}
					return "RGB(" + sColorChange.join(",") + ")";
				} else {
					return sColor;
				}

			}
		}

	}
</script>

<style>

</style>
