<template>
  <transition name="page">
    <div class="all">

      <search_bar :placeholder=" '请输入社团名' "></search_bar>

      <m_tips tips="暂时没有数据" v-show="list.list.length <= 0"></m_tips>

      <normal_list>

        <div slot="normallist-tit" class="list-tit">{{ list.mClass }}  <span v-if="list.myClassNum !='' ">{{ '('+list.myClassNum+')' }}</span> </div>

        <router-link slot="normallist-item" class="list-item" v-for="(i,index) in list.list" tag="li" :to=" '/studentlist/'+i.communityid " :key="index">

          <div class="img-box">
            <img src="../assets/img/banner.jpg"/>
          </div>
          <div class="item-info">

            <div class="l">
              <h4>{{ i.course }}  <span>{{ i.gradeName ? '('+i.gradeName+')' : '' }}</span></h4>
              <p>{{ i.teachername }}</p>
            </div>

            <div class="r c_green">
              {{ i.signnum }}人
            </div>

          </div>

        </router-link>
      </normal_list>



    </div>
  </transition>
</template>
<script>
  import ajax from '@/assets/js/ajax'
  import IF from '@/assets/js/interface'

  import searchbar from '@/components/common/searchbar'
  import normallist from '@/components/common/normallist'
  import loader from '@/components/common/loader/ballpulse'
  import tips from '@/components/common/nodatatips'

    export default({
      name: 'myclass',
      data(){
        return {
          list:{
            mClass:'',
            myClassNum:'',
            list:[]
          }
        }
      },
      methods:{

      },
      created(){
        let vm = this

        vm.$root.eventHub.$off('search')

        //
        if(window.GreenSchool){
          GreenSchool.showRightBtn(false,'详细列表,'+vm.vHhost+'listdetails')
          GreenSchool.showTitleText('我的班级')
        }else if(window.iosParams.isIosApp){
          window.external.showRightBtn(false,'详细列表,'+vm.vHhost+'listdetails')
        }
        //

        ajax.post(vm.testUrl || IF.getClasslist,{url:(vm.testUrl ? IF.getClasslist : undefined),sid:vm.BP().sid,stuTid:vm.BP().stuTid,bzr:'1'},function(d){
          vm.list.list = d
          vm.list.mClass = d[0].classname
          vm.list.myClassNum = d.length
        })

        vm.$root.eventHub.$on('search',function(d){
          ajax.post(vm.testUrl || IF.getClasslist,{url:(vm.testUrl ? IF.getClasslist : undefined),sid:vm.BP().sid,stuTid:vm.BP().stuTid,name:encodeURI(d.name)},function(d){
            vm.list.list = d
          })
        })
      },
      beforeDestroy(){

      },
      components:{
        search_bar:searchbar,
        normal_list:normallist,
        my_loader:loader,
        m_tips:tips
      }
    })
</script>
<style scoped>
  .list-tit{
    width:100%;
    font-size:0.8rem;
    padding:1rem 0;
    color:#999;
  }
  .content{
    background:#fff;
    padding:0 1rem;
    margin:0;
  }
  .list{
    width:100%;
  }
  .list .list-item{
    border-top:1px solid #eee;
    width:100%;
    padding:1rem 0;
  }
  .list-item .img-box{
    width:5rem;
    height:3.125rem;
    float:left;
  }
  .list-item .img-box>img{
    width:100%;
    min-height:100%;
  }
  .list-item .item-info{
    margin-left:5.5rem;
  }
  .l::before, .l::after, .r::before, .r::after{
    clear: both;
    content: "";
    display: block;
    width: 100%;
  }
  .item-info .l{
    width:80%;
    float:left;
  }
  .item-info .r{
    width:20%;
    float:right;
    text-align:right;
    margin-top:0.2rem;
  }
  .item-info .l h4{
    font-weight:normal;
    font-size:1rem;
    margin:0.2rem 0;
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .item-info .l h4 > span{
    color:#999;
    font-size:0.8rem;
  }
  .item-info .l p{
    font-size:0.8rem;
    color:#666;
  }
</style>
