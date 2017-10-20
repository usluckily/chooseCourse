<template>

  <transition name="page">
    <div class="all">

      <div class="banner">
        <img :src="basic.pic " width="100%"  v-if="basic.pic && basic.pic != ''"/>
        <img src="../../static/img/banner.jpg" width="100%"  v-else/>
      </div>
      <div class="content">
        <div class="content-first clearfix">

          <div class="con-tit">
            <h4>{{ basic.course }}</h4>
            <div class="first-right" @click="">
              <div class="first-img">
                <img src="../../static/img/icon.png" >
              </div>
              <div class="first-p" v-cloak>{{ basic.limitNum }}{{ basic.registCount ? '/'+basic.registCount : '' }}人</div>
            </div>
          </div>

          <div class="c-grade">
            限报: {{ basic.gradeName }} <span style="margin-left:2rem;">人数: {{ basic.registCount }}人</span>
          </div>
        </div>

        <div class="content-second" v-if=" !basic.teacherList.length ">
          <div class="second-left" >
            <img src="../../static/img/banner.jpg" style="width:4rem;height:4rem">
          </div>
          <div class="second-right">
            <div class="right-name" v-cloak>任课老师:{{ basic.teacherName }}</div>
            <div class="right-branch" v-cloak>{{ basic.xxx ? '' :'未分组' }}</div>
          </div>

        </div>

        <!--new module , for teacher list-->
        <div class="con-first" style="background: #fff;margin: 0;padding: 1rem 1rem 0 1rem;">任课老师</div>

        <div class="icon-list" v-if=" basic.teacherList.length " style="background:#fff;padding:0;">

          <div  class="icon-box" v-for="i in basic.teacherList">

            <div class="icon-img-box" >
              <img :src="i.teacherpicture" v-if="i.teacherpicture != 'null' &&　i.teacherpicture != '' "/>
              <img src="../assets/img/defaultheadpic.jpg" v-else/>
            </div>

            <p>{{ i.teacherName | deBase64 }}</p>

          </div>

        </div>

        <!--new module , for teacher list-->


        <div class="foot-time">
          <div class="time-first">
            <div class="time-img-first">
              <img src="../../static/img/clock.png">
            </div>
            <div class="time-p-first">
              <span v-cloak>{{ basic.startTime | compute }}</span>
            </div>
          </div>
          <div class="time-first">
            <div class="time-img-first">
              <img src="../../static/img/calendar.png">
            </div>
            <div class="time-p-first" v-cloak>
              开课时间：{{ basic.startTime.split(' ')[0] }} - {{ basic.endTime.split(' ')[0] }}<!--&nbsp;至&nbsp;{{ basic.endTime }}-->
            </div>
          </div>
          <div class="time-first">
            <div class="time-img-first">
              <img src="../../static/img/calendar.png">
            </div>
            <div class="time-p-first" v-cloak>
              上课时间：{{ basic.classTime.split(' ')[0] == 'null' ? '' : basic.classTime.split(' ')[0] }}<!--&nbsp;至&nbsp;{{ basic.endTime }}-->
            </div>
          </div>
        </div>
      </div>
      <div class="footer">

        <div class="foot-wrap">
          <div class="wrap-content">
            <div class="con-first">社团简介</div>
            <div class="con-second" v-cloak>{{ data.introduce }}</div>
          </div>

          <!--<div class="wrap-content">-->
            <!--<div class="con-first">课程目录</div>-->
            <!--<div class="con-second" v-cloak>{{ data.courseContent }}</div>-->
          <!--</div>-->

          <div class="wrap-content">
            <div class="con-first">上课地点</div>
            <div class="con-second" v-cloak>{{ basic.address }}</div>
          </div>

        </div>

      </div>

      <div class="btn_box">
        <div class="btn">
          <!--<div v-on:click="apply(this,$event, basic.id,'content') | setFunc basic.isRegist" class="{{basic.isRegist == '1' ? 'bg_grayH' : 'bg_green' }}">{{ basic.isRegist == '1' ? '已报名' : '我要报名' }}</div>-->
          <div v-bind:class=" basic.btnClass "
               v-on:click="apply(basic)"
               :data-id="basic.id == 'null' ? '' : basic.id"
               v-if=" isPer('P') && basic.status!='开课中' && basic.status != '未开始'">
            {{ basic.isRegist == '1' ? '已报名' : '我要报名' }}
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'
  import T from '@/assets/js/transcoding'

    export default({
      name: 'content',
      data(){
        return {
          basic:JSON.parse(localStorage.basic),
          data:{data:[]}
        }
      },
      methods:{
        isPer(d){
          let arr , res = false
          arr = this.$store.state.basic.role.split(',')
          for(var i in arr){
            if(d == arr[i]){
              res =  true
            }
          }
          return res
        }
      },
      filters:{
        compute(value){
          let res = value.split(' ')[0] ,
            years = new Date().getFullYear() ,
            month = (new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1),
            days = new Date().getDate(),
            today = years+'-'+month+'-'+days

          function DateDiff(d1,d2){
            var day = 24 * 60 * 60 *1000;
            try{
              var dateArr = d1.split("-");
              var checkDate = new Date();
              checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
              var checkTime = checkDate.getTime();

              var dateArr2 = d2.split("-");
              var checkDate2 = new Date();
              checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
              var checkTime2 = checkDate2.getTime();

              var cha = (checkTime - checkTime2)/day;
              return cha;
            }catch(e){
              return false;
            }
          }
          res = Math.round(DateDiff(res,today));
          if(res>0){
            return '距离报名截止还有'+res+'天';
          }else{
            return '报名时间已过';
          }

        },
        deBase64(value){

          return T.toUtf16(value)
        }
      },
      created(){
        let vm = this
        console.log(localStorage.basic)
        ajax.post(vm.testUrl || IF.getDetail,{url:(vm.testUrl ? IF.getDetail : undefined),courseid:vm.$route.params.id},function(d){
          if(d.data[0]){
            vm.data = d.data[0]
          }
        },['introduce','courseContent','address'])

        vm.$root.eventHub.$on('statusRefresh',function(){
          vm.basic.isRegist = '1'
          vm.basic.btnClass = 'bg_grayH'
        })
      },
      beforeDestroy(){
//        this.$root.eventHub.$off('statusRefresh')
      }
    })
</script>
<style scoped>
.content{
  margin:0;
}
</style>
