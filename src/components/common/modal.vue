<template>

  <div>
    <transition name="">
      <div class="modalBg"  style="opacity:0.5" v-cloak  v-if="show"></div>
    </transition>

    <transition name="modal">

      <div class="modalBox" v-cloak v-if="show">
        <div class="modal" onclick="event.stopPropagation();">
          <h4 class="modalHeader">{{ localTitle }} {{ show }}</h4>
          <div class="modalContent">{{ localContent }}</div>
          <div class="modalFooter clearfix">
            <div class="modalBtn" @click="cancel" id= "modalCancel" >{{ localLeftBtn }}</div>
            <div class="modalBtn"  @click="affirm" id="modalSure" >{{ localRightBtn }}</div>
          </div>
        </div>
      </div>

    </transition>


  </div>

</template>
<script>
    export default({
      name: 'modal',
      props:{
        pshow:{
          type:Boolean,
          default:false
        },
        content:{
          type:String,
          default:''
        }
      },
      data(){
        return {

        }
      },
      methods:{
        affirm(){
          this.$root.eventHub.$emit('modalAffirm')
        },
        cancel(){
//          this.show = false
          this.$root.eventHub.$emit('modalCancel')
        }
      },
      computed:{
        show(){
          return this.pshow
        },
        localTitle(){
          if(this.title == undefined){
            return '提示'
          }
          return this.title
        },
        localContent(){
          if(this.content == undefined){
            return ' '
          }
          return this.content
        },
        localLeftBtn(){
          if(this.leftBtn == undefined){
            return '取消'
          }
          return this.leftBtn
        },
        localRightBtn(){
          if(this.rightBtn == undefined){
            return '确认'
          }
          return this.rightBtn
        }
      }
    })
</script>
<style>

</style>
