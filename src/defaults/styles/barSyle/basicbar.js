export default {
	"id": "basicBar1",
	"name": "基本柱图",
	"version": "V1.0.0",
	"type":"isChart",
	"properties": [
		{
			"name": "基础属性",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [
			{
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
		 },
		{
			"name": "全局样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [
					{
						"name": "字体",
						"type": "select",
						"value": "sans-serif",
						"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
						"selectData": ["sans-serif", "微软雅黑", "黑体"]
					},
			 		{
						"name": "柱子样式",
						"hasChild": true,
						"type": "hasChild",
						"editable": "0",
						"fieldData": [
								{
								"name": "柱子内间距",
								"type": "range",
								"value": 0.2,
								"minValue": 0,
								"maxValue": 1,
								"step": 0.1
								},
								{
								"name": "柱子外间距",
								"type": "none",
								"type1": "range",
								"value": 0.5,
								"minValue": 0,
								"maxValue": 1,
								"step": 0.1
							},
							{
									"name": "背景色",
									"type": "color",
									"value": "transparent"
								}
						]
					},
					{
						"name": "边距",
						"hasChild": true,
						"type": "hasChild",
						"editable": "0",
						"fieldData": [{
							"name": "上边距",
							"type": "number",
							"value": "60",
							"step": 1
						}, {
							"name": "下边距",
							"type": "number",
							"value": "60",
							"step": 1
						}, {
							"name": "左边距",
							"type": "number",
							"value": "20",
							"step": 1
						}, {
							"name": "右边距",
							"type": "number",
							"value": "20",
							"step": 1
						}]
					},
					{
						"name": "值标签",
						"hasChild": true,
						"type": "hasChild",
						"editable": "2",
						"fieldData": [
							{
							"name": "文本样式",
							"hasChild": true,
							"type": "hasChild",
							"editable": "0",
							"fieldData": [{
								"name": "字号",
								"type": "number",
								"value": "15",
								"step": 1
							}, {
								"name": "颜色",
								"type": "color",
								"value": "#ffffff"
							}, {
								"name": "字体粗细",
								"type": "select",
								"value": "normal",
								"selectData": ["normal", "bold"]
							}]
						},
						{
							"name": "y方向偏移",
							"type": "input",
							"value": 0
						}, {
							"name": "x方向偏移",
							"type": "input",
							"value": 0
						}]
					}
				]
		},
		{
		"name": "x轴",
		"hasEditProperty": true,
		"editable": "0",
		"properties": [{
			"name": "文本样式",
			"hasChild": true,
			"type": "hasChild",
			"editable": "0",
			"fieldData": [{
				"name": "颜色",
				"type": "color",
				"value": "#ffffff"
			}, {
				"name": "字号",
				"type": "range",
				"value": "12",
				"minValue": "10",
				"maxValue": "100",
				"step": 0.5
			}, {
				"name": "字体粗细",
				"type": "select",
				"value": "normal",
				"selectData": ["normal", "bold"]
			}]
		}, {
			"name": "指标点长度",
			"type": "range",
			"value": 5,
			"minValue": 0,
			"maxValue": 40,
			"step": 0.5
		}, {
			"name": "文字距辅线距离",
			"type": "range",
			"value": 8,
			"minValue": -40,
			"maxValue": 40,
			"step": 0.5
		}, {
			"name": "辅助线",
			"type": "radio",
			"fieldData": [{
				"name": "x轴辅助线",
				"value": true
			}]
		}]
	},
		{
		"name": "y轴",
		"hasEditProperty": true,
		"editable": "0",
		"properties": [{
			"name": "文本样式",
			"hasChild": true,
			"editable": "0",
			"type": "hasChild",
			"fieldData": [{
				"name": "颜色",
				"type": "color",
				"value": "#ffffff"
			}, {
				"name": "字号",
				"type": "range",
				"value": "12",
				"minValue": "10",
				"maxValue": "100",
				"step": 0.5
			}, {
				"name": "字体粗细",
				"type": "select",
				"value": "normal",
				"selectData": ["normal", "bold"]
			}]
		}, {
			"name": "单位(可能会遮挡最后一个数值)",
			"type": "input",
			"value": ""
		}, {
			"name": "最小值",
			"type": "select",
			"value": "自动取值",
			"selectHover": "可输入数值来自定义标签最小值",
			"selectData": ["自动取值","0" ,"数据最小值"]
		}, {
			"name": "最大值",
			"type": "select",
			"value": "数据最大值",
			"selectHover": "可输入数值来自定义标签最大值",
			"selectData": ["自动取值", "数据最大值"]
		}, {
			"name": "数量",
			"type": "number",
			"fieldData": [{
				"name": "",
				"minValue": 0,
				"value": 5,
				"step": 1
			}]
		}, {
			"name": "指标点长度",
			"type": "range",
			"value": 5,
				"minValue": 0,
				"maxValue": 40,
				"step": 0.5
		}, {
			"name": "文字距辅线距离",
			"type": "range",
			"value": 8,
			"minValue": -40,
			"maxValue": 40,
			"step": 0.5
		}, {
			"name": "辅助线",
			"type": "radio",
			"fieldData": [{
				"name": "y轴辅助线",
				"value": true
			}]
		}]
	},
		{
			"name": "数据系列",
			"hasEditProperty": true,
			"editable": "0",
			"value": "系列一",
			"properties": [{
				"hasChild": true,
				"name": "系列一",
				"editable": "0",
				"type": "hasChild",
				"fieldData": [{
					"name": "颜色填充",
					"type": "color",
					"value": "#00BAFF"
				}]
			}]
		}
 ]
}
