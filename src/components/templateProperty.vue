<template lang="html">
	<div class="config-manager-tabs">
		<div class="config-manager-head">
			页面设置
		</div>
		<div class="config-manager-body">
			<div class="page-config overflow-thumb">
				<div class="gui">
					<div class="gui-scroll-container">
						<div class="gui-root-container">
							<div v-for="tempData in templateProperty.propertyData" class="gui-controller gui-field-controller gui-controller-level-0">
								<span class="gui-field-name" :title="tempData.fieldName">{{tempData.fieldName}}</span>
								<div class="gui-field-container">
									<div class="gui-field-component" :class="tempData.fieldClassName+'-component'">
										<!-- 屏幕大小 -->
										<div v-if="tempData.fieldClassName=='gui-field-numbers'" class="gui-field-numbers">
											<div class="gui-field-numbers-single" v-for="fieldData in tempData.fieldData">
												<div class="gui-field-component gui-field-number-component" :class="">
													<div class="gui-for-number">
														<i class="number-plus" @click="valueChange(fieldData.name,'add')">+</i>
														<i class="number-minus" @click="valueChange(fieldData.name,'reduce')">-</i>
														<input type="text" class="gui-input-number" v-model="fieldData.value">
													</div>
												</div>
												<div class="gui-field-numbers-single-name" :title="fieldData.name">
													{{fieldData.name}}
												</div>
											</div>
										</div>
										<!-- 背景颜色 -->
										<div v-if="tempData.fieldClassName=='gui-field-color'" v-for="fieldData in tempData.fieldData" class="gui-field-color">
											<div class="gui-field-color-picker">
												<input v-model="fieldData.value" type="color">
											</div>
											<div class="gui-field-color-block-border">
												<input v-model="fieldData.value" type="color">
											</div>
											<input v-model="fieldData.value" @blur="colorChangeBlur(fieldData.value)" type="text" class="gui-field-color-value" maxlength="7">
										</div>
										<!-- 背景图 -->
										<div v-if="tempData.fieldClassName=='gui-field-image'" v-for="fieldData in tempData.fieldData">
											<!-- <label class="gui-input-url">
                                                <i class="icon fa fa-link"></i>
                                                <input v-model="fieldData.value" type="text" class="gui-input-url" placeholder="请输入图片地址">
                                            </label> -->
											<div class="gui-label-file">
												<img :src="imageUrl+fieldData.value" alt="">
												<input @change="inputImgChange($event)" type="file" class="gui-input-file bgImageFile" mutiple accept="image/png, image/jpeg, image/gif, image/jpg">
												<div class="gui-label-file-icon" v-if="fieldData.value!=''">
													<i class="components-font icon fa fa-trash" @click="delBgImg(fieldData.value)"></i>
												</div>
											</div>
										</div>
										<!-- 页面缩放方式 -->
										<div v-if="tempData.fieldClassName=='gui-field-radio'" class="">
											<label :for="fieldData.value" class="gui-for-radio" v-for="fieldData in tempData.fieldData">
                                                <input type="radio" :value="fieldData.value" :id="fieldData.value" class="gui-input-radio" :name="tempData.fieldVal" v-model="tempData.fieldVal">
                                                <span>{{fieldData.name}}</span>
                                            </label>
										</div>
										<!-- 栅格间距 -->
										<div v-if="tempData.fieldClassName=='gui-field-number'" class="gui-for-number" v-for="fieldData in tempData.fieldData">
											<i class="number-plus" @click="valueChange(fieldData.name,'add')">+</i>
											<i class="number-minus" @click="valueChange(fieldData.name,'reduce')">-</i>
											<input type="text" class="gui-input-number" :value="fieldData.value">
										</div>
										<!-- 缩略图 -->
										<div v-if="tempData.fieldClassName=='gui-field-screen'" v-for="fieldData in tempData.fieldData">
											<button type="button" class="btn-normal btn-sm btn-outline" @click="reduceCover">
                                                <span>{{fieldData.name}}</span>
                                            </button>
											<div class="screen-preview">
												<!--<img :src="coverImage" alt="">-->
												<img :src="imageUrl+fieldData.value+'?t='+random" alt="">
											</div>
										</div>
										<!-- 重置 -->
										<div v-if="tempData.fieldClassName=='gui-field-reset'" v-for="fieldData in tempData.fieldData">
											<button type="button" class="btn-normal btn-sm btn-outline" @click="resetBackground">
                                                <span>{{fieldData.name}}</span>
                                            </button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="config-manager-footer" @click="saveModuleConfig">

			<i class="fa fa-save"><span style="margin-left:5px;">保存</span></i>

		</div>
	</div>
