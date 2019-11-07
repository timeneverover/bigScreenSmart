import Urls from '../publicService/urls.js'
import TipBoxService from '../publicService/TipBoxService.js'
import httpService from '../publicService/HttpService.js';

export default {
	createComponent(type) {
		httpService.postLink(Urls.getGroupsUrl, type)
			.then(function(res) {
				if(res.code == 0) { //成功
					//更改store存储的组件数组
					this.$store.commit('createComponent', res.data);
					//渲染图表
				} else if(res.code == 1) { //失败
					TipBoxService.open('fail', res.message);
				}
			})
			.catch(function(error) {
				console.log(error);
			});
	},

	updateComponent(that, data, index) {
		that.$store.commit('updataComponent',data,index);
		setScreenView(that,index);
		/*httpService.postLink(Urls.getGroupsUrl, data)
			.then(function(res) {
				if(res.code == 0) { //成功
					//更改store存储的组件数组
					this.$store.commit('createComponent', res.data);
					//渲染图表
					setScreenView(that,index);
				} else if(res.code == 1) { //失败
					TipBoxService.open('fail', res.message);
				}
			})
			.catch(function(error) {
				console.log(error);
			});*/
	},

}

function setScreenView(that, index) {
	var item = that.$store.state.componentsData[index];
	var vid = document.getElementById(item.id);
	var myChart = that.$echarts.init(vid);
	var option = {
		color: [item.color],
		tooltip: {},
		title: {
			text: '示例'
		},
		xAxis: {
			data: item.datax
		},
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '销量',
			type: item.type,
			data: [5, 20, 36, 10, 10, 20]
		}]
	};
	myChart.setOption(option);

}