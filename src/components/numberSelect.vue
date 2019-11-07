<!--
	作者：hqj
	时间：2018-10-18
	描述：数字加减计算组件
-->
<template>
	<div class="gui-field-component " :class="dataType?'gui-field-numbers-component':'gui-field-number-component'">
		<div class="gui-field-numbers" v-if="dataType">
			<div class="gui-field-numbers-single" v-for="(item,index) in numData.fieldData">
				<div class="gui-field-component gui-field-number-component">
					<div class="gui-for-number">
						<i class="number-plus" @click="valueChange('add',index)">+</i>
						<i class="number-minus" @click="valueChange('reduce',index)">-</i>
						<input type="text" class="gui-input-number" v-model="item.value" @blur="outInput($event,index)" @input="numChanged($event,index)">
					</div>
				</div>
				<div class="gui-field-numbers-single-name" :alt="item.name" :title="item.name">{{item.name}}</div>
			</div>
		</div>
		<div class="gui-for-number" v-else>
			<i class="number-plus" @click="valueChange('add')">+</i>
			<i class="number-minus" @click="valueChange('reduce')">-</i>
			<input type="text" class="gui-input-number" v-model="numData.value" @blur="outInput($event)" @input="numChanged($event)">
		</div>
	</div>
</template>

<script>
	import commonUtil from '../publicService/commonUtls.js'
	export default {
		props: ['chartId', 'numData'],
		data() {
			return {
				dataType: true,
				copyNums:'' // 对父组件传来的numData做备份，以便于在数字输入不符合规范时，回滚到上一次的数值
			}
		},
		computed: {},
		mounted() {
			this.dataType = Array.isArray(this.numData)
			if(this.numData.hasOwnProperty('fieldData')){
				this.dataType=true
			}else{
				this.dataType=false
			}
			this.copyNums=JSON.parse(JSON.stringify(this.numData))
		},
		watch:{
		},
		methods: {
			judgeIsNumber(obj) { // 判断是否是浮点数
				 var regPos = /^\d+(\.\d+)?$/; //非负浮点数
			    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
			    if(regPos.test(obj) || regNeg.test(obj)){
			        return true;
			    }else{
			        return false;
			    }
			},
			judgeNumber(obj) { //判断是否是整数
				var regPos = / ^\d+$/; // 非负整数
			    var regNeg = /^\-[1-9][0-9]*$/; // 负整数
			    if(regPos.test(obj) || regNeg.test(obj)){
			        return true;
			    }else{
			        return false;
			    }
			},
			judgeString(str) { //将值变为数值型
				if(typeof(str) == 'string') {
					if(this.judgeNumber(str)){
						return parseInt(str)
					}else if(this.judgeIsNumber(str)){
						return parseFloat(str)
					}else{
						return 'false'
					}
				}
				return str
			},
			outInput(e,index){ // 失去焦点判断
				let vv=e.target.value
				let dataValue=this.judgeString(e.target.value)
				if(vv==''||(dataValue=='false')){
					if(this.dataType){
						this.numData.fieldData[index].value=this.copyNums.fieldData[index].value
					}else{
						this.numData.value=this.copyNums.value
					}
				}else{
					if(this.dataType){
						this.numData.fieldData[index].value=dataValue
						if(this.numData.fieldData[index].hasOwnProperty('minValue')) {
							let min = this.judgeString(this.numData.fieldData[index].minValue)
							if(this.numData.fieldData[index].value < min) {
								this.numData.fieldData[index].value = min
							}
						}
						if(this.numData.fieldData[index].hasOwnProperty('maxValue')) {
							let max = this.judgeString(this.numData.fieldData[index].maxValue)
							if(this.numData.fieldData[index].value > max) {
								this.numData.fieldData[index].value = max
							}
						}
					}else{
						this.numData.value=dataValue
						if(this.numData.hasOwnProperty('minValue')) {
							let min = this.judgeString(this.numData.minValue)
							if(this.numData.value < min) {
								this.numData.value = min
							}
						}
						if(this.numData.hasOwnProperty('maxValue')) {
							let max = this.judgeString(this.numData.maxValue)
							if(this.numData.value > max) {
								this.numData.value = max
							}
						}

					}
					this.copyNums=JSON.parse(JSON.stringify(this.numData))
				}
			},
			numChanged(e,index){ // 直接修改输入框内容
				let vv=e.target.value
				let dataValue=this.judgeString(e.target.value)
				if(vv==''||(dataValue=='false')){ // 输入值是空或者输入的不是数字
					return
				}else{
					/*if(this.dataType){
						this.numData.fieldData[index].value=dataValue
						if(this.numData.fieldData[index].hasOwnProperty('minValue')) {
							let min = this.judgeString(this.numData.fieldData[index].minValue)
							if(this.numData.fieldData[index].value < min) {
								this.numData.fieldData[index].value = min
							}
						}
						if(this.numData.fieldData[index].hasOwnProperty('maxValue')) {
							let max = this.judgeString(this.numData.fieldData[index].maxValue)
							if(this.numData.fieldData[index].value > max) {
								this.numData.fieldData[index].value = max
							}
						}
					}else{
						this.numData.value=dataValue
						if(this.numData.hasOwnProperty('minValue')) {
							let min = this.judgeString(this.numData.minValue)
							if(this.numData.value < min) {
								this.numData.value = min
							}
						}
						if(this.numData.hasOwnProperty('maxValue')) {
							let max = this.judgeString(this.numData.maxValue)
							if(this.numData.value > max) {
								this.numData.value = max
							}
						}

					}*/
				}
			},
			valueChange(type, num) { // 点击加减操作按钮
				let step = ''
				if(this.dataType) { // 多个输入框
					if(this.numData.fieldData[num].hasOwnProperty('step')) {
						step = this.judgeString(this.numData.fieldData[num].step)
					} else {
						step = 1
					}
					let datanum = this.judgeString(this.numData.fieldData[num].value)
					if(type == 'add') {
						datanum=commonUtil.addFloat(datanum,step)
					} else if(type == 'reduce') {
						datanum=commonUtil.subFloat(datanum,step)
					}
					if(!this.judgeNumber(datanum)) {
						datanum = datanum.toFixed(1)
						if(datanum == 0.0) {
							datanum = 0
						}
					}
					this.numData.fieldData[num].value = datanum
					if(this.numData.fieldData[num].hasOwnProperty('minValue')) {
						let min = this.judgeString(this.numData.fieldData[num].minValue)
						if(this.numData.fieldData[num].value < min) {
							this.numData.fieldData[num].value = min
						}
					}
					if(this.numData.fieldData[num].hasOwnProperty('maxValue')) {
						let max = this.judgeString(this.numData.fieldData[num].maxValue)
						if(this.numData.fieldData[num].value > max) {
							this.numData.fieldData[num].value = max
						}
					}
				} else {
					if(this.numData.hasOwnProperty('step')) {
						step = this.judgeString(this.numData.step)
					} else {
						step = 1
					}
					let datanum = this.judgeString(this.numData.value)
					if(type == 'add') {
						datanum=commonUtil.addFloat(datanum,step)
					} else if(type == 'reduce') {
						datanum=commonUtil.subFloat(datanum,step)
					}
					this.numData.value = datanum
					if(this.numData.hasOwnProperty('minValue')) {
						let min = this.judgeString(this.numData.minValue)
						if(this.numData.value < min) {
							this.numData.value = min
						}
					}
					if(this.numData.hasOwnProperty('maxValue')) {
						let max = this.judgeString(this.numData.maxValue)
						if(this.numData.value > max) {
							this.numData.value = max
						}
					}
				}
				this.copyNums=JSON.parse(JSON.stringify(this.numData))
			},
			judgeNum() {
				let min = ''
				let max = ''
				if(dataType) {

				}
			}
		}
	}
</script>

<style>

</style>
