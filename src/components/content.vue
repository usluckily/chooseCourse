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
            <h4>{{ data.course }}</h4>
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

        <div class="content-second">
          <div class="second-left">
            <img src="../../static/img/banner.jpg" style="width:4rem;height:4rem">
          </div>
          <div class="second-right">
            <div class="right-name" v-cloak>任课老师:{{ basic.teacherName }}</div>
            <div class="right-branch" v-cloak>{{ basic.xxx ? '' :'未分组' }}</div>
          </div>
        </div>
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
          <div class="wrap-content">
            <div class="con-first">课程目录</div>
            <div class="con-second" v-cloak>{{ data.courseContent }}</div>
          </div>

          <!--<div class="wrap-content">-->
            <!--<div class="con-first">上课地点</div>-->
            <!--<div class="con-second" v-cloak>{{ basic.address }}</div>-->
          <!--</div>-->

        </div>

      </div>

      <div class="btn_box">
        <div class="btn">
          <!--<div v-on:click="apply(this,$event, basic.id,'content') | setFunc basic.isRegist" class="{{basic.isRegist == '1' ? 'bg_grayH' : 'bg_green' }}">{{ basic.isRegist == '1' ? '已报名' : '我要报名' }}</div>-->
          <div v-bind:class=" basic.btnClass " v-on:click="apply(basic)" :data-id="basic.id == 'null' ? '' : basic.id" v-if=" isPer('P')">
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
          return d == this.$store.state.basic.perm
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

        }
      },
      created(){
        let vm = this
        ajax.post(vm.testUrl || IF.getDetail,{url:(vm.testUrl ? IF.getDetail : undefined),courseid:vm.$route.params.id},function(d){
          console.log(d)
          vm.data = d.data[0]
        },['introduce','courseContent'])

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
