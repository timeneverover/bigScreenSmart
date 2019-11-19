/**
 * 样式数据配置菜单
 */
<template>
	<div class="config-manager-tabs" tabindex="1">
		<div class="tabs-nav">
			<div class="tabs-tab" :class="tabMenu=='styleMenu'?'active':''" @click="tabMenu='styleMenu'">
				<i class="icon fa fa-sliders"></i>
			</div>
			<div class="tabs-tab" :class="tabMenu=='dataMenu'?'active':''" @click="tabMenu='dataMenu'">
				<i class="icon fa fa-database"></i>
			</div>
            <div class="tabs-tab" :class="tabMenu=='linkMenu'?'active':''" @click="tabMenu='linkMenu'">
				<i class="icon fa fa-link"></i>
			</div>
		</div>
		<div class="tabs-content-wrapper">
			<div class="tab-panel">
				<div class="setting-panel">
					<div class="component-title-wp">
						<div class="component-title">
							<div class="title-name ellipsis">
								{{chartAttrs.attr_descr.name}}
							</div>
							<div class="version-tag ellipsis">
								{{chartAttrs.attr_descr.version}}
							</div>
						</div>
						<span class="update-tag ellipsis-2" title="保存" @click="saveChartConfig" v-show="!(tabMenu=='dataMenu'&&chartAttrs.attr_descr.isSource)">
							<i class="fa fa-save" style="margin-right:5px"></i>保存
						</span>
					</div>
					<chartsStyleConfig v-if="tabMenu=='styleMenu'" ref="getMapComIndex" :chartAttrs='chartAttrs.attr_descr.properties'
                    :chartName='chartAttrs.attr_descr.name' :chartID='chartId' :attrID='chartAttrs.attr_id'></chartsStyleConfig>
                    <chartsDataConfig v-else-if="tabMenu=='dataMenu'" ref="dataModule" :chartName='chartAttrs.attr_descr.name'
                    :chartId="chartId" :attrID='chartAttrs.attr_id' :chartType='chartAttrs.attr_descr.type'
                    :resourceData='chartAttrs.data_descr' :staticData2='chartAttrs.static_data' ></chartsDataConfig>
                    <chartsDataLink v-else-if="tabMenu=='linkMenu'" ref="linkModule" :attrID='chartAttrs.attr_id'
                    :mapped="chartAttrs.data_descr.mapped" :openFlag="chartAttrs.openflag" :linkArr="chartAttrs.linkarr"
                    :chartType="chartAttrs.attr_descr.type" :chartName='chartAttrs.attr_descr.name' :chartId="chartId"></chartsDataLink>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import chartsStyleConfig from './chartsStyleConfig.vue'
	import chartsDataConfig from './chartsDataConfig.vue'
    import chartsDataLink from './chartsDataLink.vue'
	import TipBoxService from '../publicService/TipBoxService.js'
	export default {
		name: 'barConfig',
		components: {
			'chartsStyleConfig': chartsStyleConfig,
			'chartsDataConfig':chartsDataConfig,
            'chartsDataLink':chartsDataLink,
		},
		data() {
			return {
				tabMenu: 'styleMenu',
				propertyShow: true,
				dataShow: false,
				currentChartIndex:0,
                mapComponentJson: {},
			}
		},
		props: ['chartId','chartAttrs'],
		computed: {

		},
		watch: {
			chartId(value, newValue){
				this.tabMenu='styleMenu'
			},
			chartAttrs:{
				handler(newValue, oldValue) {　　　　　　
				},
				　deep: true
			}
		},
		mounted() {
			this.getCurrentChartIndex()
		},
		methods: {
			getCurrentChartIndex(){
				let arr=this.$store.state.leftEditMainData
				let len=arr.length
				for(let i=0;i<len;i++){
					if(arr[i].attr_id==this.chartId){
						this.currentChartIndex=i
						break
					}
				}
			},
			saveChartConfig() { // 保存配置
				let data = {}
				if(this.tabMenu=='styleMenu'){
                    //改变attrArr下指定index的数据
                    let mapCom = this.$refs.getMapComIndex.setMapComIndex();
                    if(mapCom){
                        data = this.chartAttrs.attrArr[mapCom.mapComIndex];
                        data.mapComIndex = mapCom.mapComIndex;
                    }else{
                        data.attr_id = this.chartId;
    				    data = this.chartAttrs;
                    }
                    this.$store.dispatch('updateChartConfig', data);
				}else if(this.tabMenu=='dataMenu'){
					data = this.$refs.dataModule.saveDataConfig()
					if(data.flag){
						if((data.type=='mysql'||data.type=='oracle'||data.type=='sqlserver'||data.type=='es')&&(data.state=='Y')&&(data.rate<=0)){
							TipBoxService.open('error', '更新频率须大于0')
						}else{
							this.$store.dispatch('saveChartData', data)
						}
					}else{
						TipBoxService.open('error','非法操作数据库')
					}
				}else{
                    //数据联动
                    data = this.$refs.linkModule.saveLinkConfig();
                    let linkArr = data.linkarr;
                    for(let i=0;i<linkArr.length;i++){
                        if(linkArr[i].action_name==''||linkArr[i].attr_name==''||linkArr[i].param==''){
                            TipBoxService.open('error','请填写完整的信息');
                            return;
                        }else{
                            let thisChart = this.chartAttrs.tipBoxContent+this.chartAttrs.sort;
                            let params = linkArr[i].param;
                            if(linkArr[i].attr_name==thisChart||linkArr[i].attr_name.indexOf(thisChart)>=0){
                                TipBoxService.open('error','不能选择自身作为关联图形');
                                return;
                            }
                            for(let j=0;j<params.length;j++){
                                if(params[j].AParam==''||params[j].BParam==''){
                                    TipBoxService.open('error','请填写完整的参数信息');
                                    return;
                                }
                            }
                        }
                    }
                    this.$store.dispatch('updateChartLink', data);
                }
			}
		}
	}
</script>
<style></style>
