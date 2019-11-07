export default {
	"id": "horseLamp",
	"name": "跑马灯",
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
					"value": 48,
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
			"name": "文本样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
					"name": "字体颜色",
					"type": "color",
					"value": "#FFFFFF"
				}, {
					"name": "字体",
					"type": "select",
					"value": "微软雅黑",
					"selectData": ["sans-serif", "微软雅黑", "黑体"]
				},
				{
					"name": "字号",
					"type": "range",
					"value": 32,
					"minValue": 0,
					"maxValue": 100,
					"step": 1
				},
				{
					"name": "字体粗细",
					"type": "select",
					"value": "normal",
					"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
				}
			]
		},
		{
			"name": "轮播",
			"hasEditProperty": false,
			"editable": "singel2",
			"type": "radio",
			"fieldData": [{
				"name": "wheel",
				"value": true
			}],
			"properties":[]
		},{
			"name": "定速播放",
			"hasEditProperty": false,
			"editable": "singel2",
			"type": "radio",
			"fieldData": [{
				"name": "定速播放",
				"value": false
			}],
			"properties":[]
		},
		{
			"parentName": "isFixed",
			"name": "动画间隔",
			"hasEditProperty": false,
			"editable": "singel2",
			"type": "number",
			"fieldData": [{
				"name": "",
				"minValue": 0,
				"value": 2000,
				"step": 1
			}],
			"properties":[]
		},
		{
			"parentName": "notFixed",
			"name": "动画时间",
			"hasEditProperty": false,
			"editable": "singel2",
			"type": "number",
			"fieldData": [{
				"name": "",
				"minValue": 0,
				"value": 8000,
				"step": 1
			}],
			"properties":[]
		},
		{
			"name": "前期停留",
			"hasEditProperty": false,
			"editable": "singel2",
			"type": "number",
			"fieldData": [{
				"name": "",
				"minValue": 0,
				"value": 1000,
				"step": 1
			}],
			"properties":[]
		}
	]
}