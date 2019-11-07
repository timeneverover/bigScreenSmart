//首页 我的组件
//获取所有组件信息
export const GET_ALL_COMPENT = 'GET_ALL_COMPENT';
//单个组件增删改
export const ADD_COMPENT = 'ADD_COMPENT';
export const DEL_COMPENT = 'DEL_COMPENT';
export const EDIT_COMPENT = 'EDIT_COMPENT';
//获取所有组件下可选择的模板信息compentTempList
export const GET_ALL_COM_TEMP_LIST = 'GET_ALL_COM_TEMP_LIST';
export const GET_COMPENT_TEMP_LIST = 'GET_COMPENT_TEMP_LIST';

//弹窗显示
export const POP_SHOW = 'POP_SHOW';
//新建大屏名字
export const SCREEN_NAME = 'SCREEN_NAME';
//弹窗信息对象
export const POP_OBJ = 'POP_OBJ';
//改变创建大屏左边组件数据（增，删，改）
export const ADD_LEFT_EDIT_MAIN_DATA = 'ADD_LEFT_EDIT_MAIN_DATA';
export const GET_LEFT_EDIT_MAIN_DATA = 'GET_LEFT_EDIT_MAIN_DATA';
export const DEL_LEFT_EDIT_MAIN_DATA = 'DEL_EDIT_MAIN_DATA';
export const SELECT_LEFT_EDIT_MAIN_DATA = 'SELECT_LEFT_EDIT_MAIN_DATA';
export const MODIFY_LOCATION_LEFT_EDIT_MAIN_DATA = 'MODIFY_LOCATION_LEFT_EDIT_MAIN_DATA'; //修改位置
export const CHANGE_LOCATION_LEFT_EDIT_MAIN_DATA = 'CHANGE_LOCATION_LEFT_EDIT_MAIN_DATA'; //交换位置
export const PUBLISH_SCREEN_URL = 'PUBLISH_SCREEN_URL'; //发布大屏
//地图子组件操作  增、删、改
export const ADDMAPCOMPONENT = 'ADDMAPCOMPONENT';
export const UPDATEMAPCOMPONENT = 'UPDATEMAPCOMPONENT';
export const DELMAPCOMPONENT = 'DELMAPCOMPONENT';
//获取模板属性（设计页面）
export const GET_TEMPLATE_BG_PROPERTY = 'GET_TEMPLATE_BG_PROPERTY';
//存储大屏模板中的组件列表数据compontentList
export const SAVE_COMPONENT_LIST = 'SAVE_COMPONENT_LIST';
//存储当前选中组件属性
export const SAVE_COMPONENT_PROPERTY = 'SAVE_COMPONENT_PROPERTY';
//获取所有组消息
export const GET_ALL_GROUP = 'GET_ALL_GROUP';

export const THUMBAIL_ITEM_DATA = 'THUMBAIL_ITEM_DATA';

// 状态
export const ASKSTATUS = 'ASKSTATUS'

//添加组
export const ADD_GROUP = 'ADD_GROUP';

//删除组
export const DELETE_GROUP = 'DELETE_GROUP';

//编辑组
export const EDIT_GROUP = 'EDIT_GROUP';

//获取分组的模板数组
export const GET_GROUP_TEMPLETES = 'GET_GROUP_TEMPLETES';

//模板个数
export const TEMPLET_COUNT = 'TEMPLET_COUNT';

//添加模板
export const ADD_TEMP = 'ADD_TEMP';

//模板修改
export const EDIT_TEMP = 'EDIT_TEMP';

//删除模板
export const DELETE_TEMP = 'DELETE_TEMP';

//复制模板
export const COPY_TEMP = 'COPY_TEMP';

//我的数据页面
//数据列表
export const DATA_LIST = 'DATA_LIST';

//添加数据
export const ADD_DATA = 'ADD_DATA';

//编辑数据
export const EDIT_DATA = 'EDIT_DATA';

//删除数据

export const DELETE_DATA = 'DELETE_DATA';
//测试数据库连接
export const TEST_CONNECT = 'TEST_CONNECT';

//获取所有数据库列表
export const GET_ALL_DATABASE = 'GET_ALL_DATABASE';

//获取指定数据源信息
export const GET_DATA_INFO = 'GET_DATA_INFO';

//大屏组件属性列表
export const GET_COMPONENTS_ATTRIBUTE = 'GET_COMPONENTS_ATTRIBUTE';

//修改大屏组件
export const UPDATE_CONPONENT_ATTRIBUTE = 'UPDATE_CONPONENT_ATTRIBUTE';


/*******大屏模板，图形 配置************/
// 大屏配置修改
export const UPDATE_MODULE_ATRRTIBUTE = 'UPDATE_MODULE_ATRRTIBUTE'
export const UPLOAD_MODULE_BGIMAGE = 'UPLOAD_MODULE_BGIMAGE' //上传背景图片
export const DELETE_MODULE_BGIMAGE = 'DELETE_MODULE_BGIMAGE' //删除背景图片
export const UPLOAD_MODULE_COVER = 'UPLOAD_MODULE_COVER' //上传封面
export const RESET_BACKGROUND = 'RESET_BACKGROUND' // 恢复默认背景

// 图形配置
export const UPDATE_CHART_CONFIG = 'UPDATE_CHART_CONFIG' //更改图形配置

export const UPDATA_CHART_DATA_CONFIG = 'UPDATA_CHART_DATA_CONFIG' //保存图形数据配置
export const RESPONSE_CHART_DATA_CONFIG = 'RESPONSE_CHART_DATA_CONFIG' //保存图形数据配置
export const RESPONSE_CHART_DATA_CONFIG_MAPCOM = 'RESPONSE_CHART_DATA_CONFIG_MAPCOM' //保存图形数据配置

// 保存图形关联数据
export const UPDATE_CHART_LINK = 'UPDATE_CHART_LINK'
export const CLICK_TO_LINK = 'CLICK_TO_LINK'
