import * as types from './mutation-types'
import Urls from '../publicService/urls.js'
import TipBoxService from '../publicService/TipBoxService.js'
import httpService from '../publicService/HttpService.js';

export default {
  //改变控制弹窗显示隐藏变量的方法
  savePopShow({
    commit
  }, data) {
    commit(types.POP_SHOW, data)
  },
  //存储新建大屏名字
  saveScreenName({
    commit
  }, data) {
    commit(types.SCREEN_NAME, data)
  },
  //保存弹窗数据
  savePopObj({
    commit
  }, data) {
    commit(types.POP_OBJ, data)
  },

  delLeftEditMain({
    commit
  }, data) {
    httpService.postLink(Urls.delAttrToMo, data)
      .then(function(res) {
        commit(types.DEL_LEFT_EDIT_MAIN_DATA, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
        TipBoxService.open('fail', error);
      });
  },
  selectLeftEditMain({
    commit
  }, data) {
    commit(types.SELECT_LEFT_EDIT_MAIN_DATA, data)
  },
  //发布大屏
  pushlishScreen({
    commit
  }, data) {
    httpService.postLink(Urls.publichScreen, data)
      .then(function(res) {
        commit(types.PUBLISH_SCREEN_URL, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
        TipBoxService.open('fail', error);
      });
  },
  // 获取左边图形菜单列表
  getLeftEditMain({
    commit
  }, data) {
    httpService.postLink(Urls.getTempAttrs, data)
      .then(function(res) {
        commit(types.GET_LEFT_EDIT_MAIN_DATA, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //地图添加子组件
  addMapComponent({
    commit
  }, data) {
    httpService.postLink(Urls.insertMapLayer, data)
      .then(function(res) {
        commit(types.ADDMAPCOMPONENT, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  delMapComponent({
    commit
  }, data) {
    httpService.postLink(Urls.delMapLayer, data)
      .then(function(res) {
        commit(types.DELMAPCOMPONENT, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },


  // 获取模板（背景画布）属性
  getTemplateBgProperty({
    commit
  }, data) {
    httpService.postLink(Urls.getTempComponents, data)
      .then(function(res) {
        let s3 = res.mo_attr
        let s2 = JSON.parse(s3)
        s2.propertyData[2].fieldData[0].value = res.pic_url
        s2.propertyData[5].fieldData[0].value = res.screen_url
        commit(types.GET_TEMPLATE_BG_PROPERTY, s2);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  // 获取图形的默认属性（点击头部菜单，添加图形）
  addLeftEditMain({
    commit
  }, data) {
    httpService.postLink(Urls.getAttrDefault, data)
      .then(function(res) {
        commit(types.ADD_LEFT_EDIT_MAIN_DATA, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //更改创建大屏左边组件顺序(拖拽，上下移动，置顶置底)
  modifyLocationLeftEditMain({
    commit
  }, data) {
    httpService.postLink(Urls.updateAttrSort_All, data)
      .then(function(res) {
        commit(types.MODIFY_LOCATION_LEFT_EDIT_MAIN_DATA, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //交换创建大屏左边组件顺序
  changeLocationLeftEditMain({
    commit
  }, data) {
    httpService.postLink(Urls.updateAttrSort, data)
      .then(function(res) {
        commit(types.CHANGE_LOCATION_LEFT_EDIT_MAIN_DATA, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //存储缩略图数据
  saveThumbailItemData({
    commit
  }, data) {
    commit(types.THUMBAIL_ITEM_DATA, data)
  },
  //分组操作
  //获取所有分组信息
  getGroupList({
    commit
  }, data) {
    httpService.getLink(Urls.getGroupsUrl)
      .then(function(res) {
        commit(types.GET_ALL_GROUP, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //添加新的分组
  addNewGroup({
    commit
  }, data) {
    httpService.postLink(Urls.addGroupUrl, data)
      .then(function(res) {
        let item = {
          group_id: '',
          group_name: '',
          group_sort: 0,
          moNum: 0,
          group_desc: ''
        }
        item.group_id = res.group_id
        item.group_name = data.group_name
        item.group_descr = data.group_descr
        commit(types.ADD_GROUP, item)
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //修改分组
  editGroup({
    commit
  }, data) {
    httpService.postLink(Urls.editGroupUrl, data)
      .then(function(res) {
        commit(types.EDIT_GROUP, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //删除分组
  deleteGroup({
    commit
  }, data) {
    httpService.postLink(Urls.deleteGroupUrl, data)
      .then(function(res) {
        commit(types.DELETE_GROUP, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //首页组件操作
  //获取所有组件信息
  getAllCompent({
    commit
  }, data) {
    httpService.getLink(Urls.getAllCompent)
      .then(function(res) {
        commit(types.GET_ALL_COMPENT, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //获取所有组件下可选择模板信息
  getAllComTempList({
    commit
  }, data) {
    httpService.getLink(Urls.getAllCompentTemps)
      .then(function(res) {
        commit(types.GET_ALL_COM_TEMP_LIST, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //添加单个组件信息
  addCompent({
    commit
  }, data) {
    httpService.postLink(Urls.addCompent, data)
      .then(function(res) {
        commit(types.ADD_COMPENT, res)
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //修改单个组件信息
  editCompent({
    commit
  }, data) {
    httpService.postLink(Urls.editCompent, data)
      .then(function(res) {
        commit(types.EDIT_COMPENT, data)
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //删除单个组件信息
  delCompent({
    commit
  }, data) {
    httpService.postLink(Urls.delCompent, data)
      .then(function(res) {
        commit(types.DEL_COMPENT, data)
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //获取单个组件的信息
  getcompentTempList({
    commit
  }, data) {
    httpService.postLink(Urls.getCompent, data)
      .then(function(res) {
        commit(types.GET_COMPENT_TEMP_LIST, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },


  //获取所有模板数组
  getGroupTemletes({
    commit
  }, data) {
    httpService.getLink(Urls.getAllTempsUrl)
      .then(function(res) {
        commit(types.GET_GROUP_TEMPLETES, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //修改模板
  editGroupTemlete({
    commit
  }, data) {
    httpService.postLink(Urls.editTempUrl, data)
      .then(function(res) {
        commit(types.EDIT_TEMP, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //删除模板
  deleteGroupTemlete({
    commit
  }, data) {
    httpService.postLink(Urls.deleteTempUrl, data)
      .then(function(res) {
        commit(types.DELETE_TEMP, data);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //复制模板
  copyGroupTemlete({
    commit
  }, data) {
    httpService.postLink(Urls.copyTempUrl, data)
      .then(function(res) {
        res.base_pic_url = null;
        res.pub_url = null;
        commit(types.COPY_TEMP, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //创建模板
  createGroupTemlete({
    commit
  }, data) {
    httpService.postLink(Urls.editDataUrl, data).then(function(res) {
      commit(types.ADD_TEMP, res.data);
    })
  },
  //////我的数据///////////
  //获取数据列表
  getDataList({
    commit
  }, data) {
    httpService.getLink(Urls.getDatasUrl)
      .then(function(res) {
        commit(types.DATA_LIST, res);
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },
  //修改数据
  editData({
    commit
  }, data) {
    httpService.postLink(Urls.editDataUrl, data).then(function(res) {
      commit(types.EDIT_DATA, data.data);
    })
  },
  //删除模板
  deleteData({
    commit
  }, data) {
    httpService.postLink(Urls.deleteDataUrl, data).then(function(res) {
      commit(types.DELETE_DATA, data)
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })
  },
  //添加新的数据
  addNewData({
    commit
  }, data) {
    if (data.key == 'excel') {
      let param = data.param
      httpService.uploadFile(Urls.addCsvUrl, param).then(function(res) {
        let addData = {}
        addData.data_type = 'excel'
        addData.data_name = param.get('data_name')
        addData.create_Time = res.currenttime
        addData.data_id = res.data_id
        addData.port = ''
        addData.url = ''
        addData.createTime = 0
        commit(types.ADD_DATA, addData);
      }).catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      })
    } else {
      httpService.postLink(Urls.addDataUrl, data).then(function(res) {
        let addData = data.data
        addData.create_Time = res.currenttime
        addData.data_id = res.data_id
        commit(types.ADD_DATA, addData);
      }).catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      })
    }
  },
  //添加csv文件数据
  addCsvData({
    commit
  }, data) {
    httpService.uploadFile(Urls.addCsvUrl, data).then(function(res) {
      let addData = data.data
      addData.create_Time = res.currenttime
      addData.data_id = res.data_id
      commit(types.ADD_DATA, addData);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })
  },

  //获取所有数据库列表
  getAllDatabases({
    commit
  }, data) {
    httpService.postLink(Urls.getAllDatabases, data).then(function(res) {
      commit(types.GET_ALL_DATABASE, res);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })
  },
  //测试数据源连接
  testDataConnect({
    commit
  }, data) {
    let testUrl = '';
    if (data.type == 'elasticsearch') {
      testUrl = Urls.testEsConnect;
    } else {
      testUrl = Urls.testDataConnect;
    }
    httpService.postLink(testUrl, data).then(function(res) {
      commit(types.TEST_CONNECT, res);
    }).catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
    })
  },
  //http 测试连接接口
  testHttpConnect({
    commit
  }, data) {
    httpService.postLink(Urls.testHttpConnect, data).then(function(res) {
      commit(types.TEST_CONNECT, res);
    }).catch(function(error) {
      console.log(error);
        // TipBoxService.open('fail', error);
    })
  },
  //http 连接接口
  HttpConnect({
    commit
  }, data) { //data提交的
    httpService.postLink(Urls.HttpConnect, data).then(function(res) {
      let addData = data.data
      addData.create_Time = res.currenttime
      addData.data_id = res.data_id
      commit(types.TEST_CONNECT, addData);
    }).catch(function(error) {
      console.log(error);
        // TipBoxService.open('fail', error);
    })
  },
  //webSocket测试连接
  testWsConnect({
    commit
  }, data) {
    httpService.postLink(Urls.testWsConnect, data).then(function(res) {
      commit(types.TEST_CONNECT, res);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })
  },


  //获取指定数据源信息
  getDatainfos({
    commit
  }, data) {
    httpService.getLink(Urls.getDatainfos)
      .then(function(res) {
        if (res.code == 0) { //成功
          commit(types.GET_DATA_INFO, res.data);
          TipBoxService.open('success', res.message);
        } else if (res.code == 1) { //失败
          TipBoxService.open('fail', res.message);
        }
      })
      .catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
      });
  },

  //大屏页面
  //大屏属性更改
  updateComponentAttribute({
    commit
  }, data) {
    httpService.postLink(Urls.updateModuleAttrDescr, data).then(function(res) {
      commit(types.UPDATE_CONPONENT_ATTRIBUTE, data);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })

  },
  //模板里组件列表数据添加
  saveComponentList({
    commit
  }, data) {
    commit(types.SAVE_COMPONENT_LIST, data);
  },

  //大屏模板、图形 配置
  //大屏配置更改
  updatModuleAttribute({
    commit
  }, data) {
    httpService.postLink(Urls.updateModuleAttrDescr, data).then(function(res) {
      commit(types.UPDATE_MODULE_ATRRTIBUTE, data, 'save');
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })

  },
  deleteModuleBgImage({ //删除背景图片
    commit
  }, data) {
    httpService.postLink(Urls.backgroundImgRemove, data).then(function(res) {
      commit(types.DELETE_MODULE_BGIMAGE, data);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })

  },
  uploadModuleBgImage({ //上传背景图片
    commit
  }, data) {
    httpService.uploadFile(Urls.addBgImage, data).then(function(res) {
      commit(types.UPLOAD_MODULE_BGIMAGE, res);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })

  },
  uploadModuleCover({ // 上传封面
    commit
  }, data) {
    httpService.uploadFile(Urls.printScreenImg, data).then(function(res) {
      commit(types.UPLOAD_MODULE_COVER, res);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })
  },
  resetModuleBackground({ // 恢复默认背景
    commit
  }, data) {
    httpService.postLink(Urls.resetDefaultBackGroundImg, data).then(function(res) {
      commit(types.RESET_BACKGROUND, res);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })

  },
  updateChartConfig({ // 保存样式json
    commit
  }, data) {
    httpService.postLink(Urls.updateChartConfig, data).then(function(res) {
      commit(types.UPDATE_CHART_CONFIG, data);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })

  },
  //图形数据配置
  //保存操作
  saveChartData({ // 恢复默认背景
    commit
  }, data) {
    httpService.postLink(Urls.saveChartData, data).then(function(res) {
      let item = {}
      item.attr_data = JSON.parse(res)
      item.response = data
      commit(types.UPDATA_CHART_DATA_CONFIG, item);
    }).catch(function(error) {
      console.log(error);
        TipBoxService.open('fail', error);
    })
  },
  dataRespondResult({ // 恢复默认背景
    commit
  }, data) {
    httpService.postLink(Urls.dataRespondResult, data).then(function(res) {
      let item = {}
      item.res = res
      item.data = data
      if (data.parent_id) {
        commit(types.RESPONSE_CHART_DATA_CONFIG_MAPCOM, item);
      } else {
        commit(types.RESPONSE_CHART_DATA_CONFIG, item);
      }
    }).catch(function(error) {
        console.log(error);
        TipBoxService.open('fail', error);
        TipBoxService.open('fail', error);
    })
  },
  //更新图形数据联动数据
  updateChartLink({
    commit
  }, data) {
    httpService.postLink(Urls.insertAction, data).then(function(res) {
    	 if (data.parent_id){
    	 		data.popenflag=JSON.parse(res.openflag)
    	 }
         commit(types.UPDATE_CHART_LINK, data);
    })
  },
  // 预览中图形点击联动
  clickToLink({
  	commit
  },data){
  	 httpService.postLink(Urls.chartClickAction, data).then(function(res) {
       commit(types.CLICK_TO_LINK, JSON.parse(res));
    })
  }

}
