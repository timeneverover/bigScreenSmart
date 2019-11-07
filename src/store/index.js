import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import ComponentsData from '../publicService/componentsData';
import ResourceData from '../publicService/resourceData';
Vue.use(Vuex);

const state = {
  timeInterval: [],
  interval: [],
  interImage: false,
  connectInfo: '',
  //预览
  moudlePreviewList: '',
  moudlePreviewStyle: '',
  chartPreviewList: '',
  leftChartLists: [],
  chartListCopy: [],
  //大屏
  addChartState: false,
  mappingResponse: [],
  popShow: false,
  screenName: '',
  popObj: '',
  originalData: '',
  leftEditMainData: [],
  allPreviewData:[],
  chartProperty: [],
  thumbailItemData: {},
  templateProperty1: {}, // 图形原本属性
  templateProperty: {},
  //大屏组件列表
  moduleList: [{}],
  //模板中的组件列表
  componentList: [],
  //当前选中组件属性
  componentsData: ComponentsData,
  //当前选中组件数据源
  resourceData: ResourceData,
  groupList: [],
  groupTempletes: {},

  myDataList: {},
  allDatabases: [],
  dataInfo: {
    "basename": "test",
    "createTime": "2018/8/21 下午3:37:43",
    "data_id": "data1535366161538",
    "data_name": "test1",
    "password": "root",
    "port": 3306,
    "url": "localhost",
    "username": "root"
  },
  //首页组件数据
  compentList: [],
  compentTempList: {
    com_name: '',
    com_descr: '',
    com_data: [{
      mo_id: '',
      tri_time: ''
    }]
  },
  allComTempList: [],
  // ModuleList: []
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})
