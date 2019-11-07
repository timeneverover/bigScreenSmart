{
  "id": "carouselPie",
  "name": "轮播饼图",
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
          "value": 400,
          "minValue": 0
        }, {
          "name": "高度",
          "value": 350,
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
      "name": "饼图属性",
      "hasEditProperty": true,
      "editable": "0",
      "properties": [{
        "name": "外半径",
        "type": "range",
        "value": 0.8,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01
      }, {
        "name": "内半径",
        "type": "range",
        "value": 0.6,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01
      }, {
        "name": "动画时长",
        "type": "number",
        "value": 2000,
        "step": 1
      }, {
        "name": "轮播间隔",
        "type": "number",
        "value": 3000,
        "step": 1
      }]
    },
    {
      "name": "中间百分比部分",
      "hasEditProperty": true,
      "editable": "0",
      "properties": [{
        "name": "文本样式",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "字体",
          "type": "select",
          "value": "微软雅黑",
          "selectData": ["微软雅黑", "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial", "sans-serif"]
        }, {
          "name": "颜色",
          "type": "color",
          "value": "#ffffff"
        }, {
          "name": "字体粗细",
          "type": "select",
          "value": "normal",
          "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        }]
      }, {
        "name": "显示真实值",
        "type": "radio",
        "fieldData": [{
          "name": "显示真实值",
          "value": false
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
      }, {
        "name": "数字字号",
        "type": "number",
        "minValue": 0,
        "maxValue": 100,
        "value": 20,
        "step": 0.5
      }, {
        "name": "描述字号",
        "type": "number",
        "minValue": 0,
        "maxValue": 100,
        "value": 20,
        "step": 0.5
      }]
    },
    {
      "name": "图例",
      "hasEditProperty": true,
      "editable": "1",
      "properties": [{
        "name": "文本",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "字号",
          "type": "number",
          "minValue": 10,
          "maxValue": 100,
          "value": 10,
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
        }]
      }, {
        "name": "布局",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "间距",
          "hasChild": true,
          "editable": "0",
          "type": "hasChild",
          "fieldData": [{
            "name": "左右间距",
            "type": "number",
            "value": 8,
            "step": 0.5
          }, {
            "name": "上下间距",
            "type": "number",
            "value": 8,
            "step": 0.5
          }]
        }, {
          "name": "位置",
          "type": "select",
          "value": "底部居中",
          "selectData": ["顶部居中", "顶部居左", "顶部居右", "底部居中", "底部局左", "底部居右"]
        }]
      }]
    }, {
      "name": "自定义类别",
      "hasEditProperty": false,
      "editable": "series",
      "type": "series",
      "value": "系列一",
      "properties": [{
        "name": "系列1",
        "type": "tab",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#00BAFF"
        }]
      }, {
        "name": "系列2",
        "type": "tab",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#3DE7C9"
        }]
      }, {
        "name": "系列3",
        "type": "tab",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#FFFFFF"
        }]
      }, {
        "name": "系列4",
        "type": "tab",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#00BAFF"
        }]
      }, {
        "name": "系列5",
        "type": "tab",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#3DE7C9"
        }]
      }]
    }
  ]
}
