<template>
  <div class="content">
    <div class="swiper-container" id="tabs-container">
      <div class="swiper-wrapper">
        <div class="card_box swiper-slide">

          <m_tips tips="暂时没有数据" v-show="list.length <= 0"></m_tips>
          <m_ballPulse v-show=" listLoader "></m_ballPulse>

          <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" tag="div">
            <div class="in_card_box clearfix" v-for="(i,index) in list" :data-id="i.id" @click="jump(i)" v-cloak :key="index" :data-index="index">
              <div class="img_box">
                <img :src="i.pic" v-if="i.pic && i.pic != ''"/>
                <img src="../../assets/img/1.jpg" v-else/>
              </div>
              <div class="info_box">
                <h4>{{ i.course }} <span>{{ i.gradeName ? "("+i.gradeName+")" : "" }}</span></h4>
                <div>
                  <dl>
                    <dt>{{ i.teacherName }}</dt>
                    <dd class="clearfix">
                      <span class="l">{{ i.limitNum }}/{{ i.registCount }}</span>
                      <span :class="i.class">{{ i.status }}</span>
                    </dd>
                  </dl>

                  <!--apply()在utils里-->
                  <div class='list_btn' v-if="isPer('P') && i.status != '未开始' && i.status!='开课中' " :class="i.btnClass" onclick="event.stopPropagation()"
                       @click="apply(i)"
                       :data-id="i.id == 'null' ? '' : i.id"
                  >
                    {{ i.isRegist == '1' ? '已报名' : '我要报名' }}
                  </div>

                </div>
              </div>
            </div>
          </transition-group>

        </div>
        <!--课程列表-->

        <div class="card_box swiper-slide">

          <m_tips tips="暂时没有数据" v-show="myList.length <= 0"></m_tips>
          <m_ballPulse v-show=" myListLoader "></m_ballPulse>

          <transition-group v-on:before-enter="beforeEnter" v-on:enter="enter" tag="div">
            <div class="in_card_box clearfix" v-for="(i,index) in myList" :data-id="i.id" @click="jump(i)" v-cloak :key="index">
              <div class="img_box">
                <img :src="i.pic" v-if="i.pic && i.pic != ''"/>
                <img src="../../assets/img/1.jpg" v-else/>
              </div>
              <div class="info_box">
                <h4>{{ i.course }} <span>{{ i.gradeName ? "("+i.gradeName+")" : "" }}</span> </h4>
                <div>
                  <dl>
                    <dt>{{ i.teacherName }}</dt>
                    <dd class="clearfix">
                      <span class="l">{{ i.limitNum }}/{{ i.registCount }}</span>
                      <span class="r c_yellow">{{ i.status }} </span>
                    </dd>
                  </dl>
                  <div class="list_btn bg_yellow" @click="cancel(i)" v-if="isPer('P') && i.status!='开课中' "  onclick="event.stopPropagation()" >取消报名</div>

                  <router-link class="list_btn bg_green" v-if="isPer('S')" :to=" '/studentlist/'+i.id " tag="div" onclick="event.stopPropagation()">
                    学生名单
                  </router-link>

                </div>
              </div>
            </div>
          </transition-group>

        </div>
        <!--我的课程-->
      </div>
    </div>
  </div>
