export default {
	"id": "commonTitle",
	"name": "通用标题",
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
					"value": 300,
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
			"name": "标题名",
			"hasEditProperty": false,
			"editable": "singel",
			"type": "input",
			"value": "",
			"properties":[]
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
					"value": "32",
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
			"name": "对齐方式",
			"hasEditProperty": false,
			"editable": "singel",
			"type": "select",
			"value": "居中对齐",
			"selectData": ["居中对齐", "左对齐", "右对齐"],
			"properties":[]
		},
		{
			"name": "超链接配置",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "超链接",
				"type": "input",
				"value": ""
			}, {
				"name": "新打开窗口",
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "新打开窗口",
					"value": false
				}]
			}]
		}
	]
}