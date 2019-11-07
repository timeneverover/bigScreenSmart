import * as types from './mutation-types'
import Urls from '../publicService/urls.js'
import TipBoxService from '../publicService/TipBoxService.js'
import httpService from '../publicService/HttpService.js';

export default {
  //弹窗是否显示
  [types.POP_SHOW](state, data) {
    state.popShow = data;
  },
  askStatus(state, data) {
    state.askStatus = data
  },
  //新建大屏名字
  [types.SCREEN_NAME](state, data) {
    state.screenName = data;
  },
  //弹窗信息对象
  [types.POP_OBJ](state, data) {
    state.popObj = data;
  },
  [types.PUBLISH_SCREEN_URL](state, data) {
    var index = getIndex(state.groupTempletes, 'mo_id', data.mo_id)
    state.groupTempletes[index].pub_url = data.pub_url
  },
  [types.GET_LEFT_EDIT_MAIN_DATA](state, data) {
    let len = data.length
    state.leftEditMainData = []
    for (let i = 0; i < len; i++) {
      try {
        data[i].attr_descr = JSON.parse(data[i].attr_descr)
        data[i].static_data = JSON.parse(data[i].static_data)
        data[i].openflag = JSON.parse(data[i].openflag)
        let attr3 = data[i].data_descr
        let attr4 = JSON.parse(attr3)
        if (attr4.datas.type == 'static') {
          attr4.datas.data = JSON.parse(attr4.datas.data)
        }
        attr4.datas.data_value = JSON.parse(attr4.datas.data_value)
        attr4.mapped = JSON.parse(attr4.mapped)
        data[i].data_descr = attr4
        data[i].linkarr = JSON.parse(data[i].linkarr)
        for (let n = 0; n < data[i].linkarr.length; n++) {
          data[i].linkarr[n].param = JSON.parse(data[i].linkarr[n].param)
        }
        if (data[i].attr_descr.type == 'isMap' && data[i].attrArr) {
          //地图下子组件数据处理
          data[i].attrArr = JSON.parse(data[i].attrArr);
          for (let j = 0; j < data[i].attrArr.length; j++) {
            data[i].attrArr[j].parent_id = data[i].attr_id;
            data[i].attrArr[j].attr_descr = JSON.parse(data[i].attrArr[j].attr_descr)
            data[i].attrArr[j].static_data = JSON.parse(data[i].attrArr[j].static_data)
            let dataDescr = JSON.parse(data[i].attrArr[j].data_descr)
            if (dataDescr.datas.type && dataDescr.datas.type == 'static') {
              dataDescr.datas.data = JSON.parse(dataDescr.datas.data)
            }
            dataDescr.datas.data_value = JSON.parse(dataDescr.datas.data_value)
            dataDescr.mapped = JSON.parse(dataDescr.mapped)
            data[i].attrArr[j].data_descr = dataDescr
            data[i].attrArr[j].linkarr = JSON.parse(data[i].attrArr[j].linkarr)
            for (let m = 0; m < data[i].attrArr[j].linkarr.length; m++) {
              data[i].attrArr[j].linkarr[m].param = JSON.parse(data[i].attrArr[j].linkarr[m].param)
            }
          }
        }
      } catch (err) {
        TipBoxService.open('fail', data[i].tipBoxContent + '渲染失败');
      }

    }
    state.leftEditMainData = data
    state.leftChartLists = data
    state.chartListCopy = data
  },
  [types.GET_TEMPLATE_BG_PROPERTY](state, data) {
    state.templateProperty1 = data
    state.templateProperty = data
  },
  //创建大屏左边组件数据(添加，删除，改变顺序)
  [types.ADD_LEFT_EDIT_MAIN_DATA](state, data) {
    let item = data
    item.data_descr = JSON.parse(item.data_descr)
    item.data_descr.datas.data = JSON.parse(item.data_descr.datas.data)
    item.data_descr.datas.data_value = JSON.parse(item.data_descr.datas.data_value)
    item.data_descr.mapped = JSON.parse(item.data_descr.mapped)
    item.attr_descr = JSON.parse(item.attr_descr)
    item.linkarr = JSON.parse(item.linkarr)
    for (let n = 0; n < item.linkarr.length; n++) {
      item.linkarr[n].param = JSON.parse(item.linkarr[n].param)
    }
    if (item.attr_descr.type == 'isMap') {
      //地图组件，数据进行单独处理
      item.attrArr = JSON.parse(item.attrArr);
      for (let i = 0; i < item.attrArr.length; i++) {
        item.attrArr[i].parent_id = item.attr_id;
        item.attrArr[i].attr_descr = JSON.parse(item.attrArr[i].attr_descr)
        item.attrArr[i].data_descr = JSON.parse(item.attrArr[i].data_descr)
        item.attrArr[i].data_descr.datas.data = JSON.parse(item.attrArr[i].data_descr.datas.data)
        item.attrArr[i].data_descr.datas.data_value = JSON.parse(item.attrArr[i].data_descr.datas.data_value)
        item.attrArr[i].data_descr.mapped = JSON.parse(item.attrArr[i].data_descr.mapped)
        item.attrArr[i].static_data = JSON.parse(item.attrArr[i].static_data)
        item.attrArr[i].linkarr = JSON.parse(item.attrArr[i].linkarr)
        for (let m = 0; m < item.attrArr[i].linkarr.length; m++) {
          item.attrArr[i].linkarr[m].param = JSON.parse(item.attrArr[i].linkarr[m].param)
        }
      }
    } else {
      let width = state.templateProperty.propertyData[0].fieldData[0].value * 0.5 - 200
      let height = state.templateProperty.propertyData[0].fieldData[1].value * 0.5 - 200
      item.attr_descr.properties[0].properties[1].fieldData[0].value = width
      item.attr_descr.properties[0].properties[1].fieldData[1].value = height
    }
    //item.sort=state.leftEditMainData.length+1
    // state.leftEditMainData.unshift(item);
    state.leftEditMainData.push(item)
    let arrs = [].concat(state.leftEditMainData)
    state.leftChartLists = [].concat(arrs)
    state.chartListCopy = [].concat(arrs)
    state.addChartState = true
  },
  //添加新的子组件数据到attrArr
  [types.ADDMAPCOMPONENT](state, data) {
    let item = data;
    item.data_descr = JSON.parse(item.data_descr);
    item.data_descr.datas.data = JSON.parse(item.data_descr.datas.data);
    item.data_descr.datas.data_value = JSON.parse(item.data_descr.datas.data_value);
    item.data_descr.mapped = JSON.parse(item.data_descr.mapped);
    item.static_data = JSON.parse(item.static_data);
    item.attr_descr = JSON.parse(item.attr_descr);
    let mapComponents = state.leftEditMainData.filter(data => data.attr_id === item.parent_id)[0].attrArr.push(item);
    state.leftEditMainData.filter(data => data.attr_id === item.parent_id).attrArr = mapComponents;
  },
  //删除attrArr中的子组件数据
  [types.DELMAPCOMPONENT](state, data) {
    state.leftEditMainData.filter(mainData => mainData.attr_id === data.parentId)[0].attrArr.splice(data.index, 1);
  },
  [types.UPDATEMAPCOMPONENT]() {

  },
  //////////////////////////////////////
  [types.DEL_LEFT_EDIT_MAIN_DATA](state, data) {
    let x = data.sort - 1
    let arr = [].concat(state.leftEditMainData)
    arr.splice(x, 1)
    let y = arr.length
    for (let i = x; i < y; i++) { // 删除的排序减一
      arr[i].sort--
    }
    state.leftEditMainData = [].concat(arr)

    let interval = state.interval;
    let attr_id = data.attr_id
    for (let h = 0; h < interval.length; h++) {
      if (interval[h].indexOf(attr_id) > 0) {
        clearInterval(interval[h].replace(attr_id, ''));
        interval.splice(h, 1);
      }
    }
  },
  [types.SELECT_LEFT_EDIT_MAIN_DATA](state, data) {
    state.leftEditMainData = data;
    state.leftChartLists = data
    state.chartListCopy = data
  },
  [types.MODIFY_LOCATION_LEFT_EDIT_MAIN_DATA](state, data) {
    var delIndex = data.startIndex - 1;
    var addIndex = data.endIndex - 1;
    var item = state.leftEditMainData[delIndex];
    var arr = [].concat(state.leftEditMainData);
    arr.splice(delIndex, 1);
    arr.splice(addIndex, 0, item);
    let x = '',
      y = ''
    if (delIndex < addIndex) {
      x = delIndex
      y = addIndex
    } else {
      x = addIndex
      y = delIndex
    }
    for (let i = x; i <= y; i++) { // 删除的排序减一
      arr[i].sort = i + 1
    }
    state.leftEditMainData = [].concat(arr);
    state.leftChartLists = [].concat(arr)
    state.chartListCopy = [].concat(arr)
  },
  [types.CHANGE_LOCATION_LEFT_EDIT_MAIN_DATA](state, data) {
    var i = data.index - 1; //被移元素
    var j = '';
    var type = data.type;
    var arr = state.leftEditMainData[i];
    var arr2 = [].concat(state.leftEditMainData);
    if (type == 'up') {
      j = i - 1;
      arr2[i] = arr2[j];
      arr2[j] = arr;
      arr2[i].sort = i + 1
      arr2[j].sort = j + 1
    } else if (type == 'down') {
      j = i + 1;
      arr2[i] = arr2[j];
      arr2[j] = arr;
      arr2[i].sort = i + 1
      arr2[j].sort = j + 1
    } else if (type == 'first') {
      arr2.splice(i, 1);
      arr2.push(arr);
      let y = arr2.length
      for (let x = i; x < y; x++) { //
        arr2[x].sort = x + 1
      }
    } else if (type == 'last') {
      arr2.splice(i, 1);
      arr2.unshift(arr);
      let y = arr2.length
      for (let x = 0; x < y; x++) { // 删除的排序减一
        arr2[x].sort = x + 1
      }
    }
    state.leftEditMainData = [].concat(arr2);
    state.leftChartLists = [].concat(arr2)
    state.chartListCopy = [].concat(arr2)
  },

  [types.THUMBAIL_ITEM_DATA](state, data) {
    state.thumbailItemData = data;
  },
  //首页面
  //获取分组列表
  [types.GET_ALL_GROUP](state, data) {
    state.groupList = data;
  },
  //添加分组
  [types.ADD_GROUP](state, data) {
    state.groupList.push(data);
    state.groupTempletes.data = []; //为新添加的分组，添加空模板数组
  },
  //删除分组
  [types.DELETE_GROUP](state, data) {
    var index = getIndex(state.groupList, 'group_id', data.group_id)
    state.groupList.splice(index, 1);
  },
  //编辑分组
  [types.EDIT_GROUP](state, data) {
    var index = getIndex(state.groupList, 'group_id', data.group_id)
    state.groupList[index] = data;
  },
  //首页组件操作
  //获取所有组件信息
  [types.GET_ALL_COMPENT](state, data) {
    state.compentList = data;
  },
  //获取所有组件下可选择模板信息
  [types.GET_ALL_COM_TEMP_LIST](state, data) {
    state.allComTempList = data;
  },
  //添加单个组件信息
  [types.ADD_COMPENT](state, data) {
    state.compentList.comnum++;
    state.compentList.data.push(data);
  },
  //编辑单个组件信息
  [types.EDIT_COMPENT](state, data) {
    let compentList = state.compentList;
    let compentListData = compentList.data;
    state.compentList.data = [];
    for (let i = 0; i < compentListData.length; i++) {
      if (compentListData[i].com_id == data.com_id) {
        compentListData[i] = data;
      }
    }
    state.compentList.data = compentListData;
  },
  //删除单个组件信息
  [types.DEL_COMPENT](state, data) {
    let compentList = state.compentList.data;
    let index;
    for (let i = 0; i < compentList.length; i++) {
      if (compentList[i].com_id == data.com_id) {
        index = i;
      }
    }
    state.compentList.comnum--;
    state.compentList.data.splice(index, 1);
  },
  //获取单个组件信息
  [types.GET_COMPENT_TEMP_LIST](state, data) {
    state.compentTempList = data;
  },

  //分组下的模板数组
  [types.GET_GROUP_TEMPLETES](state, data) {
    state.groupTempletes = data;
  },
  //修改模板
  [types.EDIT_TEMP](state, data) {
    var gid = data.group_id;
    var index = getIndex(state.groupTempletes[gid], 'mo_id', data.mo_id)
    state.groupTempletes[gid][index].mo_name = data.mo_name
  },
  //删除模板
  [types.DELETE_TEMP](state, data) {
    var gid = data.group_id;
    var index = getIndex(state.groupTempletes[gid], 'mo_id', data.mo_id)
    state.groupTempletes[gid].splice(index, 1);
    var index2 = getIndex(state.groupList, 'group_id', gid)
    state.groupList[index2].moNum -= 1
  },
  //复制模板
  [types.COPY_TEMP](state, data) {
    state.groupTempletes[data.group_id].push(data);
  },
  //创建模板
  [types.ADD_TEMP](state, data) {
    state.groupTempletes[data.group_id].push(data);
  },
  //我的数据
  //数据列表
  [types.DATA_LIST](state, data) {
    state.myDataList = data;
  },
  //添加数据
  [types.ADD_DATA](state, data) {
    var type = data.data_type;
    state.myDataList[type].push(data);
  },
  //修改数据
  [types.EDIT_DATA](state, data) {
    var did = data.data_id;
    var type = data.data_type;
    var index = getIndex(state.myDataList[type], 'data_id', did)
    state.myDataList[type][index] = data;
  },
  //删除数据
  [types.DELETE_DATA](state, data) {
    var did = data.data.data_id;
    var type = data.key;
    var index = getIndex(state.myDataList[type], 'data_id', did)
    state.myDataList[type].splice(index, 1);
  },
  //获取所有数据库列表
  [types.TEST_CONNECT](state, data) {
    state.connectInfo = data;
  },
  //获取所有数据库列表
  [types.GET_ALL_DATABASE](state, data) {
    state.allDatabases = data;
  },
  //获取指定数据源信息
  [types.GET_DATA_INFO](state, data) {
    state.dataInfo = data;
  },
  //大屏页面
  //大屏组件属性列表
  [types.GET_COMPONENTS_ATTRIBUTE](state, data) {
    state.componentsData = data;
  },
  //修改大屏组件属性
  [types.UPDATE_CONPONENT_ATTRIBUTE](state, data) {
    var i = data.index;
    var item = data.item;
    state.componentsData[i] = item;
  },
  //模板里组件列表数据添加
  [types.SAVE_COMPONENT_LIST](state, data) {
    state.componentList.push(data);
  },
  createComponent(state, data) {
    state.componentsData.push(data);
  },
  updataComponent(state, data, index) {
    state.componentsData[index] = data;
  },
  saveComponentPro(state, data) {
    state.componentsData = data;
  },
  /*******大屏母版，图形模板配置*********/
  //更新母版配置
  [types.UPDATE_MODULE_ATRRTIBUTE](state, data) {
    // state.templateProperty1.mo_attr = data.mo_attr
    // state.templateProperty.mo_attr = data.mo_attr
  },
  //删除背景图片
  [types.DELETE_MODULE_BGIMAGE](state, data) {
    state.templateProperty.propertyData[2].fieldData[0].value = ''
    state.templateProperty1.propertyData[2].fieldData[0].value = ''
  },
  //上传背景图片
  [types.UPLOAD_MODULE_BGIMAGE](state, data) {
    state.templateProperty.propertyData[2].fieldData[0].value = data
    state.templateProperty1.propertyData[2].fieldData[0].value = data
  },
  //上传封面
  [types.UPLOAD_MODULE_COVER](state, data) {
    state.templateProperty.propertyData[5].fieldData[0].value = data
    state.templateProperty1.propertyData[5].fieldData[0].value = data
    state.interImage = true
  },
  // 恢复默认背景
  [types.RESET_BACKGROUND](state, data) {
    state.templateProperty.propertyData[2].fieldData[0].value = data
    state.templateProperty1.propertyData[2].fieldData[0].value = data
  },
  //取消母版配置
  cancleModuleConfig(state) {
    state.templateProperty = state.templateProperty1
  },

  ///////图形配置////// //
  [types.UPDATE_CHART_CONFIG](state, data) {
    let allList = state.leftEditMainData
    let index = 0;
    if (data.parent_id) {
      index = getIndex(allList, 'attr_id', data.parent_id)
      state.leftEditMainData[index].attrArr[data.mapComIndex].attr_descr = data.attr_descr
    } else {
      index = getIndex(allList, 'attr_id', data.attr_id)
      state.leftEditMainData[index].attr_descr = data.attr_descr
    }
    let arrs = [].concat(state.leftEditMainData)
    state.leftChartLists = [].concat(arrs)
    state.chartListCopy = [].concat(arrs)
  },
  [types.UPDATA_CHART_DATA_CONFIG](state, data) {
    let allList = state.leftEditMainData
    if (data.response.chartName) {
      let attr_id = data.response.fatherId
      let index = getIndex(allList, 'attr_id', attr_id)
      let mapComIndex = data.response.mapComIndex;
      state.leftEditMainData[index].attrArr[mapComIndex].data_type = data.attr_data.datas.type
      state.leftEditMainData[index].attrArr[mapComIndex].data_descr.filterflag  = data.attr_data.filterflag
      state.leftEditMainData[index].attrArr[mapComIndex].data_descr.filterflag  = [].concat(data.attr_data.filterdata)
      state.leftEditMainData[index].attrArr[mapComIndex].mapped = JSON.parse(data.attr_data.mapped)
    } else {
      let attr_id = data.response.attr_id
      let index = getIndex(allList, 'attr_id', attr_id)
      let dataValue1 = state.leftEditMainData[index].data_descr.datas.data
      let dataValue2 = state.leftEditMainData[index].data_descr.datas.data_value
      let search_type = data.response.serach_type
      state.leftEditMainData[index].data_type = data.attr_data.datas.type
      state.leftEditMainData[index].mapped = data.response.mapped
      data.attr_data.mapped = data.response.mapped
      if (data.attr_data.datas.type == 'static') {
        data.attr_data.datas.data = JSON.parse(JSON.stringify(dataValue1))
      } else if (data.attr_data.datas.type == 'elasticsearch') {
        data.attr_data.datas.search_type = search_type
      }
      data.attr_data.datas.data_value = JSON.parse(JSON.stringify(dataValue2))
      data.attr_data.datas.database = data.response.database
      data.attr_data.filterflag = data.response.filterflag
    	data.attr_data.filterdata = [].concat(data.response.filterdata)
      state.leftEditMainData[index].data_descr = data.attr_data
    }

    let arrs = [].concat(state.leftEditMainData)
    state.leftChartLists = [].concat(arrs)
    state.chartListCopy = [].concat(arrs)
  },
  [types.RESPONSE_CHART_DATA_CONFIG](state, data) {
    let mapped = data.data.mapped
    let type = data.data.type
    let arr1 = [].concat(data.res)
    let arr2 = [].concat(data.res)
    var allList = state.leftEditMainData
    let attr_id = data.data.attr_id
    let index = getIndex(allList, 'attr_id', attr_id)
    //查看数据响应结果时改变全局变量
    if (data.data.type == 'static') {
      state.leftEditMainData[index].data_descr.datas.data = JSON.parse(data.data.data_descr)
    } else {
      state.leftEditMainData[index].data_descr.datas.data = data.data.data_descr
    }
    state.leftEditMainData[index].data_descr.mapped = mapped
    state.leftEditMainData[index].mapped = mapped
    state.leftEditMainData[index].data_descr.datas.data_value = arr1
    state.leftEditMainData[index].data_descr.filterflag = data.data.filterflag
    state.leftEditMainData[index].data_descr.filterdata = [].concat(data.data.filterdata)
    console.log(JSON.stringify(state.leftEditMainData[index].data_descr))
    state.mappingResponse = getMappedResponse(arr2, mapped)
  },
  [types.RESPONSE_CHART_DATA_CONFIG_MAPCOM](state, data) {
    let mapped = data.data.mapped
    let type = data.data.type
    let arr1 = [].concat(data.res)
    let arr2 = [].concat(data.res)
    var allList = state.leftEditMainData
    let attr_id = data.data.parent_id
    let index = getIndex(allList, 'attr_id', attr_id)
    let mapComIndex = data.data.mapComIndex
    //查看数据响应结果时改变全局变量
    if (data.data.type == 'static') {
      state.leftEditMainData[index].attrArr[mapComIndex].data_descr.datas.data = JSON.parse(data.data.data_descr)
      state.leftEditMainData[index].attrArr[mapComIndex].static_data = JSON.parse(data.data.data_descr)
    } else {
      state.leftEditMainData[index].attrArr[mapComIndex].data_descr.datas.data = data.data.data_descr
    }
    state.leftEditMainData[index].attrArr[mapComIndex].data_descr.mapped = mapped
    state.leftEditMainData[index].attrArr[mapComIndex].mapped = mapped
    state.leftEditMainData[index].attrArr[mapComIndex].data_descr.datas.data_value = arr1
    state.leftEditMainData[index].attrArr[mapComIndex].data_descr.filterflag = data.data.filterflag
    state.leftEditMainData[index].attrArr[mapComIndex].data_descr.filterdata = [].concat(data.data.filterdata)
    state.mappingResponse = getMappedResponse(arr2, mapped)
  },
  // 更新图形数据联动数据
  [types.UPDATE_CHART_LINK](state, data) {
    let allList = state.leftEditMainData
    let index = 0;
    if (data.parent_id) { //地图部分，可能需要调整
      index = getIndex(allList, 'attr_id', data.parent_id)
			state.leftEditMainData[index].openflag=data.popenflag
      state.leftEditMainData[index].attrArr[data.mapComIndex].openflag = data.openflag
      state.leftEditMainData[index].attrArr[data.mapComIndex].linkarr = data.linkarr
    } else {
      index = getIndex(allList, 'attr_id', data.attr_id)
      state.leftEditMainData[index].openflag = data.openflag
      state.leftEditMainData[index].linkarr = data.linkarr
    }
    let arrs = [].concat(state.leftEditMainData)
    state.leftChartLists = [].concat(arrs)
    state.chartListCopy = [].concat(arrs)
  },
  // 图形联动
  [types.CLICK_TO_LINK](state, data) {
  	let allList = [].concat(state.allPreviewData)
  	let len=data.length
		let len2=state.allPreviewData.length
		for(let i=0;i<len;i++){
			let index = getIndex(allList, 'attr_id', data[i].attr_id)
			allList[index].data=[].concat(data[i].data_value)
			
		}
		state.allPreviewData=[].concat(allList)
		console.log('mution--')
  }

};

function getIndex(list, key, value) {
  let len = list.length
  for (let i = 0; i < len; i++) {
    if (list[i][key] === value) {
      return i
    }
  }
  return null
}

//数据响应映射
function getMappedResponse(arrData2, mapped) {
  let arrData = []
  let len = arrData2.length
  let len2 = mapped.length
  for (let i = 0; i < len; i++) {
    arrData.push(JSON.parse(JSON.stringify(arrData2[i])))
    for (let j = 0; j < len2; j++) {
      if (mapped[j].value != '') {
        if (arrData[i].hasOwnProperty(mapped[j].value)) {
          arrData[i][mapped[j].name] = arrData[i][mapped[j].value]
        }
      }
    }
  }
  return arrData
}
