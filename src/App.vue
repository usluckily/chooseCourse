<template>
  <div id="app">
    <my_prompt ></my_prompt>

    <!--<my_loader></my_loader>-->

    <router-view></router-view>
  </div>
</template>

<script>
  import base from '@/assets/js/base'

  import prompt from '@/components/common/prompt'
  import loader from '@/components/common/loader/ballpulse'

  export default {
    name: 'app',
    data(){
      return{}
    },
    created(){
      base.rootFontSize()
    },
    components:{
      my_prompt:prompt,
      my_loader:loader
    }
  }
</script>

<style>
</style>
<style src="./assets/css/base.css"></style>
<style src="./assets/css/ani.css"></style>
<style src="./assets/css/loader.css"></style>
<style src="./assets/css/swiper-3.3.1.min.css"></style>
