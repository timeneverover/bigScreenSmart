<template>
	<div :id='chartAttr.attr_id' class="datav-wraper" style="width:100%;height:100%;">
	</div>
</template>

<script>
	import chartUtil from '@/publicService/chartCommon.js'
	import commonUtil from '@/publicService/commonUtls.js'
	import optionUtil from '@/components/setOption/bubbleUtil.js'

	export default {
		props: ['chartAttr', 'chartIndex'],
		data() {
			return {
				bubbleChart: '',
			}
		},
		computed: {
		},
		watch: {
			chartAttr: {
				handler(newValue, oldValue) {　　　
					this.setChartOption()
					if(this.bubbleChart != '') {
						this.bubbleChart.resize()
					}　
				},
				　deep: true
			}
		},
		mounted() {
			this.setChartOption()
			let that = this
			window.addEventListener('resize', () => {
				if(that.bubbleChart != '') {
					that.bubbleChart.resize()
				}
			})
		},
		methods: {
			initChart() {
				this.bubbleChart = this.$echarts.init(document.getElementById(this.chartAttr.attr_id))
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
				this.bubbleChart.setOption(options, true)
			},
		}
	}
</script>

<style>

</style>