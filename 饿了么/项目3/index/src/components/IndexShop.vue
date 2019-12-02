<template>
  <div class="index-container" @click="$router.push('/shop')">
      <div class="index-shopInfo">
          <!-- 左侧图片 -->
          <div class="log_container">
              <img :src="restaurant.image_path" alt="">
          </div>
          <!-- 右侧内容 -->
          <div class="index_main">
              <!-- 第一行品牌 -->
              <div class="index_shopname">
                  <i v-if="restaurant.is_premium">品牌</i>
                  <span>{{restaurant.name}}</span>
              </div>
              <!-- 第二行 星级 -->
              <div class="index-rateWrap">
                  <div>
                      <Rating :rating="restaurant.rating"/>
                      <span class="rate">{{restaurant.rating}}</span>
                      <span>月售{{restaurant.recent_order_num}}单</span>
                  </div>
                  <div v-if="restaurant.delivery_mode" class="deLivery">
                      <span class="icon-hollow">
                          {{restaurant.delivery_mode.text}}
                      </span>
                  </div>
              </div>
              <!-- 第三行 配送 -->
              <div class="index-moneyLimit">
                  <div>
                      <span>${{restaurant.float_minimum_order_amount}}起送 </span>
                      <span>| 配送费${{restaurant.float_delivery_fee}}</span>
                  </div>
                  <div class="index-distanceWrap">
                      <span>{{(restaurant.distance / 1000).toFixed(2)}}km |</span>
                      <span> {{restaurant.order_lead_time}}分钟</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Rating from './Rating'
export default {
    name:"IndexShop",
    props: {
        restaurant:Object
    },
    components: {
        Rating
    }
}
</script>

<style scoped>
.index-shopInfo {
    display: flex;
    padding: 10px;
}
.index-shopInfo .log_container {
    border: 1px solid #ddd;
}
.index-shopInfo .log_container img {
    width: 53px;
    height: 70px;
}
.index_main {
    display: flex;
    flex-direction: column ;
    width: 100vh;
    padding: 0 5px;
    justify-content: space-around;

}
.index_shopname {
    display: flex;
    flex-direction: row;
    font-size: 12px;
    margin-bottom: 5px;
}
.index_shopname i {
    background: yellow;
    margin-right: 2px;
}
.index_shopname span {
    font-size: 12px;
}
.index-rateWrap {
    font-size: 12px;
}

.index-rateWrap div {
    display: inline-block;
}
.deLivery{
    margin-left: 157px;
    background: blue;
    color: #fff;
    padding: 2px;
}
.index-moneyLimit {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    color: #666
}
</style>