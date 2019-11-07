export default {
	"id": "wheelplant",
	"name": "轮播图",
	"version": "V1.0.0",
	"type": "isSource",
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
				"value": 338,
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
		"name": "全局样式",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
			"name": "字体",
			"type": "select",
			"value": "sans-serif",
			"selectHover": "请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体",
			"selectData": ["sans-serif", "微软雅黑", "黑体", "digital", "宋体", "隶书", "幼圆"]
		}, {
			"name": "字号",
			"type": "range",
			"minValue": 10,
			"maxValue": 100,
			"value": 18,
			"step": 0.5
		}]
	}, {
		"name": "动画",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
			"type": "number",
			"name": "停顿(ms)",
			"value": 2500,
			"minValue": 0,
			"step": 0.5
		}, {
			"type": "number",
			"name": "速度(ms)",
			"value": 500,
			"minValue": 0,
			"step": 0.5
		}, {
			"name": "特效",
			"type": "select",
			"value": "水平滚动",
			"selectData": ["水平滚动", "垂直滚动", "淡入淡出", "横向条纹","竖向条纹"]
		}, {
			"type": "number",
			"name": "密度",
			"value": 12,
			"minValue": 1,
			"maxValue": 100,
			"step": 1
		}]
	}, {
		"name": "图片",
		"hasEditProperty": false,
		"editable": "0",
		"properties": [{
			"type": "picture",
			"name": "默认图片",
			"value": "/static/upload/chartDefaultImg/p03.jpg"
		}, {
			"name": "填充方式",
			"type": "select",
			"value": "拉伸以充满容器",
			"selectData": ["拉伸以充满容器", "充满容器", "居中"]
		}]
	},{
			"name": "数据系列",
			"hasEditProperty": false,
			"editable": "series",
			"type": "series",
			"value": "系列一",
			"properties": [{
					"name": "系列1",
					"type": "tab",
					"sid":null,
					"fieldData": [{
						"name": "系列名",
						"type": "input",
						"value": "描述1"
					}, {
						"type": "picture",
						"name": "图片",
						"value": "/static/upload/chartDefaultImg/p01.jpg"
					}]
				},
				{
					"name": "系列2",
					"type": "tab",
					"sid":null,
					"fieldData": [{
						"name": "描述",
						"type": "input",
						"value": "描述2"
					}, {
						"type": "picture",
						"name": "图片",
						"value": "/static/upload/chartDefaultImg/p02.jpg"
					}]
				},{
					"name": "系列3",
					"type": "tab",
					"sid":null,
					"fieldData": [{
						"name": "描述",
						"type": "input",
						"value": "描述3"
					}, {
						"type": "picture",
						"name": "图片",
						"value": "/static/upload/chartDefaultImg/p03.jpg"
					}]
				}
			]
		}, {
		"name": "描述",
		"hasEditProperty": false,
		"editable": "1",
		"properties": [{
			"name": "背景颜色",
			"hasChild": true,
			"type": "hasChild",
			"editable": "0",
			"fieldData": [{
				"name": "颜色样式",
				"type": "select",
				"value": "渐变",
				"selectData": ["单色", "渐变"]
			},{
				"parentName":"单色",
				"type": "color",
				"name": "颜色",
				"value": "#ffffff"
			},{
				"parentName":"渐变",
				"name": "开始颜色",
				"type": "color",
				"value": "#00BAFF"
			},{
				"parentName":"渐变",
				"name": "结束颜色",
				"type": "color",
				"value": "#ffffff"
			},{
				"parentName":"渐变",
				"name": "角度",
				"type": "number",
				"value": 90,
				"minValue": 0,
				"maxValue": 360,
				"step": 1
			}]
		}, {
			"type": "color",
			"name": "文字颜色",
			"value": "#ffffff"
		}, {
			"name": "字体粗细",
			"type": "select",
			"value": "normal",
			"selectData": ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
		}, {
			"name": "长度(%)",
			"type": "number",
			"value": 100,
			"minValue": 0,
			"maxValue": 100,
			"step": 1
		}, {
			"name": "高度(%)",
			"type": "number",
			"value": 10,
			"minValue": 0,
			"maxValue": 100,
			"step": 1
		}, {
			"name": "上边距",
			"type": "number",
			"value": 0,
			"step": 10
		}, {
			"name": "左边距",
			"type": "number",
			"value": 0,
			"step": 10
		}, {
			"name": "对齐方式",
			"type": "select",
			"value": "向左",
			"selectData": ["向左", "居中", "向右"]
		}]
	}, {
		"name": "圆点",
		"hasEditProperty": false,
		"editable": "1",
		"properties": [{
			"type": "color",
			"name": "圆点颜色",
			"value": "#ffffff"
		}, {
			"type": "color",
			"name": "当前颜色",
			"value": "#70B075"
		}]
	}]
}