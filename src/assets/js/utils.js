import ajax from '@/assets/js/ajax';
import IF from '@/assets/js/interface';

export default{
  install(Vue,options){
    Vue.prototype.apply = function(i){
      let vm = this , BP = vm.$store.state.basic

      if(i.isRegist == '0'){
        ajax.post(vm.testUrl || IF.applyUrl,{url:(vm.testUrl ? IF.applyUrl : undefined), userid:BP.userid , stuTid:BP.stuTid , publishCoursrid: i.id , roleid:BP.roleid , sid:BP.sid},
          function(d){
          if(d == '5'){
            vm.$root.eventHub.$emit('promptOpen',{ content:'报名课程数已满' })
          }else if( d == '2' ){
            vm.$root.eventHub.$emit('promptOpen',{ content:'报名数大于限报科目数' })
          }else if( d == '4' ){
            vm.$root.eventHub.$emit('promptOpen',{ content:'请勿重复报名' })
          }else if( d=='6' ){
            vm.$root.eventHub.$emit('promptOpen',{ content:'时间冲突' })
          }else{
            vm.$root.eventHub.$emit('promptOpen',{ title:'',content:'报名成功' })//唤出prompt并设置参数
            vm.$root.eventHub.$emit('statusRefresh')
          }

        })
      }else{

      }
    }
    Vue.prototype.BP = function(){
      return this.$store.state.basic
    }
    Vue.prototype.testUrl = false // '/A'
  }
}
