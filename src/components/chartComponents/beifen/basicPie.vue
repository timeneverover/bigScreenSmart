<template>
	<div :id='chartAttr.attr_id' class="datav-wraper" style="width:100%;height:100%;">
	</div>
</template>

<script>
	import pieUtil from '@/components/setOption/pieUtil.js'
	import chartUtil from '@/publicService/chartCommon.js'
	export default {
		props: ['chartAttr', 'chartIndex'],
		data() {
			return {
				basicPie: ''
				}
		},
		computed: {
		},
		watch: {
			chartAttr: {
				handler(newValue, oldValue) {　　　　　　
					console.log('WATCH ATTR------')
					this.setpieOption()　
					if(this.basicPie != '') {
						this.basicPie.resize()
					}　
				},
				　deep: true
			}
		},
		mounted() {
			this.initPie()
			this.setpieOption()
			let that = this
			window.addEventListener('resize', () => {
				if(that.basicPie != '') {
					that.basicPie.resize()
				}
			})
		},
		methods: {
			initPie() {
				this.basicPie = this.$echarts.init(document.getElementById(this.chartAttr.attr_id))
			},
			setpieOption() {
				let attrs = this.chartAttr.attr_descr.properties
				let arr = this.chartAttr.data_descr.datas.data_value
				let mapped = this.chartAttr.data_descr.mapped
				let datas = chartUtil.getMappedData(arr, mapped)
				this.pieOption = pieUtil.setOption(attrs)
				this.pieOption.grid.zlevel = this.chartAttr.sort
				let dataArray = [];
				let yData = datas.ydata[0];
				let xData = datas.xdata;
				let len = yData.length
				for(let i=0;i<len;i++){
					let obj = {
						name: xData[i],
						value: yData[i]
					}
					dataArray.push(obj)
				}
				this.pieOption.series[0].data = dataArray;
				this.basicPie.setOption(this.pieOption)
			},
		}
	}
</script>

<style>
</style>
