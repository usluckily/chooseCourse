<template>

  <transition name="page">

    <div class="all">
      <search_bar :placeholder=" '请输入学生名' "></search_bar>

      <normal_list>
        <li slot="normallist-item" class="list-item" v-for="i in list.list">
          <div class="A">
            <div>
              <img :src="i.picsummary" v-if="i.picsummary != 'null' && i.picsummary != '' "/>
              <img src="../assets/img/defaultheadpic.jpg" v-else/>
            </div>
            <span>{{ i.studentname }}</span>
          </div>
          <p class="B">{{ i.course }}</p>
        </li>
      </normal_list>

    </div>

  </transition>


</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'

  import searchbar from '@/components/common/searchbar'
  import normallist from '@/components/common/normallist'

    export default({
      name: 'listdetails',
      data(){
        return {
          list:{
            list:[]
          }
        }
      },
      created(){
        let vm = this

        vm.$root.eventHub.$off('search')

        ajax.post(vm.testUrl || IF.getListdetails,{url:(vm.testUrl ? IF.getListdetails : undefined),sid:vm.BP().sid,stuTid:vm.BP().stuTid},function(d){
          vm.list.list = vm.mergeArrsSame(d.data)
        })

        //
        if(window.GreenSchool){
          GreenSchool.showRightBtn(true,'')
          GreenSchool.showTitleText('详细列表')
        }else if(window.iosParams.isIosApp){
          window.external.showRightBtn(true,'')
        }
        //

        vm.$root.eventHub.$on('search',function(d){
          ajax.post(vm.testUrl || IF.getListdetails,{url:(vm.testUrl ? IF.getListdetails : undefined),sid:vm.BP().sid,stuTid:vm.BP().stuTid,name:encodeURI(d.name)},function(d){
            vm.list.list = vm.mergeArrsSame(d.data)
          })
        })
      },
      beforeDestroy(){

      },
      components:{
        search_bar:searchbar,
        normal_list:normallist
      }
    })
</script>
<style scoped>
  .list-item{
    color:#555;
  }
  .list-item>.A{
    display:flex;
    align-items:center;
  }
  .list-item .A>div{
    width:2.5rem;
    height:2.5rem;
    overflow:hidden;
    border-radius:50%;
  }
  .list-item .A>div>img{
    width:100%;
  }
  .list-item .A>span{
    margin-left:1rem;
    font-size:0.85rem;
  }
  .list-item>.B{
    line-height:2rem;
  }
</style>
