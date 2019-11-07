<!--
	作者：hqj
	时间：2018-12-17
	描述：主页面菜单
-->
<template>
	<div class="menu-main" >
			<router-link to="/myViewPager" class="menu-span" tag="span" @click.native="selectMenu('menu1')">
				<a class="menu-link" :class="currentMenu=='menu1'?'menu-active':''"  >
					<i class="fa fa-diamond font-img"></i>
					我的可视化
				</a>
			</router-link>
			<router-link to="/chooseTemplate" class="menu-span" tag="span" @click.native="selectMenu('menu2')">
				<a class="menu-link" :class="currentMenu=='menu2'?'menu-active':''" >
					<i class="fa fa-database font-img"></i>
					我的数据
				</a>
			</router-link>
		</div>
</template>

<script>
	export default {
		data() {
			return {
				currentMenu:'menu1',
			}
		},
		methods:{
			selectMenu:function(menux){//菜单点击事件
				this.currentMenu=menux;
			}
		}
	}
</script>

<style lang="css">
	@import '../css/homeMenu.css';
</style>

