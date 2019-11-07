<template>
	<div class="gui-root-container mapComStyleConfig">
        <div class="component-title-wp">
            <div class="component-title" title="返回地图基础属性配置" @click="returnToBasic()">
                <div class="title-name ellipsis">
                    <i class="components-font icon fa fa-angle-left"></i>
                    {{chartName}}
                </div>
            </div>
        </div>
		<div v-for="(property,index) in chartAttrs" class="gui-controller gui-group-controller gui-controller-level-0" :class="property.editable=='series'?'gui-array-controller':''">
			<!-- 只有一级列 -->
			<div v-if="property.editable=='singel'" class="gui-group-name gui-font-name gui-group-name-singel"  v-show="isHasChild(property)">
				<div class="gui-controller gui-field-controller gui-field gui-controller-level-0">
					<span class="gui-field-name" :title="property.selectHover">
						{{property.name}}
						<i v-if="property.iconName" class="components-font icon fa" :class="property.iconName"></i>
					</span>
					<div class="gui-field-container">
						<!-- select类型 -->
					<!--	<div v-if="property.type=='select'">
							<div class="gui-field-component">
								<div class="gui-component-select">
									<div class="select-input">
										<select class="" v-model="property.value">
											<option v-for="data in property.selectData" :value="data">{{data}}</option>
										</select>
									</div>
								</div>
							</div>
						</div>-->
						<selectView v-if="property.type=='select'" :selectData="property"></selectView>
													
						<!-- range类型 -->
						<rangeSelect v-else-if="property.type=='range'" :rangObj="property"></rangeSelect>
						<!-- input类型 -->
						<div v-else-if="property.type=='input'" class="gui-field-component gui-field-text-component">
							<input type="text" class="gui-input-text" v-model="property.value">
						</div>
						<!-- radio类型 -->
						<radioSelect v-else-if="property.type=='radio'" @ymapChanged='radioChanged' :radioData="property.fieldData">
						</radioSelect>
						<!-- number类型 -->
						<numberSelect v-else-if="property.type=='number'" :numData="property"></numberSelect>
						<!-- color类型 -->
						<colorSelect v-else-if="property.type=='color'" :colorData="property"></colorSelect>
					</div>
				</div>
			</div>
			<!-- 数据系列一级列 -->
			<div v-else-if="property.editable=='series'" class="gui-group-name gui-array-name" @click="changeSlide('first',index)" >
				<span>
                    <i class="components-font icon fa" :class="slideStatus[index].show?'fa-angle-down':'fa-angle-right'" ></i>
                    {{property.name}}
                </span>
				<i class="gui-array-add fa fa-plus" @click.stop="addSeries(index)" v-show="slideStatus[index].show"></i>
				<i class="gui-array-delete fa fa-trash-o" @click.stop="deleteSeries(index)" v-show="slideStatus[index].show"></i>
			</div>
			<!-- 其他一级列 -->
			<div v-else class="gui-group-name" :class="property.editable=='2'?'disabled':''" @click="changeSlide('first',index)" v-show="isHasChild(property)">
				<span>
                    <i class="components-font icon fa" :class="slideStatus[index].show?'fa-angle-down':'fa-angle-right'"></i>
                    {{property.name}}
                </span>
				<i class="lock fa" v-if="property.editable!='0'" :class="{'fa-eye':property.editable=='1','fa-eye-slash':property.editable=='2'}" @click="unlockparent('first',index)"></i>
			</div>

			<!-- 普通二级列 -->
			<div class="gui-group-container" :class="{'fold-container':(judgeObject(slideStatus[index])&&!slideStatus[index].show),'slide-container':slideStatus[index].show,'gui-array-container':property.editable=='series'}">
				<div v-for="(comData,index1) in property.properties" class="gui-controller gui-controller-level-1" :class="comData.hasChild?'gui-group-controller':'gui-field-controller'" v-if="property.editable!='series'&&isHasChild(comData)">
					<!-- 标题开始 -->
					<!-- 没有子元素 -->
					<span v-if="!comData.hasChild" class="gui-field-name" :title="comData.type=='select'?comData.selectHover:comData.name">
						{{comData.name}}
						<i v-if="comData.iconName" class="fa" :class="comData.iconName" :title="comData.iconHover"></i>
					</span>
					<!-- 标题结束 -->
					<!-- 内容开始 -->
					<!-- 没有子元素 -->
					<div v-if="!comData.hasChild" class="gui-field-container">
						<!-- number类型 -->
						<numberSelect v-if="comData.type=='number'" :numData="comData"></numberSelect>
						<!-- select类型 -->
						<selectView v-if="comData.type=='select'" :selectData="comData"></selectView>
						
						<!-- range类型 -->
						<rangeSelect v-else-if="comData.type=='range'" :rangObj="comData"></rangeSelect>
						<!-- radio类型 -->
						<radioSelect v-else-if="comData.type=='radio'" @ymapChanged='radioChanged' :radioData="comData.fieldData"></radioSelect>
						<!-- input类型 -->
						<div v-else-if="comData.type=='input'" class="gui-field-component gui-field-text-component">
							<input type="text" class="gui-input-text" v-model="comData.value">
						</div>
						<!-- color类型 -->
						<colorSelect v-else-if="comData.type=='color'" :colorData="comData"></colorSelect>
					</div>
					<!-- 内容结束 -->
				</div>
				<!-- 数据系列菜单 -->
				<div class="gui-array-container-tabs" v-if="property.editable=='series'">
					<i class="fa fa-angle-left fontImage" @click="tabChange('left',index)"></i>
					<div class="tabs">
						<div :style="seriesTabStyle">
							<div class="tab " :class="seriesIndex==sindex?'gui-array-selected':''" @click="selectSeries(index,sindex)" v-for="(serie,sindex) in property.properties">
								<span>{{serie.name}}</span>
							</div>
						</div>
					</div>
					<i class="fa fa-angle-right fontImage" @click="tabChange('right',index)"></i>
				</div>
				<!--数据系列内容-->
				<div class="gui-array-container-content" v-if="property.editable=='series'">
					<div class="gui-controller gui-group-controller gui-object-controller  gui-controller-level-1">
						<div class="gui-group-container gui-object-container">
							<div class="gui-controller gui-controller-level-2" v-for="(dseries,dindex) in property.properties[seriesIndex].fieldData"
							:class="dseries.hasChild?'gui-group-controller':'gui-field-controller'" v-if="isHasChild(dseries,dindex)">
								<!-- 数据系列标题-->
								<span class="gui-field-name" :title="dseries.name">
									{{dseries.name}}
									<i v-if="dseries.ifIcon" class="fa" :class="dseries.iconName" :title="dseries.iconData"></i>
								</span>
								<!-- 没有子元素 -->
								<div v-if="!dseries.hasChild" class="gui-field-container">
									<!-- input类型 -->
									<div v-if="dseries.type=='input'" class="gui-field-component gui-field-text-component">
										<input type="text" class="gui-input-text" v-model="dseries.value">
									</div>
									<!-- color类型 -->
									<colorSelect v-else-if="dseries.type=='color'" :colorData="dseries"></colorSelect>
									<!-- radio类型 -->
									<radioSelect v-else-if="dseries.type=='radio'" @ymapChanged='radioChanged' :radioData="dseries.fieldData"></radioSelect>
									<!-- range类型 -->
									<rangeSelect v-else-if="dseries.type=='range'" :rangObj="dseries"></rangeSelect>
									<!-- select类型 -->
									<selectView v-if="dseries.type=='select'" :selectData="dseries"></selectView>
						
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>

