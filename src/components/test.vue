<template>
  <div class="all">

    <my_modal :pshow="show" :content="modal.content" :title="modal.title"></my_modal>

    <button @click="test">click</button> {{ modal }}
  </div>
</template>
<script>
  import modal from '@/components/common/modal'

    export default({
      name: 'test',
      data(){
        return {
          show:false,
          modal:{
            show:false,
            content:"asdasdasd",
            title:'asdasdasfff'
          }
        }
      },
      methods:{
        test(){
          this.show = true
        }
      },
      created(){
        let vm = this
        vm.$root.eventHub.$on('modalCancel',function(){
          vm.show = false
        })
      },
      components:{
        my_modal:modal
      }
    })
</script>
<style>

</style>
