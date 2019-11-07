{
  "id": "onlyPercentPie",
  "name": "单值百分比饼图",
  "version": "V1.0.0",
  "type": "isChart",
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
        "value": 300,
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
        "value": 390
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
    "name": "饼图属性",
    "editable": "0",
    "properties": [{
        "name": "内半径",
        "type": "range",
        "value": 0.6,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01
      }, {
        "name": "外半径",
        "type": "range",
        "value": 0.8,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01
      },
      {
        "name": "饼图填充底色",
        "type": "color",
        "value": "#333333"
      }
    ]
  }, {
    "name": "扇形配置",
    "editable": "0",
    "properties": [{
      "name": "起点色值",
      "type": "color",
      "value": "#2B80CF"
    }, {
      "name": "末端色值",
      "type": "color",
      "value": "#00FFCC"
    }, {
      "name": "动画持续时间",
      "type": "number",
      "value": 1000,
      "minValue": 0,
      "maxValue": 10000,
      "step": 0.5
    }]
  }, {
    "name": "中间百分比部分",
    "editable": "0",
    "properties": [{
      "name": "文本样式",
      "hasChild": true,
      "type": "hasChild",
      "editable": "0",
      "fieldData": [{
        "name": "字号",
        "type": "number",
        "minValue": 10,
        "maxValue": 100,
        "value": 30,
        "step": 0.5
      }, {
        "name": "颜色",
        "type": "color",
        "value": "#ffffff"
      }, {
        "name": "字体粗细",
        "type": "select",
        "value": "normal",
        "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
      }, {
        "name": "字体",
        "hasEditProperty": false,
        "editable": "singel",
        "iconName": "fa-question-circle-o",
        "type": "select",
        "value": "sans-serif",
        "selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
        "selectData": ["微软雅黑", "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial", "sans-serif"],
        "properties": []
      }]
    }, {
      "name": "百分比符号",
      "type": "input",
      "value": "%"
    }, {
      "name": "百分比字号",
      "type": "number",
      "minValue": 0,
      "maxValue": 100,
      "value": 20,
      "step": 0.5
    }, {
      "name": "百分比位置",
      "type": "select",
      "value": "后置",
      "selectData": ["前置", "后置"]
    }, {
      "name": "百分比偏移值",
      "type": "number",
      "minValue": 0,
      "maxValue": 500,
      "value": 0,
      "step": 0.5
    }]
  }]
}
