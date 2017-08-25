<template>
  <div class="searchBar">
    <input :placeholder="localPlaceholder" v-model="search"/>
    <img class="search-icon" src="../../assets/img/search.png" @click="emitSearch"/>
  </div>
</template>
<script>
    export default({
      name: 'searchbar',
      props:['placeholder'],
      data(){
        return {
          search:''
        }
      },
      methods:{
        emitSearch(){
          let vm = this
          vm.$root.eventHub.$emit('search',{name:vm.search})
          // 在myclass,listdetails组件中有监听search
        }
      },
      computed:{
        localPlaceholder(){
          return this.placeholder
        }
      }
    })
</script>
<style scoped>
  .searchBar{
    width:100%;
    padding:0.5rem 1rem;
    position:relative;
  }
  .searchBar input{
    border:none;
    background:#fff;
    width:100%;
    height:2rem;
    border-radius:0.3rem;
    text-indent:1rem;
  }
  .search-icon{
    width:1.5rem;
    height:1.5rem;
    position:absolute;
    right: 1.5rem;
    top: 0.75rem;
  }
</style>
