export default {
	"id": "time",
	"name": "时间器",
	"version": "V1.0.0",
	"type":"isSource",
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
					"value": 50,
					"minValue": 0
				}]
			}, {
				"name": "图表位置",
				"hasChild": false,
				"editable": "0",
				"type": "number",
				"fieldData": [{
					"name": "横坐标",
					"value": 778
				}, {
					"name": "纵坐标",
					"value": 549
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
			"name": "图标样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [
				{
					"name": "大小",
					"type": "range",
					"value": 1,
					"minValue": 0,
					"maxValue": 100,
					"step": 1
				},{
					"name": "颜色",
					"type": "color",
					"value": "#5DF5F4"
				},
				{
					"name": "边距",
					"type": "range",
					"value": 5,
					"minValue": 0,
					"maxValue": 100,
					"step": 1
				}
			]
		},
		{
			"name": "时间器",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "文本样式",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
					"name": "字号",
					"type": "range",
					"value": 18,
					"minValue": 10,
					"maxValue": 100,
					"step": 0.5
				},{
					"name": "字体颜色",
					"type": "color",
					"value": "#FFFFFF"
				},{
					"name": "字体粗细",
					"type": "select",
					"value": "normal",
					"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
				},{
					"name": "字体",
					"type": "select",
					"value": "微软雅黑",
					"selectData": ["sans-serif", "微软雅黑", "黑体"]
				}]
			},{
				"name": "格式化",
				"type": "input",
				"value": "yyyy-MM-dd HH:mm:ss"
			},{
				"name": "间隔时间",
				"type": "number",
				"fieldData": [{
					"name": "",
					"minValue": 0,
					"value": 1000,
					"step": 0.5
				}]
			},{
				"name": "停住时间（ms）",
				"type": "input",
				"value": ""
			},{
				"name": "停住显示时间（ms）",
				"type": "input",
				"value": ""
			}]
		}
	]
}