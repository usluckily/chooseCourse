<template ref="test">
  <div class="all">

    <my_modal :pshow="show" :content="modal.content" :title="modal.title"></my_modal>

    <input   id="test" v-model="testText"/> {{ testText }}

    <button @click="search($event)">click</button> {{ modal }}
  </div>
</template>
<script>
  import modal from '@/components/common/modal'
  import $ from 'jquery'

    export default({
      name: 'test',
      data(){
        return {
          show:false,
          modal:{
            show:false,
            content:"asdasdasd",
            title:'asdasdasfff'
          },
          testText:''
        }
      },
      methods:{
        test(el){
          $('#test').val('adadasd')
          $('#test').trigger('input')
        },
        childrenMethodsX(){
          alert('eee')
        },
        search(el){
          console.log(el)
          $('#test').val('changed')
        }
      },
      created(){
        let vm = this

        this.$root.eventHub.$on('hehe',function(){
          alert('hehe')
        })

        vm.$root.eventHub.$on('modalCancel',function(){
          vm.show = false
        })
      },
      mounted(){
//        console.log('nidaye')
//        console.log(window.globalV.$children[0].$children[2].search())
      },
      components:{
        my_modal:modal
      }
    })
</script>
<style>

</style>
