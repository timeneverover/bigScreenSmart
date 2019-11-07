<template>
	<div :id='chartAttr.attr_id' class="datav-wraper" style="width:100%;height:100%;">
	</div>
</template>

<script>
	import barUtil from '@/components/setOption/barUtil.js'
	import chartUtil from '@/publicService/chartCommon.js'
	export default {
		props: ['chartAttr', 'chartIndex'],
		data() {
			return {
				basicBar: ''
				}
		},
		computed: {
		},
		watch: {
			chartAttr: {
				handler(newValue, oldValue) {　　　　　　
					this.setBarOption()　
					if(this.basicBar != '') {
						this.basicBar.resize()
					}　
				},
				　deep: true
			}
		},
		mounted() {
			this.initBar()
			this.setBarOption()
			let that = this
			window.addEventListener('resize', () => {
				if(that.basicBar != '') {
					that.basicBar.resize()
				}
			})
		},
		methods: {
			initBar() {
				this.basicBar = this.$echarts.init(document.getElementById(this.chartAttr.attr_id))
			},
			setBarOption() {
				let attrs = this.chartAttr.attr_descr.properties
				let arr = this.chartAttr.data_descr.datas.data_value
				let mapped = this.chartAttr.data_descr.mapped
				let datas = chartUtil.getMappedData(arr, mapped)
				this.barOption = barUtil.setOption(attrs)
				this.barOption.xAxis.data = datas.xdata
				this.barOption.series[1].data = datas.ydata[0]
				let s1 = []
				let maxY = Math.max.apply(null, datas.ydata[0])
				let len2 = datas.ydata[0].length
				for(let i = 0; i < len2; i++) {
					s1.push(maxY)
				}
				this.barOption.series[0].data = s1
				this.barOption.grid.zlevel = this.chartAttr.sort
				this.basicBar.setOption(this.barOption)
			},
		}
	}
</script>

<style>
</style>