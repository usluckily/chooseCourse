<template>

  <transition name="page">
    <div class="all">

      <my_modal :pshow="modal.show" :content="modal.content"></my_modal>

      <m_head></m_head>

      <list :listData="listData.list" :myData="myList.list"></list>

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
              list:[]
            },
            myList:{
              list:[]
            },
            modal:{
              show:false,
              content:'111'
            }
          }
      },
      methods:{
        init(){
          let vm = this , trans = ['course','gradeName','instructor','teacherName','address'] , BP = vm.$store.state.basic
          ajax.post(vm.testUrl || IF.getList,{url:(vm.testUrl ? IF.getList : undefined),stuTid:BP.stuTid,sid:BP.sid,roleId:BP.roleid},function(d){
            console.log(d)
            vm.listData.list = d
          },trans)
          ajax.post(vm.testUrl || IF.getMyList,{url:(vm.testUrl ? IF.getMyList : undefined),stuTid:BP.stuTid,sid:BP.sid,roleId:BP.roleid},function(d){
            console.log(d)
            vm.myList.list = d.data
          },['gradeName','address'])
        }
      },
      created(){
        let vm = this ,basic = vm.BP()

        //
        if(vm.isPer('Z') && window.GreenSchool){
          GreenSchool.showRightBtn(false,'我的班级,'+vm.vHhost+'myclass')
          GreenSchool.showTitleText('社团选课')
        }else if(vm.isPer('Z') && window.iosParams.isIosApp){
//          window.external.showRightBtn(false,'我的班级,'+vm.vHhost+'myclass')
//          alert('start')
          if( basic.role == 'Z' ){
            window.external.getRoleStatus(basic.role+"&我的表现&"+vm.vHhost+'myclass');
          }else if( basic.role == 'Z,S' ){
            window.external.getRoleStatus(basic.role+"&我的表现&");
          }

        }
        //

        vm.init()
        vm.$root.eventHub.$on('statusRefresh',function(){
          vm.init()
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
