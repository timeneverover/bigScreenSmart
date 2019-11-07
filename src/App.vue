<template>
      <div id="wrapper">
          <router-view/>
          <popitem></popitem>
      </div>
</template>

<script>
import PopItem from './components/pop.vue'
import './publicService/jquery.min.js';

export default {
  name: 'App',
  components: {
      'popitem':PopItem
  },
  mounted() {
      $(function(){
          $('.container').height($(window).height() - $('.navbar').height() - 10);
      })
  },
}
</script>
<style>
@import 'assets/font/font.css'
</style>