<template>

  <transition name="page">
    <div class="all">

      <my_modal :pshow="modal.show" :content="modal.content"></my_modal>

      <m_head></m_head>

      <list :listData="listData.list" :myData="myList.list" :listLoader="listData.loader" :myListLoader="myList.loader"></list>

    </div>
  </transition>


</template>
<script>
    import head from '@/components/common/head'
    import list from '@/components/common/sliderpage'
    import modal from '@/components/common/modal'

    import ajax from '@/assets/js/ajax'
    import IF from '@/assets/js/interface'

    export default({
      name: 'index',
      data(){
          return {
            listData:{
              list:[],
              loader:true
            },
            myList:{
              list:[],
              loader:true
            },
            modal:{
              show:false,
              content:'111'
            }
          }
      },
      methods:{
        init(refresh){ // refresh为true时刷新，false时初始化
          let vm = this , trans = ['course','gradeName','instructor','teacherName','address'] , vState = vm.$store.state , BP = vState.basic
          if( !vState.list.length || refresh ){
            ajax.post(vm.testUrl || IF.getList,{url:(vm.testUrl ? IF.getList : undefined),stuTid:BP.stuTid,sid:BP.sid,roleId:BP.roleid},function(d){
//              console.log('list:'+JSON.stringify(d))

              vState.list = vm.listData.list = d

              vm.listData.loader = false

            },trans)
          }else{
            vm.listData.list = vState.list

            vm.listData.loader = false
          }

          if( !vState.myList.length || refresh ){
            ajax.post(vm.testUrl || IF.getMyList,{url:(vm.testUrl ? IF.getMyList : undefined),stuTid:BP.stuTid,sid:BP.sid,roleId:BP.roleid},function(d){
//              console.log('myList:'+JSON.stringify(d))

              vState.myList = vm.myList.list = d.data

              vm.myList.loader = false

            },['teacherName','gradeName'])
          }else{
            vm.myList.list = vState.myList

            vm.myList.loader = false
          }

        }
      },
      created(){
        let vm = this ,basic = vm.BP()

        //

        if(window.GreenSchool){
          GreenSchool.showTitleText('社团选课')

          if(basic.role == 'P'){
            GreenSchool.showRightBtn(false,'我的')
          }
//          else if(basic.role == 'M'){
//            GreenSchool.showRightBtn(false,'查看')
//          }else if(basic.role.indexOf('S') != -1){
//            GreenSchool.showRightBtn(false,'查看')
//          }
          else if(basic.role == 'Z'){
            GreenSchool.showRightBtn(false,'我的班级,'+vm.vHhost+'myclass')
          }else if(basic.role == 'T'){
            GreenSchool.showRightBtn(false,'')
          }else if(basic.role == 'Z,S' || basic.role == 'M,Z,S' || basic.role == 'M,Z'){
            GreenSchool.showRightBtn(false,'查看,'+vm.vHhost+'myclass')
          }else{
            GreenSchool.showRightBtn(false,'查看')
          }

        }else if(window.iosParams.isIosApp){
          if(basic.role == 'P'){
            if(window.external.getRoleStatus){
              window.external.getRoleStatus ? window.external.getRoleStatus(basic.role+"&我的") :  window.external.showRightBtn("yes", "我的表现");
            }else{
              window.external.showRightBtn("yes", "我的表现");
            }

          }
//          else if(basic.role == 'M'){
//            window.external.getRoleStatus(basic.role+"&查看");
//          }else if(basic.role.indexOf('S') != -1){
//            window.external.getRoleStatus(basic.role+"&查看");
//          }
          else if(basic.role == 'Z'){
            window.external.getRoleStatus(basic.role+"&我的班级&"+vm.vHhost+'myclass');
          }else if(basic.role == 'T'){
            window.external.getRoleStatus(basic.role);
          }else if(basic.role == 'Z,S' || basic.role == 'M,Z,S' || basic.role == 'M,Z'){
            window.external.getRoleStatus(basic.role+"&查看&"+vm.vHhost+'myclass');
          }else{
            window.external.getRoleStatus(basic.role+"&查看");
          }
        }
        //

        vm.init()
        vm.$root.eventHub.$on('statusRefresh',function(){
          vm.init(true)//true为刷新，不传为初始
        })

        vm.$root.eventHub.$on('modalShow',function(d){
          vm.modal.show = true
          vm.modal.content = d.content
        })
        vm.$root.eventHub.$on('modalCancel',function(){
          vm.modal.show = false
        })

      },
      beforeDestroy(){
        let vm = this
        vm.$root.eventHub.$off('modalShow')
//        vm.$root.eventHub.$off('statusRefresh')
      },
      components:{
        m_head:head,
        list:list,
        my_modal:modal
      }
    })
</script>
<style scoped>
 .all{
   position:absolute;
   width:100%;
   height:100%;
   overflow:hidden;
 }
</style>
