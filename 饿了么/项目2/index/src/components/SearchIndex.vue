<template>
  <div class="search_index">
      <ul class="search_list">
          <li v-for="(item,index) in data" 
            :key="index"
            @click="$emit('click')">
              <img v-if="item.image_path" :src="item.image_path" alt="">
              <i v-else class="fa fa-search"></i>
              <div class="shopitem">
                  <span class="title">{{item.name || item}}</span>
                  <span class="rating" v-if="item.rating">评分{{item.rating}}</span>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props: {
        data:Array
    },

}
</script>

<style scoped>
.search_list img{
    width: 35px;
    height: 40px;
}
.search_index{
    padding: 0 10px;
    background: #fff;
}
.search_list {
    display: flex;
    flex-direction: column;
}
.search_list li {
    padding: 15px 0;
    display: inline-flex;
}
.search_list li div {
    display: flex;
    align-items: center;
    font-size: 14px;    
    border-bottom: 1px solid #ddd;
    margin-left: 10px;
    width: 100vh;
    margin-bottom: -5px;
}
.title {
    display: inline-block;
    width: 200px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.shopitem {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
}
.rating {
    color: #999;
}
</style>