const data={
	"id": "singlepictureimg",
	"name": "单张图片",
	"version": "V1.0.0",
	 "type":"isImage",
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
					"value": 150,
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
			"name": "背景图",
			"hasEditProperty": false,
			"editable": "singel",
			"type": "picture",
			"value":  "/static/upload/chartDefaultImg/singlepictureimg.png",
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
