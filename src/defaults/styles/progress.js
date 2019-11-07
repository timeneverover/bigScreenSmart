export default {
	"id": "progress",
	"name": "进度条",
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
					"value": 100,
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
			"name": "全局样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
					"name": "字体",
					"type": "select",
					"value": "微软雅黑",
					"selectData": ["sans-serif", "微软雅黑", "黑体"]
				},
				{
					"name": "两边间距",
					"type": "range",
					"value": 0,
					"minValue": 0,
					"maxValue": 100,
					"step": 1
				},
				{
					"name": "提示框底部间距",
					"type": "range",
					"value": 13,
					"minValue": -50,
					"maxValue": 50,
					"step": 1
				}
			]
		},
		{
			"name": "提示框",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "字号",
				"type": "range",
				"value": 18,
				"minValue": 10,
				"maxValue": 100,
				"step": 1
			}, {
				"name": "颜色",
				"type": "color",
				"value": "#ffffff"
			}, {
				"name": "字体粗细",
				"type": "select",
				"value": "normal",
				"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
			}, {
				"name": "显示真实值",
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "显示真实值",
					"value": false
				}]
			}, {
				"parentName": "isTrue",
				"name": "值单位",
				"hasChild": false,
				"editable": "0",
				"type": "input",
				"value": ""
			}, {
				"name": "边框隐藏",
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "边框隐藏",
					"value": true
				}]
			}, {
				"parentName": "notTrue",
				"name": "小数点",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
					"name": "需要小数点",
					"editable": "0",
					"type": "radio",
					"fieldData": [{
						"name": "需要小数点",
						"value": false
					}]
				}, {
					"parentName": "hasPoint",
					"name": "保留小数点",
					"type": "range",
					"value": 1,
					"minValue": 1,
					"maxValue": 4,
					"step": 1
				}]
			}]
		},
		{
			"name": "百分比条",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "渐变范围",
				"type": "select",
				"value": "局部渐变",
				"selectData": ["全局渐变", "局部渐变"]
			}, {
				"name": "开始颜色",
				"type": "color",
				"value": "#00BAFF"
			}, {
				"name": "结束颜色",
				"type": "color",
				"value": "#3DE7C9"
			}, {
				"name": "密度",
				"type": "none",
				"type1": "range",
				"value": 32,
				"minValue": 1,
				"maxValue": 50,
				"step": 0.5
			}, {
				"name": "边框隐藏",
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "hideBarBorder",
					"value": false
				}]
			}]
		},
		{
			"name": "总值",
			"hasEditProperty": false,
			"editable": "singel",
			"type": "number",
			"minValue": 0,
			"value": 100,
			"step": 0.5,
			"properties": []
		}
	]
}