<script>
	import rangeSelect from './rangeSelect.vue'
	import numberSelect from './numberSelect.vue'
	import colorSelect from './colorSelect.vue'
	import radioSelect from './radioSelect.vue'
	import selectView from './selectView.vue'
	export default {
		name: 'chartsStyleConfig',
		components: {
			'rangeSelect': rangeSelect,
			'numberSelect': numberSelect,
			'colorSelect': colorSelect,
			'radioSelect': radioSelect,
			'selectView':selectView
		},
		data() {
			return {
				slideStatus: [],
				seriesIndex: 0, // 数据系列选中index
				currentTabIndex: 0,
				currentTabTransform: 0,
				currentTabs: 4
			}
		},
		props: ['chartID', 'chartName', 'mapComIndex'],
		computed: {
			seriesTabStyle() {
				let item = {}
				item.transform = 'translateX(' + this.currentTabTransform + 'px)'
				return item
			},
			chartAttrs() {
				let allList = this.$store.state.leftEditMainData;
				let elem = allList.filter(data => data.attr_id === this.chartID)[0];
				let arr = [];
				if(elem.tipBoxContent=="基础平面地图"||elem.tipBoxContent=="3D平面中国地图"){
					arr = elem.attrArr[this.mapComIndex];
				}else{
					this.returnToBasic();
					return [];
				}
				return arr.attr_descr.properties
			}
		},
		watch: {
			chartID(value, value2) {
				this.initSlideStatus()
				this.seriesIndex = 0
				this.currentTabIndex = 0
				this.currentTabTransform = 0
			}
		},
		created() {
			this.initSlideStatus()
		},
		mounted() {
		},
		methods: {
			setMapComIndex(){
				return this.mapComIndex;
			},
            returnToBasic(){
                this.$emit('mapComponentHide', false);
            },
			// radio的changed事件（radio选中value为notShow，不选中值为show）
			radioChanged(value){
				//有一些radio改变的时候控制其他属性的显示与隐藏
			},
			judgeObject(obj) {
				if(JSON.stringify(obj) == '{}') {
					return false
				}
				return true
			},
			// 判断是否显示组件（select和radio改变值之后，判断某些样式是否展示)
			isHasChild(data,index) {
				let value = data.parentName
				if(value) {
					return false
				}
				if(data.type == 'none') {
					return false
				}
				return true
			},
			// 初始样式配置中是否下拉
			initSlideStatus() {
				let len = this.chartAttrs.length
				let item = {
					'show': false
				}
				this.slideStatus = []
				for(let i = 0; i < len; i++) {
					this.slideStatus[i] = {}
					if(this.chartAttrs[i].editable != 'series') { // 有子元素
						this.slideStatus[i].show = false
						let len1 = this.chartAttrs[i].properties.length
						this.slideStatus[i].data = []
						for(let j = 0; j < len1; j++) {
							this.slideStatus[i].data[j] = {}
							if(this.chartAttrs[i].properties[j].type == 'hasChild') { // 有子元素
								this.slideStatus[i].data[j].show = false
								let len2 = this.chartAttrs[i].properties[j].fieldData.length
								this.slideStatus[i].data[j].data = []
								for(let k = 0; k < len2; k++) {
									this.slideStatus[i].data[j].data[k] = {}
									if(this.chartAttrs[i].properties[j].fieldData[k].type == 'hasChild') {
										this.slideStatus[i].data[j].data[k].show = false
									}
								}

							}
						}
					} else if(this.chartAttrs[i].editable == 'series') { // 数据系列
						this.slideStatus[i].show = false
						let len3 = this.chartAttrs[i].properties.length
						let series = this.chartAttrs[i].properties[0].fieldData
						this.slideStatus[i].data = []
						for(let h = 0; h < len3; h++) {
							this.slideStatus[i].data[h] = {}
							this.slideStatus[i].data[h].data = []
							let len4 = this.chartAttrs[i].properties[h].fieldData.length
							for(let j = 0; j < len4; j++) {
								this.slideStatus[i].data[h].data[j] = {}
								if(this.chartAttrs[i].properties[h].fieldData[j].type == 'hasChild') { // 有子元素
									this.slideStatus[i].data[h].data[j].show = false
								}
							}
						}
					}

				}
			},
			changeSlide(type, index, childIndex, childIndex2) { //收缩动作
				let state = ''
				if(type == 'first') { // 第一层菜单
					state = this.chartAttrs[index].editable
					if(state != '2') { // 解锁或者没锁才可以展开
						let item = this.slideStatus[index]
						item.show = !item.show
						this.slideStatus.splice(index, 1, item)
					}
				} else if(type == 'second') {
					state = this.chartAttrs[index].properties[childIndex].editable
					if(state != '2') { // 解锁或者没锁才可以展开
						let item = this.slideStatus[index].data[childIndex]
						item.show = !item.show
						this.slideStatus[index].data.splice(childIndex, 1, item)
					}
				} else {
					state = this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].editable
					if(state != '2') {
						let item = this.slideStatus[index].data[childIndex].data[childIndex2]
						item.show = !item.show
						this.slideStatus[index].data[childIndex].data.splice(childIndex2, 1, item)
					}
				}
			},
			unlockparent(type, index, childIndex, childIndex2) { // 样式解锁，关锁动作
				let state = ''
				if(type == 'first') {
					state = this.chartAttrs[index].editable
					let item = this.slideStatus[index]
					if(state == '1') {
						item.show = false
						this.chartAttrs[index].editable = '2'
						this.slideStatus.splice(index, 1, item) //关锁，收缩状态
					} else if(state == '2') {
						this.chartAttrs[index].editable = '1'
					}
				} else if(type == 'second') {
					state = this.chartAttrs[index].properties[childIndex].editable
					if(state == '1') {
						let item = this.slideStatus[index].data[childIndex]
						item.show = false
						this.chartAttrs[index].properties[childIndex].editable = '2'
						this.slideStatus[index].data.splice(childIndex, 1, item) //关锁，收缩状态
					} else if(state == '2') {
						this.chartAttrs[index].properties[childIndex].editable = '1'
					}
				}
			},
			deleteSeries(index) { // 删除系列(最后一个)
				let len = this.chartAttrs[index].properties.length
				if(len > 1) {
					this.chartAttrs[index].properties.splice(-1, 1)
					let len2 = this.chartAttrs[index].properties.length
					if(len2 >= 4) { // 一组以上
						let all = Math.ceil(len2 / 4) - 1
						let sum = 0
							let s2 = 248
							if(len2 >= 10) {
								sum = 68 * (len2 - 9) + 5 * 62
							} else {
								sum = 62 * (len2 - 4)
							}
							this.currentTabTransform = -sum
					} else {
						this.currentTabIndex = 0
						this.currentTabTransform = 0
					}
					this.seriesIndex = len2 - 1
					this.slideStatus[index].data.splice(-1, 1)
				}
			},
			addSeries(index) { //添加系列
				let item = JSON.parse(JSON.stringify(this.chartAttrs[index].properties[0]))
				let len = this.chartAttrs[index].properties.length
				item.name = '气泡类型' + (len + 1)
				item.sid=null
				item.fieldData[0].value=''
				this.chartAttrs[index].properties.push(item)
				this.chartAttrs[index].value = item.name // 更新选中值
				let all = this.chartAttrs[index].properties.length
				let allTab = Math.ceil(all / 4) - 1
				if(allTab == this.currentTabIndex) {
					if(all > 4) {
						this.currentTabTransform -= 62
						if(all > 9) {
							this.currentTabTransform -= 6
						}
					}
				} else {
					let sum = 0
					let s2 = 248
					if(all >= 10) {
						sum = 68 * (all - 9) + 5 * 62
					} else {
						sum = 62 * (all - 4)
					}
					this.currentTabTransform = -sum
				}
				this.currentTabIndex = allTab
				this.seriesIndex = all - 1
				let slidItem = JSON.parse(JSON.stringify(this.slideStatus[index].data[0]))
				let slen = slidItem.data.length
				for(let i = 0; i < slen; i++) {
					if(slidItem.data[i].hasOwnProperty('show')) {
						slidItem.data[i].show = false
					}
				}
				this.slideStatus[index].data.push(slidItem);

			},
			selectSeries(index1, index2) { // 数据系列选中
				let name = this.chartAttrs[index1].properties[index2].name //获取当前选中系列名称
				this.chartAttrs[index1].value = name // 更新选中值
				this.seriesIndex = index2 // 更新选中index
			},
			tabChange(type, index) { // 数据系列菜单翻页
				let len = this.chartAttrs[index].properties.length
				let flag = Math.ceil(len / 4) - 1 //有几个系列组（含 0）
				if(flag > 0) { // tab展示4个
					if(type == 'left') { // 向左
						if(this.currentTabIndex > 1) { // 有移动
							if(this.currentTabIndex == flag) {
								let nq = len % 4
								let n3 = '',
									n4 = 0
								if(nq == 0) {
									nq = 4
								}
								let mm = len - nq + 1
								for(let j = 0; j < nq; j++) {
									if((mm + j) >= 10) {
										n4 += 6
									}
								}
								this.currentTabTransform += (nq * 62 + n4)
							} else {
								let sum = (this.currentTabIndex + 1) * 4
								let ss = ''
								let s2 = 248
								if(sum > len) {
									sum = len
								}
								if(sum >= 10) {
									if(sum < 13) {
										s2 += (sum - 9) * 6
									} else {
										s2 += 24
									}
								}
								this.currentTabTransform += s2
							}
							this.currentTabIndex -= 1
						} else if(this.currentTabIndex == 1) {
							this.currentTabTransform = 0
							this.currentTabIndex = 0
						} else if(this.currentTabIndex >= 0) {
							this.currentTabTransform = 0
						}
					} else {
						if(this.currentTabIndex < flag) {
							if(this.currentTabIndex == (flag - 1)) { // 倒数第二个
								let nn = len % 4
								let n3 = '',
									n4 = 0
								if(nn == 0) {
									nn = 4
								}
								let mm = len - nn + 1
								for(let j = 0; j < nn; j++) {
									if((mm + j) >= 10) {
										n4 += 6
									}
								}
								this.currentTabTransform -= (nn * 62 + n4)
							} else {
								let sum = (this.currentTabIndex + 2) * 4
								let s2 = 248
								if(sum >= 10) {
									if(sum < 13) {
										s2 += (sum - 9) * 6
									} else {
										s2 += 24
									}
								}
								this.currentTabTransform -= s2
							}
							this.currentTabIndex += 1
						}
					}
				}
			}
		}
	}
</script>

<style lang="css">
	@import url("../css/chartitem.css");
</style>
