<template>
  <transition name="page">
    <div class="all">

      <m_tips tips="暂时没有数据" v-show="student.list.length <= 0"></m_tips>

      <transition-group  class="icon-list" v-on:before-enter="beforeEnter" v-on:enter="enter" tag="div">
        <div  class="icon-box" v-for="(i,index) in student.list" :key="index" :data-index="index" @click="nativeApi(i.stutid,i.name)">
          <div class="icon-img-box" >
            <img :src="i.picsummary" v-if="i.picsummary != 'null' &&　i.picsummary != '' "/>
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

  import tips from '@/components/common/nodatatips'

    export default({
      name: 'studentList',
      data(){
        return {
          student:{
            list:[

            ]
          },
          pPath:undefined
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
        nativeApi(stutid,name){
          if(window.GreenSchool){
            GreenSchool.goToMyPerformanceActivity(stutid,name)
          }else if(window.iosParams.isIosApp){
//            alert('iosApp')
            window.external.showStuPerformanceView(stutid+','+name)
          }
        }
      },
      created(){
        let vm = this , BP = vm.$store.state.basic

        console.log(vm.$route)

        //
        if(window.GreenSchool){
          GreenSchool.showRightBtn(true,'')
          GreenSchool.showTitleText('学生名单')
        }else if(window.iosParams.isIosApp){
          window.external.showRightBtn(true,'')
        }
        //

        let isBZR = localStorage.isBZR
        ajax.post(vm.testUrl || IF.getStudentList,
          {url:(vm.testUrl ? IF.getStudentList : undefined),id:vm.$route.params.id,stuTid:BP.stuTid,bzr:isBZR == '1' ? isBZR : undefined},
          function(d){
          if(d){
            vm.student.list = d.data
          }
        })
      },
      beforeRouteEnter(to,from,next){
        let pPath = from.path //检测前一个路由的path
        pPath == '/myclass' ? localStorage.isBZR = '1' : localStorage.isBZR = undefined
        next(vm=>{

        })
      },
      components:{
        m_tips:tips
      }
    })
</script>
<style scoped>
.all{
  background:#fff;
  position:absolute;
  top:0;
}
</style>
