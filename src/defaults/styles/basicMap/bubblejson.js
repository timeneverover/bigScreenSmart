{
  "id": "mapBubble",
  "name": "呼吸气泡层",
  "version": "V1.0.0",
  "type": "isMapComponents",
  "properties": [{
    "name": "动画效果",
    "editable": "singel",
    "type": "select",
    "value": "涟漪动效",
    "selectData": ["涟漪动效"],
    "properties": []
  }, {
    "name": "涟漪范围",
    "editable": "singel",
    "type": "range",
    "value": 0,
    "minValue": 0,
    "maxValue": 20,
    "step": 0.1,
    "properties": []
  }, {
    "name": "固定大小",
    "editable": "singel",
    "type": "range",
    "value": 20,
    "minValue": 0,
    "maxValue": 50,
    "step": 1,
    "properties": []
  }, {
    "name": "数据关联大小",
    "editable": "singel",
    "type": "radio",
    "fieldData": [{
      "name": "数据关联大小",
      "value": true
    }],
    "properties": []
  }, {
    "name": "动画周期(s)",
    "editable": "singel",
    "type": "range",
    "value": 5,
    "minValue": 0,
    "maxValue": 50,
    "step": 0.1,
    "properties": []
  }, {
    "name": "绘制方式",
    "editable": "singel",
    "type": "select",
    "value": "fill",
    "selectData": ["fill", "stroke"],
    "properties": []
  }, {
    "name": "气泡类型",
    "editable": "series",
    "type": "series",
    "value": "气泡类型1",
    "properties": [{
      "name": "气泡类型1",
      "type": "tab",
      "fieldData": [{
        "name": "标志形状",
        "type": "select",
        "value": "circle",
        "selectData": ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
      }, {
        "name": "类型过滤值",
        "type": "input",
        "value": "1"
      }, {
        "name": "颜色",
        "type": "color",
        "value": "#FBF320"
      }]
    }, {
      "name": "气泡类型2",
      "type": "tab",
      "fieldData": [{
        "name": "标志形状",
        "type": "select",
        "value": "circle",
        "selectData": ["circle", "rect", "roundRect", "triangle", "diamond", "pin", "arrow"]
      }, {
        "name": "类型过滤值",
        "type": "input",
        "value": "2"
      }, {
        "name": "颜色",
        "type": "color",
        "value": "#00FFA8"
      }]
    }]
  }]
}
