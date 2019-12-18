<template>
	<div style="width:100%;height:100%;background-size: cover;" :style="moduleStyle">
		<div style="position: absolute;top:0;left:0;background-size: cover;" :style="sizeStyle">
			<div class="datav-transform" v-for="(chart,index) in chartsList" :key="chart.attr_id" style="display:block;pointer-events: auto;z-index: 0;" :style="getChartStyle(chart.properties)">
				<chartBar :chartData="chart"></chartBar>
			</div>
		</div>
	</div>
</template>

<script>
	import httpService from '../publicService/HttpService.js'
	import Urls from '../publicService/urls.js'
	import chartBar from '../components/preview/chart.vue'
	import TipBoxService from '../publicService/TipBoxService.js'
	export default {
		name: 'previewPager',
		data() {
			return {
				moduleProterty: {},
//				chartsList: [],
				moduleStyle: {},
				websockt: '',
				viewType: '',
				viewWidth: '',
				viewHeight: '',
				viewColor: '',
				viewBg: '',
				bodyWidth: '',
				bodyHeight: '',
				nowMoId: '',
			}
		},
		components: {
			'chartBar': chartBar
		},
		computed: {
			sizeStyle() {
				let bodyWidth = this.bodyWidth
				let bodyHeight = this.bodyHeight
				let x1 = this.viewWidth
				let x2 = this.viewHeight
				let scale = 1
				let item = {}
				if(this.viewType == '1') { //等比例缩放宽度铺满
					let scale1 = bodyWidth / x1
					if((x2*scale1)>bodyHeight){
						this.moduleStyle.height=(x2*scale1)+'px'
					}
					scale = 'scale(' + scale1+','+scale1 + ') translate(' + 0 + ',' + 0 + ')'
				} else if(this.viewType == '2') { //等比例缩放高度铺满
					let scale2 = bodyHeight / x2
					scale = 'scale('  + scale2+','+scale2 + ') translate(' + 0 + ',' + 0 + ')'
				} else { //全屏铺满
					let scale1 = bodyWidth / x1
					let scale2 = bodyHeight / x2
					scale = 'scale(' + scale1 + ',' + scale2 + ') translate(' + 0 + ',' + 0 + ')'
				}

				item.transform = scale
				item.backgroundColor = this.viewColor
				item.backgroundImage = this.viewBg
				return item
			},
			chartsList(){
				return this.$store.state.allPreviewData
			}
		},
		mounted() {
			let param = {};
			let _this = this;
			param.mo_id = this.$route.query.moID;
			param.isCompent = this.$route.query.isCompent;
			//smartlog
			param.isSmartlog = this.$route.query.isSmartlog;
			param.type = this.$route.query.type;
			param.id = this.$route.query.id;
			param.userid = this.$route.query.userid;
			//连线
			param.fromType = this.$route.query.fromType;
			param.toType = this.$route.query.toType;
			param.fromId = this.$route.query.fromId;
			param.toId = this.$route.query.toId;

			this.nowMoId = param.mo_id;
			console.log(param);
			//判断是否是组件来的
			if(param.isCompent){
				param.comId = this.$route.query.comId
				let urls = Urls.compentWebsocket + param.comId
				httpService.postLink(Urls.getCurrentUrl,{com_id:param.comId})
			      .then(function(res) {
					param.mo_id = res;
					_this.getPagerInfo(param);
			      })
			      .catch(function(error) {
			        console.log(error);
			      });
				console.log('socket url :' + urls)
				this.websockt = new WebSocket(urls)
				this.websockt.onopen = function(){
					console.log('WebSocket连接成功')
				}
				this.websockt.onerror = function(e){
					console.log('WebSocket连接发生错误')
				}
				this.websockt.onmessage = function(e){
					console.log('socket onmessage:' + e.data)
					if(e.data != "连接成功" && e.data != '') {
						let data = JSON.parse(e.data)
						//判断这次的mo_id是否和上次的一样
						if(_this.nowMoId!=data.mo_id){
							_this.$store.state.allPreviewData=[]
							TipBoxService.open('success', '正在跳往下一个模板')
							_this.nowMoId = data.mo_id;
							_this.getPagerInfo(data);
						}
					}
				}
				this.websockt.onclose = function(e) {
					this.websock.close()
					console.log('connection closed ')
				}
			}else{
				this.getPagerInfo(param);
			}
			this.bodyWidth = document.body.clientWidth
			this.bodyHeight = document.body.clientHeight
			let that = this
			window.addEventListener('resize', () => {
				this.bodyWidth = document.body.clientWidth
				this.bodyHeight = document.body.clientHeight
			})
		},
		created() {},
		methods: {
			getPagerInfo(param) { // 获取预览信息
				let that = this
				//判断页面是否为smartlog跳转过来的
				if(!param.isSmartlog){
					param.isSmartlog = 'false';
				}
				//获取模板信息
				httpService.postLink(Urls.getTempComponents, param).then(function(res) {
					let data = JSON.parse(res.mo_attr).propertyData
					let styleMoudle = {}
					that.viewWidth = data[0].fieldData[0].value
					that.viewHeight = data[0].fieldData[1].value
					that.viewColor = data[1].fieldData[0].value
					that.viewBg = 'url(' + window.g.ApiUrl + data[2].fieldData[0].value + ')'
					styleMoudle.backgroundColor = data[1].fieldData[0].value
					styleMoudle.backgroundImage = 'url(' + window.g.ApiUrl + res.pic_url + ')'
					that.viewType = data[3].fieldVal
					that.moduleStyle = styleMoudle
				}).catch(function(error) {
					console.log(error);
				})
				//获取图形信息
				httpService.postLink(Urls.getTempAttrs, param).then(function(res) {
					let len = res.length
					let arr = []
					for(let i = 0; i < len; i++) {
						let item = {}
						let attr1 = JSON.parse(res[i].attr_descr)
						let attr2 = JSON.parse(res[i].data_descr)
						let attr3 = JSON.parse(attr2.datas.data_value)
						// if(attr2.datas.data_value){
						// 	attr3 = JSON.parse(attr2.datas.data_value)
						// }else{
						// 	attrs = attr2.datas.data_value;
						// }
						let mapped = JSON.parse(attr2.mapped)
						item.attr_id = res[i].attr_id
						item.sort = res[i].sort
						item.type = res[i].data_type
						item.properties = attr1.properties
						item.data = attr3
						item.autoUpdateTime = attr2.datas.autoUpdateTime
						item.autoUpdate = attr2.datas.autoUpdate
						item.mapped = mapped
						item.name = res[i].tipBoxContent
						item.id = attr1.id
						item.chartType = attr1.type
						item.openflag=res[i].openflag
						if(attr1.type=='isMap'){//如果是地图，需要子组件数据
							item.attrArr = JSON.parse(res[i].attrArr)
							//转换成json数据
							for (let j = 0; j < item.attrArr.length; j++) {
				              item.attrArr[j].parent_id = item.attr_id;
				              item.attrArr[j].openflag = item.openflag;
				              item.attrArr[j].attr_descr = JSON.parse(item.attrArr[j].attr_descr)
				              item.attrArr[j].static_data = JSON.parse(item.attrArr[j].static_data)
				              let dataDescr = JSON.parse(item.attrArr[j].data_descr)
				              if (dataDescr.datas.type && dataDescr.datas.type == 'static') {
				                dataDescr.datas.data = JSON.parse(dataDescr.datas.data)
				              }
				              dataDescr.datas.data_value = JSON.parse(dataDescr.datas.data_value)
				              dataDescr.mapped = JSON.parse(dataDescr.mapped)
				              item.attrArr[j].data_descr = dataDescr
				            }
						}
						arr.push(item)
					}
//					that.chartsList = arr
					that.$store.state.allPreviewData=arr
				}).catch(function(error) {
					console.log(error);
				})
			},
			getChartStyle(data) { //图形外表样式
				let item = {}
				if(data != undefined) {
					item.width = data[0].properties[0].fieldData[0].value + 'px'
					item.height = data[0].properties[0].fieldData[1].value + 'px'
					//item.transform = 'rotate(' + data[0].properties[2].fieldData[0].value + 'deg) translate(' + data[0].properties[1].fieldData[0].value + 'px,' + data[0].properties[1].fieldData[1].value + 'px)'
					item.transform = 'rotate(' + data[0].properties[2].fieldData[0].value + 'deg)'
					item.opacity = data[0].properties[2].fieldData[1].value
					item.left = data[0].properties[1].fieldData[0].value + 'px'
					item.top = data[0].properties[1].fieldData[1].value + 'px'
				}
				return item
			}
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-icab-box-sizing: border-box;
		-khtml-box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.datav-transform {
		position: absolute !important;
		margin: 0 !important;
	}
</style>
