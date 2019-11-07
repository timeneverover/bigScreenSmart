<template>
	<div class="setting-panel-content">
		<div class="gui-scroll-container">
			<div class="gui">
				<div class="gui-root-container" v-if="!mapComponentShow" >
					<div v-for="(property,index) in chartAttrs" class="gui-controller gui-group-controller gui-controller-level-0" :class="property.editable=='series'?'gui-array-controller':''">
						<!-- 基础属性一级列 -->
						<div class="gui-group-name" v-if="property.name=='基础属性'" >
							<span>
                                {{property.name}}
                            </span>
						</div>
						<!-- 地图子组件添加 -->
						<div class="gui-group-name fa-plus-box" v-else-if="property.name=='子组件管理'">
							<span>
								<i class="fa fa-plus"></i>
                                {{property.name}}
                            </span>
							<div class="map-default-components overflow-thumb" :style="'top:'+mapComsTop+'px;'">
								<div class="component" v-for="(sub,subIndex) in property.subProperties" @click="mapComponentAdd(sub)">
									<img :src="chartName=='基础平面地图'?mapComponentsUrl[subIndex]:mapComponentsUrl3D[subIndex]" alt="">
									<span>{{sub.name}}</span>
								</div>
							</div>
						</div>
						<!-- 只有一级列 -->
						<div :class="property.editable!='singel2'?'gui-group-name gui-font-name':''" v-else-if="property.editable=='singel'||property.editable=='singel2'" v-show="isHasChild(property)">
							<div class="gui-controller gui-field-controller gui-field gui-controller-level-0">
								<span class="gui-field-name" :title="property.selectHover">
									{{property.name}}
									<i v-if="property.iconName" class="components-font icon fa" :class="property.iconName"></i>
									<i v-if="property.name=='标题名'" class="fa fa-question-circle-o" title="比数据的优先级低，当数据中的vlue为空时显示"></i>
								</span>
								<div class="gui-field-container">
									<!-- select类型 -->
									<!--<div v-if="property.type=='select'">
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
								<!--	<div v-else-if="property.type=='input'" class="gui-field-component gui-field-text-component">
										<input type="text" class="gui-input-text" v-model="property.value">
									</div>-->
									<inputView v-if="property.type=='input'" :inputData="property"></inputView>
									
									<!-- radio类型 -->
									<radioSelect v-else-if="property.type=='radio'" @ymapChanged='radioChanged' :radioData="property.fieldData">
									</radioSelect>
									<!-- number类型 -->
									<numberSelect v-else-if="property.type=='number'" :numData="property"></numberSelect>
									<!-- picture类型 -->
									<pictureUrl v-else-if="property.type=='picture'" :chartID="chartID" :pictureData="property"></pictureUrl>
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
                                <i class="components-font icon fa" :class="slideStatus[index].show?'fa-angle-down':'fa-angle-right'" ></i>
                                {{property.name}}
                            </span>
							<i class="lock fa" v-if="property.editable!='0'" :class="{'fa-eye':property.editable=='1','fa-eye-slash':property.editable=='2'}" @click="unlockparent('first',index)"></i>
						</div>

						<!-- 地图子组件二级列 -->
						<div v-if="property.name=='子组件管理'" class="map-components overflow-thumb" >
							<div v-for="(com,comIndex) in mapComponents" class="gui-field-controller" @click="mapComponentClick(comIndex,com.attr_descr.name)">
								<span>{{com.attr_descr.name+comIndex}}</span>
								<i class="fa fa-trash-o" title="删除子组件" @click.stop="mapComponentDel(comIndex,com.attr_id,com.parent_id,com.attr_descr.name,com.sort)"></i>
							</div>
						</div>
						<!-- 其他普通二级列 -->
						<div v-else class="gui-group-container" :class="{'fold-container':(judgeObject(slideStatus[index])&&!slideStatus[index].show),'slide-container':slideStatus[index].show,'gui-array-container':property.editable=='series'}">
							<div v-for="(comData,index1) in property.properties" class="gui-controller gui-controller-level-1" :class="comData.hasChild?'gui-group-controller':'gui-field-controller'" v-if="property.editable!='series'&&isHasChild(comData)">
								<!-- 标题开始 -->
								<!-- 没有子元素 -->
								<span v-if="!comData.hasChild" class="gui-field-name" :title="comData.type=='select'?comData.selectHover:comData.name">{{comData.name}}
									<i v-if="comData.iconName" class="fa" :class="comData.iconName" :title="comData.iconHover"></i>
									<i v-if="comData.name=='超链接'" class="fa fa-question-circle-o" title="支持从数据中获取超链接"></i>
								</span>
								<!-- 有子元素 -->
								<div v-else class="gui-group-name" :class="comData.editable=='2'?'disabled':''" @click="changeSlide('second',index,index1)">
									<span><i class="components-font icon fa" :class="slideStatus[index].data[index1].show?'fa-angle-down':'fa-angle-right'" ></i>{{comData.name}}</span>
									<i class="lock fa" v-if="comData.editable!='0'" :class="comData.editable=='1'?'fa-eye':'fa-eye-slash'" @click="unlockparent('second',index,index1)"></i>
								</div>
								<!-- 标题结束 -->

								<!-- 内容开始 -->
								<!-- 没有子元素 -->
								<div v-if="comData.type!='hasChild'" class="gui-field-container">
									<!-- number类型 -->
									<numberSelect v-if="comData.type=='number'" :numData="comData"></numberSelect>
									<!-- select类型 -->
									<!--<div v-else-if="comData.type=='select'" class="gui-field-component">
										<div class="gui-component-select">
											<div class="select-input">
												<select class="" v-model="comData.value" @change="selectXType(comData.value)">
													<option v-for="data in comData.selectData" :value="data">{{data}}</option>
												</select>
											</div>
										</div>
									</div>-->
									<selectView v-if="comData.type=='select'" :selectData="comData" @selectChanged="selectXType"></selectView>
									<!-- range类型 -->
									<rangeSelect v-else-if="comData.type=='range'" :rangObj="comData"></rangeSelect>
									<!-- radio类型 -->
									<radioSelect v-else-if="comData.type=='radio'" @ymapChanged='radioChanged' :radioData="comData.fieldData"></radioSelect>
									<!-- input类型 -->
									<!--<div v-else-if="comData.type=='input'" class="gui-field-component gui-field-text-component">
										<input type="text" class="gui-input-text" v-model="comData.value">
									</div>-->
									<inputView v-if="comData.type=='input'" :inputData="comData"></inputView>
									<!-- color类型 -->
									<colorSelect v-else-if="comData.type=='color'" :colorData="comData"></colorSelect>
									<!-- picture类型 -->
									<pictureUrl v-else-if="comData.type=='picture'" :chartID="chartID" :pictureData="comData"></pictureUrl>
									<!-- multiColor类型 -->
									<multiColor v-else-if="comData.type=='multiColor'" :colorDatas="comData"></multiColor>
								</div>
								<!-- 有子元素 -->
								<div v-else class="gui-group-container " :class="{'fold-container':(judgeObject(slideStatus[index].data[index1])&&!slideStatus[index].data[index1].show),'slide-container':slideStatus[index].data[index1].show}">
									<div v-for="(fieldData,index2) in comData.fieldData" v-if="isHasChild(fieldData)" :class="fieldData.type=='hasChild'?'gui-group-controller':'gui-field-controller'" class="gui-controller gui-controller-level-2">
										<div v-if="fieldData.type=='hasChild'" class="gui-group-name" :class="fieldData.editable=='2'?'disabled':''" @click="changeSlide('third',index,index1,index2)">
											<span>
												<i class="components-font icon fa" :class="slideStatus[index].data[index1].data[index2].show?'fa-angle-down':'fa-angle-right'" ></i>
												{{fieldData.name}}
											</span>
											<i class="lock fa" :class="{'fa-eye':fieldData.editable=='1','fa-eye-slash':fieldData.editable=='2'}" @click="unlockparent('third',index,index1,index2)"></i>
										</div>
										<span v-else class="gui-field-name" :title="fieldData.name">
											{{fieldData.name}}
											<i v-if="fieldData.iconName" class="fa" :class="fieldData.iconName" :title="fieldData.iconHover"></i>
										</span>

										<div v-if="fieldData.type!='hasChild'" class="gui-field-container">

											<!-- range类型 -->
											<rangeSelect v-if="fieldData.type=='range'" :rangObj="fieldData"></rangeSelect>

											<!-- color类型 -->
											<colorSelect v-else-if="fieldData.type=='color'" :colorData="fieldData"></colorSelect>

											<!-- number类型 -->
											<numberSelect v-if="fieldData.type=='number'" :numData="fieldData"></numberSelect>
											<pictureUrl v-if="fieldData.type=='picture'" :chartID="chartID" :pictureData="fieldData"></pictureUrl>
											<!-- input类型 -->
											<!--<div v-else-if="fieldData.type=='input'" class="gui-field-component gui-field-text-component">
												<input type="text" class="gui-input-text" v-model="fieldData.value">
											</div>-->
											<inputView v-if="fieldData.type=='input'" :inputData="fieldData"></inputView>
											<!-- 颜色选择（渐变）-->
											<multiColor v-else-if="fieldData.type=='multiColor'" :colorDatas="fieldData"></multiColor>
											<radioSelect v-else-if="fieldData.type=='radio'" @ymapChanged='radioChanged' :radioData="fieldData.fieldData"></radioSelect>

											<!-- select类型 -->
											<selectView v-else-if="fieldData.type=='select'" :selectData="fieldData" @selectChanged="selectXType"></selectView>
											<!-- 有子元素类型 -->
											<div v-if="fieldData.type=='hasChild'" v-for="level3 in fieldData.fieldData" class="gui-controller gui-field-controller gui-controller-level-3">
												<span class="gui-field-name" alt="level3.name">{{level3.name}}</span>
												<div class="gui-field-container">
													<!-- number类型 -->
													<numberSelect v-if="level3.type=='number'" :numData="level3"></numberSelect>

													<!-- color类型 -->
													<colorSelect v-if="level3.type=='color'" :colorData="level3"></colorSelect>
													<multiColor v-else-if="level3.type=='multiColor'" :colorDatas="level3"></multiColor>
													<!-- select类型 -->
													<selectView v-if="level3.type=='select'" :selectData="level3" @selectChanged="selectXType"></selectView>
													<!-- input类型 -->
													<!--<div v-if="level3.type=='input'" class="gui-field-component gui-field-text-component">
														<input type="text" class="gui-input-text" v-model="level3.value">
													</div>-->
													<inputView v-if="level3.type=='input'" :inputData="level3"></inputView>
												</div>
											</div>
										</div>
										<div v-else class="gui-group-container" :class="{'fold-container':(judgeObject(slideStatus[index].data[index1].data[index2])&&!slideStatus[index].data[index1].data[index2].show),'slide-container':slideStatus[index].data[index1].data[index2].show}">
											<div v-for="(childData,index3) in fieldData.fieldData" v-if="isHasChild(childData)" :class="childData.type=='hasChild'?'gui-group-controller':'gui-field-controller'" class="gui-controller gui-controller-level-2">
												<div v-if="childData.type=='hasChild'" class="gui-group-name" :class="childData.editable=='2'?'disabled':''" @click="changeSlide('four',index,index1,index2,index3)">
													<span>
														<i class="components-font icon fa" :class="slideStatus[index].data[index1].data[index2].show?'fa-angle-down':'fa-angle-right'" ></i>
														{{childData.name}}
													</span>
													<i class="lock fa" :class="{'fa-eye':childData.editable=='1','fa-eye-slash':childData.editable=='2'}" @click="unlockparent('four',index,index1,index2,index3)"></i>
												</div>
												<span v-else class="gui-field-name" :title="childData.name">
													{{childData.name}}
												</span>

												<!--<div :class="{'gui-group-container':fieldData.type=='hasChild','gui-field-container':fieldData.type!='hasChild','fold-container':(judgeObject(slideStatus[index].data[index1].data[index2])&&!slideStatus[index].data[index1].data[index2].show),'slide-container':slideStatus[index].data[index1].data[index2].show}">-->
												<div class="gui-field-container" v-if="childData.type!='hasChild'">
													<!-- number类型 -->
													<numberSelect v-if="childData.type=='number'" :numData="childData"></numberSelect>
													<multiColor v-else-if="childData.type=='multiColor'" :colorDatas="childData"></multiColor>

													<!-- color类型 -->
													<colorSelect v-if="childData.type=='color'" :colorData="childData"></colorSelect>
													<pictureUrl v-if="childData.type=='picture'" :chartID="chartID" :pictureData="childData"></pictureUrl>

													<!-- select类型 -->
													<selectView v-else-if="childData.type=='select'" :selectData="childData" ></selectView>
													
													<!-- input类型 -->
													<!--<div v-else-if="childData.type=='input'" class="gui-field-component gui-field-text-component">
														<input type="text" class="gui-input-text" v-model="childData.value">
													</div>-->
													<inputView v-if="childData.type=='input'" :inputData="childData"></inputView>
												</div>
											</div>
										</div>

										<!--</div>-->
									</div>
								</div>
								<!-- 内容结束 -->
							</div>

							<div class="gui-array-container-tabs" v-if="property.editable=='series'">
								<!-- 数据系列菜单 -->
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
							<div class="gui-array-container-content gui-controller" v-if="property.editable=='series'">
									<div class="gui-controller gui-group-controller gui-object-controller  gui-controller-level-1">
										<div class="gui-group-container gui-object-container">
											<div class="gui-controller gui-controller-level-2" v-for="(dseries,dindex) in property.properties[seriesIndex].fieldData"
											:class="dseries.hasChild?'gui-group-controller':'gui-field-controller'" v-if="isHasChild(dseries,dindex)">
											<!-- 数据系列标题-->
											<div v-if="dseries.type=='hasChild'" class="gui-group-name" :class="dseries.editable=='2'?'disabled':''" @click="changeSlide('third',index,seriesIndex,dindex)">
												<span>
													<i class="components-font icon fa" :class="slideStatus[index].data[seriesIndex].data[dindex].show?'fa-angle-down':'fa-angle-right'" ></i>
													{{dseries.name}}
												</span>
												<i class="lock fa" :class="{'fa-eye':dseries.editable=='1','fa-eye-slash':dseries.editable=='2'}" @click="unlockparent('third',index,seriesIndex,dindex)"></i>
											</div>
											<span v-else class="gui-field-name" :title="dseries.name">
												{{dseries.name}}
												<i v-if="dseries.ifIcon" class="fa" :class="dseries.iconName" :title="dseries.iconData"></i>
											</span>
											<!-- 没有子元素 -->
											<div v-if="!dseries.hasChild" class="gui-field-container">
												<!-- input类型 -->
												<div v-if="dseries.type=='input'" class="gui-field-component gui-field-text-component">
													<input type="text" class="gui-input-text" v-model="dseries.value">
												</div>
												<!-- multiColor类型 -->
												<multiColor v-else-if="dseries.type=='multiColor'" :colorDatas="dseries"></multiColor>
												<!-- color类型 -->
												<colorSelect v-else-if="dseries.type=='color'" :colorData="dseries"></colorSelect>
												<pictureUrl v-else-if="dseries.type=='picture'" :chartID="chartID" :pictureData="dseries"></pictureUrl>
												<!-- radio类型 -->
												<radioSelect v-else-if="dseries.type=='radio'" @ymapChanged='radioChanged' :radioData="dseries.fieldData"></radioSelect>
												<!-- range类型 -->
												<rangeSelect v-else-if="dseries.type=='range'" :rangObj="dseries"></rangeSelect>
												<!-- select类型 -->
												<selectView v-else-if="dseries.type=='select'" :selectData="dseries" @selectChanged="selectXType"></selectView>
													
											</div>
											<!-- 有子元素 -->
											<div v-else class="gui-group-container" :class="{'fold-container':(judgeObject(slideStatus[index].data[seriesIndex].data[dindex])&&!slideStatus[index].data[seriesIndex].data[dindex].show),'slide-container':slideStatus[index].data[seriesIndex].data[dindex].show}">
												<div v-for="(dchild,dindex2) in dseries.fieldData" :class="dchild.type=='hasChild'?'gui-group-controller':'gui-field-controller'" class="gui-controller  gui-controller-level-3">
													<div v-if="dchild.type=='hasChild'" class="gui-group-name" :class="dchild.editable=='2'?'disabled':''" @click="changeSlide('four',index,seriesIndex,dindex,dindex2)">
														<span><i class="components-font icon fa" :class="slideStatus[index].data[seriesIndex].data[dindex].data[dindex2].show?'fa-angle-down':'fa-angle-right'" ></i>{{dchild.name}}</span>
														<i class="lock fa" :class="{'fa-eye':dchild.editable=='1','fa-eye-slash':dchild.editable=='2'}" @click="unlockparent('four',index,seriesIndex,dindex,dindex2)"></i>
													</div>
													<span v-else class="gui-field-name" :title="dchild.name">{{dchild.name}}</span>
													<div class="gui-field-container" v-if="dchild.type!='hasChild'">
														<!-- range类型 -->
														<rangeSelect v-if="dchild.type=='range'" :rangObj="dchild"></rangeSelect>

														<!-- radio类型 -->
														<radioSelect v-else-if="dchild.type=='radio'" @ymapChanged='radioChanged' :radioData="dchild.fieldData"></radioSelect>

														<!-- color类型 -->
														<colorSelect v-else-if="dchild.type=='color'" :colorData="dchild"></colorSelect>

														<!-- number类型 -->
														<numberSelect v-else-if="dchild.type=='number'" :numData="dchild"></numberSelect>

														<!-- input类型 -->
														<div v-else-if="dchild.type=='input'" class="gui-field-component gui-field-text-component">
															<input type="text" class="gui-input-text" v-model="dchild.value">
														</div>

														<!-- 颜色选择（渐变）-->
														<multiColor v-else-if="dchild.type=='multiColor'" :colorDatas="dchild"></multiColor>

														<!-- select类型 -->
														<selectView v-else-if="dchild.type=='select'" :selectData="dchild"></selectView>
													
													</div>
													<div v-else class="gui-group-container" :class="{'fold-container':(judgeObject(slideStatus[index].data[seriesIndex].data[dindex].data[dindex2])&&!slideStatus[index].data[seriesIndex].data[dindex].data[dindex2].show),'slide-container':slideStatus[index].data[seriesIndex].data[dindex].data[dindex2].show}">
														<div v-for="(tchild,dindex3) in dchild.fieldData" :class="tchild.type=='hasChild'?'gui-group-controller':'gui-field-controller'" class="gui-controller  gui-controller-level-3">
															<div v-if="tchild.type=='hasChild'" class="gui-group-name" :class="tchild.editable=='2'?'disabled':''" @click="changeSlide('four',index,seriesIndex,dindex,dindex2,dindex3)">
																<span><i class="components-font icon fa" :class="slideStatus[index].data[seriesIndex].data[dindex].data[dindex2].data[dindex3].show?'fa-angle-down':'fa-angle-right'" ></i>{{tchild.name}}</span>
																<i class="lock fa" :class="{'fa-eye':tchild.editable=='1','fa-eye-slash':tchild.editable=='2'}" @click="unlockparent('four',index,seriesIndex,dindex,dindex2,dindex3)"></i>
															</div>
															<span v-else class="gui-field-name" :title="tchild.name">{{tchild.name}}</span>
															<div class="gui-field-container" v-if="tchild.type!='hasChild'">
																<rangeSelect v-if="tchild.type=='range'" :rangObj="tchild"></rangeSelect>
																<!-- radio类型 -->
																<radioSelect v-else-if="tchild.type=='radio'" @ymapChanged='radioChanged' :radioData="tchild.fieldData"></radioSelect>
																<!-- color类型 -->
																<colorSelect v-else-if="tchild.type=='color'" :colorData="tchild"></colorSelect>
																<!-- number类型 -->
																<numberSelect v-else-if="tchild.type=='number'" :numData="tchild"></numberSelect>
																<!-- input类型 -->
																<div v-else-if="tchild.type=='input'" class="gui-field-component gui-field-text-component">
																	<input type="text" class="gui-input-text" v-model="tchild.value">
																</div>
																<!-- 颜色选择（渐变）-->
																<multiColor v-else-if="tchild.type=='multiColor'" :colorDatas="tchild"></multiColor>
																<!-- select类型 -->
																<selectView v-else-if="tchild.type=='select'" :selectData="tchild"></selectView>
													
															</div>
														</div>

													</div>

												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
				<!-- 地图子组件 -->
				<mapComStyleConfig @mapComponentHide="mapComponentChange" v-else ref="mapComIndexSet"
				:chartID="chartID" :mapComIndex="mapComIndex" :chartName="mapComName"></mapComStyleConfig>
			</div>
		</div>
	</div>

