export default {
	"id": "sankey",
	"name": "桑基图",
	"version": "V1.0.0",
	"type":"isChart",
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
					"value": 600,
					"minValue": 0
				}, {
					"name": "高度",
					"value": 380,
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
			"name": "布局方向",
			"hasEditProperty": false,
			"editable": "singel",
			"type": "select",
			"value": "horizontal",
			"selectData": ["horizontal","vertical"],
			"properties":[]
		},
		{
			"name": "文本标签样式",
			"hasEditProperty": false,
			"editable": "1",
			"properties": [{
					"name": "字体",
					"type": "select",
					"value": "sans-serif",
					"selectData": ["sans-serif", "微软雅黑", "黑体","digital"]
				}, {
					"name": "字号",
					"type": "number",
					"value": 12,
					"minValue": 1,
					"maxValue": 50,
					"step": 1
				}, {
					"name": "字体颜色",
					"type": "color",
					"value": "#ffffff"
				}, {
					"name": "字体粗细",
					"type": "select",
					"value": "normal",
					"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
				}, {
					"name": "标签位置",
					"type": "select",
					"value": "right",
					"selectData": ["top", "left", "right", "bottom", "inside", "insideTop", "insideBottom"]
				}, {
					"name": "标签距节点距离",
					"type": "number",
					"value": 8,
					"minValue": -100,
					"maxValue": 300,
					"step": 1
				}
			]
		},
		{
			"name": "节点矩形样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				    "name": "背景色",
				    "type": "color",
				    "value": "#00BAFF"
			    }, {
					"name": "边框颜色",
					"type": "color",
					"value": "#aaa"
				}, {
					"name": "边框粗细",
					"type": "number",
					"value":1,
					"minValue": 0,
					"maxValue": 50,
					"step": 0.5
				}, {
					"name": "描边类型",
					"type": "select",
					"value": "solid",
					"selectData": ["solid", "dashed", "dotted"]
				}
			]
		},
		{
			"name": "桑基图边样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
					"name": "图边色来源",
					"type": "select",
					"value": "source",
					"selectData": ["source", "target"]
				}, {
					"name": "曲度",
					"type": "number",
					"value": 0.5,
					"minValue": 0,
					"maxValue": 1,
					"step": 0.1
				}, {
					"name": "透明度",
					"type": "number",
					"value": 0.1,
					"minValue": 0,
					"maxValue": 1,
					"step": 0.1
				}
			]
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
	            "name": "系列名",
	            "type": "input",
	            "value": "防火墙日志分析"
	          }, {
	            "name": "填充颜色",
	            "type": "color",
	            "value": "#fc853e"
	          }]
	        },{
  	          "name": "系列2",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "163"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#28cad8"
  	          }]
  	        },{
  	          "name": "系列3",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "164"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#9564bf"
  	          }]
  	        },{
  	          "name": "系列4",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "165"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#28cad8"
  	          }]
  	        },{
  	          "name": "系列5",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "b1"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#00BAFF"
  	          }]
  	        },{
  	          "name": "系列6",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "b2"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#fc853e"
  	          }]
  	        },{
  	          "name": "系列7",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "金融市场测试1"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#9564bf"
  	          }]
  	        },{
  	          "name": "系列8",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "金融市场测试2"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#00BAFF"
  	          }]
  	        },{
  	          "name": "系列9",
  	          "type": "tab",
  	          "sid": null,
  	          "fieldData": [{
  	            "name": "系列名",
  	            "type": "input",
  	            "value": "金融市场测试3"
  	          }, {
  	            "name": "填充颜色",
  	            "type": "color",
  	            "value": "#bd407e"
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
				"value": "linear",
				"selectData": ["linear", "quadraticIn", "quadraticOut", "quadraticInOut", "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut", "quarticInOut", "quinticIn", "quinticOut", "quinticInOut", "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn", "exponentialOut", "exponentialInOut", "circularIn", "circularOut", "circularInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"]
			}, {
				"name": "更新动画时长",
				"type": "number",
				"value": 300,
				"step": 1,
				"minValue": 0
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
