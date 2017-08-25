<template>

  <div class="loader-box" v-show="loader">
    <div class="loader">
      <div class="loader-inner ball-pulse">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>

</template>
<script>
    export default({
      name: 'ballpulse',
      data(){
        return {
          loader:false
        }
      },
      methods:{
        open(){
          this.loader = true
        },
        close(){
          this.loader = false
        }
      },
      created(){
        let vm = this
        vm.$root.eventHub.$on('loaderOpen',function(){
          vm.open()
        })
        vm.$root.eventHub.$on('loaderClose',function(){
          vm.close()
        })
      }
    })
</script>
<style>
.loader-box{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  background:rgba(255,255,255,0.5);
  z-index:100;
}
</style>
