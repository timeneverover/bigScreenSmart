export default {
	"id": "waterpolo",
	"name": "基础水球图",
	"version": "V1.0.0",
	"type": "isDashboard",
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
					"value": 400,
					"minValue": 0
				}, {
					"name": "高度",
					"value": 350,
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
					"value": 390
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
			"name": "字体",
			"hasEditProperty": false,
			"editable": "singel",
			"iconName": "fa-question-circle-o",
			"type": "select",
			"value": "sans-serif",
			"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
			"selectData": ["sans-serif", "微软雅黑", "黑体", "digital"],
			"properties": []
		}, {
			"name": "水球",
			"hasEditProperty": true,
			"editable": "0",
			"properties": [{
				"name": "背景色",
				"type": "color",
				"value": "#ffd5aa"
			}, {
				"name": "半径",
				"type": "range",
				"value": 0.85,
				"minValue": 0,
				"maxValue": 1,
				"step": 0.01
			}, {
				"name": "波长",
				"type": "range",
				"value": 0.7,
				"minValue": 0,
				"maxValue": 1,
				"step": 0.01
			}, {
				"name": "波高",
				"type": "range",
				"value": 0.08,
				"minValue": 0,
				"maxValue": 1,
				"step": 0.01
			},{
				"name": "形状",
				"type": "select",
				"value": "圆形",
				"selectData": ["圆形", "矩形", "圆矩形", "三角形","菱形", "气球", "箭头"]
			}, {
				"name": "波纹方向",
				"type": "select",
				"value": "向右",
				"selectData": ["向右", "向左"]
			}, {
				"name": "外框",
				"hasChild": true,
				"type": "hasChild",
				"editable": "1",
				"fieldData": [{
					"name": "宽度",
					"type": "number",
					"minValue": 0,
					"value": 1,
					"step": 1
				}, {
					"name": "距离",
					"type": "number",
					"value": 0,
					"step": 1
				}, {
					"name": "颜色",
					"type": "color",
					"value": "#95ffaf"
				}]
			}]
		}, {
			"name": "标签",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
				"name": "字号",
				"type": "number",
				"minValue": 10,
				"maxValue": 100,
				"value": 50,
				"step": 0.5
			}, {
				"name": "波纹内颜色",
				"type": "color",
				"value": "#FFFFFF"
			}, {
				"name": "波纹外颜色",
				"type": "color",
				"value": "#00BAFF"
			}, {
				"name": "字体粗细",
				"type": "select",
				"value": "bold",
				"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
			}]
		}, {
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
					"name": "系列名",
					"type": "input",
					"value": "系列一"
				}, {
					"name": "颜色",
					"type": "color",
					"value": "#00BAFF"
				}]
			}]
		},
		{
			"name": "动画",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
				"name": "初始动画时长",
				"type": "number",
				"value": 2000,
				"step": 1
			}, {
				"name": "缓动效果",
				"type": "select",
				"value": "linear",
				"selectData": ["linear", "quadraticIn", "quadraticOut", "quadraticInOut", "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut", "quarticInOut", "quinticIn", "quinticOut", "quinticInOut", "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn", "exponentialOut", "exponentialInOut", "circularIn", "circularOut", "circularInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"]
			}, {
				"name": "更新动画时长",
				"type": "number",
				"value": 1000,
				"step": 1
			}]
		}
	]
}