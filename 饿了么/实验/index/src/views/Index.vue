<template>
  <div class="index">
      <router-view></router-view>
      <TabBar :data="data"/>
  </div>
</template>

<script>
import TabBar from '../components/TabBar'
export default {
  data() {
    return {
      data:[
        { path:"home", info:"home", name:"首页" },
        { path:"order", info:"file-text-o", name:"订单" },
        { path:"me", info:"user", name:"我的" },
      ]
    }
  },
  components: {
    TabBar
  }
}
</script>

<style>
  .index {
    width: 100%;
    height: calc(100% - 45px);
    display: flex;
    overflow: auto;
  }
</style>

