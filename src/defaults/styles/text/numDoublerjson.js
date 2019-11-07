export default {
	"id": "numdoubler",
	"name": "数字翻牌器",
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
		"name": "标题",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
			"name": "标题名",
			"type": "input",
			"value": "Typesomething"
		}, {
			"name": "位置",
			"type": "select",
			"value": "在上",
			"selectData": ["在上", "在下"]
		}, {
			"name": "间距",
			"type": "range",
			"value": 0,
			"minValue": -100,
			"maxValue": 500,
			"step": 1
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
			}, {
				"name": "字号",
				"type": "number",
				"minValue": "10",
				"maxValue": "100",
				"value": 32,
				"step": 0.5
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
	}, {
		"name": "翻牌器",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
			"name": "水平对齐",
			"type": "select",
			"value": "左对齐",
			"selectData": ["左对齐", "右对齐", "居中对齐"]
		}, {
			"name": "前缀",
			"hasChild": true,
			"type": "hasChild",
			"editable": "0",
			"fieldData": [{
				"name": "内容",
				"type": "input",
				"value": "￥"
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
				}, {
					"name": "字号",
					"type": "number",
					"minValue": "10",
					"maxValue": "100",
					"value": 48,
					"step": 0.5
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
		}, {
			"name": "数字",
			"hasChild": true,
			"type": "hasChild",
			"editable": "0",
			"fieldData": [{
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
				}, {
					"name": "字号",
					"type": "number",
					"minValue": "10",
					"maxValue": "100",
					"value": 48,
					"step": 0.5
				}, {
					"name": "颜色",
					"type": "color",
					"value": "#00C0FF"
				}, {
					"name": "字体粗细",
					"type": "select",
					"value": "bolder",
					"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
				}]
			}, {
				"name": "数字间隔",
				"type": "range",
				"minValue": "0",
				"maxValue": "10",
				"value": 0,
				"step": 0.1
			}, {
				"name": "背景色",
				"type": "color",
				"value": "transparent"
			}, {
				"name": "背景圆角",
				"type": "range",
				"minValue": "0",
				"maxValue": "100",
				"value": 6,
				"step": 0.5
			}, {
				"name": "分隔符背景",
				"type": "radio",
				"fieldData": [{
					"name": "分隔符背景",
					"value": false
				}]
			}, {
				"name": "默认位数",
				"type": "range",
				"minValue": "0",
				"maxValue": "100",
				"value": 0,
				"step": 1
			}, {
				"name": "数据四舍五入",
				"type": "radio",
				"fieldData": [{
					"name": "数据四舍五入",
					"value": true
				}]
			}, {
				"name": "小数点位数",
				"type": "range",
				"minValue": "0",
				"maxValue": "10",
				"value": 0,
				"step": 1
			}, {
				"name": "千分位分隔符",
				"type": "radio",
				"fieldData": [{
					"name": "千分位分隔符",
					"value": true
				}]
			}, {
				"name": "千分位分隔符符号",
				"type": "input",
				"value": ","
			}, {
				"name": "小数分隔符符号",
				"type": "input",
				"value": "."
			}, {
				"name": "定宽",
				"type": "number",
				"value": 0,
				"step": 0.5
			}, {
				"name": "始终动画",
				"type": "radio",
				"fieldData": [{
					"name": "始终动画",
					"value": false
				}]
			}, {
				"name": "动画时长(ms)",
				"type": "number",
				"value": 1000,
				"step": 500
			}]
		}, {
			"name": "后缀",
			"hasChild": true,
			"type": "hasChild",
			"editable": "0",
			"fieldData": [{
				"name": "内容",
				"type": "input",
				"value": "元"
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
				}, {
					"name": "字号",
					"type": "number",
					"minValue": "10",
					"maxValue": "100",
					"value": 30,
					"step": 0.5
				}, {
					"name": "颜色",
					"type": "color",
					"value": "#ffffff"
				}, {
					"name": "字体粗细",
					"type": "select",
					"value": "bolder",
					"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
				}]
			}]
		}]
	}]
}