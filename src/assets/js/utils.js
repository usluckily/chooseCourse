import ajax from '@/assets/js/ajax';
import IF from '@/assets/js/interface';

export default{
  install(Vue,options){
    Vue.prototype.apply = function(i){
      let vm = this , BP = vm.$store.state.basic , canSub = vm.$store.state.canSub

      if(i.isRegist == '0' && canSub){

        canSub = false//防止重复提交

        ajax.post(vm.testUrl || IF.applyUrl,{url:(vm.testUrl ? IF.applyUrl : undefined), userid:BP.userid , stuTid:BP.stuTid , publishCoursrid: i.id , roleid:BP.roleid , sid:BP.sid},
          function(d){

            if(d == '5'){
              vm.$root.eventHub.$emit('promptOpen',{ content:'报名课程数已满' })
            }else if( d == '2' ){
              vm.$root.eventHub.$emit('promptOpen',{ content:'报名数大于限报科目数' })
            }else if( d == '3' ){
              vm.$root.eventHub.$emit('promptOpen',{ content:'名额已满' })
            }else if( d == '4' ){
              vm.$root.eventHub.$emit('promptOpen',{ content:'请勿重复报名' })
            }else if( d=='6' ){
              vm.$root.eventHub.$emit('promptOpen',{ content:'时间冲突' })
            }else{
              vm.$root.eventHub.$emit('promptOpen',{ title:'',content:'报名成功' })//唤出prompt并设置参数
              vm.$root.eventHub.$emit('statusRefresh')
            }

            canSub = true//防止重复提交

        })
      }else{

      }
    }
    Vue.prototype.mergeArrsSame = function(arr){
      let arr2 = arr

      for(var i in arr){
        for(var j in arr){
          if(arr[i].studentid == arr[j].studentid && i != j){
            arr2[i].course+='、'+arr[j].course
            arr2.splice(j,1)
          }
        }
      }
      return arr2

    }
    Vue.prototype.isPer = function(d){
      let arr , res = false
      arr = this.$store.state.basic.role.split(',')
      for(var i in arr){
        if(d == arr[i]){
          res =  true
        }
      }
      return res
    }
    Vue.prototype.BP = function(){
      return this.$store.state.basic
    }
    Vue.prototype.vHhost = 'http://'+location.host+'/html5/chooseCourse/index.html#/' //  /html5/chooseCourse/index.html#/   or /#/
    Vue.prototype.testUrl = false // '/A' or false
  }
}
