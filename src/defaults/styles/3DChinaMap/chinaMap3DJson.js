{
  "id": "3Dmap",
  "name": "3D平面中国地图",
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
      "value": ["柱状图层"],
      "subProperties": [{
        "id": "chart1234567892128",
        "name": "柱状图层"
      }, {
        "id": "chart1234567892129",
        "name": "飞线层"
      }, {
        "id": "chart1234567892130",
        "name": "气泡层"
      }],
      "properties": []
    },
    {
      "name": "全局设置",
      "editable": "0",
      "properties": [{
        "name": "自动旋转",
        "hasChild": true,
        "editable": "1",
        "type": "hasChild",
        "fieldData": [{
          "name": "旋转方向",
          "type": "select",
          "value": "顺时针",
          "selectData": ["顺时针", "逆时针"]
        }, {
          "name": "水平视角",
          "type": "range",
          "value": 30,
          "minValue": 0,
          "maxValue": 90,
          "step": 1
        }, {
          "name": "垂直起始角度",
          "type": "range",
          "value": 0,
          "minValue": -80,
          "maxValue": 80,
          "step": 1
        }]
      }]
    }, {
      "name": "填充设置",
      "editable": "0",
      "properties": [{
        "name": "填充颜色",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "最小值",
          "type": "color",
          "value": "#28B4E1"
        }, {
          "name": "最大值",
          "type": "color",
          "value": "#206199"
        }, {
          "name": "无数据",
          "type": "color",
          "value": "transparent"
        }, {
          "name": "透明度",
          "type": "range",
          "value": 0.8,
          "minValue": 0,
          "maxValue": 1,
          "step": 0.02
        }]
      }, {
        "name": "边线选项",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#FFFFFF"
        }, {
          "name": "宽度",
          "type": "number",
          "value": 0.3,
          "minValue": 0,
          "maxValue": 4,
          "step": 0.1
        }]
      }]
    }, {
      "name": "visualMap配置",
      "editable": "1",
      "properties": [{
        "name": "距左侧百分比",
        "hasChild": false,
        "editable": "0",
        "type": "range",
        "value": 0,
        "minValue": 0,
        "maxValue": 1000,
        "step": 1
      }, {
        "name": "距底部百分比",
        "hasChild": false,
        "editable": "0",
        "type": "range",
        "value": 0,
        "minValue": 0,
        "maxValue": 1000,
        "step": 1
      }]
    }
  ]
}
