export default {
	"id": "wordcloud",
	"name": "词云",
	"version": "V1.0.0",
	"type": "iswordcloud",
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
					"value": 648,
					"minValue": 0
				}, {
					"name": "高度",
					"value": 384,
					"minValue": 0
				}]
			}, {
				"name": "图表位置",
				"hasChild": false,
				"editable": "0",
				"type": "number",
				"fieldData": [{
					"name": "横坐标",
					"value": 760
				}, {
					"name": "纵坐标",
					"value": 340
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
			"name": "全局样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
				"name": "字体",
				"type": "select",
				"value": "sans-serif",
				"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
				"selectData": ["sans-serif", "微软雅黑", "黑体"]
			}, {
				"name": "最大字号",
				"type": "range",
				"value": 35,
				"minValue": 12,
				"maxValue": 100,
				"step": 1
			}, {
				"name": "最小字号",
				"type": "range",
				"value": 14,
				"minValue": 12,
				"maxValue": 100,
				"step": 1
			},{
				"name": "形状",
				"type": "select",
				"value": "矩形",
				"selectData": ["圆形", "矩形", "三角形","菱形", "心形","叶子","水滴"]
			}]
		},
		{
			"name": "数据系列",
			"hasEditProperty": false,
			"editable": "series",
			"type": "series",
			"value": "系列一",
			"properties": [{
				"name": "系列1",
				"type": "tab",
				"sid": null,
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#00BAFF"
				}]
			}, {
				"name": "系列2",
				"type": "tab",
				"sid": null,
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#3DE7C9"
				}]
			}, {
				"name": "系列3",
				"type": "tab",
				"sid": null,
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#FFFFFF"
				}]
			}, {
				"name": "系列4",
				"type": "tab",
				"sid": null,
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#94E08A"
				}]
			}]
		}
	]
}