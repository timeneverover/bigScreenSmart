export default {
	"id": "textlabel",
	"name": "文字标签",
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
				"value": 600,
				"minValue": 0
			}, {
				"name": "高度",
				"value": 216,
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
	}, {
		"name": "全局",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
			"name": "自动布局",
			"type": "radio",
			"fieldData": [{
				"name": "自动布局",
				"value": false
			}]
		}, {
			"name": "行数",
			"type": "number",
			"value": 4,
			"minValue": 1,
			"step": 1
		},{
			"name": "列数",
			"type": "number",
			"value": 4,
			"minValue": 1,
			"step": 1
		},{
			"name": "标签列间距",
			"type": "input",
			"value": 2
		},{
			"name": "标签行间距",
			"type": "input",
			"value": 2
		}, {
			"name": "文本样式",
			"hasChild": true,
			"type": "hasChild",
			"editable": "0",
			"fieldData": [{
				"name": "字体",
				"type": "select",
				"value": "sans-serif",
				"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
				"selectData": ["sans-serif", "微软雅黑", "黑体","digital"]
			}]
		}]
	}, {
		"name": "默认标签配置",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
				"name": "内容边距",
				"type": "input",
				"value": "13"
			},{
				"name": "圆角半径",
				"type": "input",
				"value": "3.5"
			},{
				"name": "背景颜色",
				"type": "color",
				"value": "#00BAFF"
			}, {
				"name": "文本样式",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
					"name": "字号",
					"type": "range",
					"minValue": 0,
					"maxValue": 100,
					"value": 18,
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
				}]
			}]
	},{
		"name": "自定义标签系列",
		"hasEditProperty": false,
		"editable": "series",
		"type": "series",
		"value": "标签1",
		"properties": [{
			"name": "标签1",
			"type": "tab",
			"sid":null,
			"fieldData": [{
				"name": "标签类别名",
				"type": "input",
				"value": "series1"
			},{
				"name": "背景颜色",
				"type": "color",
				"value": "#3DE7C9"
			},{
				"name": "文本样式",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
					"name": "字号",
					"type": "range",
					"minValue": 0,
					"maxValue": 100,
					"value": 18,
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
				}]
			}]
		}]
	}]
}