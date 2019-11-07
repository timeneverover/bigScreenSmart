{
  "id": "basicRadar",
  "name": "基本雷达图",
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
          "value": 760
        }, {
          "name": "纵坐标",
          "value": 340
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
      "name": "全局样式",
      "hasEditProperty": false,
      "editable": "0",
      "properties": [{
        "name": "字体",
        "type": "select",
        "value": "sans-serif",
        "selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
        "selectData": ["sans-serif", "微软雅黑", "黑体"]
      }, {
        "name": "值标签",
        "hasChild": true,
        "type": "hasChild",
        "editable": "1",
        "fieldData": [{
          "name": "文本",
          "hasChild": true,
          "type": "hasChild",
          "editable": "0",
          "fieldData": [{
            "name": "字号",
            "type": "number",
            "minValue": "10",
            "maxValue": "100",
            "value": "10",
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
        }]
      }]
    }, {
      "name": "角度轴",
      "hasEditProperty": true,
      "editable": "0",
      "properties": [{
        "name": "文本",
        "hasChild": true,
        "type": "hasChild",
        "editable": "0",
        "fieldData": [{
          "name": "字号",
          "type": "number",
          "minValue": "10",
          "maxValue": "100",
          "value": "12",
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
        "name": "旋转角度",
        "type": "range",
        "value": "90",
        "minValue": "0",
        "maxValue": "360",
        "step": 0.5
      }]
    }, {
      "name": "极轴",
      "hasEditProperty": true,
      "editable": "1",
      "properties": [{
        "name": "轴线",
        "hasEditProperty": true,
        "editable": "1",
        "hasChild": true,
        "type": "hasChild",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#ffffff"
        }, {
          "name": "类型",
          "type": "select",
          "value": "solid",
          "selectData": ["solid", "dashed", "dotted"]
        }]
      }, {
        "name": "网格线",
        "hasEditProperty": true,
        "editable": "1",
        "hasChild": true,
        "type": "hasChild",
        "fieldData": [{
          "name": "颜色",
          "type": "color",
          "value": "#ffffff"
        }, {
          "name": "类型",
          "type": "select",
          "value": "dashed",
          "selectData": ["solid", "dashed", "dotted"]
        }]
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
          "minValue": "10",
          "maxValue": "100",
          "value": "10",
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
            "value": 5,
            "step": 0.5
          }]
        }, {
          "name": "位置",
          "type": "select",
          "value": "底部居中",
          "selectData": ["顶部居中", "顶部居左", "顶部居右", "底部居中", "底部居左", "底部居右"]
        }]
      }]
    },
    {
      "name": "数据系列",
      "hasEditProperty": false,
      "editable": "series",
      "type": "series",
      "value": "系列1",
      "properties": [{
          "name": "系列1",
          "type": "tab",
          "sid": null,
          "fieldData": [{
            "name": "系列值",
            "type": "input",
            "value": "1"
          }, {
            "name": "系列名",
            "type": "input",
            "value": "我是图例一"
          }, {
            "name": "描边颜色",
            "type": "color",
            "value": "#00BAFF"
          }, {
            "name": "描边粗细",
            "type": "range",
            "value": 2,
            "minValue": 0,
            "maxValue": 10,
            "step": 0.5
          }, {
            "name": "填充颜色",
            "type": "color",
            "value": "#00BAFF"
          }]
        },
        {
          "name": "系列2",
          "type": "tab",
          "sid": null,
          "fieldData": [{
            "name": "系列值",
            "type": "input",
            "value": "2"
          }, {
            "name": "系列名",
            "type": "input",
            "value": "我是图例二"
          }, {
            "name": "描边颜色",
            "type": "color",
            "value": "#3DE7C9"
          }, {
            "name": "描边粗细",
            "type": "range",
            "value": 2,
            "minValue": 0,
            "maxValue": 10,
            "step": 0.5
          }, {
            "name": "填充颜色",
            "type": "color",
            "value": "#3DE7C9"
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
        "step": 1,
        "minValue": 0
      }, {
        "name": "缓动效果",
        "type": "select",
        "value": "cubicInOut",
        "selectData": ["linear", "quadraticIn", "quadraticOut", "quadraticInOut", "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut", "quarticInOut", "quinticIn", "quinticOut", "quinticInOut", "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn", "exponentialOut", "exponentialInOut", "circularIn", "circularOut", "circularInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"]
      }, {
        "name": "更新动画时长",
        "type": "number",
        "value": 300,
        "step": 1,
        "minValue": 0
      }]
    }
  ]
}
