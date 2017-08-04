<template>
  <transition name="page">
    <div class="all">

      <transition-group  class="icon-list" v-on:before-enter="beforeEnter" v-on:enter="enter" tag="div">
        <div  class="icon-box" v-for="(i,index) in student.list" :key="index" :data-index="index">
          <div class="icon-img-box" >
            <img :src="i.picsummary" v-if="i.picsummary != 'null'"/>
            <img src="../assets/img/defaultheadpic.jpg" v-else/>
          </div>
          <p>{{ i.name }}</p>
          <span> {{ i.classname }}</span>
        </div>
      </transition-group>

    </div>
  </transition>
</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'

    export default({
      name: 'studentList',
      data(){
        return {
          student:{
            list:[

            ]
          }
        }
      },
      methods:{
        beforeEnter:function(el){
          el.style.opacity = '0'
        },
        enter:function(el){
          var delay = el.dataset.index * 100
          setTimeout(function () {
            el.style.opacity = '1'
          }, delay)
        },
      },
      created(){
        let vm = this , BP = vm.$store.state.basic
        ajax.post(vm.testUrl || IF.getStudentList,{url:(vm.testUrl ? IF.getStudentList : undefined),id:vm.$route.params.id,stuTid:BP.stuTid},function(d){
          if(d){
            vm.student.list = d.data
            for(var i=0;i<20;i++){
              vm.student.list.push(d.data[0])
            }

          }
        })
      }
    })
</script>
<style scoped>
.all{
  background:#fff;
}
</style>