</template>
<script>
    import Swiper from 'swiper'
    import base from '@/assets/js/base'
    import ajax from '@/assets/js/ajax'
    import IF from '@/assets/js/interface'

    import tips from '@/components/common/nodatatips'
    import ballPulse from '@/components/common/loader/ballpulse'


    export default({
      name: 'sliderpage',
      props:{
        listData:{
          type:Array,
          default:[]
        },
        myData:{
          type:Array,
          default:[]
        },
        listLoader:{
          type:Boolean,
          default:true
        },
        myListLoader:{
          type:Boolean,
          default:true
        },
        test:{
          type:String
        }
      },
      data(){
        return {
          mySwiper:'',
        }
      },
      methods:{
        beforeEnter:function(el){
//          el.style.display = 'none'
          el.style.opacity = '0'
        },
        enter:function(el){
          var delay = el.dataset.index * 200
          setTimeout(function () {
//            el.style.display = 'block'
            el.style.opacity = '1'
          }, delay)
        },
        isPer(d){
          let arr , res = false
          arr = this.$store.state.basic.role.split(',')
          for(var i in arr){
            if(d == arr[i]){
              res =  true
            }
          }
          return res
        },
        cancel(i){
          let vm = this , BP = vm.BP()
          vm.emitModal({content:'你确定要取消 -'+i.course+'-的报名？'})

          vm.$root.eventHub.$on('modalAffirm',function(){
            ajax.post(vm.testUrl || IF.cancelApply,
              {url:(vm.testUrl ? IF.cancelApply : undefined),userid:BP.userid,stuTid:BP.stuTid,publishCoursrid: i.id,roleid:BP.roleid,sid:BP.sid},
              function(d){
              vm.emitUpdate()
              vm.$root.eventHub.$emit('modalCancel')
            })
          })

        },
        emitUpdate(){
          this.$root.eventHub.$emit('statusRefresh')//触发更新
        },
        emitModal(d){
          this.$root.eventHub.$emit('modalShow',d)
        },
        jump(i){
          let vm = this
          if( !i.teacherList ){
            i.teacherList = []
          }
          localStorage.basic = JSON.stringify(i)
          console.log(localStorage.basic)
          vm.$router.push({path:'/content/'+i.courseid})
        },
        slider:function(x){
          let vm = this
          vm.mySwiper = new Swiper('.swiper-container',{
//              initialSlide:2,
            loop: false,
            pagination : '.pagination',
            freeMode:false,
//            initialSlide:x,//初始索引
            speed:300,
            onSlideChangeStart: function(){
              vm.$root.eventHub.$emit('slide',vm.mySwiper.activeIndex)
            },
            onSlideChangeEnd: function(){

            }
          });
        },
        setStatusColor(status,regist){
          let res = {
            txtStatusClass:'',
            btnStatusClass:''
          }

          if(regist){
            regist == '1' ? res.btnStatusClass = 'bg_grayH' : res.btnStatusClass = 'bg_green';
          }

          switch(status){
            case '报名中':
              res.txtStatusClass = 'r c_yellow';
              break;
            case '开课中':
              res.txtStatusClass = 'r c_green';
              break;
            case '未开始':
              res.txtStatusClass = 'r c_gray';
              res.btnStatusClass = 'bg_gray';
              break;
            case '已结束':
              res.txtStatusClass = 'r c_grayH';
              res.btnStatusClass = 'bg_grayH';
              break;
          }
          return res
        },
      },
      computed:{
        list(){
          let vm = this , listFilter = vm.listData
          listFilter.filter(function(x){
            x.class = vm.setStatusColor(x.status,x.isRegist).txtStatusClass
            x.btnClass = vm.setStatusColor(x.status,x.isRegist).btnStatusClass
          })

          console.log(JSON.stringify(listFilter))

          return listFilter
        },
        myList(){
          let vm = this , listFilter = vm.myData
          listFilter.filter(function(x){
            x.class = vm.setStatusColor(x.status,x.isRegist).txtStatusClass
            x.btnClass = vm.setStatusColor(x.status,x.isRegist).btnStatusClass
          })
          return listFilter
        }
      },
      created(){
        let vm = this

        vm.$root.eventHub.$on('navCur',function(d){
          vm.mySwiper.slideTo(d,300)
        })

        vm.$root.eventHub.$on('modalCancel',function(){
          vm.$root.eventHub.$off('modalAffirm')
        })

      },
      mounted(){
        let vm = this
        vm.slider()

        if(vm.isPer('S')){
          vm.mySwiper.slideTo(1,300)
        }

        base.cardH()
      },
      beforeDestroy(){
        let vm = this
        vm.$root.eventHub.$off('modalAffirm')
      },
      components:{
        m_tips:tips,
        m_ballPulse:ballPulse
      },
    })
</script>
<style>

</style>
