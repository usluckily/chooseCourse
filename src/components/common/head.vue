<template>
  <div class="head">
    <div class="nav">
      <ul id="scr_nav" class="swiper-wrapper tabs clearfix" >
        <li class="on swiper-slide" :id=" index == nav.cur ? 'navCur' : '' " v-for="(i,index) in nav.list" @click="emitCur(index)"><span>{{ i.name }}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default({
      name: 'head',
      data(){
        return {
          nav:{
            cur:0,
            list:[
              {
                name:'社团列表',
              },
              {
                name:'我的社团',
              }
            ]
          }
        }
      },
      methods:{
        emitCur(i){
          this.$root.eventHub.$emit('navCur',i)
        }
      },
      created(){
        let vm = this
        vm.$root.eventHub.$on('slide',function(d){
          vm.nav.cur = d
        })
      }
    })
</script>
<style>

</style>
