export default {
	"id": "levelbasicbar",
	"name": "水平基本柱图",
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
			"name": "全局样式",
			"hasEditProperty": false,
			"editable": "0",
			"properties": [{
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
					"fieldData": [{
							"name": "柱子内间距",
							"type": "range",
							"value": 0.5,
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
						"value": "50",
						"step": 1
					}, {
						"name": "下边距",
						"type": "number",
						"value": "50",
						"step": 1
					}, {
						"name": "左边距",
						"type": "number",
						"value": "50",
						"step": 1
					}, {
						"name": "右边距",
						"type": "number",
						"value": "50",
						"step": 1
					}]
				},
				{
					"name": "值标签",
					"hasChild": true,
					"type": "hasChild",
					"editable": "2",
					"fieldData": [{
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
							"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
							}]
					}, {
						"name": "位置",
						"type": "select",
						"value": "中间",
						"selectData": ["左侧", "中间", "右侧","右侧外部"]
					}]
				}
			]
		},
		{
			"name": "x轴",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
					"name": "文本",
					"hasChild": true,
					"type": "hasChild",
					"editable": "0",
					"fieldData": [{
							"name": "字号",
							"type": "number",
							"value": "15",
							"minValue": "10",
							"maxValue": "100",
							"step": 0.5
						},
						{
							"name": "颜色",
							"type": "color",
							"value": "#ffffff"
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
					"name": "轴标签",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
							"name": "最大值",
							"type": "select",
							"value": "数据最大值",
							"selectData": ["自动取整", "数据最大值"]
						},
						{
							"name": "数量",
							"type": "number",
							"value": "6",
							"minValue": "0",
							"maxValue": "100",
							"step": 1
						},
						{
							"name": "显示格式",
							"type": "select",
							"value": "默认",
							"selectData": ["默认", "11(整数)", "11.1(浮点数)", "11.11(浮点数)"]
						},
						{
							"name": "角度",
							"type": "select",
							"value": "水平",
							"selectData": ["水平", "斜角", "垂直"]
						}
					]
				},
				{
					"name": "轴单位",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "单位",
						"value": "单位",
						"type": "input"
					}]
				},
				{
					"name": "轴线",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "颜色",
						"type": "color",
						"value": "#ffffff"
					}]
				},
				{
					"name": "网络线",
					"hasChild": true,
					"type": "hasChild",
					"editable": "2",
					"fieldData": [{
						"name": "颜色",
						"type": "color",
						"value": "#ffffff"
					}]
				}
			]
		},
		{
			"name": "y轴",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
					"name": "文本",
					"hasChild": true,
					"type": "hasChild",
					"editable": "0",
					"fieldData": [{
							"name": "字号",
							"type": "number",
							"value": "15",
							"minValue": "10",
							"maxValue": "100",
							"step": 0.5
						},
						{
							"name": "颜色",
							"type": "color",
							"value": "#ffffff"
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
					"name": "轴标签",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "角度",
						"type": "select",
						"value": "水平",
						"selectData": ["水平", "斜角", "垂直"]
					}]
				},
				{
					"name": "轴线",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
						"name": "颜色",
						"type": "color",
						"value": "#ffffff"
					}]
				},
				{
					"name": "网络线",
					"hasChild": true,
					"type": "hasChild",
					"editable": "2",
					"fieldData": [{
						"name": "颜色",
						"type": "color",
						"value": "#ffffff"
					}]
				}
			]
		},
		{
			"name": "图例",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
					"name": "文本",
					"hasChild": true,
					"editable": "0",
					"type": "hasChild",
					"fieldData": [{
						"name": "字号",
						"type": "number",
						"minValue": 10,
						"maxValue": 100,
						"value": 12,
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
				},
				{
					"name": "布局",
					"hasChild": true,
					"editable": "0",
					"type": "hasChild",
					"fieldData": [{
							"name": "间距",
							"hasChild": true,
							"editable": "0",
							"type": "hasChild",
							"fieldData": [{
								"name": "左右间距",
								"type": "number",
								"value": 8,
								"step": 0.5
							}, {
								"name": "上下间距",
								"type": "number",
								"value": 10,
								"step": 0.5
							}]
						},
						{
							"name": "位置",
							"type": "select",
							"value": "顶部居右",
							"selectData": ["顶部居中", "顶部居左", "顶部居右", "底部居中", "底部局左", "底部居右"]
						}
					]
				}
			]
		},
		{
			"name": "提示框",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
					"name": "触发类型",
					"type": "select",
					"value": "数据项",
					"selectData": ["数据项", "坐标轴"]
				},
				{
					"name": "触发动作",
					"type": "select",
					"value": "悬浮",
					"selectData": ["悬浮", "点击"]
				},
				{
					"name": "消失延迟时间",
					"type": "number",
					"fieldData": [{
						"name": "",
						"value": 100,
						"step": 1
					}]
				},
				{
					"name": "背景框样式",
					"hasChild": true,
					"type": "hasChild",
					"editable": "0",
					"fieldData": [{
							"name": "背景色",
							"type": "color",
							"value": "#333"
						}, {
							"name": "自定义背景框尺寸",
							"hasChild": true,
							"editable": "2",
							"type": "hasChild",
							"fieldData": [{
								"name": "背景框宽度",
								"type": "number",
								"value": "150",
								"step": 1
							}, {
								"name": "背景框高度",
								"type": "number",
								"value": "50",
								"step": 1
							}]
						},
						{
							"name": "内边距",
							"type": "number",
							"value": 10,
							"step": 1
						},
						{
							"name": "水平偏移量",
							"type": "number",
							"value": 6,
							"step": 1
						},
						{
							"name": "垂直偏移量",
							"type": "number",
							"value": 6,
							"step": 1
						},
						{
							"name": "边框颜色",
							"type": "color",
							"value": "#333"
						},
						{
							"name": "边框粗细",
							"type": "number",
							"minValue": 0,
							"value": 0,
							"step": 1
						}
					]
				},
				{
					"name": "文本样式",
					"hasChild": true,
					"type": "hasChild",
					"editable": "0",
					"fieldData": [{
							"name": "颜色",
							"type": "color",
							"value": "#ffffff"
						},
						{
							"name": "字体",
							"type": "select",
							"value": "sans-serif",
							"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
							"selectData": ["sans-serif", "微软雅黑", "黑体"]
						},
						{
							"name": "字号",
							"type": "number",
							"minValue": 10,
							"maxValue": 100,
							"value": 12,
							"step": 0.5
						},
						{
							"name": "字体粗细",
							"type": "select",
							"value": "normal",
							"selectData": ["normal", "bold", "bolder", "lighter"]
						}
					]
				},
				{
					"name": "坐标指示器",
					"hasChild": true,
					"type": "hasChild",
					"editable": "1",
					"fieldData": [{
							"name": "类型",
							"type": "select",
							"value": "直线指示器",
							"selectData": ["直线指示器"]
						},
						{
							"name": "指示器样式",
							"hasChild": true,
							"type": "hasChild",
							"editable": "0",
							"fieldData": [{
									"name": "颜色",
									"type": "color",
									"value": "#e439c3"
								},
								{
									"name": "宽度",
									"type": "number",
									"minValue": 0,
									"maxValue": 100,
									"value": 1,
									"step": 1
								},
								{
									"name": "类型",
									"type": "select",
									"value": "实线",
									"selectData": ["实线", "虚线", "点线"]
								}
							]
						}
					]
				}
			]
		},
		{
			"name": "数据系列",
			"hasEditProperty": true,
			"value": "系列一",
			"type": "series",
			"editable": "series",
			"properties": [{
					"name": "系列1",
					"type": "tab",
					"sid": null,
					"fieldData": [{
						"name": "系列名",
						"type": "input",
						"value": "系列1"
					}, {
						"name": "颜色",
						"type": "multiColor",
						"value": "颜色填充",
						"selectData": ["颜色填充", "渐变填充"],
						"fieldData": [{
							"type": "color",
							"value": "#00BAFF"
						}, {
							"type": "multiColor",
							"fieldData": [{
								"type": "color",
								"value": "#FFF"
							}, {
								"type": "color",
								"value": "#00BAFF"
							}, {
								"type": "range",
								"value": 90,
								"minValue": 0,
								"maxValue": 360,
								"step": 2
							}]
						}]
					}]
				}, {

					"name": "系列2",
					"type": "tab",
					"sid": null,
					"fieldData": [{
						"name": "系列名",
						"type": "input",
						"value": "图例二"
					}, {
						"name": "填充色",
						"type": "multiColor",
						"value": "颜色填充",
						"selectData": ["颜色填充", "渐变填充"],
						"fieldData": [{
							"type": "color",
							"value": "#3DE7C9"
						}, {
							"type": "multiColor",
							"fieldData": [{
								"type": "color",
								"value": "#FFF"
							}, {
								"type": "color",
								"value": "#3DE7C9"
							}, {
								"type": "range",
								"value": 90,
								"minValue": 0,
								"maxValue": 360,
								"step": 2
							}]
						}]
					}]
				},
				{
					"name": "系列3",
					"type": "tab",
					"fieldData": [{
							"name": "系列名",
							"value": "图例三",
							"type": "input"
						},
						{
							"name": "颜色",
							"type": "multiColor",
							"value": "颜色填充",
							"selectData": ["颜色填充", "渐变填充"],
							"fieldData": [{
								"type": "color",
								"value": "#FFFFFF"
							}, {
								"type": "multiColor",
								"fieldData": [{
									"type": "color",
									"value": "#00BAFF"
								}, {
									"type": "color",
									"value": "#FFF"
								}, {
									"type": "range",
									"value": 90,
									"minValue": 0,
									"maxValue": 360,
									"step": 2
								}]
							}]
						}
					]
				}
			]
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
				"name": "更新动画时长",
				"type": "number",
				"value": 300,
				"step": 1
			}, {
				"name": "从之前位置开始",
				"hasChild": false,
				"editable": "0",
				"type": "radio",
				"fieldData": [{
					"name": "从之前位置开始",
					"value": true
				}]
			}]
		}
	]
}