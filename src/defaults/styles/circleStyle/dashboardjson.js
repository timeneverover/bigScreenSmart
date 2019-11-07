export default{
	"id": "waterpolo",
	"name": "水球图",
	"version": "V1.0.0",
	"type": "isDashboard",
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
		}, {
			"name": "字体",
			"hasEditProperty": false,
			"editable": "singel",
			"iconName": "fa-question-circle-o",
			"type": "select",
			"value": "sans-serif",
			"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
			"selectData": ["sans-serif", "微软雅黑", "黑体","digital"],
			"properties": []
		}, {
			"name": "表盘",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
					"name": "详情",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "字号",
						"type": "number",
						"minValue": 10,
						"maxValue": 100,
						"value": 25,
						"step": 0.5
					}, {
						"name": "颜色",
						"type": "color",
						"value": "#20d6df"
					}, {
						"name": "字体粗细",
						"type": "select",
						"value": "bold",
						"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
					}, {
						"name": "单位",
						"type": "input",
						"value": "%"
					}]
				}, {
					"name": "基本属性",
					"hasChild": true,
					"type": "hasChild",
					"editable": "0",
					"fieldData": [{
						"name": "半径",
						"type": "range",
						"value": 0.75,
						"minValue": 0,
						"maxValue": 1,
						"step": 0.01
					}, {
						"name": "起始角度",
						"type": "range",
						"value": 215,
						"minValue": -360,
						"maxValue": 360,
						"step": 1
					}, {
						"name": "结束角度",
						"type": "range",
						"value": -35,
						"minValue": -360,
						"maxValue": 360,
						"step": 1
					},{
						"name": "最小值",
						"type": "number",
						"value": 0,
						"step": 1
					}, {
						"name": "最大值",
						"type": "number",
						"value": 100,
						"step": 1
					},{
						"name": "方向",
						"type": "select",
						"value": "顺时针",
						"selectData": ["顺时针", "逆时针"]
					}, {
						"name": "分隔段数",
						"type": "number",
						"minValue": 1,
						"maxValue": 100,
						"value": 10,
						"step": 1
					}]
				},
				{
					"name": "轴线",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "颜色",
						"type": "multiColor",
						"value": "渐变填充",
						"selectData": ["颜色填充", "渐变填充"],
						"fieldData": [{
							"type": "color",
							"value": "#008ebd"
						}, {
							"type": "multiColor",
							"fieldData": [{
								"type": "color",
								"value": "#2dffff"
							}, {
								"type": "color",
								"value": "#008ebd"
							}, {
								"type": "range",
								"value": 90,
								"minValue": 0,
								"maxValue": 360,
								"step": 2
							}]
						}]
					}, {
						"name": "宽度",
						"type": "number",
						"value": 30,
						"step": 1
					}]
				},
				{
					"name": "分隔线",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "长度",
						"type": "number",
						"value": 30,
						"step": 1
					}, {
						"name": "宽度",
						"type": "number",
						"value": 2,
						"step": 1
					}, {
						"name": "颜色",
						"type": "color",
						"value": "#0E2A42 "
					}]
				},
				{
					"name": "刻度",
					"hasChild": true,
					"type": "hasChild",
					"editable": "2",
					"fieldData": [{
						"name": "数量",
						"type": "number",
						"value": 5,
						"step": 1
					}, {
						"name": "长度",
						"type": "number",
						"value": 8,
						"step": 1
					}, {
						"name": "颜色",
						"type": "color",
						"value": "#eee "
					}]
				},
				{
					"name": "刻度标签",
					"hasChild": true,
					"type": "hasChild",
					"editable": "2",
					"fieldData": [{
						"name": "文本",
						"hasChild": true,
						"type": "hasChild",
						"editable": "0",
						"fieldData": [{
							"name": "字号",
							"type": "number",
							"minValue": 10,
							"maxValue": 100,
							"value": 15,
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
						"name": "距离",
						"type": "number",
						"value": -55,
						"step": 1
					}]
				}
			]
		},
		{
			"name": "指针",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
				"name": "长度",
				"type": "range",
				"value": 0.7,
				"minValue": 0,
				"maxValue": 1,
				"step": 0.01
			}, {
				"name": "宽度",
				"type": "number",
				"value": 5,
				"step": 1
			}, {
				"name": "颜色",
				"type": "color",
				"value": "#ffffff"
			}]
		},
		{
			"name": "动画",
			"hasEditProperty": true,
			"editable": "2",
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