</template>

<script>
	import httpService from '../publicService/HttpService.js'
	import Urls from '../publicService/urls.js'
	export default {
		name: 'tempProperty',
		data() {
			return {
				bgColor: '',
				tempList: ''
			}
		},
		props: ['moId', 'coverImage'],
		computed: {
			templateProperty() {
				let arr = this.$store.state.templateProperty
				this.tempList = arr.propertyData
				return arr
			},
			random(){
				let flag=this.$store.state.interImage
				if(flag){
					this.$store.state.interImage=false
				}
				return Math.random()
			}
		},
		/*watch:{
			templateProperty:{
				handler(newValue, oldValue) {　　　　　　
					this.tempList=arr.propertyData
				},
				　deep: true
			}
		},*/
		mounted() {
			// console.log('tempProperty');
		},
		methods: {
			saveModuleConfig() { //保存配置
				let item = {}
				item.mo_id = this.moId
				item.mo_attr = JSON.stringify(this.templateProperty)
				this.$store.dispatch('updatModuleAttribute', item)
			},
			cancleModuleConfig() { // 取消配置
				//console.log('cancle change')
				this.$store.commit('cancleModuleConfig')
			},
			reduceCover() { // 截取封面
				this.$emit('intercept')
			},
			resetBackground() { // 恢复默认背景
				let item = {}
				item.mo_id = this.moId
				this.$store.dispatch('resetModuleBackground', item)
			},
			colorChangeBlur(bgColor) {
				//console.log('bgColor:' + bgColor)
				//判断颜色值
				let reg = new RegExp("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");
				if(bgColor.match(reg)) {
					if(bgColor.length == 4) {
						let str = bgColor.substr(-3, 3);
						//改变全局中temp背景颜色属性
						this.$store.state.templateProperty.propertyData[1].fieldData[0].value = bgColor + str;
					}
				} else {
					this.tips.open('error', '请输入正确的颜色值')
				}
			},
			inputImgChange(e) {
				console.log('==============')
				let file = e.target.files[0];
				e.preventDefault()
				let param = new FormData(); //创建form对象
				param.append('file', file, file.name); //通过append向form对象添加数据
				param.append('mo_id', this.moId); //添加form表单中其他数据
				console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
				this.$store.dispatch('uploadModuleBgImage', param)
			},
			//删除模板背景图片
			delBgImg(imageName) {
				let item = {}
				item.mo_id = this.moId
				item.filename = imageName
				this.$store.dispatch('deleteModuleBgImage', item)
				$('.bgImageFile').val('')
				// this.$store.state.templateProperty.propertyData[2].fieldData[0].value = '';
			},
			valueChange(property, operation) {
				console.log(operation, property);
				if(operation == 'add') {
					switch(property) {
						case('宽度'):
							this.$store.state.templateProperty.propertyData[0].fieldData[0].value++
								break;
						case('高度'):
							this.$store.state.templateProperty.propertyData[0].fieldData[1].value++
								break;
						case(''):
							this.$store.state.templateProperty.propertyData[4].fieldData[0].value++
								break;
					}
				} else {
					switch(property) {
						case('宽度'):
							this.$store.state.templateProperty.propertyData[0].fieldData[0].value--
								break;
						case('高度'):
							this.$store.state.templateProperty.propertyData[0].fieldData[1].value--
								break;
						case(''):
							this.$store.state.templateProperty.propertyData[4].fieldData[0].value--
								break;
					}
				}
			}
		}
	}
</script>

<style lang="css">

</style>
