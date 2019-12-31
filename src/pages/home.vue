<template>
	<div class="home-main">
		<div class="menu-main" >
			<img class="logo-img" src="../assets/logo.gif" />
			<div class="menu-parent">
				<span class="menu-span" @click="selectMenu('menu1')">
					<a class="menu-link" :class="currentMenu=='menu1'?'menu-active':''"  >
						<i class="fa fa-diamond font-img"></i>
						我的可视化
					</a>
				</span>
				<span class="menu-span" @click="selectMenu('menu2')">
					<a class="menu-link" :class="currentMenu=='menu2'?'menu-active':''" >
						<i class="fa fa-database font-img"></i>
						我的数据
					</a>
				</span>
				<span class="menu-span" @click="selectMenu('menu3')">
					<a class="menu-link" :class="currentMenu=='menu3'?'menu-active':''" >
						<i class="fa fa-cogs font-img"></i>
						我的组件
					</a>
				</span>
			</div>

		</div>
		<!--<homemenu></homemenu>-->
		<div class="data-content">
			<myViewPager v-if="currentMenu==='menu1'"></myViewPager>
			<myDataPager v-else-if="currentMenu==='menu2'"></myDataPager>
			<myComPager v-else-if="currentMenu==='menu3'"></myComPager>
		</div>
	</div>

</template>

<script>
	import homeMenu from '../components/homeMenu.vue'
	import myViewPager from '../pages/myViewPager.vue'
	import chooseTemplate from '../pages/chooseTemplate.vue'
	import myDataPager from '../pages/myDataPager.vue'
	import myComPager from '../pages/myComPager.vue'
	export default {
		name: 'Home',
		data() {
			return {
				currentMenu:'menu1',
			}
		},
		components: {
			'homemenu': homeMenu,
			'myViewPager':myViewPager,
			'chooseTemplate':chooseTemplate,
			'myDataPager':myDataPager,
			'myComPager':myComPager
		},
		computed: {
			tableDatas() {
				return this.$store.state.personData
			}
		},
		mounted() {
			// this.$store.dispatch('getPersonData');
		},
		methods: {
			toEditData(editIndex, editId, editName, editAge) {
				this.$store.dispatch('changePopName', '编辑');
				//改变全局的editData
				this.$store.dispatch('changeEditData', {
					index: editIndex,
					id: editId,
					name: editName,
					age: editAge
				});
			},
			addData() {
				this.$store.dispatch('changePopName', '添加');
				this.$store.dispatch('changeEditData', {});
				alert("222")
			},
			deleteData(index, editId, editName, editAge) {
				this.$store.dispatch('changePopName', '删除');
				this.$store.dispatch('changeEditData', {
					index: index,
					id: editId,
					name: editName,
					age: editAge
				});
				this.$store.dispatch('delDataIndex', index);
			},
			selectMenu:function(menux){
				this.currentMenu=menux;
				console.log("click menu:"+menux);
			}
		}

	}
</script>
<style lang="css">
	@import '../css/homeMenu.css';
</style>
