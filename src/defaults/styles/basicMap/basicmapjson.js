{
  "id": "map",
  "name": "基础平面地图",
  "version": "V1.0.0",
  "type": "isMap",
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
          "value": 1200,
          "minValue": 0
        }, {
          "name": "高度",
          "value": 800,
          "minValue": 0
        }]
      }, {
        "name": "图表位置",
        "hasChild": false,
        "editable": "0",
        "type": "number",
        "fieldData": [{
          "name": "横坐标",
          "value": 400
        }, {
          "name": "纵坐标",
          "value": 100
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
      "name": "子组件管理",
      "editable": "0",
      "type": "subComponents",
      "value": ["区域热力层"],
      "subProperties": [{
        "id": "chart1234567892122",
        "name": "区域热力层"
      }, {
        "id": "chart1234567892123",
        "name": "呼吸气泡层"
      }, {
        "id": "chart1234567892124",
        "name": "飞线层"
      }],
      "properties": []
    },
    {
      "name": "全局设置",
      "editable": "0",
      "properties": [{
          "name": "背景颜色",
          "hasChild": false,
          "editable": "0",
          "type": "color",
          "value": "transparent"
        }, {
          "name": "背景透明度",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 1,
          "minValue": 0,
          "maxValue": 1,
          "step": 0.1
        }, {
          "name": "背景滤镜",
          "hasChild": true,
          "editable": "2",
          "type": "hasChild",
          "fieldData": [{
            "name": "亮度",
            "type": "range",
            "value": 100,
            "minValue": 0,
            "maxValue": 200,
            "step": 1
          }, {
            "name": "饱和度",
            "type": "range",
            "value": 100,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "name": "灰度",
            "type": "range",
            "value": 0,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }]
        }, {
          "name": "地图缩放",
          "hasChild": false,
          "editable": "0",
          "type": "range",
          "value": 1,
          "minValue": 0,
          "maxValue": 20,
          "step": 0.1
        }, {
          "name": "地图中心",
          "hasChild": true,
          "editable": "0",
          "type": "hasChild",
          "fieldData": [{
            "name": "经度",
            "type": "range",
            "value": 106.5306,
            "minValue": -180,
            "maxValue": 180,
            "step": 2.1084
          }, {
            "name": "纬度",
            "type": "range",
            "value": 38.5714,
            "minValue": -90,
            "maxValue": 90,
            "step": 0.9036
          }]
        }, {
          "name": "比例尺控件",
          "hasChild": true,
          "editable": "2",
          "type": "none",
          "fieldData": [{
            "name": "字体颜色",
            "type": "color",
            "value": "#ffffff"
          }, {
            "name": "边框颜色",
            "type": "color",
            "value": "#777777"
          }]
        }, {
          "name": "开启拖拽",
          "hasChild": false,
          "editable": "0",
          "type": "radio",
          "fieldData": [{
            "name": "开启拖拽",
            "value": true
          }]
        },
        {
          "name": "开启缩放",
          "hasChild": false,
          "editable": "0",
          "type": "radio",
          "fieldData": [{
            "name": "开启缩放",
            "value": true
          }]
        }
      ]
    }
  ]
}
