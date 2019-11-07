{
  "id": "decorates",
  "name": "装饰",
  "version": "V1.0.0",
  "type": "isSource",
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
    },
    {
      "name": "全局",
      "hasEditProperty": false,
      "editable": "0",
      "properties": [{
          "name": "装饰元素",
          "hasChild": false,
          "editable": "0",
          "type": "select",
          "value": "gif1",
          "selectData": ["gif1", "gif2", "gif3", "gif4", "gif5", "gif6", "gif7", "gif8", "gif9", "gif10","png1", "png2", "png3", "png4", "png5", "png6", "png7"],
          "backgroundPosition": ["left bottom", "center center", "right top", "right bottom", "left top", "center center", "left top", "left top", "left top", "left top"]
        },
        {
          "name": "透明度",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 1,
          "minValue": 0,
          "maxValue": 1,
          "step": 0.1
        }
      ]
    }
  ]
}
