{
  "id": "video",
  "name": "视频",
  "version": "V1.0.0",
  "type": "isDiv",
  "properties": [{
    "name": "基础属性",
    "hasEditProperty": false,
    "editable": "0",
    "properties": [{
      "name": "图表尺寸",
      "type": "number",
      "hasChild": false,
      "editable": "0",
      "fieldData": [{
        "name": "宽度",
        "value": 300,
        "minValue": 0
      }, {
        "name": "高度",
        "value": 200,
        "minValue": 0
      }]
    }, {
      "name": "图表位置",
      "hasChild": false,
      "editable": "0",
      "type": "number",
      "fieldData": [{
        "name": "横坐标",
        "value": 810
      }, {
        "name": "纵坐标",
        "value": 440
      }]
    }, {
      "name": "其他",
      "hasChild": false,
      "editable": "0",
      "type": "number",
      "fieldData": [{
        "name": "旋转角度",
        "minValue": 0,
        "value": 0,
        "step": 1
      }, {
        "name": "透明度",
        "value": 1,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.1
      }]
    }]
  }, {
    "name": "视频地址",
    "editable": "singel",
    "iconName": "fa-question-circle-o",
    "type": "input",
    "value": "http://www.w3school.com.cn/i/movie.ogg",
    "selectHover": "推荐mp4格式视频地址，支持以数据的形式传入，详见数据面板",
    "properties": []
  }, {
    "name": "自动播放",
    "editable": "singel",
    "type": "radio",
    "fieldData": [{
      "name": "自动播放",
      "value": true
    }],
    "properties": []
  }, {
    "name": "循环播放",
    "editable": "singel",
    "type": "radio",
    "fieldData": [{
      "name": "循环播放",
      "value": false
    }],
    "properties": []
  }, {
    "name": "控制条",
    "editable": "singel",
    "type": "radio",
    "fieldData": [{
      "name": "控制条",
      "value": true
    }],
    "properties": []
  }, {
    "name": "空视频文案",
    "editable": "singel",
    "type": "input",
    "value": "请输入视频播放地址，推荐mp4",
    "properties": []
  }, {
    "name": "音量(%)",
    "editable": "singel",
    "iconName": "fa-question-circle-o",
    "type": "range",
    "value": 50,
    "minValue": 0,
    "maxValue": 100,
    "step": 1,
    "properties": []
  }]
}
