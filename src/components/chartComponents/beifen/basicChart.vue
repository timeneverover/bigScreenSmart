<template>
	<div :id='chartAttr.attr_id' class="datav-wraper" style="width:100%;height:100%;">
	</div>
</template>

<script>
	import chartUtil from '@/publicService/chartCommon.js'
	import commonUtil from '@/publicService/commonUtls.js'
	import optionUtil from '@/components/setOption/chartUtil.js'

	export default {
		props: ['chartAttr', 'chartIndex'],
		data() {
			return {
				basicChart: '',
			}
		},
		computed: {
			/*chartStyle() {
				let chart = {}
				chart.width = this.chartAttr.attr_descr.properties[0].properties[0].fieldData[0].value + 'px'
				chart.height = this.chartAttr.attr_descr.properties[0].properties[0].fieldData[1].value + 'px'
				return chart
			},*/
		},
		watch: {
			chartAttr: {
				handler(newValue, oldValue) {　　　
					console.log('watching===========================')　　　
					this.setChartOption()
					if(this.basicChart != '') {
						this.basicChart.resize()
					}　
				},
				　deep: true
			}
		},
		mounted() {
			//this.initChart()
			this.setChartOption()
			let that = this
			window.addEventListener('resize', () => {
				if(that.basicChart != '') {
					that.basicChart.resize()
				}
			})
		},
		methods: {
			initChart() {
				this.basicChart = this.$echarts.init(document.getElementById(this.chartAttr.attr_id))
			},
			setChartOption() {
				this.initChart()
				let attrs = this.chartAttr.attr_descr.properties
				let arr = this.chartAttr.data_descr.datas.data_value
				let mapped = this.chartAttr.data_descr.mapped
				let datas = chartUtil.getMappedData(arr, mapped)
				let xdata = [].concat(datas.xdata)
				let yDatas = datas.sdata
				let options = ''
				options = optionUtil.setOption(attrs, xdata)
				options.xAxis.data = xdata
				let seriesLength = attrs[5].properties.length
				for(let i = 0; i < seriesLength; i++) {
					if(yDatas[i]) {
						options.series[i].data = yDatas[i]
					} else {
						options.series[i].data = []
					}
				}
				let ydataLen = yDatas.length
				if(ydataLen > seriesLength) {
					for(let yl = seriesLength; yl < ydataLen; yl++) {
						let index = yl % seriesLength
						let series = JSON.parse(JSON.stringify(chartOption.series[index]))
						series.data = datas.yDatas[yl]
						options.series.push(series)
					}
				}
				options.grid.zlevel = this.chartAttr.sort
				this.basicChart.setOption(options, true)
			},
		}
	}
</script>

<style>

</style>