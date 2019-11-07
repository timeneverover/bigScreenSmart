{
  "id": "moveList",
  "name": "轮播列表",
  "version": "V1.0.0",
  "type": "isList",
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
          "value": 1,
          "minValue": 0,
          "maxValue": 1,
          "step": 0.1
        }]
      }]
    },
    {
      "name": "全局",
      "editable": "0",
      "properties": [{
        "name": "表格行数",
        "hasChild": false,
        "editable": "0",
        "type": "number",
        "minValue": 1,
        "maxValue": 50,
        "value": 5,
        "step": 1
      }, {
        "name": "轮播",
        "hasChild": false,
        "editable": "0",
        "type": "radio",
        "fieldData": [{
          "name": "轮播",
          "value": true
        }]
      }, {
        "name": "字体",
        "hasChild": false,
        "editable": "0",
        "iconName": "fa-question-circle-o",
        "type": "select",
        "value": "微软雅黑",
        "selectData": ["微软雅黑", "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial", "sans-serif"],
        "iconHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体"
      }, {
        "name": "动画",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "parentName": "animation",
        "fieldData": [{
          "name": "动画模式",
          "type": "select",
          "value": "全部滚动",
          "selectData": ["全部滚动", "逐条滚动"]
        }, {
          "name": "轮播间隔(秒)",
          "type": "number",
          "minValue": 1,
          "maxValue": 1000,
          "value": 2,
          "step": 1
        }, {
          "name": "单页不轮播",
          "type": "radio",
          "fieldData": [{
            "name": "单页不轮播",
            "value": true
          }]
        }]
      }, {
        "name": "空值隐藏行",
        "hasChild": false,
        "editable": "0",
        "type": "radio",
        "fieldData": [{
          "name": "空值隐藏行",
          "value": false
        }]
      }, {
        "name": "溢出文本滚动",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "滚动",
          "type": "radio",
          "fieldData": [{
            "name": "滚动",
            "value": false
          }]
        }, {
          "name": "滚动时间(秒)",
          "type": "number",
          "minValue": 0.5,
          "maxValue": 1000,
          "value": 2,
          "step": 0.5
        }]
      }]
    }, {
      "name": "表头",
      "editable": "1",
      "properties": [{
        "name": "表头行高/百分比",
        "hasChild": false,
        "editable": "0",
        "type": "range",
        "value": 20,
        "minValue": 0,
        "maxValue": 100,
        "step": 1
      }, {
        "name": "背景颜色",
        "hasChild": false,
        "editable": "0",
        "type": "color",
        "value": "#00BAFF"
      }, {
        "name": "文本样式",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "文本对齐",
          "type": "select",
          "value": "左对齐",
          "selectData": ["左对齐", "居中对齐", "右对齐"]
        }, {
          "name": "字体",
          "type": "select",
          "value": "微软雅黑",
          "iconName": "fa-question-circle-o",
          "iconHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
          "selectData": ["微软雅黑", "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial", "sans-serif"]
        }, {
          "name": "字体颜色",
          "type": "color",
          "value": "#ffffff"
        }, {
          "name": "字号",
          "type": "range",
          "value": 12,
          "minValue": 0,
          "maxValue": 200,
          "step": 1
        }, {
          "name": "字体粗细",
          "type": "select",
          "value": "normal",
          "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        }]
      }]
    },
    {
      "name": "行配置",
      "editable": "0",
      "properties": [{
        "name": "奇行背景色",
        "hasChild": false,
        "editable": "0",
        "type": "color",
        "value": "#003B51"
      }, {
        "name": "偶行背景色",
        "hasChild": false,
        "editable": "0",
        "type": "color",
        "value": "#0A2732"
      }]
    }, {
      "name": "序号列",
      "editable": "1",
      "properties": [{
        "name": "背景颜色",
        "hasChild": false,
        "editable": "0",
        "type": "color",
        "value": "#00BAFF"
      }, {
        "name": "列宽占比/百分比",
        "hasChild": false,
        "editable": "0",
        "type": "range",
        "value": 12,
        "minValue": 0,
        "maxValue": 100,
        "step": 1
      }, {
        "name": "半径占比/百分比",
        "hasChild": false,
        "editable": "0",
        "type": "range",
        "value": 60,
        "minValue": 0,
        "maxValue": 100,
        "step": 1
      }, {
        "name": "文本样式",
        "hasChild": true,
        "editable": "0",
        "type": "hasChild",
        "fieldData": [{
          "name": "字体颜色",
          "type": "color",
          "value": "#ffffff"
        }, {
          "name": "字号",
          "type": "range",
          "value": 10,
          "minValue": 0,
          "maxValue": 50,
          "step": 1
        }, {
          "name": "字体粗细",
          "type": "select",
          "value": "normal",
          "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
        }]
      }]
    }, {
      "name": "自定义列",
      "editable": "series",
      "type": "series",
      "value": "标签1",
      "properties": [{
          "name": "标签1",
          "type": "tab",
          "fieldData": [{
            "name": "列字段名",
            "type": "input",
            "value": "area",
            "ifIcon": true,
            "iconName": "fa-question-circle-o",
            "iconData": "需要与数据中字段type匹配"
          }, {
            "name": "列显示名",
            "type": "input",
            "value": "地区",
            "ifIcon": true,
            "iconName": "fa-question-circle-o",
            "iconData": "表头显示列名称"
          }, {
            "name": "列宽占比/百分比",
            "type": "range",
            "value": 20,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "name": "内容类型",
            "type": "select",
            "value": "文本",
            "selectData": ["文本", "图片"]
          }, {
            "parentName": "图片",
            "name": "图片占比/百分比",
            "type": "range",
            "value": 20,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "parentName": "文本",
            "name": "自动换行",
            "type": "radio",
            "fieldData": [{
              "name": "自动换行",
              "value": false
            }]
          }, {
            "parentName": "文本",
            "name": "文本样式",
            "hasChild": true,
            "editable": "0",
            "type": "hasChild",
            "fieldData": [{
              "name": "文本对齐",
              "type": "select",
              "value": "左对齐",
              "selectData": ["左对齐", "居中对齐", "右对齐"]
            }, {
              "name": "字号",
              "type": "range",
              "value": 12,
              "minValue": 0,
              "maxValue": 200,
              "step": 1
            }, {
              "name": "字体颜色",
              "type": "color",
              "value": "#FFFFFF"
            }, {
              "name": "字体粗细",
              "type": "select",
              "value": "normal",
              "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
            }]
          }]
        },
        {
          "name": "标签2",
          "type": "tab",
          "fieldData": [{
            "name": "列字段名",
            "type": "input",
            "value": "pv",
            "ifIcon": true,
            "iconName": "fa-question-circle-o",
            "iconData": "需要与数据中字段type匹配"
          }, {
            "name": "列显示名",
            "type": "input",
            "value": "流量(pv)",
            "ifIcon": true,
            "iconName": "fa-question-circle-o",
            "iconData": "表头显示列名称"
          }, {
            "name": "列宽占比/百分比",
            "type": "range",
            "value": 20,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "name": "内容类型",
            "type": "select",
            "value": "文本",
            "selectData": ["文本", "图片"]
          }, {
            "parentName": "图片",
            "name": "图片占比/百分比",
            "type": "range",
            "value": 20,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "parentName": "文本",
            "name": "自动换行",
            "type": "radio",
            "fieldData": [{
              "name": "自动换行",
              "value": false
            }]
          }, {
            "parentName": "文本",
            "name": "文本样式",
            "hasChild": true,
            "editable": "0",
            "type": "hasChild",
            "fieldData": [{
              "name": "文本对齐",
              "type": "select",
              "value": "左对齐",
              "selectData": ["左对齐", "居中对齐", "右对齐"]
            }, {
              "name": "字号",
              "type": "range",
              "value": 12,
              "minValue": 0,
              "maxValue": 200,
              "step": 1
            }, {
              "name": "字体颜色",
              "type": "color",
              "value": "#FFFFFF"
            }, {
              "name": "字体粗细",
              "type": "select",
              "value": "normal",
              "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
            }]
          }]
        },
        {
          "name": "标签3",
          "type": "tab",
          "fieldData": [{
            "name": "列字段名",
            "type": "input",
            "value": "attribute",
            "ifIcon": true,
            "iconName": "fa-question-circle-o",
            "iconData": "需要与数据中字段type匹配"
          }, {
            "name": "列显示名",
            "type": "input",
            "value": "用户行为特征",
            "ifIcon": true,
            "iconName": "fa-question-circle-o",
            "iconData": "表头显示列名称"
          }, {
            "name": "列宽占比/百分比",
            "type": "range",
            "value": 53,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "name": "内容类型",
            "type": "select",
            "value": "文本",
            "selectData": ["文本", "图片"]
          }, {
            "parentName": "图片",
            "name": "图片占比/百分比",
            "type": "range",
            "value": 20,
            "minValue": 0,
            "maxValue": 100,
            "step": 1
          }, {
            "parentName": "文本",
            "name": "自动换行",
            "type": "radio",
            "fieldData": [{
              "name": "自动换行",
              "value": false
            }]
          }, {
            "parentName": "文本",
            "name": "文本样式",
            "hasChild": true,
            "editable": "0",
            "type": "hasChild",
            "fieldData": [{
              "name": "文本对齐",
              "type": "select",
              "value": "左对齐",
              "selectData": ["左对齐", "居中对齐", "右对齐"]
            }, {
              "name": "字号",
              "type": "range",
              "value": 12,
              "minValue": 0,
              "maxValue": 200,
              "step": 1
            }, {
              "name": "字体颜色",
              "type": "color",
              "value": "#FFFFFF"
            }, {
              "name": "字体粗细",
              "type": "select",
              "value": "normal",
              "selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
            }]
          }]
        }
      ]
    }
  ]
}
