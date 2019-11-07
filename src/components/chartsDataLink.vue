<template lang="html">
    <div class="setting-panel-content link-setting-panel">
       <!-- <div v-if="defaultShow" class="empty-api-editor">
			<div class="data-icon-box">
				<i class="fa fa-heart-o"></i>
			</div>
			<p>该组件不支持配置数据联动</p>
		</div>-->
		<div v-if="chartType=='isSource'||chartName=='进度条'||chartName=='轮播列表'||chartName=='单张图片'||chartName=='iframe'||chartName=='视频'||chartName=='轮播图'" class="empty-api-editor">
			<div class="data-icon-box">
				<i class="fa fa-heart-o"></i>
			</div>
			<p>该组件不支持配置数据联动</p>
		</div>
        <div v-else class="gui-scroll-container">
            <div v-if="!mapComponentShow">
                <!-- 地图子组件管理 -->
				<div class="gui" v-if="chartName=='基础平面地图'||chartName=='3D平面中国地图'">
					<div class="gui-group-controller">
						<div class="gui-group-name fa-plus-box">
							<span>
								<i class="fa fa-plus"></i>
								子组件管理
							</span>
							<div class="map-default-components map-default-components-data overflow-thumb">
								<div v-show="chartName=='基础平面地图'" class="component" v-for="(sub,subIndex) in mapSubProperties" @click="mapComponentAdd(sub)">
									<img :src="sub.imgUrl" alt="">
									<span>{{sub.name}}</span>
								</div>
								<div v-show="chartName=='3D平面中国地图'" class="component" v-for="(sub,subIndex) in mapSubProperties3D" @click="mapComponentAdd(sub)">
									<img :src="sub.imgUrl" alt="">
									<span>{{sub.name}}</span>
								</div>
							</div>
						</div>

						<div class="map-components overflow-thumb">
							<div v-for="(com,comIndex) in mapComponents" class="gui-field-controller" @click="mapComponentClick(comIndex,com.attr_descr.name)">
								<span>{{com.attr_descr.name+comIndex}}</span>
								<i class="fa fa-trash-o" title="删除子组件" v-if="com!='区域热力层'" @click.stop="mapComponentDel(comIndex,com.attr_id,com.parent_id)"></i>
							</div>
						</div>
					</div>
				</div>
                <div v-if="chartName!='基础平面地图'" class="gui">
                    <div class="gui-root-container">
                        <!-- 是否启用数据联动 -->
                        <div class="gui-controller gui-group-controller gui-controller-level-0">
                            <div class="gui-group-name gui-font-name" >
                                <div class="gui-controller gui-field-controller gui-field gui-controller-level-0">
                                    <span class="gui-field-name">启用数据联动</span>
                                    <div class="gui-field-container">
                                        <div class="gui-field-component">
                                            <label class="gui-for-checkbox" :class="ifLink?'checked':''">
                                                <input type="checkbox" value="" v-model="ifLink">
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 联动表头 -->
                        <div class="gui-controller gui-group-controller gui-controller-level-0">
                            <div class="gui-group-name gui-font-name" :class="ifLink?'':'disabled'">
                                <div class="gui-controller" @click="addLinkArr()">
                                    <span title="添加一组关联图形" class="gui-field-name add-link">数据联动关联图形<i class="fa fa-plus"></i></span>
                                </div>
                            </div>
                        </div>
                        <!-- 联动表体 -->
                        <div class="gui-group-container link-chart-container" v-if="ifLink" >
                            <div class="gui-field-controller" v-if="linkArr.length==0">
                                <span class="gui-field-name">还没有添加关联图形，点击加号开始添加吧!</span>
                            </div>
                            <div v-for="(linkData,linkIndex) in linkArr">
                                <!-- 关联动作名称 -->
                                <div class="gui-field-controller">
                                    <input v-model="linkData.action_name" type="text" class="gui-field-name">
                                    <i @click="delLinkArr(linkIndex)" title="删除该组关联动作" class="icon fa fa-trash-o"></i>
                                </div>
                                <!-- 图形选择 -->
                                <div class="gui-field-controller">
                                    <span class="gui-field-name">关联图形选择<i class="icon fa fa-question-circle-o" title="请选择左侧已添加到模板中的图形组件"></i></span>
                                    <div class="gui-field-container">
                                        <div class="gui-field-component">
                                            <div class="gui-component-select">
                                                <div class="select-input">
                                                    <select v-model="linkData.attr_name" @change="linkAttrChange(linkData.attr_name,linkIndex)">
                                                        <option :value="chart.name" v-for="(chart,chartIndex) in toCharts">{{chart.name}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 参数 -->
                                <div class="gui-field-controller link-argus-box" v-for="(param,paramIndex) in linkData.param">
                                    <span class="gui-field-name">原参数</span>
                                    <div class="gui-field-container">
                                        <div class="gui-component-select">
                                            <div class="select-input">
                                                <select v-model="param.AParam">
                                                    <option v-for="paramA in mapped" :value="paramA.value?paramA.value:paramA.name">{{paramA.value?paramA.value:paramA.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="gui-field-name">目标参数</span>
                                    <div class="gui-field-container">
                                        <div class="gui-component-select">
                                            <div class="select-input">
                                            	<input type="text" v-model="param.BParam" />
                                               <!-- <select v-model="param.BParam">
                                                    <option :value="paramB.value?paramB.value:paramB.name" v-for="paramB in toAttrParams">{{paramB.value?paramB.value:paramB.name}}</option>
                                                </select>-->
                                            </div>
                                        </div>
                                    </div>
                                    <i @click="delParam(linkIndex,paramIndex)" title="删除该组参数" class="icon fa fa-close"></i>
                                </div>
                                <!-- 按钮 -->
                                <div class="gui-field-controller add-button-box">
                                    <span @click="addParam(linkIndex)" title="添加一组关联参数" class="gui-field-name add-button"><i class="fa fa-plus"></i>添加关联参数</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <!-- 地图子组件 -->
            <mapComDataLink v-else :chartId="chartId" :mapComIndex="mapComIndex" :chartName="mapComName"
             ref="dataModuleMapCom" @mapComponentHide="mapComponentChange" ></mapComDataLink>
        </div>
    </div>
</template>

<script>
import TipBoxService from '../publicService/TipBoxService.js'
import mapComDataLink from './mapComDataLink.vue'

export default {
    data(){
        return{
        	defaultShow:true,
            ifLink: false,
            mapComponentShow: false,
            toAttrParams: [],
            mapComIndex: 0,
            mapComName: '',
            mapSubProperties: [{
              id: "chart1234567892122",
              name: "区域热力层",
              imgUrl: require('../assets/map/thermodynamic.png')
            }, {
              id: "chart1234567892123",
              name: "呼吸气泡层",
              imgUrl: require('../assets/map/bubble.png')
            }, {
              id: "chart1234567892124",
              name: "飞线层",
              imgUrl: require('../assets/map/flyLine.png')
            }],
            mapSubProperties3D: [{
              id: "chart1234567892128",
              name: "柱状图层",
              imgUrl: require('../assets/map/3DChinaBar.png')
            }, {
              id: "chart1234567892129",
              name: "飞线层",
              imgUrl: require('../assets/map/3DChinaFlyLine.png')
            }, {
              id: "chart1234567892130",
              name: "气泡层",
              imgUrl: require('../assets/map/3DChinaBubble.png')
            }],
        }
    },
    props: ['attrID','mapped','openFlag','linkArr','chartType','chartName','chartId'],
    components: {
        'mapComDataLink': mapComDataLink
    },
    computed: {
        //所有可供选择的关联图形
        toCharts(){
            let arr = [];
            let allList = this.$store.state.leftEditMainData;
            let obj = {};
            for(let i=0;i<allList.length;i++){
                let chartName = allList[i].tipBoxContent
                obj = {
                    attrId: allList[i].attr_id,
                    name: chartName+allList[i].sort,
                    mapped: allList[i].data_descr.mapped
                };
                if(chartName=='基础平面地图'||allList[i].attr_descr.type=='isSource'||chartName=='进度条'||chartName=='单张图片'||chartName=='iframe'||chartName=='视频'||chartName=='轮播图'){
                }else{
                    arr.push(obj);
                }
                if(allList[i].tipBoxContent.indexOf('地图')>=0){
                    let attrArr = allList[i].attrArr;
                    for(let j=0;j<attrArr.length;j++){
                        obj = {
                            attrId: attrArr[j].attr_id,
                            name: chartName+allList[i].sort+attrArr[j].attr_descr.name+j,
                            mapped: attrArr[j].data_descr.mapped
                        }
                        arr.push(obj);
                    }
                }

            }
            return arr
        },
        mapComponents(){
            let allList = this.$store.state.leftEditMainData
            let arr = allList.filter(data => data.attr_id === this.chartId)[0].attrArr
            if(arr){
                return arr
            }else{
                return {}
            }
        }
    },
    mounted(){
    	if(typeof(this.openFlag)=='string'){
    		this.ifLink=JSON.parse(this.openFlag)
    	}else{
    		this.ifLink=this.openFlag
    	}
        let linkArr = this.linkArr;
        for(let i=0;i<linkArr.length;i++){
            if(linkArr[i].attr_name){
                this.linkAttrChange(linkArr[i].attr_name, i);
            }
        }
    },
    methods: {
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
        mapComponentDel(index, attrId, parentId){
            let data = {
                attr_id: attrId,
                index: index,
                parentId: parentId,
                mo_id: this.$route.query.tempId,
            }
            this.$store.dispatch('delMapComponent',data);
        },
        //地图子组件点击
        mapComponentClick(index,name){
            this.mapComIndex = index;
            this.mapComName = name;
            this.mapComponentShow = true;
        },
        //添加关联动作
        addLinkArr(){
        	console.log('add--')
            this.linkArr.push({
                action_name: '关联动作',
                to_attr: '',
                attr_name: '',
                param: [
                    {AParam:'',BParam:''}
                ]
            });
        },
        //删除关联动作
        delLinkArr(index){
            this.linkArr.splice(index,1);
        },
        //关联图形选择改变事件
        linkAttrChange(chartName, index){
            let charts = this.toCharts;
            let chart = charts.filter(data => data.name === chartName)[0];
            this.toAttrParams = chart.mapped;
            this.linkArr[index].to_attr = chart.attrId;
        },
        //添加参数
        addParam(index){
            this.linkArr[index].param.push({AParam:'',BParam:''});
        },
        //删除参数
        delParam(linkIndex, paramIndex){
            this.linkArr[linkIndex].param.splice(paramIndex,1);
        },
        //保存关联配置
        saveLinkConfig(){
            let data = {};
            if(this.mapComponentShow){
                data = this.$refs.dataModuleMapCom.saveLinkConfigMapCom();
            }else{
                data.openflag = this.ifLink;
                data.attr_id = this.attrID;
                data.linkarr = this.linkArr;
            }
            return data;
        }
    }
}
</script>

<style lang="css">
</style>
