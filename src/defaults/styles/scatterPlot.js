export default {
	"id": "scatterPlot",
	"name": "散点图",
	"version": "V1.0.0",
	"type":"isChart",
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
				"name": "边距",
				"hasChild": true,
				"type": "hasChild",
				"editable": "0",
				"fieldData": [{
					"name": "顶部",
					"type": "number",
					"value": "30",
					"step": 0.5
				}, {
					"name": "底部",
					"type": "number",
					"value": "50",
					"step": 0.5
				}, {
					"name": "左侧",
					"type": "number",
					"value": "40",
					"step": 0.5
				}, {
					"name": "右侧",
					"type": "number",
					"value": "30",
					"step": 0.5
				}]
			}]
		}, {
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
					"minValue": "10",
					"maxValue": "100",
					"value": "12",
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
			}, {
				"name": "轴标签",
				"hasEditProperty": true,
				"editable": "1",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "数据种类",
					"value": "时间型",
					"type": "select",
					"hasChild": true,
					"selectData": ["数值型", "类目型", "时间型"],
					"fieldData": []
				}, {
					"parentName": "类目型",
					"name": "柱间间距",
					"type": "none",
					"type1": "range",
					"value": "1",
					"minValue": "0",
					"maxValue": "1",
					"step": 0.01
				}, {
					"parentName": "类目型",
					"name": "柱外间距",
					"type": "none",
					"type1": "range",
					"value": "0",
					"minValue": "0",
					"maxValue": "1",
					"step": 0.01
				}, {
					"parentName": "时间型",
					"name": "数据格式",
					"value": "2016/01/01 02:30:00",
					"type": "select",
					"selectData": ["2016/01/01 02:30:00", "2016/01/01 02:30", "2016/01/01 02", "2016/01/01", "2016/01", "01/01", "2016", "02:30:00", "02:30", "02", "2016-01-01 02:30:00", "2016-01-01 02:30", "2016-01-01 02", "2016-01-01", "2016-01", "01-01", "2016.01.01 02:30:00", "2016.01.01 02:30", "2016.01.01 02", "2016.01.01", "2016.01", "01.01"]
				}, {
					"parentName": "时间型|数值型",
					"name": "显示格式",
					"value": "1月",
					"type": "select",
					"selectData": ["11(整数)", "11.1(浮点数)", "11.11(浮点数)", "2016年", "2016(年份)", "01月01日", "01/01(月/日)", "02:30:00", "02:30(时:分)", "1月", "2日", "02h", "02(时)", "01-01", "01.01"]
				}, {
					"parentName": "时间型|数值型",
					"name": "最大值",
					"type": "input",
					"value": "2010/12/31 23:59:59"
				}, {
					"parentName": "时间型|数值型",
					"name": "最小值",
					"type": "input",
					"value": "2010/01/01 00:00:00"
				}, {
					"parentName": "时间型|数值型",
					"name": "单位",
					"type": "input",
					"value": ""
				}, {
					"name": "数量",
					"type": "number",
					"minValue": 0,
					"value": 5,
					"step": 1
				}, {
					"name": "角度",
					"value": "水平",
					"type": "select",
					"selectData": ["水平", "斜角", "垂直"]
				}]
			}, {
				"name": "轴线",
				"hasEditProperty": true,
				"editable": "1",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#fff"
				}]
			}, {
				"name": "网格线",
				"hasEditProperty": true,
				"editable": "2",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#e3e3e3"
				}]
			}]
		}, {
			"name": "y轴",
			"hasEditProperty": true,
			"editable": "1",
			"properties": [{
				"name": "文本样式",
				"hasChild": true,
				"editable": "0",
				"type": "hasChild",
				"fieldData": [{
					"name": "字号",
					"type": "number",
					"minValue": "10",
					"maxValue": "100",
					"value": "12",
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
			}, {
				"name": "轴标签",
				"hasEditProperty": true,
				"editable": "1",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "最小值",
					"type": "select",
					"value": "自动取整",
					"selectData": ["自动取整", "数据最小值"]
				}, {
					"name": "最大值",
					"type": "select",
					"value": "数据最大值",
					"selectData": ["自动取整", "数据最大值"]
				}, {
					"name": "数量",
					"type": "number",
					"value": "6",
					"step": 1,
					"minValue": 0
				}, {
					"name": "显示格式",
					"type": "select",
					"value": "11(整数)",
					"selectData": ["默认", "11(整数)", "11.1(浮点数)", "11.11(浮点数)"]
				}, {
					"name": "角度",
					"value": "水平",
					"type": "select",
					"selectData": ["水平", "斜角", "垂直"]
				}]
			}, {
				"name": "轴单位",
				"hasEditProperty": true,
				"editable": "1",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "单位",
					"type": "input",
					"value": "单位"
				}]
			}, {
				"name": "轴线",
				"hasEditProperty": true,
				"editable": "1",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#fff"
				}]
			}, {
				"name": "网格线",
				"hasEditProperty": true,
				"editable": "2",
				"hasChild": true,
				"type": "hasChild",
				"fieldData": [{
					"name": "颜色",
					"type": "color",
					"value": "#e3e3e3"
				}]
			}]
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
					"minValue": "10",
					"maxValue": "100",
					"value": "12",
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
			}, {
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
						"value": "8",
						"step": 0.5
					}, {
						"name": "上下间距",
						"type": "number",
						"value": "10",
						"step": 0.5
					}]
				}, {
					"name": "位置",
					"type": "select",
					"value": "底部居中",
					"selectData": ["顶部居中", "顶部居左", "顶部居右", "底部居中", "底部居左", "底部居右"]
				}]
			}]
		},
		{
			"name": "数据系列",
			"hasEditProperty": false,
			"editable": "series",
			"type": "series",
			"value": "系列1",
			"properties": [{
					"name": "系列1",
					"type": "tab",
					"sid":null,
					"fieldData": [{
						"name": "系列名",
						"type": "input",
						"value": "系列1"
					}, {
						"name": "填充色",
						"type": "multiColor",
						"value": "颜色填充",
						"selectData": ["颜色填充", "渐变填充"],
						"fieldData": [{
							"type": "color",
							"value": "#75D2F5"
						}, {
							"type": "multiColor",
							"fieldData": [{
								"type": "color",
								"value": "#FFF"
							}, {
								"type": "color",
								"value": "#000"
							}, {
								"type": "range",
								"value": 90,
								"minValue": 0,
								"maxValue": 360,
								"step": 2
							}]
						}]
					}, {
						"name": "边框色",
						"type": "color",
						"value": "#00BAFF"
					}]
				},
				{

					"name": "系列2",
					"type": "tab",
					"sid":null,
					"fieldData": [{
						"name": "系列名",
						"type": "input",
						"value": "系列2"
					}, {
						"name": "填充色",
						"type": "multiColor",
						"value": "颜色填充",
						"selectData": ["颜色填充", "渐变填充"],
						"fieldData": [{
							"type": "color",
							"value": "#9EF3E4"
						}, {
							"type": "multiColor",
							"fieldData": [{
								"type": "color",
								"value": "#FFF"
							}, {
								"type": "color",
								"value": "#000"
							}, {
								"type": "range",
								"value": 90,
								"minValue": 0,
								"maxValue": 360,
								"step": 2
							}]
						}]
					}, {
						"name": "边框色",
						"type": "color",
						"value": "#3DE7C9"
					}]
				}, {
					"name": "系列3",
					"type": "tab",
					"sid":null,
					"fieldData": [{
						"name": "系列名",
						"type": "input",
						"value": "系列3"
					}, {
						"name": "填充色",
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
								"value": "#FFF"
							}, {
								"type": "color",
								"value": "#000"
							}, {
								"type": "range",
								"value": 90,
								"minValue": 0,
								"maxValue": 360,
								"step": 2
							}]
						}]
					}, {
						"name": "边框色",
						"type": "color",
						"value": "#FFFFFF"
					}]
				}
			]
		},
		{
			"name": "动画",
			"hasEditProperty": true,
			"editable": "2",
			"properties": [{
				"name": "初始动画时长",
				"type": "number",
				"value": 1000,
				"step": 1,
				"minValue": 0
			}, {
				"name": "缓动效果",
				"type": "select",
				"value": "cubicOut",
				"selectData": ["linear", "quadraticIn", "quadraticOut", "quadraticInOut", "cubicIn", "cubicOut", "cubicInOut", "quarticIn", "quarticOut", "quarticInOut", "quinticIn", "quinticOut", "quinticInOut", "sinusoidalIn", "sinusoidalOut", "sinusoidalInOut", "exponentialIn", "exponentialOut", "exponentialInOut", "circularIn", "circularOut", "circularInOut", "elasticIn", "elasticOut", "elasticInOut", "backIn", "backOut", "backInOut", "bounceIn", "bounceOut", "bounceInOut"]
			}, {
				"name": "更新动画时长",
				"type": "number",
				"value": 300,
				"step": 1,
				"minValue": 0
			}]
		}
	]
}