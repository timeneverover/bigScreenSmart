import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import ChooseTemplate from '@/pages/chooseTemplate'
import Screen from '@/pages/screen'
import MyViewPager from '@/pages/myViewPager'
import previewPager from '@/pages/previewPager'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/home',
    component: Home,
    // children: [{
    //   path: '/pop',
    //   component: resolve => require(['./components/pop.vue'], resolve),
    // }]
  }, {
    path: '/chooseTemplate',
    component: ChooseTemplate,
  }, {
    path: '/screen',
    name: 'Screen',
    component: Screen,
  }, {
    path: '/previewPager',
    name: 'previewPager',
    component: previewPager,
  }]
})
