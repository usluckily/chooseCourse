<template>
  <div class="content">

    <slot name="normallist-tit"></slot>

    <div class="list">

      <ul>
        <slot name="normallist-item"></slot>
      </ul>

    </div>

  </div>
</template>
<script>
    export default({
      name: 'normallist',
      data(){
        return {}
      }
    })
</script>
<style scoped>
  .list-tit{
    width:100%;
    font-size:0.8rem;
    padding:1rem 0;
    color:#666;
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
</style>
