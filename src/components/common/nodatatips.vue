<template>
  <div class="nodatatips">
    <p>{{ localTips }}</p>
  </div>
  <!--无数据时的提示-->
</template>
<script>
    export default({
      name: 'nodatatips',
      props:['tips'],
      data(){
        return {}
      },
      computed:{
        localTips(){
          return this.tips
        }
      }
    })
</script>
<style>
  .nodatatips{position:fixed;width:100%;height:100%;display:flex;flex-direction: row;align-items:center;justify-content:center;}
  .nodatatips p{position: relative;top: -2rem;font-size:0.8rem;}
</style>
