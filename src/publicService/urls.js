let api = window.g.ApiUrl
let socketUrl = window.g.socketUrl
let baseUrl = api + '/mydata/'
let chartUrl = api + '/chart/'
let tempUrl = api + '/groupMo/'
let taskUrl = api + '/task/'
let comUrl = api + '/compent/'
export default {
  //首页  分组
  getGroupsUrl: tempUrl + 'getAllGroup',
  addGroupUrl: tempUrl + 'insertGroupInfo',
  deleteGroupUrl: tempUrl + 'delGroupInfo',
  editGroupUrl: tempUrl + 'updateGroupInfo',
  publichScreen: tempUrl + 'publishMo',
  //模板
  getAllTempsUrl: tempUrl + 'getModuleInfo', //获取组下的所有模板信息
  addTempUrl: tempUrl + 'insertModuleInfo',
  editTempUrl: tempUrl + 'updateModuleInfo',
  deleteTempUrl: tempUrl + 'delModuleInfo',
  copyTempUrl: tempUrl + 'copyModuleInfo',
  getDefaultModuleList: tempUrl + 'getDefaultModuleList',
  addExistTempUrl: tempUrl + 'getDefaultMoAttrToAttr',
  //数据
  getDatasUrl: baseUrl + 'getAllDataBase_All',
  addDataUrl: baseUrl + 'insertData', // 添加数据库数据源
  editDataUrl: baseUrl + 'updateDataBase',
  deleteDataUrl: baseUrl + 'delDataBase',
  getAllDatabases: baseUrl + 'getAllDatabases', //获取所有数据库列表
  getDatainfos: baseUrl + 'getDatainfos', //获取指定数据源信息
  testDataConnect: baseUrl + 'testJdbcConnector', // 测试数据库连接
  testEsConnect: baseUrl + 'testEsConnector',

  testHttpConnect: baseUrl + 'testHttpConnect', // 测试http连接
  HttpConnect: baseUrl + 'insertData', // 正式http连接

  testWsConnect: baseUrl + 'testWsConnect',

  addCsvUrl: baseUrl + 'insertFileData', // 添加csv数据源
  checkUser: baseUrl + 'check',
  getChartNodes: chartUrl + 'getChartNodes',
  getAttrDefault: chartUrl + 'getAttrDefault', // 添加新图形

  //首页 我的组件
  getAllCompent: comUrl + 'getAllCompent', //获取所有组件
  addCompent: comUrl + 'insertCompentInfo',
  getCompent: comUrl + 'getCompentInfoById',
  delCompent: comUrl + 'delCompentInfoById',
  editCompent: comUrl + 'updateCompentInfoById',
  getAllCompentTemps: tempUrl + 'getAllModuleList',
  getCompentModules: comUrl + 'getAllCompent', //预览组件是websocket接口
  getCurrentUrl: comUrl + 'getCurrentUrl',
  compentWebsocket: socketUrl + '/compentwebsocket/',

  //获取当前模板属性和包含的组件
  getTempAttrs: chartUrl + 'getAllAtrrByMoId',
  getTempComponents: tempUrl + 'getModuleInfoById',
  updateAttrSort: chartUrl + 'updateAttrSort',
  updateAttrSort_All: chartUrl + 'updateAttrSort_All',
  delAttrToMo: chartUrl + 'delAttrToMo',
  //图形配置
  updateChartConfig: chartUrl + 'updateAttrData',
  //自定义背景块背景图片
  userdefinedBackgroundImgRemove: chartUrl + 'userdefinedBackgroundImgRemove',
  userdefinedBackgroundImgUpload: chartUrl + 'userdefinedBackgroundImgUpload',

  // 大屏、图形配置接口
  //大屏配置更新
  updateModuleAttrDescr: tempUrl + 'updateModuleAttrDescr',
  updateAttrData: chartUrl + 'updateAttrData',
  addBgImage: tempUrl + 'backgroundImgUpload',
  backgroundImgRemove: tempUrl + 'backgroundImgRemove',
  resetDefaultBackGroundImg: tempUrl + 'resetDefaultBackGroundImg',
  printScreenImg: tempUrl + 'printScreenImg',

  //地图操作
  insertMapLayer: chartUrl + 'insertMapLayer',
  delMapLayer: chartUrl + 'delMapLayer',
  updateMapLayer: chartUrl + 'updateMapLayer',

  //数据配置
  //保存
  saveChartData: taskUrl + 'insertTaskInfo',
  dataRespondResult: chartUrl + 'getChartAttrDataById',
  websocketUrl: socketUrl + '/websocket',

  //数据联动
  insertAction: chartUrl + 'insertAction',

	chartClickAction: chartUrl + 'getDataByClick'  // 预览点击图形
}
