<template lang="html">
    <div class=" link-setting-panel map-com-data">
        <div class="component-title-wp">
            <div class="component-title" title="返回地图基础属性配置" @click="returnToBasic()">
                <div class="title-name ellipsis">
                    <i class="components-font icon fa fa-angle-left"></i>
                    {{chartName+mapComIndex}}
                </div>
            </div>
        </div>
        <div v-if="chartName=='飞线层'||chartName=='气泡层'||chartName=='呼吸气泡层'" class="empty-api-editor">
			<div class="data-icon-box">
				<i class="fa fa-heart-o"></i>
			</div>
			<p>该组件不支持配置数据联动</p>
		</div>
        <div v-else class="gui-scroll-container">
            <div class="gui">
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
                        <div v-for="(linkData,linkIndex) in linkArr" :key="linkIndex">
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
                                                <option v-for="paramA in mapped" :value="paramA.name">{{paramA.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <span class="gui-field-name">目标参数</span>
                                <div class="gui-field-container">
                                    <div class="gui-component-select">
                                        <div class="select-input">
                                            <!--<select v-model="param.BParam">
                                                <option :value="paramB.value?paramB.value:paramB.name" v-for="paramB in toAttrParams">{{paramB.value?paramB.value:paramB.name}}</option>
                                            </select>-->
                                            <input type="text" v-model="param.BParam" />
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
    </div>
</template>

<script>
import TipBoxService from '../publicService/TipBoxService.js'

export default {
    data(){
        return{
            ifLink: false,
            toAttrParams: [],
            mapped: [],
            attrID: '',
            linkArr:''
        }
    },
    props: ['chartId','mapComIndex','chartName'],
    computed: {
        mapComponents(){
            let allList = this.$store.state.leftEditMainData
            let arr = allList.filter(data => data.attr_id === this.chartId)[0].attrArr[this.mapComIndex]
            return arr
        },
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
    },
    watch:{
    	mapComponents:{
    		handler(newValue, oldValue) {　
	            if(typeof(newValue.linkarr)=='string'){
	                this.linkArr = JSON.parse(newValue.linkarr)
	            }else{
	            	 this.linkArr = newValue.linkarr
	            }
			},
			immediate: true, 
			deep: true
    	}
    },
    mounted(){
        this.attrID = this.mapComponents.attr_id;
        this.mapped = this.mapComponents.data_descr.mapped;
        this.ifLink = eval(this.mapComponents.openflag.toLowerCase());
        let linkArr = this.linkArr;
        for(let i=0;i<linkArr.length;i++){
            if(linkArr[i].attr_name){
                this.linkAttrChange(linkArr[i].attr_name, i);
            }
        }
    },
    methods: {
        returnToBasic(){
            this.$emit('mapComponentHide', false);
        },
        //添加关联动作
        addLinkArr(){
            let item={
                action_name: '关联动作',
                to_attr: '',
                attr_name: '',
                param: [
                    {AParam:'',BParam:''}
                ]
            }
            this.$set(this.linkArr,this.linkArr.length,item)
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
        saveLinkConfigMapCom(){
            let data = {};
            data.parent_id=this.chartId
            data.openflag = this.ifLink;
            data.attr_id = this.attrID;
            data.linkarr = this.linkArr;
            data.mapComIndex=this.mapComIndex
            return data;
        }
    }
}
</script>

<style lang="css">
</style>
