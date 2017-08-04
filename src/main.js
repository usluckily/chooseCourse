// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import utils from './assets/js/utils'

//
import $ from 'jquery'
import IF from './assets/js/interface'


Vue.use(Vuex)

Vue.use(utils)//全局函数及常量

Vue.config.productionTip = false


let basic = {userid:'21790052',sid:'41',perm:['XKBM'],roleid:'221',stuTid:'50465',role:'T'};//221

$.ajax({
  type:'POST',
  url:IF.getUserRole,
  async:false,
  data:{
    roleId:93
  },
  success(d){
    basic.role = d
  }
})

if(window.GreenSchool){
  GreenSchool.showLeftBtn(false)

  basic.stuTid = GreenSchool.getStudentId()
  basic.userid = GreenSchool.getUserID()
  basic.sid = GreenSchool.getSchoolId()
  // try{
  //   basic.perm = GreenSchool.getPermissions('STXK')
  // }catch (e){
  //   alert(e)
  //   throw e
  // }

  basic.roleid = GreenSchool.getRoleId()



  if(basic.role == 'P'){
    GreenSchool.showRightBtn(false,'我的表现')
  }else if(basic.perm == 'Z'){
    GreenSchool.showRightBtn(false,'我的班级')
  }


}

const store = new Vuex.Store({
  state:{
    basic:basic
  },
  mutations:{

  }
})

const mainVueObj = {
  el: '#app',
  router,
  store,
  data:{
    eventHub:new Vue()
  },
  created(){

  },
  template: '<App/>',
  components: { App }
}


if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
  let SI = setInterval(function(){
    if(window.iosParams.userid != ''){
      basic.userid = window.iosParams.userid
      basic.stuTid = window.iosParams.stuTid
      basic.sid = window.iosParams.sid;
      basic.roleid = window.iosParams.roleid;
      // basic.perm = window.iosParams.perm;

      if(basic.perm = 'XKBM'){
        window.external.showRightBtn("yes", "我的表现");
      }else if(basic.perm == 'XKBMR'){
        window.external.showRightBtn("yes", "我的班级");
      }

      new Vue(mainVueObj)

      clearInterval(SI)
    }
  },100)
}else{

  new Vue(mainVueObj)

}




