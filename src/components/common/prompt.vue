<template>

  <transition name="fade">

    <div class="prompt-box" v-show="show">
      <div class="prompt-tit">{{ localTitle }}</div>
      <div class="prompt-con">{{ localContent }}</div>
    </div>

  </transition>

</template>
<script>
    export default({
      name: 'prompt',
      data(){
        return {
          show:false,
          title:'',
          content:''
        }
      },
      methods:{
        close(){
          this.show = false
        },
        open(){
          this.show = true
        }
      },
      computed:{
        localTitle(){
          return this.title || '提示'
        },
        localContent(){
          return this.content || '阿斯顿'
        }
      },
      created(){
        let vm = this
        vm.$root.eventHub.$on('promptOpen',function(d){
          vm.title = d.title || ''
          vm.content = d.content || ''
          vm.open()
          setTimeout(function(){
            vm.close()
          },2000)
        })
        vm.$root.eventHub.$on('promptClose',function(){
          vm.close()
        })
      },
      beforeDestroy(){
        vm.$root.eventHub.off('promptOpen')
        vm.$root.eventHub.off('promptClose')
      }
    })
</script>
<style>
  .prompt-box{
    width:10rem;
    margin:0 auto 0 -5rem;
    position:fixed;
    left: 50%;
    top:10rem;
    opacity:0.7;
    border-radius:1rem;
    background:#000;
    color:#fff;
    z-index:102;
  }
  .prompt-box .prompt-tit{
    width:100%;
    padding:0.5rem;
    text-align:center;
  }
  .prompt-box .prompt-con{
    width:100%;
    padding:0 1rem 1rem;
    text-align:center;
  }

  .fade-enter{
    opacity:0;
  }
  .fade-enter-to{
    opacity:0.7;
  }
  .fade-enter-active{
    transition:opacity 0.5s ease;
  }
  .fade-leave{
    opacity:0.7;
  }
  .fade-leave-to{
    opacity:0;
  }
  .fade-leave-active{
    transition:opacity 0.5s ease;
  }

</style>
