// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import utils from './assets/js/utils'

import $ from 'jquery'
import IF from './assets/js/interface'

Vue.use(Vuex)

Vue.use(utils)//Vue全局能访问

Vue.config.productionTip = false


let basic = {userid:'866658324',sid:'143',perm:['XKBM'],roleid:'2460,2463',stuTid:'74927175',role:'Z,S',roleFlag:'O'};//171
// let basic = {userid:'278253515',sid:'143',perm:['XKBM'],roleid:'2460,2481',stuTid:'40382857',role:'JZ',roleFlag:''};
// let basic = {userid:'910736255',sid:'41',perm:['XKBM'],roleid:'219',stuTid:'39550650',role:'JZ',roleFlag:''};//local

function getRole(){
  $.ajax({
    // url:'/A',
    url:IF.getUserRole,
    type:'POST',
    data:{
      // url:IF.getUserRole,
      userid:basic.userid,
      roleFlag:basic.roleFlag
    },
    async:false,
    success(d){
      if(d || d == ''){
        basic.role = d
      }
    }
  })
}



if(window.GreenSchool){
  GreenSchool.showLeftBtn(false)

  basic.stuTid = GreenSchool.getStudentId()
  basic.userid = GreenSchool.getUserID()
  basic.sid = GreenSchool.getSchoolId()
  basic.roleFlag = GreenSchool.getRoleFlag()
  if(GreenSchool.setStatusBarByColor){
    // GreenSchool.setStatusBarByColor('#D74F25')//  #D74F25
  }
  basic.roleid = GreenSchool.getRoleId()

  getRole()

  // alert(JSON.stringify(basic))

  if(basic.role == 'P'){
    GreenSchool.showRightBtn(false,'我的表现')
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
  methods:{
    test(){

    }
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
      basic.sid = window.iosParams.sid
      basic.roleid = window.iosParams.roleid
      basic.roleFlag = window.iosParams.roleFlag
      // basic.role = window.iosParams.role

      getRole()

      // alert(JSON.stringify(basic))

      if(basic.role == 'P'){
        window.external.showRightBtn("yes", "我的表现");
      }

      new Vue(mainVueObj)

      clearInterval(SI)
    }
  },100)
}else{
  // getRole()
  new Vue(mainVueObj)

}


