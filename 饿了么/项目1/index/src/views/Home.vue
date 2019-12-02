<template>
  <div class="home">
    <header>
      <div class="address_map" @click="$router.push({name:'address',params:{city:city}})">
        <i class="fa fa-map-marker"></i>
        <span >{{address}}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
      <div class="chazhao">
        <i class="fa fa-search"></i>
        <span>搜索商家，商品名称</span>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    address() {
      return this.$store.getters.address
    },
    city() {
      return this.$store.getters.location.addressComponent.province
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%
}
header {
  background: #009eef;
  width: 100%-20px;
  height: 60px;
  padding: 10px;
}
.address_map {
  color: #fff;
  font-weight: 600;
  font-size: 14px;
}
.fa-map-marker {
  margin-right: 5px;
}
.address_map span {
  display: inline-block;
  width: 250px;
  margin-right: 5px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.chazhao {
  margin-top: 10px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #999
}
.fa-search {
  margin-right: 5px;
}
</style>