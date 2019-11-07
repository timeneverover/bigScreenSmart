export default {
	"id": "arcbar",
	"name": "弧形柱图",
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
					"value": 312
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
			"name": "图形属性",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
					"name": "内半径",
					"type": "none",
					"type1": "range",
					"value": 0.4,
					"minValue": 0,
					"maxValue": 1,
					"step": 0.1
				},
				{
					"name": "外半径",
					"type": "range",
					"value": 0.9,
					"minValue": 0,
					"maxValue": 1,
					"step": 0.1
				},
				{
					"name": "柱子数量",
					"type": "number",
					"value": "5",
					"step": 0.5
				},
				{
					"name": "柱间距离",
					"type": "number",
					"value": "3",
					"step": 0.5
				},{
					"name": "最大弧度",
					"type": "range",
					"value": 270,
					"minValue": 0,
					"maxValue": 360,
					"step": 1
				},{
					"name": "图文距离",
					"type": "number",
					"value": "15",
					"step": 0.5
				}
			]
		},
		{
			"name": "扇形配置",
			"hasEditProperty": true,
			"editable": "0",
			"properties": [{
							"name": "起点色值",
							"type": "color",
							"value": "#00BAFF"
						},{
							"name": "末端色值",
							"type": "color",
							"value": "#3DE7C9"
						}]
		},
		{
			"name": "文本样式",
			"hasEditProperty": true,
			"editable": "0",
			"properties": [{
						"name": "字体",
						"type": "select",
						"value": "sans-serif",
						"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
						"selectData": ["sans-serif", "微软雅黑",  "宋体", "黑体", "隶书", "幼圆", "tahoma", "arial"]
					},{
							"name": "字号",
							"type": "number",
							"value": "15",
							"minValue": "10",
							"maxValue": "100",
							"step": 0.5
						},
						{
							"name": "字体颜色",
							"type": "color",
							"value": "#ffffff"
						},
						{
							"name": "字体粗细",
							"type": "select",
							"value": "normal",
							"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
						}]
		},
		{
			"name": "动画",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
				"name": "初始动画时长",
				"type": "number",
				"value": 1000,
				"step": 1
			}, {
				"name": "缓动效果",
				"type": "select",
				"value": "linear",
				"selectData": ["linear", "quadraticIn", "quadraticOut", "quadraticInOut", "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut", "quarticInOut", "quinticIn", "quinticOut", "quinticInOut", "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn", "exponentialOut", "exponentialInOut", "circularIn", "circularOut", "circularInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"]
			}, {
				"name": "各系列依次动画",
				"hasChild": false,
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "各系列依次动画",
					"value": true
				}]
			},{
				"name": "更新动画时长",
				"type": "number",
				"value": 300,
				"step": 1
			}, {
				"name": "从之前位置开始",
				"hasChild": false,
				"editable": "0",
				"type": "none",
				"type1": "radio",
				"fieldData": [{
					"name": "从之前位置开始",
					"value": true
				}]
			}]
		}
	]
}