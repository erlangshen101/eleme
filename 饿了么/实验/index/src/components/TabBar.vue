<template>
  <div class="tab_bar">
      <router-link 
        v-for="(val,index) in data" 
        :key="index"
        :to="val.path"
        active-class="is-selected">
        <div class="tab-item-icon">
          <i :class="'fa fa-' + val.info"></i>
        </div>
        <div class="tab-item-label">{{val.name}}</div>
      </router-link>
  </div>
</template>

<script>
export default {
    name: "tabbar",
    props: {
        data:Array
    },
    create() {
    }
}
</script>

<style scoped>
    .tab_bar {
      height: 45px;
      font-size: 14px;
      background: #fff;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    a {
      text-decoration: none;
      width: 33%;
      height: 100%;
      text-align: center;
      color: #999
    }
    .tab-item-icon {
      margin: 5px;
    }
    .is-selected {
      color: #009eef;
    }
</style>