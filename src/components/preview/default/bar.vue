<template>
	<div :id="chartData.attr_id" style="width:100%;height: 100%;"></div>
</template>

<script>
	import httpService from '@/publicService/HttpService.js'
	import Urls from '@/publicService/urls.js'
	import opctionData from '@/defaults/options/basicBarData.js'
	export default {
		props: ['chartData'],
		data() {
			return {
				chartDom: '',
				websockt: '',
				barOption: opctionData,
			}
		},
		mounted() {
			this.initDom()
			this.setBarOptionAttr()
			this.initWebsocket()
		},
		destroyed() {
			// 页面销毁时关闭长连接
			this.websocketclose()
		},
		methods: {
			initWebsocket() {
				if(this.chartData.type != 'static' && this.chartData.autoUpdate == 'Y') {
					const wsuri = Urls.websocketUrl // ws地址
					let urls = wsuri + '/' + this.chartData.attr_id
					console.log('socket url :' + urls)
					this.websockt = new WebSocket(urls)
					this.websockt.onopen = this.websocketonopen
					this.websockt.onerror = this.websocketonerror
					this.websockt.onmessage = this.websocketonmessage
					this.websockt.onclose = this.websocketclose
				}

			},
			websocketonopen() {
				console.log('WebSocket连接成功')
			},
			websocketonerror(e) { // 错误
				console.log('WebSocket连接发生错误')
			},
			websocketonmessage(e) { // 数据接收
				console.log('socket onmessage:' + e.data)

				if(e.data != "连接成功" && e.data != '') {
					let data = JSON.parse(e.data)
					console.log('socket onmessage in-------------')
					this.chartData.data = this.getChartData(data, this.chartData.mapped)
					this.setBarOptionAttr()
				}

			},
			websocketclose(e) { // 关闭
				this.websock.close()
				console.log('connection closed ')
			},
			initDom() {
				this.chartDom = this.$echarts.init(document.getElementById(this.chartData.attr_id))
			},
			getChartData(arr, mapped) { //将数据分成x轴数组，y轴数组
				let len = arr.length
				let xDatas = []
				let yDatas = []
				let item = {}
				//console.log('mappp:' + JSON.stringify(mapped))
				for(let i = 0; i < len; i++) {
					let data1 = mapped[0].value
					let data2 = mapped[1].value
					if(data1 == "") {
						data1 = mapped[0].name
					}
					if(data2 == "") {
						data2 = mapped[1].name
					}
					if(arr[i].hasOwnProperty(data1)) {
						xDatas.push(arr[i][data1])
					}
					if(arr[i].hasOwnProperty(data2)) {
						yDatas.push(arr[i][data2])
					}
				}
				item.xDatas = xDatas
				item.yDatas = yDatas
				//console.log('chartsList datas:' + JSON.stringify(item))
				return item
			},
			setBarOptionAttr() {
				console.log('set option.............:' + this.chartData.attr_id)
				let options = this.barOption
				let attrs = this.chartData.properties
				//console.log('chart attrs:' + JSON.stringify(attrs))
				options.xAxis.data = this.chartData.data.xDatas
				options.series[1].data = this.chartData.data.yDatas
				let s1 = []
				let maxY = Math.max.apply(null, this.chartData.data.yDatas)
				let len2 = this.chartData.data.yDatas.length
				for(let i = 0; i < len2; i++) {
					s1.push(maxY)
				}
				let bgColor = attrs[1].properties[1].fieldData[2].value
				if(bgColor == '') {
					bgColor = 'transparent'
				}
				options.series[0].data = s1

				options.grid.zlevel = this.chartData.sort
				options.grid.top = attrs[1].properties[2].fieldData[0].value
				options.grid.bottom = attrs[1].properties[2].fieldData[1].value
				options.grid.left = attrs[1].properties[2].fieldData[2].value
				options.grid.right = attrs[1].properties[2].fieldData[3].value
				options.textStyle.fontFamily = attrs[1].properties[0].value
				options.xAxis.offset = parseInt(attrs[1].properties[3].fieldData[2].value)
				options.yAxis.offset = parseInt(attrs[1].properties[3].fieldData[1].value)
				options.xAxis.axisLabel.margin = attrs[2].properties[2].fieldData[0].value
				options.xAxis.axisLabel.fontWeight = attrs[2].properties[0].fieldData[2].value
				options.xAxis.axisLabel.color = attrs[2].properties[0].fieldData[0].value
				options.xAxis.axisLabel.fontSize = attrs[2].properties[0].fieldData[1].value
				options.xAxis.axisLine.show = attrs[2].properties[3].fieldData[0].value
				options.xAxis.axisLine.lineStyle.color = attrs[2].properties[0].fieldData[0].value
				options.xAxis.axisTick.lineStyle.color = attrs[2].properties[0].fieldData[0].value
				options.xAxis.axisTick.length = attrs[2].properties[1].fieldData[0].value
				options.yAxis.name = attrs[3].properties[1].value
				options.yAxis.axisLine.show = attrs[3].properties[7].fieldData[0].value
				options.yAxis.axisTick.length = parseInt(attrs[3].properties[5].fieldData[0].value)
				options.yAxis.axisLine.lineStyle.color = attrs[3].properties[0].fieldData[0].value
				options.yAxis.axisTick.lineStyle.color = attrs[3].properties[0].fieldData[0].value
				options.yAxis.nameTextStyle.fontWeight = attrs[1].properties[3].fieldData[0].fieldData[2].value
				options.yAxis.nameTextStyle.color = attrs[1].properties[3].fieldData[0].fieldData[1].value
				options.yAxis.nameTextStyle.fontSize = attrs[1].properties[3].fieldData[0].fieldData[0].value
				options.xAxis.nameTextStyle.fontWeight = attrs[1].properties[3].fieldData[0].fieldData[2].value
				options.xAxis.nameTextStyle.color = attrs[1].properties[3].fieldData[0].fieldData[1].value
				options.xAxis.nameTextStyle.fontSize = attrs[1].properties[3].fieldData[0].fieldData[0].value
				
				let ymin = attrs[3].properties[2].value
				let ymax = attrs[3].properties[3].value
				if(ymin == 0 || ymin == '自动取值') {
					options.yAxis.min = null
				} else if(ymin == '数据最小值') {
					options.yAxis.min = 'dataMin'
				}
				if(ymax == 0 || ymax == '自动取值') {
					options.yAxis.max = null
				} else if(ymax == '数据最大值') {
					options.yAxis.max = 'dataMax'
				}
				//options.yAxis.min = attrs[3].properties[2].value
				//options.yAxis.max = attrs[3].properties[3].value
				options.yAxis.splitNumber = parseInt(attrs[3].properties[4].fieldData[0].value)
				options.yAxis.axisLabel.margin = parseInt(attrs[3].properties[6].fieldData[0].value)
				options.yAxis.axisLabel.fontWeight = attrs[3].properties[0].fieldData[2].value
				options.yAxis.axisLabel.color = attrs[3].properties[0].fieldData[0].value
				options.yAxis.axisLabel.fontSize = attrs[3].properties[0].fieldData[1].value
				options.series[0].itemStyle.normal.color = bgColor
				options.series[0].barCategoryGap = attrs[1].properties[1].fieldData[0].value * 100 + '%'
				options.series[1].barCategoryGap = attrs[1].properties[1].fieldData[0].value * 100 + '%'
				options.series[1].itemStyle.color = attrs[4].properties[0].fieldData[0].value
				//console.log('option:' + JSON.stringify(options))
				this.chartDom.setOption(options)
			},
		}
	}
</script>

<style>

</style>