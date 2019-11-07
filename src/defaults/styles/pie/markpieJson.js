{
  "id": "markpie",
  "name": "标注对比饼图",
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
        },
        {
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
        },
        {
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
        }
      ]
    },
    {
      "name": "字体",
      "hasEditProperty": false,
      "editable": "singel",
      "iconName": "fa-question-circle-o",
      "type": "select",
      "value": "sans-serif",
      "selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
      "selectData": ["微软雅黑", "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial", "sans-serif"],
      "properties": []
    },
    {
      "name": "装饰色",
      "hasEditProperty": false,
      "editable": "singel",
      "type": "color",
      "value": "#ffffff",
      "properties": []
    },
    {
      "name": "数值",
      "hasEditProperty": true,
      "editable": "0",
      "properties": [{
          "name": "字号",
          "type": "number",
          "fieldData": [{
            "name": "",
            "minValue": 10,
            "maxValue": 100,
            "value": 12,
            "step": 0.5
          }]
        },
        {
          "name": "颜色",
          "type": "color",
          "value": "#ffffff"
        },
        {
          "name": "字体粗细",
          "type": "select",
          "value": "normal",
          "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        },
        {
          "name": "小数点位数",
          "type": "number",
          "fieldData": [{
            "name": "",
            "minValue": 0,
            "maxValue": 10,
            "value": 1,
            "step": 1
          }]
        },
        {
          "name": "真实数值",
          "hasChild": false,
          "editable": "0",
          "type": "radio",
          "fieldData": [{
            "name": "真实数值",
            "value": false
          }]
        }
      ]
    },
    {
      "name": "角度轴",
      "hasEditProperty": true,
      "editable": "0",
      "properties": [{
        "name": "角度偏移(度)",
        "hasChild": false,
        "editable": "0",
        "type": "input",
        "value": 0
      }, {
        "name": "外半径",
        "type": "range",
        "value": 0.8,
        "minValue": 0,
        "maxValue": 1,
        "step": 0.01
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
        },
        {
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
              "value": -55,
              "step": 0.5
            }]
          }, {
            "name": "位置",
            "type": "select",
            "value": "顶部居中",
            "selectData": ["顶部居中", "顶部居左", "顶部居右", "底部居中", "底部局左", "底部居右"]
          }]
        }
      ]
    },
    {
      "name": "数据系列",
      "hasEditProperty": false,
      "editable": "series",
      "type": "series",
      "value": "系列一",
      "properties": [{
          "name": "系列1",
          "type": "tab",
          "fieldData": [{
            "name": "颜色",
            "type": "multiColor",
            "value": "颜色填充",
            "selectData": ["颜色填充", "渐变填充"],
            "fieldData": [{
              "type": "color",
              "value": "#00BAFF"
            }, {
              "type": "multiColor",
              "fieldData": [{
                "type": "color",
                "value": "#00BAFF"
              }, {
                "type": "color",
                "value": "#FFF"
              }, {
                "type": "range",
                "value": 90,
                "minValue": 0,
                "maxValue": 360,
                "step": 2
              }]
            }]
          }]
        },
        {
          "name": "系列2",
          "type": "tab",
          "fieldData": [{
            "name": "颜色",
            "type": "multiColor",
            "value": "颜色填充",
            "selectData": ["颜色填充", "渐变填充"],
            "fieldData": [{
              "type": "color",
              "value": "#3DE7C9"
            }, {
              "type": "multiColor",
              "fieldData": [{
                "type": "color",
                "value": "#00BAFF"
              }, {
                "type": "color",
                "value": "#FFF"
              }, {
                "value": 90,
                "minValue": 0,
                "maxValue": 360,
                "step": 2
              }]
            }]
          }]
        }
      ]
    },
    {
      "name": "动画",
      "hasEditProperty": true,
      "editable": "1",
      "properties": [{
        "name": "初始动画时长",
        "type": "number",
        "value": 1000,
        "step": 1
      }, {
        "name": "缓动效果",
        "type": "select",
        "value": "linear",
        "selectData": ["linear", "quadraticIn", "quadraticOut", "quadraticInOut", "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut", "quarticInOut", "quinticIn", "quinticOut", "quinticInOut", "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn", "exponentialOut", "exponentialInOut", "circularIn", "circularOut", "circularInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"]
      }, {
        "name": "更新动画时长",
        "type": "number",
        "value": 300,
        "step": 1
      }, {
        "name": "从之前位置开始",
        "hasChild": false,
        "editable": "0",
        "type": "radio",
        "fieldData": [{
          "name": "从之前位置开始",
          "value": true
        }]
      }]
    }
  ]
}