</template>

<script>
	import rangeSelect from './rangeSelect.vue'
	import numberSelect from './numberSelect.vue'
	import colorSelect from './colorSelect.vue'
	import multiColor from './multiColor.vue'
	import radioSelect from './radioSelect.vue'
	import selectView from './selectView.vue'
	import inputView from './inputView.vue'
	import mapComStyleConfig from './mapComStyleConfig.vue'
	import Urls from '../publicService/urls.js'
	import TipBoxService from '../publicService/TipBoxService.js'
	import httpService from '../publicService/HttpService.js'
	import pictureUrl from './pictureUrl.vue'

	export default {
		name: 'chartsStyleConfig',
		components: {
			'rangeSelect': rangeSelect,
			'numberSelect': numberSelect,
			'colorSelect': colorSelect,
			'multiColor': multiColor,
			'inputView':inputView,
			'radioSelect': radioSelect,
			'selectView':selectView,
			'pictureUrl':pictureUrl,
			'mapComStyleConfig': mapComStyleConfig
		},
		data() {
			return {
				mapComsTop: 0,
				mapComponentShow: false,
				mapComIndex: 0,
				mapComName: '',
				slideStatus: [],
				seriesIndex: 0, // 数据系列选中index
				dataTypeSelected: '时间型',
				isYMapped: 'show',
				bgColorStyle:'渐变',
				currentTabIndex: 0,
				currentTabTransform: 0,
				currentTabs: 4,
				userDefied: 'undefined',
				moveListSelect: '文本',
				isListMove: 'animation',
				isListBarMove: 'animation',
				timeFixed:'notFixed', // 是否是定速播放
				mapComponentsUrl: [
					require('../assets/map/thermodynamic.png'),
					require('../assets/map/bubble.png'),
					require('../assets/map/flyLine.png'),
				],
				mapComponentsUrl3D: [
					require('../assets/map/3DChinaBar.png'),
					require('../assets/map/3DChinaFlyLine.png'),
					require('../assets/map/3DChinaBubble.png'),
				],
				progressTrue:'notTrue', // 进度条中是否显示真实值
				progressHasPoint:'notHasPoint' , // 进度条值是否含有小数点
			}
		},
		props: ['chartID', 'chartName', 'attrID'],
		computed: {
			seriesTabStyle() {
				let item = {}
				item.transform = 'translateX(' + this.currentTabTransform + 'px)'
				return item
			},
			chartAttrs() {
				let allList = this.$store.state.leftEditMainData
				let arr = allList.filter(data => data.attr_id === this.chartID)[0]
				return arr.attr_descr.properties
			},
			mapComponents(){
				let allList = this.$store.state.leftEditMainData
				let arr = allList.filter(data => data.attr_id === this.chartID)[0].attrArr
				return arr
			}
		},
		watch: {
			chartID(value, value2) {
				this.initSlideStatus()
				this.seriesIndex = 0
				this.dataTypeSelected = '时间型'
				this.currentTabIndex = 0
				this.currentTabTransform = 0
			}
		},
		created() {
			this.initSlideStatus()
		},
		mounted() {
			this.isChartType();
			//地图子组件管理位置
			if((this.chartName=="基础平面地图"||this.chartName=="3D平面中国地图") && $('.fa-plus-box').offset()){
				let _this = this;
				_this.mapComsTop = $('.fa-plus-box').offset().top;
				window.addEventListener('scroll',function(){
					if($('.fa-plus-box').offset()){
						_this.mapComsTop = $('.fa-plus-box').offset().top;
					}
				},true)
			}
		},
		methods: {
			setMapComIndex(){
				if(this.mapComponentShow){
					let item = {};
					item.ifMapComShow = this.mapComponentShow;
					item.mapComIndex = this.$refs.mapComIndexSet.setMapComIndex();
					return item;
				}else{
					return false;
				}
			},
			mapComponentChange(value){
				this.mapComponentShow = false;
			},
			//地图添加子组件
			mapComponentAdd(sub){
					let data = {
						mo_name: this.$route.query.tempName,
						mo_id: this.$route.query.tempId,
						attr_id: this.attrID,
						chart_id: sub.id
					}
					this.$store.dispatch('addMapComponent',data);
			},
			//地图删除子组件
			mapComponentDel(index, attrId, parentId, comName, sort){
				let data = {
					attr_id: attrId,
					index: index,
					parentId: parentId,
					mo_id: this.$route.query.tempId,
					// sort: sort
				}
				this.$store.dispatch('delMapComponent',data);
			},
			//地图子组件点击
			mapComponentClick(index,name){
				this.mapComIndex = index;
				this.mapComName = name;
				this.mapComponentShow = true;
			},
			// 样式初始化，根据传来的style样式，为含有select，radio的change变量赋值
			isChartType() {
				let name = this.chartName
				if(name == '基本折线图'||name == '双轴折线图') {
					this.dataTypeSelected = this.chartAttrs[2].properties[1].fieldData[0].value
				}else if (name=='气泡图'){
					let flag=this.chartAttrs[4].properties[0].fieldData[0].value
					if(flag){
						this.isYMapped='show'
					}else{
						this.isYMapped='notShow'
					}
				}else if(name=='自定义背景块'){
					let checked = this.chartAttrs[1].value;
					this.userDefied = checked?'defined':'undefined';
				}else if(name=="轮播列表"){
					this.moveListSelect = this.chartAttrs[5].properties[this.seriesIndex].fieldData[3].value;
				}else if(name=="跑马灯"){
					if(this.chartAttrs[3].fieldData[0].value){
						this.timeFixed='isFixed'
					}else{
						this.timeFixed='notFixed'
					}
				}else if(name=='进度条'){
					if(this.chartAttrs[2].properties[3].fieldData[0].value){
						this.progressTrue='isTrue'
					}else{
						this.progressTrue='notTrue'
						if(this.chartAttrs[2].properties[6].fieldData[0].fieldData[0].value){
							this.progressHasPoint='hasPoint'
						}else{
							this.progressHasPoint='notHasPoint'
						}
					}
				}else if(name=='轮播图'){
					this.bgColorStyle=this.chartAttrs[5].properties[0].fieldData[0].value
				}
			},
			// select的change事件
			selectXType(value) {
				if(value == '类目型') {
					this.dataTypeSelected = '类目型'
				} else if(value == '数值型') {
					this.dataTypeSelected = '数值型'
				} else if(value == '时间型') {
					this.dataTypeSelected = '时间型'
				}else if(value=='单色'){
					this.bgColorStyle='单色'
				}else if(value=='渐变'){
					this.bgColorStyle='渐变'
				}
			},
			// radio的changed事件（radio选中value为notShow，不选中值为show）
			radioChanged(value){
				if (this.chartName=='气泡图'){// 气泡图时调用
					this.isYMapped=value;
				}else if(this.chartName=='自定义背景块'){
					this.userDefied=value;
					if(value=='defined'){
						this.chartAttrs[1].value=true
						this.chartAttrs[1].fieldData[0].value=true
					}else{
						this.chartAttrs[1].value=false
						this.chartAttrs[1].fieldData[0].value=false
					}
					//raiod切换时让展开的三级菜单消失
					this.slideStatus[3].show=false;
					this.slideStatus[4].show=false;
				}else if(this.chartName=='轮播列表'){
					this.isListMove = value;
				}else if(this.chartName=='轮播柱状列表'){
					this.isListBarMove = value;
				}else if(this.chartName=='跑马灯'){
					if(value=='isFixed'||value=='notFixed'){
						this.timeFixed = value;
					}
				}else if(this.chartName=='进度条'){
					if(value=='hasPoint'||value=='notHasPoint'){
						this.progressHasPoint=value
					}else{
						this.progressTrue=value
					}
				}
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
					if(value.indexOf(this.dataTypeSelected) > -1) {
						if(data.type == 'none') {
							return false
						} else {
							return true
						}
					} else if(value == this.isYMapped) {
						return true
					} else if(value == this.userDefied){
						return true
					} else if(value==this.moveListSelect){
						return true
					} else if(value==this.isListMove){
						return true
					} else if(value==this.isListBarMove){
						return true
					} else if(value==this.timeFixed){
						return true
					}else if(value==this.progressTrue){
						return true
					}else if(value==this.progressHasPoint){
						return true
					}else if(value==this.bgColorStyle){
						return true
					}else{
						return false
					}
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
					if(this.chartAttrs[i].name != '基础属性' && this.chartAttrs[i].editable != 'series' && this.chartAttrs[i].name!='子组件管理') { // 有子元素
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
										if(this.chartAttrs[i].properties[j].fieldData[k].fieldData){
											let len22=this.chartAttrs[i].properties[j].fieldData[k].fieldData.length
											this.slideStatus[i].data[j].data[k].data=[]
											for(let r=0;r<len22;r++){
												this.slideStatus[i].data[j].data[k].data[r]={}
												if(this.chartAttrs[i].properties[j].fieldData[k].fieldData[r].type == 'hasChild') { // 有子元素
													this.slideStatus[i].data[j].data[k].data[r].show = false
												}
											}
										}
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
									if(this.chartAttrs[i].properties[h].fieldData[j].fieldData){
										this.slideStatus[i].data[h].data[j].data=[]
										let len5=this.chartAttrs[i].properties[h].fieldData[j].fieldData.length
										for(let k=0;k<len5;k++){
											this.slideStatus[i].data[h].data[j].data[k]={}
											if(this.chartAttrs[i].properties[h].fieldData[j].fieldData[k].type == 'hasChild') { // 有子元素
												this.slideStatus[i].data[h].data[j].data[k].show = false
											}
										}
									}
								}
							}
						}
					}

				}
			},
			changeSlide(type, index, childIndex, childIndex2, childIndex3) { //收缩动作
				let state = ''
				if(type == 'first') { // 第一层菜单
					state = this.chartAttrs[index].editable
					if(state != '2') { // 解锁或者没锁才可以展开
						let item = this.slideStatus[index]
						item.show = !item.show
						this.slideStatus.splice(index, 1, item)
					}
				} else if(type == 'second') {
					// console.log('second')
					state = this.chartAttrs[index].properties[childIndex].editable
					if(state != '2') { // 解锁或者没锁才可以展开
						let item = this.slideStatus[index].data[childIndex]
						item.show = !item.show
						this.slideStatus[index].data.splice(childIndex, 1, item)
					}
				} else if(type == 'third')  {
					// console.log('third')
					state = this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].editable
					if(state != '2') {
						let item = this.slideStatus[index].data[childIndex].data[childIndex2]
						item.show = !item.show
						this.slideStatus[index].data[childIndex].data.splice(childIndex2, 1, item)
					}
				}else{
					// console.log('four')
					state = this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].fieldData[childIndex3].editable
					if(state != '2') {
						let item = this.slideStatus[index].data[childIndex].data[childIndex2].data[childIndex3]
						item.show = !item.show
						this.slideStatus[index].data[childIndex].data[childIndex2].data.splice(childIndex3, 1, item)
					}
				}
			},
			unlockparent(type, index, childIndex, childIndex2,childIndex3) { // 样式解锁，关锁动作
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
				} else if(type == 'third') {
					state = this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].editable
					if(state == '1') {
						let item = this.slideStatus[index].data[childIndex].data[childIndex2]
						item.show = false
						this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].editable = '2'
						this.slideStatus[index].data[childIndex].data.splice(childIndex2, 1, item) //关锁，收缩状态
					} else if(state == '2') {
						this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].editable = '1'
					}
				} else{
					state = this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].fieldData[childIndex3].editable
					if(state == '1') {
						let item = this.slideStatus[index].data[childIndex].data[childIndex2].data[childIndex3]
						item.show = false
						this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].fieldData[childIndex3].editable = '2'
						this.slideStatus[index].data[childIndex].data[childIndex2].data.splice(childIndex3, 1, item) //关锁，收缩状态
					} else if(state == '2') {
						this.chartAttrs[index].properties[childIndex].fieldData[childIndex2].fieldData[childIndex3].editable = '1'
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
				item.name = '系列' + (len + 1)
				item.sid=null
				item.fieldData[0].value='系列' + (len + 1)
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
				if(this.chartName=='轮播列表'){
					this.moveListSelect = this.chartAttrs[5].properties[index2].fieldData[3].value;
				}
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
								} else {

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
			},
			//select change事件
			selectChange(value){
				if(this.chartName=="轮播列表"){
					this.moveListSelect = value;
				}
			}
		}
	}
</script>

<style lang="css">
	@import url("../css/chartitem.css");
</style>
