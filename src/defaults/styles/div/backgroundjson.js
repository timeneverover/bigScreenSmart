{
  "id": "backgrounds",
  "name": "自定义背景块",
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
          "value": 0.5,
          "minValue": 0,
          "maxValue": 1,
          "step": 0.1
        }]
      }]
    },
    {
      "name": "自定义样式",
      "hasEditProperty": false,
      "editable": "singel",
      "type": "radio",
      "value": false,
      "properties": [],
      "fieldData": [{
        "name": "自定义样式",
        "value": false
      }]
    },
    {
      "name": "背景色",
      "parentName": "undefined",
      "hasEditProperty": false,
      "editable": "singel",
      "type": "color",
      "value": "#000000",
      "properties": []
    },
    {
      "name": "圆角",
      "parentName": "undefined",
      "hasEditProperty": false,
      "editable": "0",
      "properties": [{
          "name": "左上角",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 0,
          "minValue": 0,
          "maxValue": 200,
          "step": 1
        },
        {
          "name": "左下角",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 0,
          "minValue": 0,
          "maxValue": 200,
          "step": 1
        },
        {
          "name": "右上角",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 0,
          "minValue": 0,
          "maxValue": 200,
          "step": 1
        },
        {
          "name": "右下角",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 0,
          "minValue": 0,
          "maxValue": 200,
          "step": 1
        }
      ]
    },
    {
      "name": "自定义背景框样式",
      "parentName": "defined",
      "hasEditProperty": false,
      "editable": "0",
      "properties": [{
          "name": "边框图片",
          "hasChild": false,
          "editable": "0",
          "type": "picture",
          "value": "/static/upload/chartDefaultImg/definedbackground.png"
        },
        {
          "name": "裁剪",
          "hasChild": false,
          "editable": "0",
          "type": "radio",
          "value": false,
          "fieldData": [{
            "name": "裁剪",
            "value": false
          }]
        },
        {
          "name": "图片边框",
          "hasChild": false,
          "editable": "0",
          "type": "input",
          "value": 14
        },
        {
          "name": "边框线条",
          "hasChild": false,
          "editable": "0",
          "type": "select",
          "value": "solid",
          "selectData": ["solid", "dashed", "dotted"]
        },
        {
          "name": "边框粗细",
          "hasChild": false,
          "editable": "0",
          "type": "input",
          "value": "14px"
        },
        {
          "name": "内容器背景",
          "hasChild": false,
          "editable": "0",
          "type": "color",
          "value": "#1d1634"
        },
        {
          "name": "背景色",
          "hasChild": false,
          "editable": "0",
          "type": "color",
          "value": "transparent"
        }
      ]
    },
    {
      "name": "滤镜",
      "hasEditProperty": false,
      "editable": "0",
      "properties": [{
        "name": "模糊",
        "hasChild": false,
        "editable": "0",
        "type": "input",
        "value": "2px"
      }]
    },
    {
      "name": "背景过滤器",
      "hasEditProperty": false,
      "editable": "0",
      "properties": [{
        "name": "模糊",
        "hasChild": false,
        "editable": "0",
        "type": "input",
        "value": "5px"
      }]
    }
  ]
}
