// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import './css/index.css';
import TipBoxService from './publicService/TipBoxService.js'
import $ from './publicService/jquery.min.js'
import './publicService/pieCarousel.js'
import echarts from 'echarts'
import 'echarts-gl'
import 'echarts-liquidfill'
import 'echarts-wordcloud'
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import "flatpickr/dist/themes/dark.css";
require('es6-promise').polyfill();

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueFlatPickr);
Vue.config.productionTip = false
Vue.prototype.api = process.env.NODE_ENV === 'production' ? '' : '/api'
Vue.prototype.tips = TipBoxService
Vue.prototype.$echarts = echarts //将echarts注册成Vue的全局属性
Vue.prototype.imageUrl = window.g.ApiUrl
Vue.prototype.publichUrl = window.g.webUrl
Vue.prototype.ServiceUrl = window.g.ApiUrl

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
