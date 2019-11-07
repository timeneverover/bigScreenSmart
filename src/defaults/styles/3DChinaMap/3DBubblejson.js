{
  "id": "3DChinaBubble",
  "name": "3D中国地图气泡层",
  "version": "V1.0.0",
  "type": "isMapComponents",
  "properties": [{
    "name": "散点形状",
    "editable": "singel",
    "type": "select",
    "value": "circle",
    "selectData": ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"],
    "properties": []
  }, {
    "name": "散点大小",
    "editable": "singel",
    "type": "range",
    "value": 16,
    "minValue": 0,
    "maxValue": 50,
    "step": 1,
    "properties": []
  }, {
    "name": "填充色",
    "editable": "singel",
    "type": "color",
    "value": "#ffffa4",
    "properties": []
  }, {
    "name": "透明度",
    "editable": "singel",
    "type": "range",
    "value": 0.8,
    "minValue": 0,
    "maxValue": 1,
    "step": 0.02,
    "properties": []
  }, {
    "name": "高亮样式",
    "editable": "1",
    "properties": [{
      "name": "填充色",
      "hasChild": false,
      "editable": "0",
      "type": "color",
      "value": "#ffffa4"
    }, {
      "name": "标签颜色",
      "hasChild": false,
      "editable": "0",
      "type": "color",
      "value": "#FFFFFF"
    }, {
      "name": "字号",
      "hasChild": false,
      "editable": "0",
      "type": "number",
      "minValue": 0,
      "maxValue": 100,
      "value": 12,
      "step": 0.5
    }, {
      "name": "字体粗细",
      "hasChild": false,
      "type": "select",
      "value": "normal",
      "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
    }, {
      "name": "标签字体",
      "hasChild": false,
      "editable": "0",
      "iconName": "fa-question-circle-o",
      "type": "select",
      "value": "微软雅黑",
      "selectData": ["微软雅黑", "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial", "sans-serif"],
      "iconHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体"
    }, {
      "name": "标注字段",
      "hasChild": false,
      "editable": "0",
      "type": "select",
      "value": "name",
      "selectData": ["name", "value", "name and value"]
    }]
  }]
}
