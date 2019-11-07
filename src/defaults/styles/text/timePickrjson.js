{
	"id": "timepickr",
	"name": "时间选择器",
	"version": "V1.0.0",
	"type": "isDiv",
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
					"value": 450,
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
					"value": 810
				}, {
					"name": "纵坐标",
					"value": 540
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
			"properties": [{
				"name": "文本样式",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
						"name": "字体",
						"type": "select",
						"value": "微软雅黑",
						"selectData": ["sans-serif", "微软雅黑", "黑体", "digital"]
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
			}, {
				"name": "边框",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#4271B0"
				}, {
					"name": "粗细",
					"type": "number",
					"value": "1",
					"minValue": "0",
					"maxValue": "8",
					"step": 1
				}]
			}, {
				"name": "背景颜色",
				"type": "color",
				"value": "#0c3e57"
			}, {
				"name": "时间器分隔符",
				"type": "input",
				"value": "-"
			}, {
				"name": "是否可输入",
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "是否可输入",
					"value": false
				}]
			}]
		}, {
			"name": "时间器",
			"hasEditProperty": false,
			"editable": "1",
			"properties": [{
				"name": "显示格式",
				"type": "select",
				"value": "Y-m-d H:i",
				"selectData": ["Y-m-d H:i:S", "Y-m-d H:i", "Y-m-d H", "Y-m-d"]
			},{
				"name": "最小日期",
				"type": "input",
				"value": ""
			}, {
				"name": "最大日期",
				"type": "input",
				"value": ""
			}]
		}
	]
}