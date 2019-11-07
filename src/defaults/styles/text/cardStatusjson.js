export default {
	"id": "cardstatus",
	"name": "状态卡片",
	"version": "V1.0.0",
	"type":"isDiv",
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
					"value": 56,
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
			"hasEditProperty": false,
			"editable": "0",
			"properties":[{
				"name": "一行排列",
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "一行排列",
					"value": true
				}]
			},{
				"name": "一行放几个",
				"type": "number",
				"minValue": 1,
				"value": 1,
				"step": 1
			}]
		},
		{
			"name": "间距",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "横向",
				"type": "range",
				"value": 20,
				"minValue": 0,
				"maxValue": 100,
				"step": 1
			},{
				"name": "竖向",
				"type": "range",
				"value": 10,
				"minValue": 0,
				"maxValue": 100,
				"step": 1
			}]
		},
		{
			"name": "文本样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
					"name": "字体",
					"type": "select",
					"value": "微软雅黑",
					"selectData": ["sans-serif", "微软雅黑", "黑体","digital"]
				},
				{
					"name": "字号",
					"type": "number",
					"value": "16",
					"minValue": "10",
					"maxValue": "200",
					"step": 1
				},
				{
					"name": "字体颜色",
					"type": "color",
					"value": "#ffffff"
				}, {
					"name": "字体粗细",
					"type": "select",
					"value": "normal",
					"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
				}
			]
		},
		{
			"name": "状态种类",
			"hasEditProperty": false,
			"editable": "series",
			"type": "series",
			"value": "状态1",
			"properties": [{
				"name": "状态1",
				"type": "tab",
				"sid":null,
				"fieldData": [{
					"name": "状态类型名",
					"type": "input",
					"value": "success"
				},{
					"name": "状态圆点颜色",
					"type": "color",
					"value": "#00FF91"
				}]
			},{
				"name": "状态2",
				"type": "tab",
				"sid":null,
				"fieldData": [{
					"name": "状态类型名",
					"type": "input",
					"value": "suspend"
				},{
					"name": "状态圆点颜色",
					"type": "color",
					"value": "#FCCF1E"
				}]
			
			},{
				"name": "状态3",
				"type": "tab",
				"sid":null,
				"fieldData": [{
					"name": "状态类型名",
					"type": "input",
					"value": "error"
				},{
					"name": "状态圆点颜色",
					"type": "color",
					"value": "#F93D6A"
				}]
			}]
		},
		{
			"name": "圆点样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "位置",
				"type": "select",
				"value": "在前",
				"selectData": ["在前", "在后"]
			}, {
				"name": "圆角大小",
				"type": "range",
				"value": 1,
				"minValue": 0,
				"maxValue": 1,
				"step": 0.1
			}]
		}
	]
}